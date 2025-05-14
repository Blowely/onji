import React, { useState, useEffect, useRef } from 'react';
import { Input, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styles from './SearchOverlay.module.scss';
import tinySearchSvg from "../../assets/svg/v2/tiny-search.svg";
import leftArrow from "../../assets/svg/v2/left-arrow.svg";

const popularQueries = ['jordan', 'ozweego', 'адидас', 'найк', 'худи', 'force'];

const SearchOverlay = ({ visible, onClose, recentSearches }) => {
    const overlayRef = useRef(null);
    const [localVisible, setLocalVisible] = useState(visible);

    useEffect(() => {
        setLocalVisible(visible);

        if (visible) {
            // Блокируем скролл на фоне
            document.body.style.overflow = 'hidden';
        } else {
            // Возвращаем скролл
            document.body.style.overflow = '';
        }

        // На случай, если компонент размонтируется
        return () => {
            document.body.style.overflow = '';
        };
    }, [visible]);

    if (!localVisible) return null;

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
                suffix={<div>
                    <img className="search-icon" src={tinySearchSvg} alt="search"/>
                </div>}
                allowClear
            />

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>популярные запросы</h3>
                <div className={styles.tags}>
                    {popularQueries.map(q => (
                        <Tag key={q} className={styles.tag} onClick={() => console.log('search', q)}>
                            {q}
                        </Tag>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>вы искали</h3>
                <ul className={styles.recentList}>
                    {recentSearches.map((item, idx) => (
                        <li key={idx} className={styles.recentItem} onClick={() => console.log('search', item)}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchOverlay;