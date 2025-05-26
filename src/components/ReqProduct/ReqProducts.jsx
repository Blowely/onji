import React from 'react';
import styles from './ReqProducts.module.scss';
import BrandsSmallCarousel from "../BrandsSmallCarousel/BrandsSmallCarousel";

const ReqProducts = () => {
    return <div className={styles.container}>
        <img src={"https://storage.yandexcloud.net/pc-mediafiles/test1/banners/banner3.webp"} alt="Background" className={styles.image} />
        <div className={styles.textOverlay}>
            <p>НЕ НАШЛИ<br /><div style={{textAlign: 'start'}}>
                <span>
                    НУЖНЫЙ ТОВАР?
                </span><br />ПРИВЕЗЁМ ПОД <br/> <span>ЗАКАЗ</span>
            </div></p>
            <a href="#" className={styles.link}>ЗАКАЗАТЬ</a>
        </div>
        <BrandsSmallCarousel />
    </div>
}

export default ReqProducts;