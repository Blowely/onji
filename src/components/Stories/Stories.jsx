import { Col, Row } from "antd";
import React from "react";
import styles from "./Stories.module.scss";

const Circle = ({ color, text }) => (
    <div style={{ textAlign: "center" }}>
        <div
            style={{
                width: 70,
                height: 70,
                backgroundColor: "black",
                borderRadius: "50%",
                position: "relative",
                margin: "0 auto",
            }}
        >
            <div
                style={{
                    width: 66,
                    height: 66,
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
                    width: 60,
                    height: 60,
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
);

const Stories = () => {
    return (
        <Row justify="space-around" align="middle" style={{ height: 91, gap: 12 }}>
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
