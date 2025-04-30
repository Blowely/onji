import { WhatsAppOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import styles from "./Footer.module.scss";
import tg from "../../assets/svg/tg-white.svg";


const { Text, Title } = Typography;

const Footer = () => {
    return (
        <div className={styles.container}>
            <Title level={2} className={styles.logo}>
                ONJI
            </Title>

            <Row className={styles.mainRow} gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <div className={styles.section}>
                        <Title level={4} className={styles.sectionTitle}>
                            Контакты
                        </Title>
                        <Text className={styles.supportText}>круглосуточная техподдержка</Text>

                        <Row gutter={8} align="middle" className={styles.contactsRow}>
                            <Col><WhatsAppOutlined className={styles.icon} /></Col>
                            <Col><Text className={styles.contactText}>WhatsApp</Text></Col>
                            <Col><img src={tg} className={styles.icon}  alt=""/></Col>
                            <Col><Text className={styles.contactText}>Telegram</Text></Col>
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

            <Row className={styles.bottomSection} justify="center">
                <Col xs={24} md={8}>
                    <Row justify="space-around" className={styles.socialIcons}>
                        {/* Добавьте реальные изображения */}
                        <Col><div className={styles.tgIcon} /></Col>
                        <Col><div className={styles.vkIcon} /></Col>
                        <Col><div className={styles.ytIcon} /></Col>
                    </Row>
                </Col>

                <Col xs={24} md={8}>
                    <Row justify="space-around" className={styles.appStores}>
                        <Col><div className={styles.googlePlay} /></Col>
                        <Col><div className={styles.appStore} /></Col>
                    </Row>
                </Col>

                <Col xs={24} md={8}>
                    <Row justify="space-around" className={styles.paymentMethods}>
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

export default Footer;