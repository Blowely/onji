import { Col, Row } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./NewFeaturesStyles.module.scss";
import { ArrowLeftIcon } from "../../assets/svg/v2/ArrowLeftIcon";
import { ArrowRightIcon } from "../../assets/svg/v2/ArrowRightIcon";

import p1 from "../../assets/newFeatures/p1.png";
import p2 from "../../assets/newFeatures/p2.png";
import p3 from "../../assets/newFeatures/p3.png";
import p4 from "../../assets/newFeatures/p4.png";
import p5 from "../../assets/newFeatures/p5.png";
import p6 from "../../assets/newFeatures/p6.png";
import p7 from "../../assets/newFeatures/p7.png";
import p8 from "../../assets/newFeatures/p8.png";

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
            spuId: 21720097,
            title: 'ADIDAS INTIMIDATION LOW',
            category: 'КРОССОВКИ',
            price: '11609',
            discountedPrice: ''
        },
        {
            img: p6,
            spuId: 21748134,
            title: 'ASICS GEL-NYC',
            category: 'КРОССОВКИ',
            price: '13109',
            discountedPrice: ''
        },
        {
            img: p7,
            spuId: 1303659,
            title: 'NIKE AIR FORCE 1 LOW "SASHIKO"',
            category: 'КРОССОВКИ',
            price: '14919',
            discountedPrice: ''
        },
        {
            img: p8,
            spuId: 14019955,
            title: 'ADIDAS ORIGINALS ADISTAR CUSHION Y2K',
            category: 'КРОССОВКИ',
            price: '8299',
            discountedPrice: ''
        },
    ]
]


const slideVariants = {
    initial: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    animate: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
};

const NewFeatures = () => {
    const navigate = useNavigate();
    const [itemsIndex, setItemsIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

    const onNext = () => {
        if (itemsIndex < remoteItems.length - 1) {
            setDirection(1);
            setItemsIndex(prev => prev + 1);
        }
    };

    const onPrev = () => {
        if (itemsIndex > 0) {
            setDirection(-1);
            setItemsIndex(prev => prev - 1);
        }
    };

    return (
        <div className={styles.sliderWrapper}>
            <Row align="middle" className={styles.featuresBlockTitle}>
                <Col style={{ width: "100%", position: "absolute" }}>
                    <div className={styles.titleText}>
                        новинки
                    </div>
                </Col>
                <Col style={{ width: "100%" }}>
                    <Row align="middle" justify="end" style={{ marginRight: "25px" }}>
                        <Col>
                            <div
                                className={itemsIndex === 0
                                    ? styles.arrowInactiveContainer
                                    : styles.arrowActiveContainer}
                                onClick={onPrev}
                            >
                                <ArrowLeftIcon />
                            </div>
                        </Col>
                        <Col>
                            <div
                                className={itemsIndex === remoteItems.length - 1
                                    ? styles.arrowInactiveContainer
                                    : styles.arrowActiveContainer}
                                onClick={onNext}
                            >
                                <ArrowRightIcon />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <div style={{ overflow: "hidden", marginTop: 34 }}>
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={itemsIndex}
                        className={styles.motionRow}
                        variants={slideVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        custom={direction}
                        transition={{ duration: 0.4 }}
                    >
                        <Row gutter={[40, 40]} className={styles.customGap}>
                            {remoteItems[itemsIndex].map((item, index) => (
                                <Col span={6} key={item.spuId}>
                                    <div
                                        className={styles.item}
                                        onClick={() => navigate(`?spuId=${item.spuId}`)}
                                    >
                                        <img src={item.img} alt="Image" />
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: index > 1 ? "start" : "end",
                                                gap: "5px",
                                            }}
                                        >
                                            <div className={styles.featureTitle}>{item.title}</div>
                                            <div className={styles.categoryName}>{item.category}</div>
                                            <div style={{ display: "flex", gap: "5px" }}>
                                                <div className={styles.featurePrice}>
                                                    от {item.price} ₽
                                                </div>
                                                {item.discountedPrice && (
                                                    <div className={styles.featureDiscount}>
                                                        {item.discountedPrice} ₽
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default NewFeatures;

