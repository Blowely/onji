import React, {useState, useEffect, useRef} from 'react'; // Добавлен useEffect
import { Menu } from 'antd';
import styles from './HeroLandingSection.module.scss';
import searchSvg from '../../assets/svg/v2/search.svg';
import favSvg from '../../assets/svg/v2/fav.svg';
import profileSvg from '../../assets/svg/v2/profile.svg';
import cartSvg from '../../assets/svg/v2/cart.svg';
import { useNavigate } from "react-router-dom";
import CategoryTable from "../CategoryTable/CategoryTable";
import ImageSlider from "./ImageSlider/ImageSlider";
import CatalogControls from "./CatalogControls/CatalogControls";

const HeroSection = () => {
    const navigate = useNavigate();
    const gender = localStorage.getItem("gender") || "men";
    const [showCategories, setShowCategories] = useState(false);
    const [navTextColor, setNavTextColor] = useState('#000000');
    const [isScrolled, setIsScrolled] = useState(false); // Новое состояние для скролла
    const [isScrolledToTop, setIsScrolledToTop] = useState(false); // Новое состояние для скролла
    const scrolledValRef = useRef(null);

    // Обработчик скролла
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            setIsScrolled(scrollTop > 10); // Меняем фон, если прокрутка > 10px

            if (scrollTop < scrolledValRef.current) {
                setIsScrolledToTop(true);
            } else {
                setIsScrolledToTop(false);
            }
            scrolledValRef.current = scrollTop
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const onNavItemClick = (url) => {
        navigate(`/${url}`);
    };

    const handleMenuHover = (isHovering) => {
        setShowCategories(isHovering);
    };

    const handleSlideChange = (_, nextSlide) => {
        const newColor = nextSlide === 0 ? '#000000' : '#ffffff';
        setNavTextColor(newColor);
    };

    // Определяем окончательный цвет текста и фона
    const getFinalStyles = () => {
        const background = showCategories || isScrolled ? 'white' : 'transparent';
        const textColor = showCategories || isScrolled ? '#000000' : navTextColor;
        const borderColor = showCategories || navTextColor === "#000000" || isScrolled
            ? 'rgba(0, 0, 0, 0.2)'
            : 'rgba(255, 255, 255, 0.2)';

        return { background, textColor, borderColor };
    };

    const { background, textColor, borderColor } = getFinalStyles();

    return (
        <div className={styles.heroContainer}>
            <div
                className={styles.navbar}
                style={{
                    background,
                    color: textColor,
                    borderBottom: `1px solid ${borderColor}`,
                    height: isScrolled && '59px'
                }}
            >
                <div className={styles.logo} onClick={() => onNavItemClick(`${gender}-products`)}>ONJI</div>
                <Menu
                    mode="horizontal"
                    className={styles.menu}
                    style={{
                        color: 'inherit',
                        height: isScrolled && '59px',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={() => handleMenuHover(true)}
                    onMouseLeave={() => handleMenuHover(false)}
                >
                    <Menu.Item key="new" style={{ color: 'inherit' }} onClick={() => onNavItemClick(`new-products`)}>новинки</Menu.Item>
                    <Menu.Item key="men" style={{ color: 'inherit' }} onClick={() => onNavItemClick(`men-products`)}>мужчинам</Menu.Item>
                    <Menu.Item key="women" style={{ color: 'inherit' }} onClick={() => onNavItemClick(`women-products`)}>женщинам</Menu.Item>
                    <Menu.Item key="brands" style={{ color: 'inherit' }} onClick={() => onNavItemClick(`brands`)}>бренды</Menu.Item>
                    <Menu.Item key="beauty" style={{ color: 'inherit' }} onClick={() => onNavItemClick(`beauty`)}>красота</Menu.Item>
                </Menu>
                <div className={styles.icons}>
                    <img
                        src={searchSvg}
                        style={{
                            filter: textColor === '#000000' ? 'invert(0)' : 'invert(1)',
                            transition: 'filter 0.1s ease'
                        }}
                        onClick={() => onNavItemClick('search')}
                        alt=""
                    />
                    <img
                        src={favSvg}
                        style={{
                            filter: textColor === '#000000' ? 'invert(0)' : 'invert(1)',
                            transition: 'filter 0.1s ease'
                        }}
                        onClick={() => onNavItemClick('favorites')}
                        alt=""
                    />
                    <img
                        src={profileSvg}
                        style={{
                            filter: textColor === '#000000' ? 'invert(0)' : 'invert(1)',
                            transition: 'filter 0.1s ease'
                        }}
                        onClick={() => onNavItemClick('profile')}
                        alt=""
                    />
                    <img
                        src={cartSvg}
                        style={{
                            filter: textColor === '#000000' ? 'invert(0)' : 'invert(1)',
                            transition: 'filter 0.1s ease'
                        }}
                        onClick={() => onNavItemClick('cart')}
                        alt=""
                    />
                </div>
            </div>
            <ImageSlider onSlideChange={handleSlideChange} />
            {/*<div
                className={styles.categoryTableWrapper}
                style={{
                    opacity: isScrolledToTop ? '1' : '0',
                    transition: 'all 0.3s ease',
                    marginTop: isScrolledToTop && '59px',
                    borderBottom: `1px solid ${borderColor}`,
                }}
            >
                <CatalogControls />
            </div>*/}

            <div
                className={styles.categoryTableWrapper}
                style={{
                    opacity: showCategories ? '1' : '0',
                    pointerEvents: showCategories ? 'auto' : 'none',
                    transition: 'all 0.3s ease',
                    marginTop: isScrolled && '59px'
                }}
                onMouseEnter={() => showCategories && handleMenuHover(true)}
                onMouseLeave={() => handleMenuHover(false)}
            >
                <CategoryTable/>
            </div>
        </div>
    );
};

export default HeroSection;