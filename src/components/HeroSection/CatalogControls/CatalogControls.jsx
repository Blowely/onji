import React from "react";
import filtersSvg from '../../../assets/svg/v2/filters.svg';
import vectorDownSvg from '../../../assets/svg/v2/vector-down.svg';
import catalogGreySvg from '../../../assets/svg/v2/catalog-grey.svg';
import catalogSvg from '../../../assets/svg/v2/catalog.svg';
import styles from './CatalogControls.module.scss';

const CatalogControls = () => {
    const isDesktop = window?.innerWidth > 768;

    return (
        <div className={styles.catalogControlsWrapper}>
            <div className={styles.catalogControlsBlock}>
                <span className={styles.catalogControlItem}>
                    <img
                        src={filtersSvg}
                        style={{
                            filter: '#000000',
                        }}
                        alt=""
                    />
                    фильтры
                </span>
                <span className={styles.catalogControlItem}>
                    по популярности
                    <img
                        src={vectorDownSvg}
                        style={{
                            filter: '#000000',
                        }}
                        alt=""
                    />
                </span>
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
