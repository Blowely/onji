import { Col, Image, Row, Typography } from "antd";
import React, {useState} from "react";
import styles from "./BrandsV2.module.scss";
import nb from "../../assets/new-balance.png";
import adidas from "../../assets/Adidas.png";
import nike from "../../assets/nike.png";
import {Swiper, SwiperSlide} from "swiper/react";
import {ArrowLeftIcon} from "../../assets/svg/v2/ArrowLeftIcon";
import {ArrowRightIcon} from "../../assets/svg/v2/ArrowRightIcon";
import {useNavigate} from "react-router-dom";

const { Title } = Typography;

const items = [
    {
        img: nike,
        title: "Nike",
    },
    {
        img: adidas,
        title: "Adidas",
    },
    {
        img: nb,
        title: "New balance",
    },
]

const BrandsV2 = () => {
    const navigate = useNavigate();
    const [itemsIndex, setItemsIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [transitioning, setTransitioning] = useState(false);
    const [defaultTranslate, setDefaultTranslate ] = useState("20%");
    const [animating, setAnimating]         = useState(false);


    const onNext = () => {
        if (itemsIndex < items.length - 1 && !transitioning) {
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

    return (
        <div>
            <Row align="middle" className={styles.brandsBlockTitleWrapper}>
                <Col style={{ width: "100%", position: "absolute", maxWidth: "1440px" }}>
                    <div className={styles.titleText}>бренды</div>
                </Col>
                <Col style={{ width: "100%", position: "absolute", maxWidth: "1440px" }}>
                    <Row align="middle" justify="end" style={{ marginRight: "25px" }}>
                        <Col>
                            <div
                                className={itemsIndex === 0 ? styles.arrowInactiveContainer : styles.arrowActiveContainer}
                                onClick={onPrev}
                            >
                                <ArrowLeftIcon />
                            </div>
                        </Col>
                        <Col>
                            <div
                                className={itemsIndex === items.length - 1 ? styles.arrowInactiveContainer : styles.arrowActiveContainer}
                                onClick={onNext}
                            >
                                <ArrowRightIcon />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <div className={styles.sliderWrapper}>
                <div style={{marginTop: 34}} className={styles.brandsWrapper}>
                    {items.map((item, index) => (
                        <div
                            key={`current-${item.spuId}`}
                            className={styles.item}
                            onClick={() => navigate(`?spuId=${item.spuId}`)}
                            style={{
                                width: "100%",
                                zIndex: 2,
                            }}
                        >
                            <img src={item.img} alt="Image"/>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default BrandsV2;
