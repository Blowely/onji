import { Col, Image, Row, Typography } from "antd";
import React from "react";
import arrow from "../../assets/svg/v2/arrow.svg";
import arrowGrey from "../../assets/svg/v2/arrow-grey.svg";
import styles from "./BrandsV2.module.scss";
import nb from "../../assets/new-balance.png";
import adidas from "../../assets/Adidas.png";
import nike from "../../assets/nike.png";
import {Swiper, SwiperSlide} from "swiper/react";

const { Title } = Typography;

const BrandsV2 = () => {
    return (
        <div style={{
            width: "100%",
            overflow: "hidden", // Добавить это
        }}>
            <Swiper
                slidesPerView={3}
                spaceBetween={30} // Уменьшить до разумного значения
                loop={true}
                pagination={{
                    clickable: true,
                }}
                className={styles.mySwiper}
            >
                <SwiperSlide className={styles.slide}>
                    <img
                        alt="Image"
                        src={nb}
                    />
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <img
                        alt="Image"
                        src={adidas}
                    />
                    {/*<Title
                        level={1}
                        style={{
                            position: "absolute",
                            top: "377px",
                            left: "20px",
                            fontFamily: "'Graphik_Web-Medium', Helvetica",
                            fontWeight: "500",
                            fontSize: "59.5px",
                            lineHeight: "60px",
                            margin: 0,
                        }}
                    >
                        Adidas
                    </Title>*/}
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <img
                        alt="Image"
                        src={nike}
                    />
                    {/*<Title
                        level={1}
                        style={{
                            position: "absolute",
                            top: "377px",
                            left: "82px",
                            fontFamily: "'Graphik_Web-Medium', Helvetica",
                            fontWeight: "500",
                            fontSize: "59.5px",
                            lineHeight: "60px",
                            margin: 0,
                        }}
                    >
                        Nike
                    </Title>*/}
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <img
                        alt="Image"
                        src={adidas}
                    />
                    {/*<Title
                        level={1}
                        style={{
                            position: "absolute",
                            top: "377px",
                            left: "20px",
                            fontFamily: "'Graphik_Web-Medium', Helvetica",
                            fontWeight: "500",
                            fontSize: "59.5px",
                            lineHeight: "60px",
                            margin: 0,
                        }}
                    >
                        Adidas
                    </Title>*/}
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default BrandsV2;
