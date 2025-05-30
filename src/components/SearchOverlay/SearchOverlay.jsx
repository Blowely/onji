import React, {useState, useRef, useEffect} from 'react';
import { Input, Tag } from 'antd';
import styles from './SearchOverlay.module.scss';
import tinySearchSvg from '../../assets/svg/v2/tiny-search.svg';
import axios from 'axios';
import leftArrow from "../../assets/svg/v2/left-arrow.svg";
import {historyIcon} from "../constants";
import { flushSync } from 'react-dom';

const popularQueries = ['jordan', 'ozweego', 'адидас', 'найк', 'худи', 'force'];

const SearchOverlay = ({ visible, onClose, setOverlayVisible, recentSearches, onSelect })=> {
    const overlayRef = useRef(null);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const inputRef = useRef(null);
    const prevScrollY = useRef(0);

    const handleHideOverlay = () => {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    useEffect(() => {
        if (visible) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
            document.body.style.width = '100%';
        } else {
            handleHideOverlay();
        }
    }, [visible]);

    // при вводе в инпут
    const handleChange = async e => {
        const val = e.target.value;
        setQuery(val);

        if (!val) {
            setSuggestions([]);
            return;
        }

        try {
            const res = await axios.get(`https://api.re-poizon.ru/api/synonyms?search=${encodeURIComponent(val)}`);
            setSuggestions(res.data.suggested.slice(0, 10).map((el) => el.value));
        } catch (err) {
            console.error(err);
            setSuggestions([]);
        }
    };

    // выполнить поиск и закрыть оверлей
    const handleSelect = val => {
        //onSearch(val);
        onClose();
        handleHideOverlay();
        setQuery('');
        setSuggestions([]);
        console.log('val',val)
        onSelect(val);
    };

    const handleFocus = (e) => {
        e.preventDefault();                // отменяем нативный фокус
        prevScrollY.current = window.scrollY;
        // 1) синхронно показываем overlay
        flushSync(() => {
            setOverlayVisible(true);
        });
        // 2) сразу же фокусируем инпут — в рамках того же события tap
        inputRef.current?.focus({ preventScroll: true });
    }

    const isDesktopScreen = window?.innerWidth > 768;
    const isWebView = navigator.userAgent.includes('OnjiApp');

    return (
        <div
            className={`${styles.overlay} ${visible && styles.visible}`} ref={overlayRef}
            style={{paddingTop: isWebView && '60px'}}
        >
            {visible &&
                <div className={styles.header}>
                    <img src={leftArrow} onClick={onClose} alt='backButton' className={styles.backIcon}/>
                </div>
            }
            <Input
                readOnly={!visible}
                onMouseDown={e => e.preventDefault()}
                onClick={handleFocus}
                type="search"
                rootClassName="input-search"
                size="large"
                ref={inputRef}
                style={{ height: visible && '100vh', borderBottom: visible && !isDesktopScreen ? '1px solid #ededed' : 'none' }}
                placeholder="поиск"
                value={query}
                onChange={handleChange}
                onPressEnter={() => handleSelect(query)}
                suffix={<img onClick={handleFocus} className="search-icon" src={tinySearchSvg} alt="search" />}
                allowClear
            />

            {visible && (
                <div className={styles.suggestionsWrapper}>
                    {query && suggestions.length > 0 && (
                        <div className={styles.suggestionTags}>
                            {suggestions.slice(0, 5).map((tag, i) => (
                                <Tag key={i} className={styles.tag} onClick={() => handleSelect(tag)}>
                                    {tag}
                                </Tag>
                            ))}
                        </div>
                    )}

                    {query ? (
                        <div className={styles.suggestions}>
                            {suggestions.length > 0 ? suggestions.map((s, i) => (
                                <div
                                    key={i}
                                    className={styles.suggestionItem}
                                    onClick={() => handleSelect(s)}
                                >
                                    <span className={styles.icon}><img className="search-icon" src={tinySearchSvg} alt="search" /></span>
                                    <span>{s}</span>
                                </div>
                            )) : (
                                <div className={styles.noResults}>Нет совпадений</div>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>популярные запросы</h3>
                                <div className={styles.tags}>
                                    {popularQueries.map(q => (
                                        <Tag key={q} className={styles.tag} onClick={() => handleSelect(q)}>
                                            {q}
                                        </Tag>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>вы искали</h3>
                                <ul className={styles.recentList}>
                                    {recentSearches.map((item, idx) => (
                                        <li key={idx} className={styles.recentItem} onClick={() => handleSelect(item)}>
                                            <img src={historyIcon} alt=""/>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            )}

        </div>
    );
}

export default SearchOverlay;
