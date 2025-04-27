import React from 'react';
import styles from './RotatingTextCircle.module.scss';

const RotatingTextCircle = () => {
    const text = 'хиты продаж ';
    const letters = text.repeat(4).split('');

    return (
        <div className={styles.circleContainer}>
            <div className={styles.circle}>
                {letters.map((letter, index) => {
                    const angle = (360 / letters.length) * index;
                    return (
                        <span
                            key={index}
                            className={styles.letter}
                            style={{
                                transform: `rotate(${angle}deg) translate(120px) rotate(${90}deg)`,
                            }}
                        >
              {letter}
            </span>
                    );
                })}
            </div>
            <div className={styles.centerDot}></div>
        </div>
    );
};

export default RotatingTextCircle;
