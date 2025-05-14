import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import { Input, Tag } from 'antd';
import styles from './SearchOverlay.module.scss';
import tinySearchSvg from '../../assets/svg/v2/tiny-search.svg';
import axios from 'axios';
import leftArrow from "../../assets/svg/v2/left-arrow.svg";
import {historyIcon} from "../constants";

const popularQueries = ['jordan', 'ozweego', 'адидас', 'найк', 'худи', 'force'];

const SearchOverlay = ({ visible, onClose, recentSearches, onSearch }) => {
    const overlayRef = useRef(null);
    const [localVisible, setLocalVisible] = useState(visible);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        setLocalVisible(visible);
        document.body.style.overflow = visible ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [visible]);

    if (!localVisible) return null;

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

    return (
        <div className={styles.overlay} ref={overlayRef}>
            <div className={styles.header}>
                <img src={leftArrow} onClick={onClose} alt='backButton'/>
            </div>

            <Input
                type="search"
                className="input-search"
                size="large"
                placeholder="поиск"
                value={query}
                onChange={handleChange}
                onPressEnter={() => handleSelect(query)}
                suffix={<img className="search-icon" src={tinySearchSvg} alt="search" />}
                allowClear
            />

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
    );
};

export default SearchOverlay;
