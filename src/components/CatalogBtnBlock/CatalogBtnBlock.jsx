import React, { useMemo } from "react";
import styles from "./CatalogBtnBlock.module.scss";

import {PRODUCTS_IMG} from "../constants";

const images = [PRODUCTS_IMG.p1, PRODUCTS_IMG.p2, PRODUCTS_IMG.p3, PRODUCTS_IMG.p4, PRODUCTS_IMG.p5];

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

const CatalogBtnBlock = () => {
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
                {sequence.map((img, index) => (
                    <img
                        key={`original-${lineIndex}-${index}`}
                        src={img}
                        alt="promo item"
                        className={styles.item}
                    />
                ))}
                {sequence.map((img, index) => (
                    <img
                        key={`duplicate-${lineIndex}-${index}`}
                        src={img}
                        alt="promo item"
                        className={styles.item}
                    />
                ))}
            </>
        );
    };

    return (
        <div className={styles.catalogBtnBlockWrapper}>
            <div className={styles.container}>
                {/* Линия 1 */}
                <div className={styles.lineWrapper}>{renderLine(0)}</div>

                {/* Линия 2 */}
                <div className={styles.lineWrapper}>{renderLine(1)}</div>

                {/* Линия 3 */}
                <div className={styles.lineWrapper}>{renderLine(2)}</div>

                {/* Линия 4 */}
                <div className={styles.lineWrapper}>{renderLine(3)}</div>

                <div className={styles.centerBlock}>
                    <div className={styles.textBlock}>
                        <div className={styles.text}>
                            ОДЕЖДА<br />И ОБУВЬ ЛЮБИМЫХ БРЕНДОВ<br />В ОДНОМ МАГАЗИНЕ
                        </div>
                        <div className={styles.onji}>ONJI</div>
                        <div className={styles.catalogButton}><span>ПЕРЕЙТИ В КАТАЛОГ</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogBtnBlock;