import {useNavigate, useSearchParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import './header.styles.scss';
import axios from "axios";
import {useAppDispatch} from "../../store";
import {showSidebar} from "../../common/productsSlice";
import SearchOverlay from "../SearchOverlay/SearchOverlay";

const defaultOptions = [
    { value: 'Куртка' },
    { value: 'Джинсы' },
    { value: 'Бутсы' },
];

const Header = (props) => {
    const {
        search,
        setShowFilters = () => {},
        setOffset = () => {},
        setLoading = () => {},
        style,
        overlayVisible,
        setOverlayVisible,
    } = props;

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const token = localStorage.getItem('token');
    const spuId = localStorage.getItem('spuId');
    const gender = localStorage.getItem("gender") || "men";

    const [searchValue, setSearchValue] = useState('');
    const [options, setOptions] = useState(defaultOptions || []);
    const [isVisible, setIsVisible] = useState(true);

    const [recent, setRecent] = useState(['adidas ozweego', 'джорданы', 'худи', 'рубашка']);

    const lastScrollY = useRef(0);

    const inputRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        if (!search) {
            setSearchValue('');
        }
        setSearchValue(search?.replace('+',' '));
    },[search])

    /*useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const isMobile = window.innerWidth <= 768;

            if (!isMobile) {
                setIsVisible(true); // всегда показываем на десктопе
                return;
            }

            if (currentScrollY === 0) {
                setIsVisible(false); // в самом верху — скрыт
            } else {
                setIsVisible(true); // скролл вверх — показать
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);*/

    const onChange = async (value) => {
        if (search && !value) {
            window.scrollTo({top: 0})
            searchParams.delete('search');
            setSearchParams(searchParams);
        }

        setSearchValue(value);
        onSearch(value);
        setLoading(true);

        //axios.get(`https://api.re-poizon.ru/api/synonyms?search=${value}`)
        //const res = await axios.get(`http://localhost:3001/api/synonyms?search=${value}`)
        const res = await axios.get(`https://api.re-poizon.ru/api/synonyms?search=${value}`)

        const result = res.data.suggested?.map((el, i) => ({value: el.value, key: i}));
        setOptions(result);
    }

    const onSearch = (value) => {
        if (!value) {
            return;
        }

        window.scrollTo({top: 0})
        setSearchParams(new URLSearchParams({ search: typeof value === "string" ? value : searchValue }));
        setOffset(1);
    }

    const isDesktopScreen = window?.innerWidth > 768;

    const onCategoriesClick = () => {
        dispatch(showSidebar());
        //navigate(`/${gender}-categories/`)
    }


    const onSelectHandler = (value) => {
        inputRef?.current?.blur()
        onSearch(value);
    }

    const onProfileClick = () => {
        if (token) {
            navigate("/profile");
        }

        //setOpenAuth(true);
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

    const onMouseOverHeaderItem = (setIcon, val) => {
        setIcon(val);
    }

    const onMouseLeaveHeaderItem = (setIcon, val) => {
        setIcon(val);
    }

    const onInfoBlockItemClick = (link) => {
        window.open(link);
    }

    return (
        <header
            className={`header-wrapper ${isVisible ? 'visible' : 'hidden'} d-flex flex-column justify-between align-center pl-20 pt-20 pr-20`}
            style={{...style, height: overlayVisible && '100%'}}
        >
            <div className="header-input-wrapper">
                {/*<AutoComplete
                    style={{width: '100%', height: 'auto'}}
                    options={options}
                    value={search}
                    optionRender={(option) => {
                        return <div key={option.key}><img style={{height: '11px'}} src={tinySearchSvg} alt={'+'}/>{option.value}
                        </div>
                    }}
                    onChange={onChange}
                    onPressEnter={onSearch}
                    onSelect={onSelectHandler}
                />*/}
                {/*<Input
                    type="search"
                    className="input-search"
                    size="large"
                    placeholder="поиск"
                    suffix={<div>
                        <img className="search-icon" src={tinySearchSvg} alt="search"/>
                    </div>}
                    ref={inputRef}
                    allowClear
                    onMouseDown={(e) => {
                        e.preventDefault();
                    }}
                />*/}
                {!isDesktopScreen &&
                    <SearchOverlay
                        visible={overlayVisible}
                        onClose={() => setOverlayVisible(false)}
                        setOverlayVisible={setOverlayVisible}
                        recentSearches={recent}
                        onSelect={onSelectHandler}
                    />
                }
                {isDesktopScreen &&
                    <div className="items-wrapper">
                        <div className="item"
                             onClick={onProfileClick}
                             onMouseOver={() => onMouseOverHeaderItem(setProfileIcon, val12)}
                             onMouseLeave={() => onMouseLeaveHeaderItem(setProfileIcon, val11)}
                        >
                            <img style={{height: '23px'}}
                                 src={profileIcon}
                                 alt=""/>
                            Профиль
                        </div>
                        <div className="item"
                             onClick={() => navigate("/favorites")}
                             onMouseOver={() => onMouseOverHeaderItem(setFavIcon, val22)}
                             onMouseLeave={() => onMouseLeaveHeaderItem(setFavIcon, val21)}
                        >
                            <img style={{height: '23px'}}
                                 src={favIcon}
                                 alt=""/>
                            Избранное
                        </div>
                        <div className="item"
                             onClick={() => navigate("/cart")}
                             onMouseOver={() => onMouseOverHeaderItem(setCartIcon, val32)}
                             onMouseLeave={() => onMouseLeaveHeaderItem(setCartIcon, val31)}
                        >
                            <img style={{height: '23px'}}
                                 src={cartIcon}
                                 alt=""/>
                            Корзина
                        </div>
                    </div>
                }
            </div>
        </header>
    );
}
export default Header;
