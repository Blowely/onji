import styles from "./MainProduct.module.scss";
import React from "react";
import {useNavigate} from "react-router-dom";
import {PRODUCTS_IMG} from "../constants";

const MainProduct = () => {
    const navigate = useNavigate();

    const product = {
        name: 'NIKE ZOOM',
        price: 'от 5999 ₽',
        category: 'КРОССОВКИ',
        spuId: 4239122,
        image: PRODUCTS_IMG.p1,
    }
    
    return (
        <div className={styles.mainProductWrapper}>
            <div
                className={styles.productCard}
                onClick={() => navigate(`?spuId=${product.spuId}`)}
            >
                <img alt={product.name} src={product.image} className={styles.productImage}/>
                <div className={styles.productInfo}>
                    <div className={styles.productName}>{product.name}</div>
                    <div className={styles.categoryName}>{product.category}</div>
                    <div className={styles.productPrice}>{product.price}</div>
                </div>
            </div>
        </div>

    )
}

export default MainProduct