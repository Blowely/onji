import { Col, Row } from "antd";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

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
import p10 from "../../assets/newFeatures/p10.png";
import p11 from "../../assets/newFeatures/p11.png";
import p12 from "../../assets/newFeatures/p12.png";
import p13 from "../../assets/newFeatures/p13.png";

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
            title: 'ADISTAR CUSHION Y2K',
            category: 'КРОССОВКИ',
            price: '8299',
            discountedPrice: ''
        },
    ],
    [
        {
            img: p10,
            spuId: 8178446,
            title: 'NIKE V2K RUN',
            category: 'КРОССОВКИ',
            price: '6799',
            discountedPrice: ''
        },
        {
            img: p11,
            spuId: 19345510,
            title: 'KITH x New Balance 991v2',
            category: 'КРОССОВКИ',
            price: '55349',
            discountedPrice: ''
        },
        {
            img: p12,
            spuId: 21450330,
            title: 'adidas x BSTN x FC Bayern',
            category: 'СПОРТИВНЫЕ КУРТКИ',
            price: '20629',
            discountedPrice: ''
        },
        {
            img: p13,
            spuId: 19133994,
            title: 'Nike Book 1 Air Zoom Spiridon',
            category: 'КРОССОВКИ',
            price: '13259',
            discountedPrice: ''
        }
    ],
]

const NewFeatures = () => {
    const navigate = useNavigate();
    const [itemsIndex, setItemsIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [transitioning, setTransitioning] = useState(false);
    const [defaultTranslate, setDefaultTranslate ] = useState("20%");
    const [animating, setAnimating]         = useState(false);


    const onNext = () => {
        if (itemsIndex < remoteItems.length - 1 && !transitioning) {
            setDefaultTranslate("20%");
            setAnimating(false);

            setDirection(1);
            setTransitioning(true);

            requestAnimationFrame(() => {
                setAnimating(true);

                setTimeout(() => {
                    setItemsIndex(prev => prev + 1);
                    setTransitioning(false);
                    setAnimating(false);
                }, 350);
            });
        }
    };

    const onPrev = () => {
        if (itemsIndex > 0 && !transitioning) {
            setDefaultTranslate("-20%");
            setAnimating(false);

            setDirection(-1);
            setTransitioning(true);

            requestAnimationFrame(() => {
                setAnimating(true);

                setTimeout(() => {
                    setItemsIndex(prev => prev - 1);
                    setTransitioning(false);
                    setAnimating(false);
                }, 350);
            });
        }
    };

    const isDesktop = window?.innerWidth > 768;

    return (
        <div className={styles.sliderWrapper}>
            <Row align="middle" className={styles.featuresBlockTitle}>
                <Col style={{width: "100%", position: "absolute"}}>
                    <div className={styles.titleText}>новинки</div>
                </Col>
                {isDesktop &&
                    <Col style={{width: "100%"}}>
                        <Row align="middle" justify="end" style={{marginRight: "25px"}}>
                            <Col>
                                <div
                                    className={itemsIndex === 0 ? styles.arrowInactiveContainer : styles.arrowActiveContainer}
                                    onClick={onPrev}
                                >
                                    <ArrowLeftIcon/>
                                </div>
                            </Col>
                            <Col>
                                <div
                                    className={itemsIndex === remoteItems.length - 1 ? styles.arrowInactiveContainer : styles.arrowActiveContainer}
                                    onClick={onNext}
                                >
                                    <ArrowRightIcon/>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                }
            </Row>

            {isDesktop &&
                <div style={{marginTop: 34}}>
                    <Row gutter={[40, 40]}>
                        {/*<Row gutter={[40, 40]} className={styles.customGap}>*/}
                        {remoteItems[itemsIndex].map((item, index) => (
                            <Col span={6} key={`current-${item.spuId}`}>
                                <div style={{position: "relative", height: "500px", overflow: "hidden"}}>
                                    {/* Текущий товар */}
                                    <div
                                        className={styles.item}
                                        onClick={() => navigate(`?spuId=${item.spuId}`)}
                                        style={{
                                            position: "absolute",
                                            width: "100%",
                                            overflow: "hidden",
                                            transition: "transform 0.45s ease-in-out, clip-path 0.45s ease-in-out",
                                            transform: transitioning && direction > 0
                                                ? "translateX(-20%)"
                                                : transitioning && direction < 0
                                                    ? "translateX(20%)"
                                                    : "translateX(0)",
                                            /* при направлении >0 — скрываем правую половину */
                                            clipPath: transitioning && direction > 0
                                                ? "inset(0 100% 0 0)"   // верх, справа, низ, слева
                                                : transitioning && direction < 0
                                                    ? "inset(0 0 0 100%)"
                                                    : "inset(0 0 0 0)",
                                            zIndex: 2,
                                        }}
                                    >
                                        <img src={item.img} alt="Image"/>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "end",
                                                gap: "5px",
                                            }}
                                        >
                                            <div className={styles.featureTitle}>{item.title}</div>
                                            <div className={styles.categoryName}>{item.category}</div>
                                            <div style={{display: "flex", gap: "5px"}}>
                                                <div className={styles.featurePrice}>от {item.price} ₽</div>
                                                {item.discountedPrice && (
                                                    <div className={styles.featureDiscount}>
                                                        {item.discountedPrice} ₽
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>


                                    {/* Следующий/предыдущий товар (для анимации) */}
                                    <div
                                        className={styles.item}
                                        style={{
                                            position: "absolute",
                                            width: "100%",
                                            zIndex: 1,
                                            transition: animating
                                                ? "transform 0.35s ease-in-out"
                                                : "none",
                                            /* если animating=true — межкадровая цель — 0%, иначе рисуем defaultTranslate */
                                            transform: `translateX(${animating ? "0%" : defaultTranslate})`,
                                        }}
                                    >
                                        <img
                                            src={direction > 0
                                                ? remoteItems[itemsIndex + 1]?.[index]?.img
                                                : remoteItems[itemsIndex - 1]?.[index]?.img}
                                            alt="Image"
                                        />
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "end",
                                                gap: "5px",
                                            }}
                                        >
                                            <div className={styles.featureTitle}>
                                                {direction > 0
                                                    ? remoteItems[itemsIndex + 1]?.[index]?.title
                                                    : remoteItems[itemsIndex - 1]?.[index]?.title}
                                            </div>
                                            <div className={styles.categoryName}>
                                                {direction > 0
                                                    ? remoteItems[itemsIndex + 1]?.[index]?.category
                                                    : remoteItems[itemsIndex - 1]?.[index]?.category}
                                            </div>
                                            <div style={{display: "flex", gap: "5px"}}>
                                                <div className={styles.featurePrice}>
                                                    от {direction > 0
                                                    ? remoteItems[itemsIndex + 1]?.[index]?.price
                                                    : remoteItems[itemsIndex - 1]?.[index]?.price} ₽
                                                </div>
                                                {direction > 0
                                                    ? remoteItems[itemsIndex + 1]?.[index]?.discountedPrice && (
                                                    <div className={styles.featureDiscount}>
                                                        {remoteItems[itemsIndex + 1]?.[index]?.discountedPrice} ₽
                                                    </div>
                                                )
                                                    : remoteItems[itemsIndex - 1]?.[index]?.discountedPrice && (
                                                    <div className={styles.featureDiscount}>
                                                        {remoteItems[itemsIndex - 1]?.[index]?.discountedPrice} ₽
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            }

            {!isDesktop &&
                <div className={styles.itemsWrapper}>
                    {remoteItems[itemsIndex].map((item, index) => (
                        <div className={styles.itemWrapper} key={index}>
                            <div
                                className={styles.item}
                                onClick={() => navigate(`?spuId=${item.spuId}`)}
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    transition: "transform 0.45s ease-in-out, clip-path 0.45s ease-in-out",
                                    transform: transitioning && direction > 0
                                        ? "translateX(-20%)"
                                        : transitioning && direction < 0
                                            ? "translateX(20%)"
                                            : "translateX(0)",
                                    /* при направлении >0 — скрываем правую половину */
                                    clipPath: transitioning && direction > 0
                                        ? "inset(0 100% 0 0)"   // верх, справа, низ, слева
                                        : transitioning && direction < 0
                                            ? "inset(0 0 0 100%)"
                                            : "inset(0 0 0 0)",
                                    zIndex: 2,
                                }}
                            >
                                <img src={item.img} alt="Image"/>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "end",
                                        gap: "5px",
                                    }}
                                >
                                    <div className={styles.featureTitle}>{item.title}</div>
                                    <div className={styles.categoryName}>{item.category}</div>
                                    <div style={{display: "flex", gap: "5px"}}>
                                        <div className={styles.featurePrice}>от {item.price} ₽</div>
                                        {item.discountedPrice && (
                                            <div className={styles.featureDiscount}>
                                                {item.discountedPrice} ₽
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }

        </div>
    );
};

export default NewFeatures;
