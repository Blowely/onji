// RotatingImageCircle.jsx
import React, { useEffect, useState } from 'react';
import styles from './RotatingImageCircle.module.scss';

const RotatingImageCircle = ({
                                 src = 'https://storage.yandexcloud.net/pc-mediafiles/test1/icons-onji/bests-category.png',
                                 left = '50%',
                                 duration = 20, // длительность одного полного оборота в секундах
                                 onClick = () => {}
                             }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // Размер контейнера под изображение
    const size = isMobile ? 200 : '100%';

    return (
        <div
            className={styles.wrapper}
            style={{ width: size, height: size }}
            onClick={onClick}
        >
            <div
                className={styles.circle}
                style={{
                    animationDuration: `${duration}s`,
                    left: isMobile ? left : '50%'
                }}
            >
                <img src={src} alt="" className={styles.image} />
            </div>
        </div>
    );
};

export default RotatingImageCircle;
