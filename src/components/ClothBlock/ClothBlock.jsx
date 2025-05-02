import React from 'react';
import styles from './ClothBlock.module.scss';
import c1 from "../../assets/clothFeatures/c1.png";
import p2 from "../../assets/newFeatures/p2.png";
import p3 from "../../assets/newFeatures/p3.png";
import p4 from "../../assets/newFeatures/p4.png";
import {useNavigate} from "react-router-dom";
import RotatingImageCircle from "../RotatingImageCircle/RotatingImageCircle";

const products = [
    {
        name: 'VLONE',
        price: 'от 7999 ₽',
        spuId: 4239122,
        image: c1,
    },
    {
        name: 'NEW BALANCE 9060',
        price: 'от 5999 ₽',
        spuId: 4239122,
        image: c1,
    },
    {
        name: 'ADIDAS FW24 BASIC DOWN',
        price: 'от 5999 ₽',
        spuId: 4239122,
        image: p3,
    },
    {
        name: 'MICHAEL MICHAEL KORS',
        price: 'от 5999 ₽',
        spuId: 4239122,
        image: c1,
    },
];

const ClothBlock = () => {
    const navigate = useNavigate();

    return (
        <div style={{marginTop: '100px'}}>
            <div className={styles.showAll}>
                смотреть все
            </div>

            <div className={styles.container}>
                <div className={styles.columnsWrapper}>
                    <div className={styles.columnContainer}>
                        <RotatingImageCircle/>
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

export default ClothBlock;
