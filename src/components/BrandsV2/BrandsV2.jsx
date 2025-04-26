import { Col, Image, Row, Typography } from "antd";
import React, {useState} from "react";
import styles from "./BrandsV2.module.scss";
import adidas from "../../assets/Adidas.png";
import {ArrowLeftIcon} from "../../assets/svg/v2/ArrowLeftIcon";
import {ArrowRightIcon} from "../../assets/svg/v2/ArrowRightIcon";
import {useNavigate} from "react-router-dom";

const { Title } = Typography;

const items = [
    { img: adidas, title: "Nike", filter: "contrast(0.9)" },
    { img: adidas, title: "Adidas", filter: "brightness(0.5)" },
    { img: adidas, title: "New balance", filter: "invert(1)" }
]

const BrandsV2 = () => {
    const navigate = useNavigate();
    const [itemsIndex, setItemsIndex] = useState(0);
    const [transitioning, setTransitioning] = useState(false);

    const onNext = () => {
        if (itemsIndex < items.length - 1) {
            setTransitioning(true);
            setItemsIndex(prev => prev + 1);
            setTimeout(() => setTransitioning(false), 450);
        }
    };

    const onPrev = () => {
        if (itemsIndex > 0) {
            setTransitioning(true);
            setItemsIndex(prev => prev - 1);
            setTimeout(() => setTransitioning(false), 450);
        }
    };

    return (
        <div>
            <Row align="middle" className={styles.brandsBlockTitleWrapper}>
                <Col className={styles.titleContainer}>
                    <div className={styles.titleText}>бренды</div>
                </Col>
                <Col className={styles.controlsContainer}>
                    <Row align="middle" justify="end">
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
                                className={itemsIndex === items.length - 1 ? styles.arrowInactiveContainer : styles.arrowActiveContainer}
                                onClick={onNext}
                            >
                                <ArrowRightIcon/>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <div
                className={styles.sliderWrapper}
            >
                <div
                    className={styles.brandsWrapper}
                    style={{
                        width: `${items.length * 100}%`,
                        transform: `translateX(-${itemsIndex * (100 / items.length)}%)`,
                        transition: 'transform 0.45s ease-in-out'
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={styles.item}
                            style={{
                                filter: item.filter,
                                width: `${100 / items.length}%`,
                                flexBasis: `${100 / items.length}%`
                            }}
                            onClick={() => navigate(`?spuId=${item.spuId}`)}
                        >
                            <img src={item.img} alt={item.title}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandsV2;