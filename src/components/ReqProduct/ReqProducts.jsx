import styles from './ReqProducts.module.scss';

const ReqProducts = () => {
    return <div className={styles.container}>
        <img src={"https://storage.yandexcloud.net/pc-mediafiles/test1/banners/banner3.webp"} alt="Background" className={styles.image} />
        <div className={styles.textOverlay}>
            <p>НЕ НАШЛИ<br /><div style={{textAlign: 'start'}}>
                НУЖНЫЙ ТОВАР?<br />ПРИВЕЗЁМ ПОД <br/> <span style={{float: 'left'}}>ЗАКАЗ</span>
            </div></p>
            <a href="#" className={styles.link}>ЗАКАЗАТЬ</a>
        </div>
    </div>
}

export default ReqProducts;