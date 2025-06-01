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
          icon.style.fill = '#A8BBA2';
          icon.style.stroke = '#A8BBA2';
        }
      }
    }
  }, [loadingImg]);


  const onFavoriteIconClick = (e) => {
    e.stopPropagation();

    const icon = favRef?.current?.children[0];
    if (!icon) {return}

    const prevFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const isFavorite = icon.style.fill === 'rgb(168, 187, 162)';

    if (isFavorite) {
      const updatedFavorites = prevFavorites.filter((el) => el?.spuId !== item.spuId);
      icon.style.fill = "none";
      icon.style.stroke = "#a2a2a2";
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      icon.style.fill = '#A8BBA2';
      icon.style.stroke = '#A8BBA2';
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
          /*onTouchEnd={(e) => onPointerUp(item, e)}*/
          //onClick={(e) => onPointerUp(item, e)}
          style={{height:'100%'}}
      >
        {!name && (
            <ContentLoader
                className={styles.contentLoader}
                speed={0.8}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                width="100%"
                height="100%"
                viewBox="0 0 402 361"
                preserveAspectRatio="none"
            >
               теперь rect задаём в нужных координатах
              <rect x="0" y="0" rx="10" ry="10" width="402" height="361" />
            </ContentLoader>
        )}

        {image &&
            <>
              {loadingImg &&
                  <ContentLoader
                      className={styles.contentImgLoader}
                      speed={0.8}
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                      // вот важное:
                      width="100%"
                      height="100%"
                      viewBox="0 0 402 361"
                      preserveAspectRatio="none"
                  >
                    <rect x="0" y="0" rx="10" ry="10" width="402" height="361" />
                  </ContentLoader>
              }

              <img
                  ref={imgElement}
                  src={`${image}?x-oss-process=image/format,webp/resize,w_400`}
                  //src={`${image}`}
                  style={{opacity: loadingImg ? 0 : 1}}
                  className={styles.productImage}
                  onLoad={onLoadedIcon}
                  loading="lazy"
              />
              {!loadingImg && image && (
                  <div className={styles.productInfo} style={{paddingLeft: index % 2 !== 0 && '20px'}}>
                    <div className={styles.productName}>{name}</div>
                    <div className={styles.categoryName}>{item?.category?.category3?.split('/')[2] || ''}</div>
                    <div className={styles.productPrice}>{getPrice()}</div>
                  </div>
              )}
            </>
        }
    </div>
    {!loadingImg && (
      <div className="favoriteIcon" ref={favRef} onClick={onFavoriteIconClick}>
            <IconHeartSmall/>
          </div>
      )}

    </div>
  );
}
export default Card;
