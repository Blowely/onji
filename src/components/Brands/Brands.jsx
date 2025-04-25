import { Col, Image, Row, Typography } from "antd";
import React from "react";
import arrow from "../../assets/svg/v2/arrow.svg";
import arrowGrey from "../../assets/svg/v2/arrow-grey.svg";
import nb from "../../assets/new-balance.png";
import adidas from "../../assets/Adidas.png";
import nike from "../../assets/nike.png";

const { Title } = Typography;

const Brands = () => {
    return (
        <div style={{ position: "relative", width: "100%", height: "541px" }}>
            <Row
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "473px",
                    top: "68px",
                    left: 0,
                    overflow: "hidden",
                }}
            >
                <Col span={8} style={{ position: "relative", height: "100%" }}>
                    <Image
                        style={{
                            position: "absolute",
                            top: 0,
                            left: "615px",
                            width: "376px",
                            height: "395px",
                            objectFit: "cover",
                        }}
                        alt="Image"
                        src={nb}
                    />
                </Col>
                <Col span={8} style={{ position: "relative", height: "100%" }}>
                    <Image
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "395px",
                        }}
                        alt="Image"
                        src={adidas}
                    />
                    <Title
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
                    </Title>
                </Col>
                <Col span={8} style={{ position: "relative", height: "100%" }}>
                    <Image
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "375px",
                            height: "396px",
                            objectFit: "cover",
                        }}
                        alt="Image"
                        src={nike}
                    />
                    <Title
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
                    </Title>
                </Col>
            </Row>
            <Row
                style={{
                    position: "absolute",
                    width: "763px",
                    height: "35px",
                    top: "0.5px",
                    left: "894px",
                }}
            >
                <Col span={20}>
                    <Title
                        level={1}
                        style={{
                            fontFamily: "'Graphik_Web-Medium', Helvetica",
                            fontWeight: "500",
                            fontSize: "34.9px",
                            lineHeight: "38.5px",
                            margin: 0,
                        }}
                    >
                        бренды
                    </Title>
                </Col>
                <Col
                    span={4}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Image
                        style={{ width: "29px", height: "15px", objectFit: "cover" }}
                        alt="Button previous"
                        src={arrowGrey}
                    />
                    <Image
                        style={{ width: "29px", height: "15px", objectFit: "cover" }}
                        alt="Button next slide"
                        src={arrow}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Brands;
