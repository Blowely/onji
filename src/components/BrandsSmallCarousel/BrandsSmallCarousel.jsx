import React from "react";
import styles from "./BrandsSmallCarousel.module.scss";

export default function BrandsSmallCarousel() {
    // Создаем массив брендов (в реальном приложении замените на ваши данные)
    const brands = [
        "https://storage.yandexcloud.net/pc-mediafiles/test1/banners/brands-small-carousel.png",
        "https://storage.yandexcloud.net/pc-mediafiles/test1/banners/brands-small-carousel.png",
        "https://storage.yandexcloud.net/pc-mediafiles/test1/banners/brands-small-carousel.png",
    ];

    // Дублируем массив для бесшовной анимации
    const duplicatedBrands = [...brands, ...brands];

    return (
        <div className={styles.carousel}>
            <div className={styles.scroller}>
                <div className={styles.track}>
                    {duplicatedBrands.map((brand, index) => (
                        <img
                            key={index}
                            src={brand}
                            alt="brand logo"
                            className={styles.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}