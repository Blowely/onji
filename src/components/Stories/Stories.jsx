import { Col, Row } from "antd";
import React from "react";
import styles from "./Stories.module.scss";

const Circle = ({ color, text }) => {
    const isDesktopScreen = window?.innerWidth > 768;

    return (
    <div style={{ textAlign: "center" }}>
        <div
            style={{
                width: isDesktopScreen ? 70 : 54,
                height: isDesktopScreen ? 70 : 54,
                backgroundColor: "black",
                borderRadius: "50%",
                position: "relative",
                margin: "0 auto",
            }}
        >
            <div
                style={{
                    width: isDesktopScreen ? 66 : 51,
                    height: isDesktopScreen ? 66 : 51,
                    backgroundColor: "white",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />
            <div
                style={{
                    width: isDesktopScreen ? 60 : 46,
                    height: isDesktopScreen ? 60 : 46,
                    backgroundColor: color,
                    borderRadius: "50%",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />
        </div>
        <div style={{ marginTop: 7, fontSize: 12 }}>{text}</div>
    </div>
)};

const Stories = () => {
    const isDesktopScreen = window?.innerWidth > 768;

    return (
        <Row justify={isDesktopScreen ? "space-around" : "center"} align="middle" style={{ height: 91, gap: 12 }}>
            <Col className={styles.item}>
                <Circle color="#a8bba2" text="get the look" />
            </Col>
            <Col className={styles.item}>
                <Circle color="#7a9e9f" text="скидки" />
            </Col>
            <Col className={styles.item}>
                <Circle color="#a8bba2" text="for me" />
            </Col>
            <Col className={styles.item}>
                <Circle color="#7a9e9f" text="о заказах" />
            </Col>
        </Row>
    );
};

export default Stories;
