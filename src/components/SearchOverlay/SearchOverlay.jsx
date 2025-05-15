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

    const handleFocus = (e) => {
        setOverlayVisible(true)

        //const prevY = window.scrollY;
        // фокус + открытие клавиатуры
        inputRef.current.focus();
    }

    useEffect(() => {
        const doc = document.documentElement;
        const body = document.body;

        // 1) запомним, где мы были
        scrollYRef.current = window.scrollY;
        // 2) зафиксируем документ
        doc.style.position = 'fixed';
        doc.style.top = `-${scrollYRef.current}px`;
        doc.style.left = '0';
        doc.style.right = '0';
        // (по желанию) body тоже
        body.style.position = 'fixed';
        body.style.top = `-${scrollYRef.current}px`;
        body.style.left = '0';
        body.style.right = '0';

        const el = overlayRef.current;
        if (!el) return;
        const handler = (e) => e.preventDefault();
        el.addEventListener('touchmove', handler, { passive: false });
        return () => el.removeEventListener('touchmove', handler);
    }, []); // пустой массив — навсегда, сразу на монтирование

    return (
        <div className={`${styles.overlay} ${visible ? styles['no-scroll'] : ''}`} style={{padding: visible && '16px'}} ref={overlayRef}>
            {visible &&
                <div className={styles.header}>
                    <img src={leftArrow} onClick={onClose} alt='backButton' className={styles.backIcon}/>
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
