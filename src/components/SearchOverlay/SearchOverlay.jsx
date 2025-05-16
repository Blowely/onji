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
    const editableRef = useRef(null);

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
    const inputStyles = visible && {
        margin: "0 -16px",
        width: "calc(100% + 32px)"
    }

    useEffect(() => {
        if (visible) {
            // slight delay, чтобы див точно в DOM
            setTimeout(() => {
                editableRef.current?.focus();
                // переместить курсор в конец
                document.execCommand('selectAll', false, null);
                document.getSelection()?.collapseToEnd();
            }, 50);
        }
    }, [visible]);

    const handleInput = e => {
        const text = e.currentTarget.textContent || '';
        setQuery(text);
        // …тут же запрашиваем подсказки, как в handleChange…
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = query.trim();
            if (val) {
                onSearch(val);
                onClose();
                setQuery('');
                editableRef.current.textContent = '';
            }
        }
    };

    const handleSelect = val => {
        onSearch(val);
        onClose();
        setQuery('');
        editableRef.current.textContent = '';
    };

    const handleFocus = () => {
        setOverlayVisible(true);
        prevScrollY.current = window.scrollY;
    };

    return (
        <div className={`${styles.overlay} ${visible ? styles['no-scroll'] : ''}`} style={{padding: visible && '16px'}}
             ref={overlayRef}>
            {visible &&
                <div className={styles.header}>
                    <img src={leftArrow} onClick={onClose} alt='backButton' className={styles.backIcon}/>
                </div>
            }

            <div
                ref={editableRef}
                className={styles.editableInput}
                contentEditable={visible}
                suppressContentEditableWarning={true}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                data-placeholder="поиск"
                onClick={handleFocus}
                onFocus={handleFocus}
            >
            </div>

            {/*<Input
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
            />*/}

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
