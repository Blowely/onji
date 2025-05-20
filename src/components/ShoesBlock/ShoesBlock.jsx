import React from 'react';
import styles from './ShoesBlock.module.scss';
import s1 from "../../assets/shoesFeatures/s1.png";
import s2 from "../../assets/shoesFeatures/s2.png";
import s3 from "../../assets/shoesFeatures/s3.png";
import {useNavigate} from "react-router-dom";
import RotatingImageCircle from "../RotatingImageCircle/RotatingImageCircle";
import {PRODUCTS_IMG} from "../constants";

const products = [
    {
        name: 'Nike Dunk',
        price: 'от 8899 ₽',
        category: 'КРОССОВКИ',
        spuId: 4239122,
        image: s1,
    },
    {
        name: 'adidas SAMBA OG',
        price: 'от 15589 ₽',
        category: 'КРОССОВКИ',
        spuId: 4239122,
        image: s2,
    },
    {
        name: 'New Balance NB 2002R',
        price: 'от 5999 ₽',
        category: 'КРОССОВКИ',
        spuId: 4239122,
        image: s3,
    },
    {
        name: 'ASICS GEL-NYC',
        price: 'от 5999 ₽',
        category: 'КРОССОВКИ',
        spuId: 4239122,
        image: PRODUCTS_IMG.p6,
    },
    {
        image: PRODUCTS_IMG.p1,
        spuId: 5321945,
        name: 'NIKE P-6000',
        category: 'КРОССОВКИ',
        price: 'от 5999 ₽',
        discountedPrice: ''
    },
    {
        image: PRODUCTS_IMG.p2,
        spuId: 4239122,
        name: 'NEW BALANCE 9060',
        category: 'КРОССОВКИ',
        price: 'от 5999 ₽',
        discountedPrice: ''
    },
    {
        image: PRODUCTS_IMG.p5,
        spuId: 21720097,
        name: 'ADIDAS INTIMIDATION LOW',
        category: 'КРОССОВКИ',
        price: 'от 11609 ₽',
        discountedPrice: ''
    },
];

const ShoesBlock = () => {
    const navigate = useNavigate();
    const gender = localStorage.getItem('gender');

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
                            <div
                                className={styles.productCard}
                                onClick={() => navigate(`?spuId=${products[3].spuId}`)}
                            >
                                <img alt={products[0].name} src={products[0].image} className={styles.productImage}/>
                                <div className={styles.productInfo} style={{paddingLeft: '20px'}}>
                                    <div className={styles.productName}>{products[0].name}</div>
                                    <div className={styles.categoryName}>{products[0].category}</div>
                                    <div className={styles.productPrice}>{products[0].price}</div>
                                </div>
                            </div>
                            <RotatingImageCircle
                                src="https://storage.yandexcloud.net/pc-mediafiles/test1/icons-onji/shoes-category.png"
                                left="calc(50% - 13px)"
                                onClick={() => navigate(`/${gender}-products?category1Id=29&minPrice=1`)}
                            />
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
                            <RotatingImageCircle
                                src="https://storage.yandexcloud.net/pc-mediafiles/test1/icons-onji/shoes-category.png"
                            />
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
            }
        </div>

    );
};

export default ShoesBlock;
