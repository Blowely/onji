import RePoizonMainBigLogo from "../../assets/svg/re-poizon-main-middle-big-logo";
import RePoizonMainMiddleLogo from "../../assets/svg/re-poizon-main-middle-logo";
import GenderSwitcher from "../GenderSwitcher/GenderSwitcher";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthModal from "../../pages/AuthModal";

const MainLogoComponent = ({setOffset, setLoading, style}) => {
    const navigate = useNavigate();

    const [openAuth, setOpenAuth] = useState(false);
    const [codeModal, setCodeModal] = useState(false);

    const token = localStorage.getItem("token");
    const isDesktopScreen = window?.innerWidth > 768;


    const onProfileClick = () => {
        if (token) {
            navigate("/profile");
        }

        setOpenAuth(true);
    }

    const onInfoBlockItemClick = (link) => {
        window.open(link);
    }

    const val11 = "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/5.%D0%9F%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C.png"
    const val12 = "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/profile-black.png"

    const val21 = "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/4.%D0%98%D0%B7%D0%B1%D1%80%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5.png"
    const val22 = "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/fav-black.png"

    const val31 = "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/3.%D0%9A%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D0%B0.png"
    const val32 = "https://storage.yandexcloud.net/pc-mediafiles/icons/v2/cart-black.png"

    const [profileIcon, setProfileIcon] = useState(val11)
    const [favIcon, setFavIcon] = useState(val21)
    const [cartIcon, setCartIcon] = useState(val31)

    const onMouseOver = (setIcon, val) => {
        setIcon(val);
    }

    const onMouseLeave = (setIcon, val) => {
        setIcon(val);
    }

    return (<>
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
        {isDesktopScreen && <div className="info-block-wrapper" style={style}>
            <div className="info-block">
                <div>
                    <span onClick={() => onInfoBlockItemClick("https://t.me/re_poizon_ru")}>
                        <img src="/src/assets/svg/telegram-icon.svg" alt="Telegram"/>Мы в телеграм
                    </span>
                    <span onClick={() => onInfoBlockItemClick("https://t.me/repoizon_otzovik")}>Отзывы</span>
                    <span onClick={() => onInfoBlockItemClick("https://storage.yandexcloud.net/pc-mediafiles/important/public-offer-re-poizon.pdf")}>
                        Оферта
                    </span>
                </div>
                <div>
                    <span onClick={() => onInfoBlockItemClick("tg://resolve?domain=re_poizon_store")}>Поддержка</span>
                    <span>repoizonstore@gmail.com</span>
                </div>
            </div>
        </div>}
    </>
    )
}

export default MainLogoComponent;