import { Col, Row } from "antd";
import React, { useState, useEffect } from "react";
import styles from "./BrandsV2.module.scss";
import { ArrowLeftIcon } from "../../assets/svg/v2/ArrowLeftIcon";
import { ArrowRightIcon } from "../../assets/svg/v2/ArrowRightIcon";
import { useNavigate } from "react-router-dom";
import adidas from "../../assets/Adidas.png";

const originalItems = [
    { img: adidas, title: "Nike", filter: "contrast(0.9)", spuId: 1 },
    { img: adidas, title: "Adidas", filter: "brightness(0.5)", spuId: 2 },
    { img: adidas, title: "New balance", filter: "invert(1)", spuId: 3 }
];

const BrandsV2 = () => {
    const navigate = useNavigate();
    const [items] = useState([...originalItems, ...originalItems, ...originalItems]);
    const [currentIndex, setCurrentIndex] = useState(originalItems.length);
    const [transitioning, setTransitioning] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setTransitioning(false), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleSlide = (direction) => {
        if (transitioning) return;

        setTransitioning(true);
        const newIndex = currentIndex + direction;

        setCurrentIndex(newIndex);

        setTimeout(() => {
            if (newIndex >= originalItems.length * 2) {
                setCurrentIndex(originalItems.length);
            } else if (newIndex < originalItems.length) {
                setCurrentIndex(originalItems.length * 2 - 1);
            }
            setTransitioning(false);
        }, 500);
    };

    const getVisibleIndex = (index) => {
        return ((index - originalItems.length) % originalItems.length + originalItems.length) % originalItems.length;
    };

    return (
        <div className={styles.container}>
            <Row align="middle" className={styles.header}>
                <Col span={24} className={styles.title}>БРЕНДЫ</Col>
                <Col className={styles.controls}>
                    <div onClick={() => handleSlide(-1)}>
                        <ArrowLeftIcon />
                    </div>
                    <div onClick={() => handleSlide(1)}>
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
                    {items.map((item, index) => {
                        const visibleIndex = getVisibleIndex(index);
                        return (
                            <div
                                key={`${visibleIndex}-${index}`}
                                className={styles.slide}
                                style={{
                                    width: `${100 / items.length}%`,
                                    filter: originalItems[visibleIndex].filter,
                                }}
                                onClick={() => navigate(`?spuId=${originalItems[visibleIndex].spuId}`)}
                            >
                                <img src={originalItems[visibleIndex].img} alt={originalItems[visibleIndex].title} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BrandsV2;