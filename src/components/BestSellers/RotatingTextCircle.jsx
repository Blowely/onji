import React from 'react';
import styles from './RotatingTextCircle.module.scss';

const RotatingTextCircle = () => {
    const isMobile = window?.innerWidth < 768;
    const text = 'хиты продаж ';

    const config = {
        baseSize: isMobile ? 200 : 300,
        fontSize: isMobile ? 18 : 20,
        letterSpacing: isMobile ? 1.2 : 2.5,
        dotSize: isMobile ? 8 : 12,
        textRepeats: isMobile ? 3 : 4
    };

    const letters = text.repeat(config.textRepeats).split('');

    return (
        <div className={styles.circleWrapper} style={{ height: `${config.baseSize}px` }}>
            <div className={styles.circleContainer}>
                <div className={styles.circle}>
                    {letters.map((letter, index) => {
                        const angle = (360 / letters.length) * index;
                        return (
                            <span
                                key={index}
                                className={styles.letter}
                                style={{
                                    transform: `rotate(${angle}deg) translate(${config.baseSize/2 - 20}px) rotate(90deg)`,
                                    fontSize: `${config.fontSize}px`,
                                    letterSpacing: `${config.letterSpacing}px`
                                }}
                            >
                                {letter}
                            </span>
                        );
                    })}
                </div>
                <div className={styles.centerDot} style={{
                    width: `${config.dotSize}px`,
                    height: `${config.dotSize}px`
                }}></div>
            </div>
        </div>
    );
};

export default RotatingTextCircle;