import React from 'react';
import { WhatsAppOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import styles from "./FooterV2.module.scss";
import tg from "../../assets/svg/tg-white.svg";
import {useNavigate} from "react-router-dom";


const { Text, Title } = Typography;

const FooterV2 = () => {
    const navigate = useNavigate();

    const onTgClick = () => window.open('tg://resolve?domain=re_poizon_store')
    const onVkClick = () => window.open('https://vk.com/repoizonstore')
    const onYtClick = () => window.open('https://www.youtube.com/@repoizon')

    return (
        <div className={styles.container}>
            <Title level={2} className={styles.logo} onClick={() => navigate(`/`)}>
                ONJI
            </Title>

            <Row className={styles.mainRow}>
                <Col xs={24} sm={12} md={6}>
                    <div className={styles.section}>
                        <Title level={4} className={styles.sectionTitle}>
                            Контакты
                        </Title>
                        <Text className={styles.supportText}>круглосуточная техподдержка</Text>

                        <Row align="middle" className={styles.contactsRow}>
                            <Col className={styles.contactsRowItem} onClick={onTgClick}>
                                <WhatsAppOutlined className={styles.icon} />
                                <Text className={styles.contactText}>WhatsApp</Text>
                            </Col>
                            <Col className={styles.contactsRowItem} onClick={onTgClick}>
                                <img src={tg} className={styles.icon} alt=""/>
                                <Text className={styles.contactText}>Telegram</Text>
                            </Col>
                        </Row>
                    </div>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <div className={styles.section}>
                        <Title level={4} className={styles.sectionTitle}>О нас</Title>
                        <Text className={styles.linkText}>политика конфиденциальности</Text>
                        <Text className={styles.linkText}>договор оферты</Text>
                    </div>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <div className={styles.section}>
                        <Title level={4} className={styles.sectionTitle}>Клиентам</Title>
                        <Text className={styles.linkText}>вопросы — ответы</Text>
                        <Text className={styles.linkText}>заказы и доставка</Text>
                        <Text className={styles.linkText}>бонусная программа</Text>
                    </div>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <div className={styles.section}>
                        <Title level={4} className={styles.sectionTitle}>Каталог</Title>
                        <Text className={styles.linkText}>обувь</Text>
                        <Text className={styles.linkText}>одежда</Text>
                        <Text className={styles.linkText}>аксессуары</Text>
                        <Text className={styles.linkText}>красота</Text>
                    </div>
                </Col>
            </Row>

            <div className={styles.divider} />

            <Row className={styles.bottomSection} justify="space-between">
                <Col>
                    <Row justify="space-between" className={styles.socialIcons}>
                        {/* Добавьте реальные изображения */}
                        <Col><div className={styles.tgIcon} onClick={onTgClick} /></Col>
                        <Col><div className={styles.vkIcon} onClick={onVkClick} /></Col>
                        <Col><div className={styles.ytIcon} onClick={onYtClick} /></Col>
                    </Row>
                </Col>

                <Col>
                    <Row justify="space-between" className={styles.appStores}>
                        <Col><div className={styles.googlePlay} /></Col>
                        <Col><div className={styles.appStore} /></Col>
                    </Row>
                </Col>

                <Col>
                    <Row justify="space-between" className={styles.paymentMethods}>
                        <Col><div className={styles.mastercard} /></Col>
                        <Col><div className={styles.visa} /></Col>
                        <Col><div className={styles.mir} /></Col>
                    </Row>
                </Col>
            </Row>

            <div className={styles.divider} />
        </div>
    );
};

export default FooterV2;