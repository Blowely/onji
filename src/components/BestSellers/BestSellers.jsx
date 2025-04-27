import React from 'react';
import { Card, Row, Col } from 'antd';
import styles from './BestSellers.module.scss';
import p1 from "../../assets/newFeatures/p1.png";
import p2 from "../../assets/newFeatures/p2.png";
import p3 from "../../assets/newFeatures/p3.png";
import p4 from "../../assets/newFeatures/p4.png";
import Hits from "./RotatingTextCircle";
import RotatingTextCircle from "./RotatingTextCircle";

const products = [
    {
        name: 'NEW BALANCE 9060',
        price: 'от 5999 ₽',
        image: p1,
    },
    {
        name: 'NIKE ZOOM',
        price: 'от 5999 ₽',
        image: p2,
    },
    {
        name: 'ASICS GEL-NYC',
        price: 'от 5999 ₽',
        image: p3,
    },
    {
        name: 'ADIDAS OZWEEGO',
        price: 'от 5999 ₽',
        image: p4,
    },
];

const BestSellers = () => {
    return (
        <div className={styles.container}>
            <div className={styles.columnsWrapper}>
                <div>
                    <RotatingTextCircle />
                    <Card
                        hoverable
                        cover={<img alt={products[0].name} src={products[0].image} className={styles.productImage}/>}
                        className={styles.productCard}
                        bordered={false}
                    >
                        <div className={styles.productInfo}>
                            <div className={styles.productName}>{products[0].name}</div>
                            <div className={styles.productPrice}>{products[0].price}</div>
                        </div>
                    </Card>
                </div>
                <div>
                    <Card
                        hoverable
                        cover={<img alt={products[0].name} src={products[0].image} className={styles.productImage}/>}
                        className={styles.productCard}
                        bordered={false}
                    >
                        <div className={styles.productInfo}>
                            <div className={styles.productName}>{products[0].name}</div>
                            <div className={styles.productPrice}>{products[0].price}</div>
                        </div>
                    </Card>
                    <Card
                        hoverable
                        cover={<img alt={products[0].name} src={products[0].image} className={styles.productImage}/>}
                        className={styles.productCard}
                        bordered={false}
                    >
                        <div className={styles.productInfo}>
                            <div className={styles.productName}>{products[0].name}</div>
                            <div className={styles.productPrice}>{products[0].price}</div>
                        </div>
                    </Card>
                </div>

            </div>
            <div className={styles.columnsWrapper}>
                <Card
                    hoverable
                    cover={<img alt={products[0].name} src={products[0].image} className={styles.productImage}/>}
                    className={styles.productCard}
                    bordered={false}
                >
                    <div className={styles.productInfo}>
                        <div className={styles.productName}>{products[0].name}</div>
                        <div className={styles.productPrice}>{products[0].price}</div>
                    </div>
                </Card>
            </div>
            {/*<div className={styles.circle}>
                <span>хиты продаж</span>
            </div>*/}


            {/*<Row gutter={[24, 24]} className={styles.productsGrid}>
                {products.map((product, index) => (
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} key={index}>
                        <Card
                            hoverable
                            cover={<img alt={product.name} src={product.image} className={styles.productImage}/>}
                            className={styles.productCard}
                            bordered={false}
                        >
                            <div className={styles.productInfo}>
                                <div className={styles.productName}>{product.name}</div>
                                <div className={styles.productPrice}>{product.price}</div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>*/}
        </div>
    );
};

export default BestSellers;
