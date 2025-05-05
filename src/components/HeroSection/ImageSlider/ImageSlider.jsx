import React, { useEffect, useRef } from 'react';
import { Carousel } from 'antd';
import styles from './ImageSlider.module.scss';
import './ImageSlider.scss';


const ImageSlider = ({ onSlideChange, selectedCategory }) => {
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

    return (
        <div className="beeon-slider">
            {!selectedCategory
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
                : <div className="slide slide3">
                    <div className={styles.itemsWrapper}>
                        <div className={styles.breadcrumbs}>Повседневная одежда</div>
                        <div className={styles.title}>Повседневная одежда</div>
                    </div>
                </div>
            }

        </div>
    );
};

export default ImageSlider;