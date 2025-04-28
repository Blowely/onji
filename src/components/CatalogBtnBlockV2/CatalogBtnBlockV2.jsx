import React, { useMemo } from "react";
import styles from "./CatalogBtnBlockV2.module.scss";

const images = ['ONJI', 'ONJI', 'ONJI', 'ONJI', 'ONJI'];

// Функция для перемешивания массива (алгоритм Фишера-Йетса)
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// Функция для создания бесконечной последовательности
const createInfiniteSequence = (baseArray, length) => {
    const shuffled = shuffleArray(baseArray);
    const sequence = [];
    while (sequence.length < length) {
        sequence.push(...shuffled);
    }
    return sequence.slice(0, length);
};

const CatalogBtnBlockV2 = () => {
    // Мемоизируем перемешанные последовательности для каждой линии
    const lines = useMemo(() => {
        return [
            createInfiniteSequence(images, 12),
            createInfiniteSequence(images, 12),
            createInfiniteSequence(images, 12),
            createInfiniteSequence(images, 12)
        ];
    }, []);

    const renderLine = (lineIndex) => {
        const sequence = lines[lineIndex];
        return (
            <>
                {sequence.map((el, index) => (
                    <span
                        key={`original-${lineIndex}-${index}`}
                        className={styles.item}
                    >
                        {el}
                    </span>
                ))}
                {sequence.map((el, index) => (
                    <span
                        key={`original-${lineIndex}-${index}`}
                        className={styles.item}
                    >
                        {el}
                    </span>
                ))}
            </>
        );
    };

    return (
        <div className={styles.catalogBtnBlockWrapper}>
            <div className={styles.topText}>
                <div className={styles.discountBlock}>
                    <div style={{ textAlign: "center"}}>
                        ДАРИМ
                    </div>
                    <div>
                        СКИДКУ 7% <br/>
                        НОВЫМ КЛИЕНТАМ

                    </div>
                </div>
                <div className={styles.discountBlock}>
                    <div className={styles.catalogButton}>
                        В каталог
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                {/* Линия 2 */}
                <div className={styles.lineWrapper}>{renderLine(1)}</div>

                {/* Линия 3 */}
                <div className={styles.lineWrapper}>{renderLine(2)}</div>

                {/* Линия 4 */}
                <div className={styles.lineWrapper}>{renderLine(3)}</div>

                <div className={styles.centerBlock}>
                    <img src="https://storage.yandexcloud.net/pc-mediafiles/test1/banners/basketMan.webp" alt=""/>
                </div>
            </div>
        </div>
    );
};

export default CatalogBtnBlockV2;