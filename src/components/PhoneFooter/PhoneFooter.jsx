import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthModal from "../../pages/AuthModal";
import styles from "./PhoneFooter.module.scss";
import {HomeIcon} from "../../assets/svg/footer/home-icon";
import {CategoriesIcon} from "../../assets/svg/footer/categories-icon";
import {CartIcon} from "../../assets/svg/footer/cart-icon";
import {FavIcon} from "../../assets/svg/footer/fav-icon";
import {ProfileIcon} from "../../assets/svg/footer/profile-icon";

const PhoneFooter = ({tab}) => {
    const navigate = useNavigate();

    const [openAuth, setOpenAuth] = useState(false);
    const [codeModal, setCodeModal] = useState(false);

    const gender = localStorage.getItem('gender');
    const token = localStorage.getItem('token');

    const onProfileClick = () => {
        if (token) {
            navigate("/profile");
        }

        setOpenAuth(true);
    }

    const iconsData = [
        {
            id: 1,
            tab: 'products',
            Icon: HomeIcon,
            onClick: () => navigate(`/${gender}-products`),
            defaultSrc: "https://storage.yandexcloud.net/pc-mediafiles/test1/icons-onji/footer/home.svg",
            alt: "Главная",
            style: { height: '28px' }
        },
        {
            id: 2,
            tab: 'categories',
            Icon: CategoriesIcon,
            onClick: () => navigate(`/${gender}-categories/`),
            defaultSrc: "https://storage.yandexcloud.net/pc-mediafiles/test1/icons-onji/footer/categories.svg",
            alt: "Каталог",
            style: { height: '28px' }
        },
        {
            id: 3,
            tab: 'cart',
            Icon: CartIcon,
            onClick: () => navigate("/cart"),
            defaultSrc: "https://storage.yandexcloud.net/pc-mediafiles/test1/icons-onji/footer/cart.svg",
            alt: "Корзина",
            style: { height: '28px' }
        },
        {
            id: 4,
            tab: 'favorites',
            Icon: FavIcon,
            onClick: () => navigate("/favorites"),
            defaultSrc: "https://storage.yandexcloud.net/pc-mediafiles/test1/icons-onji/footer/fav.svg",
            alt: "Избранное",
            style: { height: '28px' }
        },
        {
            id: 5,
            tab: 'profile',
            Icon: ProfileIcon,
            onClick: onProfileClick,
            defaultSrc: "https://storage.yandexcloud.net/pc-mediafiles/test1/icons-onji/footer/profile.svg",
            alt: "Профиль",
            style: { height: '28px' }
        }
    ];


    const generateIcons = useCallback(() => {
        return iconsData.map(({ id, tab: tabName, onClick, Icon, alt, style }) => {
            const isActive = tab === tabName;
            return (
                <div className={isActive ? styles.active : ''} onClick={onClick} key={id} style={style}>
                    <Icon />
                </div>
            );
        });
    }, [tab, gender]);

    return (<footer>
        {!token && openAuth &&
            <AuthModal
                open={openAuth}
                setRemotePhone={() => {}}
                setModalOpen={() => setOpenAuth(true)}
                onCancel={() => {
                    setOpenAuth(false); setCodeModal(false)}}
                isCodeModalOpen={codeModal}
                setCodeModalOpen={setCodeModal}
            />
        }
        {generateIcons()}
    </footer>)
}

export default PhoneFooter;