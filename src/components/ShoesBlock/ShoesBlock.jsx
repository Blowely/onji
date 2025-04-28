import React from 'react';
import styles from './ShoesBlock.module.scss';
import s1 from "../../assets/shoesFeatures/s1.png";
import s2 from "../../assets/shoesFeatures/s2.png";
import s3 from "../../assets/shoesFeatures/s3.png";
import p1 from "../../assets/newFeatures/p1.png";
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
        name: 'adidas originals SAMBA OG',
        price: 'от 15589 ₽',
        spuId: 4239122,
        image: s2,
    },
    {
        name: 'New Balance NB 2002R',
        price: 'от 5999 ₽',
        spuId: 4239122,
        image: s3,
    },
    {
        name: 'ASICS GEL-NYC',
        price: 'от 5999 ₽',
        spuId: 4239122,
        image: p6,
    },
    {
        image: p1,
        spuId: 5321945,
        name: 'NIKE P-6000',
        category: 'КРОССОВКИ',
        price: 'от 5999 ₽',
        discountedPrice: ''
    },
    {
        image: p2,
        spuId: 4239122,
        name: 'NEW BALANCE 9060',
        category: 'КРОССОВКИ',
        price: 'от 5999 ₽',
        discountedPrice: ''
    },
    {
        image: p5,
        spuId: 21720097,
        name: 'ADIDAS INTIMIDATION LOW',
        category: 'КРОССОВКИ',
        price: 'от 11609 ₽',
        discountedPrice: ''
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
                        >
                        </div>
                    </div>

                </div>
                <div className={styles.columnsWrapper}>
                    <div className={styles.columnContainer}>
                        <div
                            style={{width: '100%', height: '100%'}}
                        />
                        <div
                            className={styles.productCard}
                            style={{width: '100%', height: '100%'}}
                            onClick={() => navigate(`?spuId=${products[4].spuId}`)}
                        >
                            <img alt={products[4].name} src={products[4].image} className={styles.productImage}
                                 style={{width: '100%', height: 'calc(100% - 70px)'}}/>
                            <div className={styles.productInfo}>
                                <div className={styles.productName}>{products[4].name}</div>
                                <div className={styles.productPrice}>{products[4].price}</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.columnContainer}>
                        <div
                            className={styles.productCard}
                            style={{width: '100%', height: '100%'}}
                            onClick={() => navigate(`?spuId=${products[5].spuId}`)}
                        >
                            <img alt={products[5].name} src={products[5].image} className={styles.productImage}
                                 style={{width: '100%', height: 'calc(100% - 70px)'}}/>
                            <div className={styles.productInfo}>
                                <div className={styles.productName}>{products[5].name}</div>
                                <div className={styles.productPrice}>{products[5].price}</div>
                            </div>
                        </div>
                        <div
                            className={styles.productCard}
                            style={{width: '100%', height: '100%'}}
                            onClick={() => navigate(`?spuId=${products[6].spuId}`)}
                        >
                            <img alt={products[6].name} src={products[6].image} className={styles.productImage}
                                 style={{width: '100%', height: 'calc(100% - 70px)'}}/>
                            <div className={styles.productInfo}>
                                <div className={styles.productName}>{products[6].name}</div>
                                <div className={styles.productPrice}>{products[6].price}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ShoesBlock;
