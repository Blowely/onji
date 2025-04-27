import React from "react";
import { Button } from "antd";
import styles from "./CatalogBtnBlock.module.scss";

// Импорты картинок
import p1 from "../../assets/newFeatures/p1.png";
import p2 from "../../assets/newFeatures/p2.png";
import p3 from "../../assets/newFeatures/p3.png";
import p4 from "../../assets/newFeatures/p4.png";
import p5 from "../../assets/newFeatures/p5.png";

const images = [
    p1, p2, p3,
    p4, p5
];

const CatalogBtnBlock = () => {
    return (
        <div className={styles.catalogBtnBlockWrapper}>
            <div className={styles.container}>
                <div className={styles.lineWrapper}>
                    {Array.from({length: 10}).map((_, index) => (
                        <img
                            key={index}
                            src={images[index % images.length]}
                            alt="promo item"
                            className={styles.item}
                        />
                    ))}
                </div>
                <div className={styles.lineWrapper}>
                    {Array.from({length: 13}).map((_, index) => (
                        <img
                            key={index}
                            src={images[index % images.length]}
                            alt="promo item"
                            className={styles.item}
                        />
                    ))}
                </div>
                <div className={styles.lineWrapper}>
                    {Array.from({length: 12}).map((_, index) => (
                        <img
                            key={index}
                            src={images[index % images.length]}
                            alt="promo item"
                            className={styles.item}
                        />
                    ))}
                </div>
                <div className={styles.lineWrapper}>
                    {Array.from({length: 15}).map((_, index) => (
                        <img
                            key={index}
                            src={images[index % images.length]}
                            alt="promo item"
                            className={styles.item}
                        />
                    ))}
                </div>


                <div className={styles.centerBlock}>
                    <div className={styles.textBlock}>
                        <div className={styles.text}>ОДЕЖДА<br/>И ОБУВЬ ЛЮБИМЫХ БРЕНДОВ<br/>В ОДНОМ МАГАЗИНЕ</div>
                        <div className={styles.onji}>ONJI</div>
                        <div className={styles.catalogButton}>ПЕРЕЙТИ В КАТАЛОГ</div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CatalogBtnBlock;
