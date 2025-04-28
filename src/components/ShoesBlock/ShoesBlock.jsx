import React from 'react';
import styles from './ShoesBlock.module.scss';
import s1 from "../../assets/shoesFeatures/s1.png";
import p2 from "../../assets/newFeatures/p2.png";
import p5 from "../../assets/newFeatures/p5.png";
import p6 from "../../assets/newFeatures/p6.png";
import RotatingShoesTextCircle from "./RotatingShoesTextCircle";
import {useNavigate} from "react-router-dom";

const products = [
    {
        name: 'Nike Dunk Retro Black',
        price: 'от 8899 ₽',
        spuId: 4239122,
        image: s1,
    },
    {
        name: 'NEW BALANCE 9060',
        price: 'от 5999 ₽',
        spuId: 4239122,
        image: p2,
    },
    {
        name: 'ADIDAS INTIMIDATION LOW',
        price: 'от 5999 ₽',
        spuId: 4239122,
        image: p5,
    },
    {
        name: 'ASICS GEL-NYC',
        price: 'от 5999 ₽',
        spuId: 4239122,
        image: p6,
    },
];

const ShoesBlock = () => {
    const navigate = useNavigate();

    return (
        <div style={{marginTop: '100px'}}>
            <div className={styles.showAll}>
                смотреть все
            </div>

            <div className={styles.container}>
                <div className={styles.columnsWrapper}>
                    <div className={styles.columnContainer}>
                        <RotatingShoesTextCircle/>
                        <div
                            className={styles.productCard}
                            onClick={() => navigate(`?spuId=${products[3].spuId}`)}
                        >
                            <img alt={products[0].name} src={products[0].image} className={styles.productImage}/>
                            <div className={styles.productInfo}>
                                <div className={styles.productName}>{products[0].name}</div>
                                <div className={styles.productPrice}>{products[0].price}</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.columnContainer}>
                        <div
                            className={styles.productCard}
                            onClick={() => navigate(`?spuId=${products[3].spuId}`)}
                        >
                            <img alt={products[1].name} src={products[1].image} className={styles.productImage}/>
                            <div className={styles.productInfo}>
                                <div className={styles.productName}>{products[1].name}</div>
                                <div className={styles.productPrice}>{products[1].price}</div>
                            </div>
                        </div>
                        <div
                            className={styles.productCard}
                            onClick={() => navigate(`?spuId=${products[3].spuId}`)}
                        >
                            <img alt={products[2].name} src={products[2].image} className={styles.productImage}/>
                            <div className={styles.productInfo}>
                                <div className={styles.productName}>{products[2].name}</div>
                                <div className={styles.productPrice}>{products[2].price}</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={styles.columnsWrapper}>
                    <div
                        className={styles.productCard}
                        style={{width: '100%', height: '100%'}}
                        onClick={() => navigate(`?spuId=${products[3].spuId}`)}
                    >
                        <img alt={products[3].name} src={products[3].image} className={styles.productImage}
                             style={{width: '100%', height: 'calc(100% - 70px)'}}/>
                        <div className={styles.productInfo}>
                            <div className={styles.productName}>{products[3].name}</div>
                            <div className={styles.productPrice}>{products[3].price}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ShoesBlock;
