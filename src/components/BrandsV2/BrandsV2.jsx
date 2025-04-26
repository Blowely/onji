import { Col, Row } from "antd";
import React, { useState } from "react";
import styles from "./BrandsV2.module.scss";
import { ArrowLeftIcon } from "../../assets/svg/v2/ArrowLeftIcon";
import { ArrowRightIcon } from "../../assets/svg/v2/ArrowRightIcon";
import { useNavigate } from "react-router-dom";
import adidas from "../../assets/Adidas.png";

const items = [
    { img: adidas, title: "Nike", filter: "contrast(0.9)", spuId: 1 },
    { img: adidas, title: "Adidas", filter: "brightness(0.5)", spuId: 2 },
    { img: adidas, title: "New balance", filter: "invert(1)", spuId: 3 }
];

const BrandsV2 = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(1);
    const [transitioning, setTransitioning] = useState(false);

    const handleSlide = (newIndex) => {
        if (newIndex < 0 || newIndex >= items.length || transitioning) return;

        setTransitioning(true);
        setCurrentIndex(newIndex);
        setTimeout(() => setTransitioning(false), 500);
    };

    return (
        <div className={styles.container}>
            <Row align="middle" className={styles.header}>
                <Col span={24} className={styles.title}>БРЕНДЫ</Col>
                <Col className={styles.controls}>
                    <div
                        onClick={() => handleSlide(currentIndex - 1)}
                        className={currentIndex === 0 ? styles.disabled : ""}
                    >
                        <ArrowLeftIcon />
                    </div>
                    <div
                        onClick={() => handleSlide(currentIndex + 1)}
                        className={currentIndex === items.length - 1 ? styles.disabled : ""}
                    >
                        <ArrowRightIcon />
                    </div>
                </Col>
            </Row>

            <div className={styles.sliderWrapper}>
                <div
                    className={styles.sliderTrack}
                    style={{
                        transform: `translateX(-${currentIndex * (100 / items.length)}%)`,
                        transition: transitioning ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                        width: `${items.length * 100}%`
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={styles.slide}
                            style={{
                                width: `${100 / items.length}%`,
                                filter: item.filter,
                                transform: `scale(${index === currentIndex ? 1: 0.8})`,
                                objectFit: 'contain',
                            }}
                            onClick={() => navigate(`?spuId=${item.spuId}`)}
                        >
                            <img src={item.img} alt={item.title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandsV2;