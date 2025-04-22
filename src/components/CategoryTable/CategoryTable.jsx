import React from 'react';
import { Table } from 'antd';
import './CategoryTable.scss';
import {useNavigate} from "react-router-dom";

const CategoryTable = () => {
    const navigate = useNavigate();

    const columns = [
        {
            title: 'одежда',
            dataIndex: 'clothing',
            key: 'clothing',
        },
        {
            title: "верхняя одежда",
            dataIndex: 'outerwear',
            key: 'outerwear',
        },
        {
            title: "спортивная одежда",
            dataIndex: 'sportswear',
            key: 'sportswear',
        },
        {
            title: "обувь",
            dataIndex: 'footwear',
            key: 'footwear',
        },
        {
            title: "аксессуары",
            dataIndex: 'accessories',
            key: 'accessories',
        },
    ];

    const data = [
        {
            key: '1',
            clothing: <div onClick={() => navigate('?category2Id=2')}>все одежда</div>,
            outerwear: <div onClick={() => navigate('?category2Id=3')}>все верхняя одежда</div>,
            sportswear: <div onClick={() => navigate('?category2Id=4')}>все спортивная одежда</div>,
            footwear: <div onClick={() => navigate('?category2Id=5')}>все обувь</div>,
            accessories: <div onClick={() => navigate('?category2Id=6')}>все аксессуары</div>,
        },
        {
            key: '2',
            clothing: <div onClick={() => navigate('?category2Id=7')}>штамм</div>,
            outerwear: <div onClick={() => navigate('?category2Id=8')}>летняя одежда</div>,
            sportswear: <div onClick={() => navigate('?category2Id=9')}>баскетбольные майки</div>,
            footwear: <div onClick={() => navigate('?category2Id=10')}>кроссовки для бега</div>,
            accessories: <div onClick={() => navigate('?category2Id=11')}>сумки и рюкзаки</div>,
        },
        {
            key: '3',
            clothing: <div onClick={() => navigate('?category2Id=12')}>футболки</div>,
            outerwear: <div onClick={() => navigate('?category2Id=13')}>байкерская</div>,
            sportswear: <div onClick={() => navigate('?category2Id=14')}>баскетбольные шорты</div>,
            footwear: <div onClick={() => navigate('?category2Id=15')}>обувь для спорта</div>,
            accessories: <div onClick={() => navigate('?category2Id=16')}>украшения</div>,
        },
        {
            key: '4',
            clothing: <div onClick={() => navigate('?category2Id=17')}>майки</div>,
            outerwear: <div onClick={() => navigate('?category2Id=18')}>пиджаки</div>,
            sportswear: <div onClick={() => navigate('?category2Id=19')}>тренировочные костюмы</div>,
            footwear: <div onClick={() => navigate('?category2Id=20')}>ботинки</div>,
            accessories: <div onClick={() => navigate('?category2Id=21')}>ремни</div>,
        },
        {
            key: '5',
            clothing: <div onClick={() => navigate('?category2Id=22')}>брюки</div>,
            outerwear: <div onClick={() => navigate('?category2Id=23')}>джинсовые куртки</div>,
            sportswear: <div onClick={() => navigate('?category2Id=24')}>костюмы для горных лыж</div>,
            footwear: <div onClick={() => navigate('?category2Id=25')}>сандалии</div>,
            accessories: <div onClick={() => navigate('?category2Id=26')}>очки</div>,
        },
        {
            key: '6',
            clothing: <div onClick={() => navigate('?category2Id=27')}>джинсы</div>,
            outerwear: <div onClick={() => navigate('?category2Id=28')}>меховые куртки</div>,
            sportswear: <div onClick={() => navigate('?category2Id=29')}>шорты для горных лыж</div>,
            accessories: <div onClick={() => navigate('?category2Id=30')}>кепки и шапки</div>,
        },
        {
            key: '7',
            clothing: <div onClick={() => navigate('?category2Id=31')}>свитера</div>,
            outerwear: <div onClick={() => navigate('?category2Id=32')}>кожаные куртки</div>,
            accessories: <div onClick={() => navigate('?category2Id=33')}>шарфы</div>,
        },
        {
            key: '8',
            clothing: <div onClick={() => navigate('?category2Id=34')}>рубашки</div>,
            outerwear: <div onClick={() => navigate('?category2Id=35')}>пальто</div>,
            accessories: <div onClick={() => navigate('?category2Id=36')}>часы</div>,
        },
        {
            key: '9',
            clothing: <div onClick={() => navigate('?category2Id=37')}>шорты</div>,
            outerwear: <div onClick={() => navigate('?category2Id=38')}>пуховики</div>,
        },
    ];

    return (
        <div className="category-table-container">
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered={false}
                showHeader={true}
                className="category-table"
            />
        </div>
    );
};

export default CategoryTable;