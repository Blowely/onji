// RotatingTextCircle.jsx
import React, { useEffect, useState } from 'react';
import styles from './RotatingTextCircle.module.scss';

const RotatingTextCircle = ({
                                content = 'хиты продаж',
                                count = [3,4],
                                left = "calc(50% + 13px)"
}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Обновляем isMobile при ресайзе
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const text = `${content} `;
    const config = {
        baseSize: isMobile ? 200 : 300,
        fontSize: isMobile ? 18 : 20,
        letterSpacing: isMobile ? 1.2 : 2.5,
        dotSize: isMobile ? 8 : 12,
        textRepeats: isMobile ? count[0] : count[1]
    };

    const letters = text.repeat(config.textRepeats).split('');

    return (
        <div
            className={styles.circleWrapper}
            style={{ height: `${config.baseSize}px` }}
        >
            <div className={styles.circleContainer}>
                <div
                    className={styles.circle}
                    style={{
                        width: `${config.baseSize}px`,
                        height: `${config.baseSize}px`,
                        left: isMobile && left,
                    }}
                >
                    {letters.map((letter, index) => {
                        const angle = (360 / letters.length) * index;
                        return (
                            <span
                                key={index}
                                className={styles.letter}
                                style={{
                                    transform: `rotate(${angle}deg) translate3d(${config.baseSize / 2 - 20}px, 0, 0) rotate(90deg)`,
                                    fontSize: `${config.fontSize}px`,
                                    letterSpacing: `${config.letterSpacing}px`
                                }}
                            >
                {letter}
              </span>
                        );
                    })}
                </div>
                <div
                    className={styles.centerDot}
                    style={{
                        width: `${config.dotSize}px`,
                        height: `${config.dotSize}px`,
                        left: isMobile && left,
                    }}
                />
            </div>
        </div>
    );
};

export default RotatingTextCircle;
