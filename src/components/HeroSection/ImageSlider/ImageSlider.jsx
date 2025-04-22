import React from 'react';
import { Carousel } from 'antd';
import './ImageSlider.scss';

const ImageSlider = ({onSlideChange}) => {
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

    return (
        <div className="beeon-slider">
            <Carousel
                autoplay={{ dotDuration: true }}
                autoplaySpeed={3000}
                afterChange={onSlideChange}
                adaptiveHeight={true}
                infinite={true}
                effect="fade"
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
        </div>
    );
};

export default ImageSlider;