import React, {useState} from "react";
import filtersSvg from '../../../assets/svg/v2/filters.svg';
import vectorDownSvg from '../../../assets/svg/v2/vector-down.svg';
import catalogGreySvg from '../../../assets/svg/v2/catalog-grey.svg';
import catalogSvg from '../../../assets/svg/v2/catalog.svg';
import styles from './CatalogControls.module.scss';
import {Select} from "antd";
import {SORT_OPTIONS, SORT_TYPES} from "../../../pages/constants";
import {useSearchParams} from "react-router-dom";

const CatalogControls = ({setShowFilters}) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [offset, setOffset] = useState(1);
    const [loading, setLoading] = useState(false);

    const sortBy = searchParams.get("sortBy");
    const isDesktop = window?.innerWidth > 768;
    const [sort, setSort] = useState(sortBy || 'by-relevance');
    const handleChange = (value) => {
        setLoading(true);
        searchParams.set('sortBy', value);
        setSearchParams(searchParams);
        setSort(value);
        setOffset(1);
    };

    return (
        <div className={styles.catalogControlsWrapper}>
            <div className={styles.catalogControlsBlock}>
                <span className={styles.catalogControlItem} onClick={() => setShowFilters(true)}>
                    <img
                        src={filtersSvg}
                        style={{
                            filter: '#000000',
                        }}
                        alt=""
                    />
                    фильтры
                </span>
                {/*<span className={styles.catalogControlItem}>
                    по популярности
                    <img
                        src={vectorDownSvg}
                        style={{
                            filter: '#000000',
                        }}
                        alt=""
                    />
                </span>*/}
                <Select
                    defaultValue={SORT_TYPES[sortBy] || SORT_TYPES["by-relevance"]}
                    value={sort}
                    size="middle"
                    onChange={handleChange}
                    options={SORT_OPTIONS}
                    className={styles.selectCustom}
                    suffixIcon={
                        <img
                            src={vectorDownSvg}
                            style={{
                                filter: 'brightness(0) saturate(100%)',
                                width: '12px',
                                marginLeft: '7px'
                            }}
                            alt=""
                        />
                    }
                    popupClassName={styles.selectPopup}
                />
            </div>
            {isDesktop &&
                <div className={styles.catalogControlsBlock}>
                    <span className={styles.catalogControlItem}>
                        вид каталога
                        <img
                            src={catalogGreySvg}
                            alt=""
                        />
                        <img
                            src={catalogSvg}
                            alt=""
                        />
                    </span>
                </div>
            }

        </div>
    );
};

export default CatalogControls;
