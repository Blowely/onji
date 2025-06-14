import React, { useEffect, useRef } from 'react';
import { Carousel } from 'antd';
import styles from './ImageSlider.module.scss';
import './ImageSlider.scss';
import {CATEGORIES} from "../../constants";
import LeftArrow from "../../../assets/svg/v2/left-arrow.svg?react";
import {goBack} from "../../../common/utils";


const ImageSlider = ({ onSlideChange, search, selectedCategory, categoryName }) => {
    const carouselRef = useRef(null);
    const slides = [
        {
            id: 1,
            title: "BEEON",
            subtitle: "",
            textColor: "#000000",
            slide: 'slide1',
        },
        {
            id: 2,
            title: "CLOUD",
            subtitle: "NINE",
            textColor: "#ffffff",
            slide: 'slide2'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current) {
                carouselRef.current.next(); // Переключение на следующий слайд
            }
        }, 5000); // Интервал 5 секунд

        return () => clearInterval(interval); // Очистка интервала при размонтировании
    }, []);

    const getCategoryTitle = () => {
        if (!selectedCategory) {
            return '';
        }

        const index = CATEGORIES.findIndex((el) => el.id === Number(selectedCategory));

        return <span style={{cursor: "pointer"}}>{CATEGORIES[index]?.name
            || categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
            || ''}</span> ;
    }

    const isDesktop = window?.innerWidth > 768;
    const isWebView = navigator.userAgent.includes('OnjiApp');

    return (
        <div className="beeon-slider">
            {(!selectedCategory && !search)
                ? <Carousel
                    ref={carouselRef}
                    autoplay={false} // Отключаем встроенный autoplay
                    beforeChange={onSlideChange}
                    adaptiveHeight={true}
                    infinite={true}
                    effect="scrollx"
                    dotPosition="bottom"
                    draggable
                >
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            className={`slide ${slide.slide}`}
                        >
                        </div>
                    ))}
                </Carousel>
                : selectedCategory ? (
                        <Carousel
                            ref={carouselRef}
                            autoplay={false} // Отключаем встроенный autoplay
                            beforeChange={onSlideChange}
                            adaptiveHeight={true}
                            infinite={true}
                            effect="scrollx"
                            swipe={false}
                            dotPosition="bottom"
                            dots={false}
                            draggable
                        >
                            <div
                                className={`slide slide3`}
                            >
                                {!isDesktop && (
                                    <div className={styles.backIconWrapper}>
                                        <LeftArrow onClick={goBack} alt='backButton' className={styles.backIcon}/>
                                    </div>

                                )}
                                <div className={styles.itemsWrapper}>

                                    {isDesktop &&
                                        <div className={styles.breadcrumbs}>главная / одежда / повседневная одежда</div>}
                                    <div className={styles.title}>{getCategoryTitle()}</div>
                                </div>
                            </div>
                        </Carousel>

                ) : <div className="slide">
                    {!isDesktop && (
                        <div className={styles.backIconWrapper}>
                            <LeftArrow style={{color: 'black'}} onClick={goBack} alt='backButton' className={styles.backIcon}/>
                        </div>

                    )}
                    <div className={styles.itemsWrapper}>

                        {isDesktop && <div className={styles.breadcrumbs}>главная / одежда / повседневная одежда</div>}
                        <div className={styles.title} style={{color:'black'}}>{search}</div>
                    </div>
                </div>
            }

        </div>
    );
};

export default ImageSlider;