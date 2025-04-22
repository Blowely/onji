import React from 'react';
import { Typography, Menu } from 'antd';
import styles from './HeroLandingSection.module.scss';
import searchSvg from '../../assets/svg/v2/search.svg';
import favSvg from '../../assets/svg/v2/fav.svg';
import profileSvg from '../../assets/svg/v2/profile.svg';
import cartSvg from '../../assets/svg/v2/cart.svg';
import {useNavigate} from "react-router-dom";

const HeroSection = () => {
    const navigate = useNavigate();
    const gender = localStorage.getItem("gender") || "men";

    const onNavItemClick = (url) => {
        navigate(`/${url}`);
    }

    return (
        <div className={styles.heroContainer}>
            <div className={styles.navbar}>
                <div className={styles.logo} onClick={() => onNavItemClick(`${gender}-products`)}>ONJI</div>
                <Menu mode="horizontal" className={styles.menu}>
                    <Menu.Item key="new" onClick={() => onNavItemClick(`new-products`)}>новинки</Menu.Item>
                    <Menu.Item key="men" onClick={() => onNavItemClick(`men-products`)}>мужчинам</Menu.Item>
                    <Menu.Item key="women" onClick={() => onNavItemClick(`women-products`)}>женщинам</Menu.Item>
                    <Menu.Item key="brands" onClick={() => onNavItemClick(`brands`)}>бренды</Menu.Item>
                    <Menu.Item key="beauty" onClick={() => onNavItemClick(`beauty`)}>красота</Menu.Item>
                </Menu>
                <div className={styles.icons}>
                    <img src={searchSvg} onClick={() => onNavItemClick('search')} alt=""/>
                    <img src={favSvg} onClick={() => onNavItemClick('favorites')} alt=""/>
                    <img src={profileSvg} onClick={() => onNavItemClick('profile')} alt=""/>
                    <img src={cartSvg} onClick={() => onNavItemClick('cart')} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;

