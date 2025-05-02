import React, {useEffect, useRef, useState} from "react";

import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import IconHeartSmall from "../../assets/svg/iconHeartSmall";

function Card({
  image,
  price,
  name,
  item,
  key,
  index,
  onPointerDown= () => {},
  onPointerUp = () => {},
  onTouchStart = () => {},
  onTouchEnd = () => {},
}) {

  const [loadingImg, setLoadingImg] = useState(true);

  const imgElement = React.useRef(null);
  const favRef = useRef(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setProduct(item);
  },[item])


  const getPrice = () => {
    if (Number(price) < 1) {
      return "--";
    }

    const str = JSON.stringify(price);
    if (!str) {
      return '--';
    }

    //const subStr = str.substring(0, str?.length - 2)
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(str);

  };

  const onLoadedIcon = () => {
    setLoadingImg(false);
  };


  useEffect(() => {
    if (!loadingImg) {
      const icon = favRef?.current?.children[0];

      if (icon) {
        const prevFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

        const productIndex = prevFavorites.findIndex((el) => el?.spuId === item?.spuId);
        if (productIndex >= 0) {
          icon.style.fill = '#a2a2a2';
        }
      }
    }
  }, [loadingImg]);


  const onFavoriteIconClick = (e) => {
    e.stopPropagation();

    const icon = favRef?.current?.children[0];
    if (!icon) {return}

    const prevFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const isFavorite = icon.style.fill === 'rgb(162, 162, 162)';

    if (isFavorite) {
      const updatedFavorites = prevFavorites.filter((el) => el?.spuId !== item.spuId);
      icon.style.fill = "none";
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      icon.style.fill = '#a2a2a2';
      localStorage.setItem("favorites", JSON.stringify([...prevFavorites, item]));
    }
  };

  const isDesktopScreen = window.screen.availWidth > 600;

  return (
    <div className={styles.card}
         key={key}
    >
      <div
          onPointerDown={onPointerDown}
          onPointerUp={(e) => onPointerUp(item, e)}
          onTouchStart={onPointerDown}
          onTouchEnd={(e) => onPointerUp(item, e)}
      >
        {!name && (
            <ContentLoader
                speed={0.8}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                className={styles.contentImgLoader}
            >
              <rect
                  rx="10"
                  ry="10"
                  style={{ width: "100%", height: "100%" }}
              />
            </ContentLoader>
        )}

        {image &&
            <>
              {loadingImg &&
                  <ContentLoader
                      speed={0.8}
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                      className={styles.contentImgLoader}
                  >
                    <rect
                        rx="10"
                        ry="10"
                        style={{width: "100%", height: "100%"}}
                    />
                  </ContentLoader>
              }

              <img
                  ref={imgElement}
                  src={`${image}?x-oss-process=image/format,webp/resize,w_400`}
                  //src={`${image}`}
                  className={styles.productImage}
                  onLoad={onLoadedIcon}
                  loading="lazy"
              />
            </>

        }


        {!loadingImg && image && (
          <div className={styles.productInfo} style={{paddingLeft: index % 2 !== 0 && '20px'}}>
            <div className={styles.productName}>{name}</div>
            <div className={styles.categoryName}>{item?.category?.category3?.split('/')[2] || ''}</div>
            <div className={styles.productPrice}>{getPrice()}</div>
          </div>
      )}
    </div>
{
  !loadingImg && (
      <div className="favoriteIcon" ref={favRef} onClick={onFavoriteIconClick}>
            <IconHeartSmall/>
          </div>
      )}

    </div>
  );
}
export default Card;
