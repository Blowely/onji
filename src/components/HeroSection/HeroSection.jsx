import React, { useState } from 'react';
import { Menu } from 'antd';
import styles from './HeroLandingSection.module.scss';
import searchSvg from '../../assets/svg/v2/search.svg';
import favSvg from '../../assets/svg/v2/fav.svg';
import profileSvg from '../../assets/svg/v2/profile.svg';
import cartSvg from '../../assets/svg/v2/cart.svg';
import { useNavigate } from "react-router-dom";
import CategoryTable from "../CategoryTable/CategoryTable";
import ImageSlider from "./ImageSlider/ImageSlider";

const HeroSection = () => {
    const navigate = useNavigate();
    const gender = localStorage.getItem("gender") || "men";
    const [showCategories, setShowCategories] = useState(false);
    const [navTextColor, setNavTextColor] = useState('#ffffff');

    const onNavItemClick = (url) => {
        navigate(`/${url}`);
    }

    const handleMenuHover = (isHovering) => {
        setShowCategories(isHovering);
    }

    const handleSlideChange = (currentSlide) => {
        const newColor = currentSlide === 0 ? '#000000' : '#ffffff';
        setNavTextColor(newColor);
    }

    // Определяем окончательный цвет текста
    const getFinalTextColor = () => {
        return showCategories ? '#000000' : navTextColor;
    }

    const finalTextColor = getFinalTextColor();

    return (
        <div className={styles.heroContainer}>
            <div className={styles.navbar} style={{
                background: showCategories ? 'white' : 'transparent',
                color: finalTextColor,
                transition: 'all 0.3s ease'
            }}>
                <div className={styles.logo} onClick={() => onNavItemClick(`${gender}-products`)}>ONJI</div>
                <Menu
                    mode="horizontal"
                    className={styles.menu}
                    style={{ color: 'inherit' }}
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
                            filter: finalTextColor === '#000000' ? 'invert(0)' : 'invert(1)',
                            transition: 'filter 0.1s ease'
                        }}
                        onClick={() => onNavItemClick('search')}
                        alt=""
                    />
                    <img
                        src={favSvg}
                        style={{
                            filter: finalTextColor === '#000000' ? 'invert(0)' : 'invert(1)',
                            transition: 'filter 0.1s ease'
                        }}
                        onClick={() => onNavItemClick('favorites')}
                        alt=""
                    />
                    <img
                        src={profileSvg}
                        style={{
                            filter: finalTextColor === '#000000' ? 'invert(0)' : 'invert(1)',
                            transition: 'filter 0.1s ease'
                        }}
                        onClick={() => onNavItemClick('profile')}
                        alt=""
                    />
                    <img
                        src={cartSvg}
                        style={{
                            filter: finalTextColor === '#000000' ? 'invert(0)' : 'invert(1)',
                            transition: 'filter 0.1s ease'
                        }}
                        onClick={() => onNavItemClick('cart')}
                        alt=""
                    />
                </div>
            </div>
            <ImageSlider onSlideChange={handleSlideChange} />
            <div
                className={styles.categoryTableWrapper}
                style={{
                    opacity: showCategories ? '1' : '0',
                    pointerEvents: showCategories ? 'auto' : 'none',
                    transition: 'opacity 0.3s ease'
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