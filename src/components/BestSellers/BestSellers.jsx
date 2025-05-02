import React from 'react';
import styles from './BestSellers.module.scss';
import p1 from "../../assets/newFeatures/p1.png";
import p2 from "../../assets/newFeatures/p2.png";
import p3 from "../../assets/newFeatures/p3.png";
import p4 from "../../assets/newFeatures/p4.png";
import p6 from "../../assets/newFeatures/p6.png";
import RotatingTextCircle from "./RotatingTextCircle";
import {useNavigate} from "react-router-dom";

const products = [
    {
        name: 'NIKE ZOOM',
        price: 'от 5999 ₽',
        category: 'КРОССОВКИ',
        spuId: 4239122,
        image: p1,
    },
    {
        name: 'NEW BALANCE 9060',
        price: 'от 5999 ₽',
        category: 'КРОССОВКИ',
        spuId: 4239122,
        image: p2,
    },
    {
        name: 'ADIDAS FW24 BASIC DOWN',
        price: 'от 5999 ₽',
        category: 'КРОССОВКИ',
        spuId: 4239122,
        image: p3,
    },
    {
        name: 'MICHAEL MICHAEL KORS',
        price: 'от 5999 ₽',
        category: 'КРОССОВКИ',
        spuId: 4239122,
        image: p4,
    },
    {
        name: 'ASICS',
        price: 'от 5999 ₽',
        category: 'КРОССОВКИ',
        spuId: 4239122,
        image: p6,
    },
];

const BestSellers = () => {
    const navigate = useNavigate();

    const isDesktop = window?.innerWidth > 768;

    return (
        <div className={styles.mainContainer}>
            {isDesktop &&
                <div className={styles.showAll}>
                    смотреть все
                </div>
            }

            {!isDesktop &&
                <div className={styles.container}>
                    <div className={styles.columnsWrapper}>
                        <div className={styles.columnContainer}>
                            <RotatingTextCircle/>
                            <div
                                className={styles.productCard}
                                onClick={() => navigate(`?spuId=${products[3].spuId}`)}
                            >
                                <img alt={products[0].name} src={products[0].image} className={styles.productImage}/>
                                <div className={styles.productInfo}>
                                    <div className={styles.productName}>{products[0].name}</div>
                                    <div className={styles.categoryName}>{products[0].category}</div>
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
                                <div className={styles.productInfo} style={{paddingLeft: '20px'}}>
                                    <div className={styles.productName}>{products[1].name}</div>
                                    <div className={styles.categoryName}>{products[1].category}</div>
                                    <div className={styles.productPrice}>{products[1].price}</div>
                                </div>
                            </div>
                            <div
                                className={styles.productCard}
                                onClick={() => navigate(`?spuId=${products[4].spuId}`)}
                            >
                                <img alt={products[4].name} src={products[4].image} className={styles.productImage}/>
                                <div className={styles.productInfo}>
                                    <div className={styles.productName}>{products[4].name}</div>
                                    <div className={styles.categoryName}>{products[4].category}</div>
                                    <div className={styles.productPrice}>{products[4].price}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {isDesktop &&
                <div className={styles.container}>
                    <div className={styles.columnsWrapper}>
                        <div className={styles.columnContainer}>
                            <RotatingTextCircle/>
                            <div
                                className={styles.productCard}
                                onClick={() => navigate(`?spuId=${products[3].spuId}`)}
                            >
                                <img alt={products[0].name} src={products[0].image} className={styles.productImage}/>
                                <div className={styles.productInfo}>
                                    <div className={styles.productName}>{products[0].name}</div>
                                    <div className={styles.categoryName}>{products[0].category}</div>
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
                                    <div className={styles.categoryName}>{products[1].category}</div>
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
                                    <div className={styles.categoryName}>{products[2].category}</div>
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
                                <div className={styles.categoryName}>{products[3].category}</div>
                                <div className={styles.productPrice}>{products[3].price}</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>

    );
};

export default BestSellers;
