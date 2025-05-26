import React, { useState } from 'react';
import { Collapse } from 'antd';
import styles from './FaqBlock.module.scss';
import "./FaqBlcok.scss";

import PlusIcon from '../../assets/svg/v2/plus-bold.svg?react';

const { Panel } = Collapse;

const faqItems = [
    { question: 'КАК ОТСЛЕЖИВАТЬ ЗАКАЗ?', answer: 'Вы можете отследить заказ в личном кабинете в разделе "Мои заказы".' },
    { question: 'КОГДА МОЙ ЗАКАЗ БУДЕТ ДОСТАВЛЕН?', answer: 'Сроки доставки зависят от вашего региона и способа доставки.' },
    { question: 'СКОЛЬКО СТОИТ ДОСТАВКА?', answer: 'Стоимость доставки рассчитывается автоматически при оформлении заказа.' },
    { question: 'МОЖЕТ ЛИ ПРИЙТИ НЕ ОРИГИНАЛЬНЫЙ ТОВАР?', answer: 'Мы сотрудничаем только с официальными поставщиками. Все товары — оригинальные.' },
    { question: 'ЕСЛИ МНЕ НЕ ПОДОШЕЛ ТОВАР, МОГУ ЛИ СДЕЛАТЬ ВОЗВРАТ?', answer: 'Да, возврат возможен в течение 14 дней согласно условиям возврата.' },
    { question: 'КАК ПРАВИЛЬНО ВЫБРАТЬ РАЗМЕР?', answer: 'Рекомендуем ознакомиться с размерной сеткой на странице товара.' },
];

const FaqBlock = () => {
    const [activeKey, setActiveKey] = useState(undefined);

    return (
        <div className={styles.faq}>
            <h2 className={styles.title}>ЧАСТЫЕ ВОПРОСЫ</h2>
            <Collapse
                accordion
                expandIconPosition="end"
                className={styles.collapse}
                activeKey={activeKey}
                onChange={(key) => {
                    setActiveKey(key);
                }}
                expandIcon={({ isActive }) =>
                    isActive ? <PlusIcon className={styles.closeIcon} /> : <PlusIcon className={styles.icon} />
                }
            >
                {faqItems.map((item, index) => (
                    <Panel
                        header={item.question}
                        key={index}
                        className={activeKey == index ? "panel-active" : ""}
                    >
                        <div>{item.answer}</div>
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default FaqBlock;
