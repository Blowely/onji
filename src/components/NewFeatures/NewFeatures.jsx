import { Col, Row } from "antd";
import React, {useState} from "react";
import p1 from "../../assets/newFeatures/p1.png";
import p2 from "../../assets/newFeatures/p2.png";
import p3 from "../../assets/newFeatures/p3.png";
import p4 from "../../assets/newFeatures/p4.png";
import p5 from "../../assets/newFeatures/p5.png";
import p6 from "../../assets/newFeatures/p6.png";
import styles from "./NewFeaturesStyles.module.scss";
import {ArrowLeftIcon} from "../../assets/svg/v2/ArrowLeftIcon";
import {ArrowRightIcon} from "../../assets/svg/v2/ArrowRightIcon";

const remoteItems = [
    [
        {
            img: p1,
            spuId: 5321945,
            title: 'NIKE P-6000',
            category: 'КРОССОВКИ',
            price: '5999',
            discountedPrice: ''
        },
        {
            img: p2,
            spuId: 4239122,
            title: 'NEW BALANCE 9060',
            category: 'КРОССОВКИ',
            price: '5999',
            discountedPrice: ''
        },
        {
            img: p3,
            spuId: 15370782,
            title: 'ADIDAS FW24 BASIC DOWN',
            category: 'ЗИМНЯЯ КУРТКА',
            price: '5999',
            discountedPrice: ''
        },
        {
            img: p4,
            spuId: 1388043,
            title: 'MICHAEL MICHAEL KORS',
            category: 'МУЖСКОЙ РЮКЗАК',
            price: '5999',
            discountedPrice: '2700'
        }
    ],
    [
        {
            img: p5,
            title: 'ADIDAS INTIMIDATION LOW',
            category: 'КРОССОВКИ',
            price: '11609',
            discountedPrice: ''
        },
        {
            img: p6,
            title: 'ASICS GEL-NYC',
            category: 'КРОССОВКИ',
            price: '13109',
            discountedPrice: ''
        },
        {
            img: p3,
            title: 'ADIDAS FW24 BASIC DOWN',
            category: 'ЗИМНЯЯ КУРТКА',
            price: '5999',
            discountedPrice: ''
        },
        {
            img: p4,
            title: 'MICHAEL MICHAEL KORS',
            category: 'ЖЕНСКАЯ СУМКА',
            price: '5999',
            discountedPrice: '2700'
        },
    ]
]

const NewFeatures = () => {
    const [itemsIndex, setItemsIndex] = useState(0);


    const onNext = () => {
        if (itemsIndex === remoteItems.length - 1) return;
        setItemsIndex((prev) => prev + 1);
    }

    const onPrev = () => {
        if (itemsIndex === 0) return;
        setItemsIndex((prev) => prev - 1);
    }

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                maxWidth: "1440px",
                margin: "0 auto",
                paddingBottom: "212px",
            }}
        >
            <Row
                align="middle"
                className={styles.featuresBlockTitle}
            >
                <Col style={{ width: "100%", position: "absolute" }}>
                    <div
                        style={{
                            fontFamily: '"Graphik Medium", sans-serif',
                            fontSize: "34.9px",
                            fontWeight: "500",
                            color: "black",
                            display: "flex",
                            alignSelf: "center",
                            justifyContent: "center",
                        }}
                    >
                        новинки
                    </div>
                </Col>
                <Col style={{ width: "100%" }}>
                    <Row align="middle" justify={"end"} style={{ marginRight: "25px" }}>
                        <Col>
                            <div
                                className={
                                    itemsIndex === 0
                                    ? styles.arrowInactiveContainer
                                    : styles.arrowActiveContainer
                                }
                                 onClick={onPrev}>
                                <ArrowLeftIcon/>
                            </div>
                        </Col>
                        <Col>
                            <div
                                className={
                                    itemsIndex === remoteItems.length - 1
                                    ? styles.arrowInactiveContainer
                                    : styles.arrowActiveContainer
                                }
                                 onClick={onNext}>
                                <ArrowRightIcon/>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row gutter={[40, 40]} style={{marginTop: "34px"}} className={styles.customGap}>
                {remoteItems[itemsIndex].map((item, index) => {
                    return (
                        <Col span={6} key={index}>
                            <div className={styles.item}>
                                <img
                                    src={item.img}
                                    alt="Image"
                                />
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: index > 1 ? 'start' : 'end',
                                        gap: '5px',
                                    }}
                                >
                                    <div className={styles.featureTitle}>
                                        {item.title}
                                    </div>
                                    <div className={styles.categoryName}>
                                        {item.category}
                                    </div>
                                    <div style={{display: "flex", gap: '5px'}}>
                                        <div className={styles.featurePrice}>
                                            от 5999 ₽
                                        </div>
                                        {item.discountedPrice &&
                                            <div className={styles.featureDiscount}>
                                                ${item.discountedPrice} ₽
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Col>
                    )
                })}
            </Row>
        </div>
    );
};

export default NewFeatures;
