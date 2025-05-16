import React, {useState, useEffect, useRef, useImperativeHandle, forwardRef} from 'react';
import { Input, Tag } from 'antd';
import styles from './SearchOverlay.module.scss';
import tinySearchSvg from '../../assets/svg/v2/tiny-search.svg';
import axios from 'axios';
import leftArrow from "../../assets/svg/v2/left-arrow.svg";
import {historyIcon} from "../constants";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

const popularQueries = ['jordan', 'ozweego', 'адидас', 'найк', 'худи', 'force'];

const SearchOverlay = ({ visible, onClose, setOverlayVisible, recentSearches, onSearch })=> {
    const overlayRef = useRef(null);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);


    const inputRef = useRef(null);
    const scrollYRef = useRef(0);
    const prevScrollY = useRef(0);

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
            setSuggestions(res.data.suggested.slice(0, 11).map((el) => el.value));
        } catch (err) {
            console.error(err);
            setSuggestions([]);
        }
    };

    // выполнить поиск и закрыть оверлей
    const handleSelect = val => {
        onSearch(val);
        onClose();
        setQuery('');
        setSuggestions([]);
    };

    const inputStyles = visible && {
        margin: "0 -16px",
        width: "calc(100% + 32px)"
    }

    const SCROLL_THRESHOLD = 150;

    const handleFocus = () => {
        const currentY = window.scrollY;

        if (currentY >= SCROLL_THRESHOLD) {
            // 1) запомнить
            prevScrollY.current = currentY;

            // 2) зафиксировать body наверху
            document.body.style.position = 'fixed';
            document.body.style.top = `-${currentY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
            document.body.style.width = '100%';

            // 3) проскроллить наверх
            window.scrollTo(0, 0);

            // 4) открыть overlay
            setOverlayVisible(true);

            // 5) отложенно поставить фокус
            requestAnimationFrame(() => {
                setTimeout(() => inputRef.current?.focus(), 50);
            });
        } else {
            // Простое поведение для маленького скролла
            setOverlayVisible(true);
            requestAnimationFrame(() => {
                setTimeout(() => inputRef.current?.focus(), 50);
            });
        }
    };

    const handleClose = () => {
        setOverlayVisible(false);

        // если мы фиксировали body — снимем фиксацию и вернёмся
        if (prevScrollY.current >= SCROLL_THRESHOLD) {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            document.body.style.width = '';

            setTimeout(() => {
                window.scrollTo(0, prevScrollY.current);
                prevScrollY.current = 0;
            }, 300); // подогнать под длительность анимации скрытия overlay
        }
    };

    return (
        <div className={`${styles.overlay} ${visible ? styles['no-scroll'] : ''}`} style={{padding: visible && '16px'}} ref={overlayRef}>
            {visible &&
                <div className={styles.header}>
                    <img src={leftArrow} onClick={handleClose} alt='backButton' className={styles.backIcon}/>
                </div>
            }

            <Input
                onClick={handleFocus}
                onFocus={handleFocus}
                type="search"
                className="input-search"
                style={inputStyles}
                size="large"
                ref={inputRef}
                placeholder="поиск"
                value={query}
                onChange={handleChange}
                onPressEnter={() => handleSelect(query)}
                suffix={<img className="search-icon" src={tinySearchSvg} alt="search" />}
                allowClear
            />

            {visible && (
                <div>
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
                                    {/*<span className={styles.icon}><img className="search-icon" src={tinySearchSvg} alt="search" /></span>*/}
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
