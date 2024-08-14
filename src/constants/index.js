module.exports = {
    types: [
        { name: 'Грузовые' },
        { name: 'Легковые' },
        { name: 'Джипы' },
        { name: 'Кроссоверы' },
        { name: 'Спортивные' },
        { name: 'Военные' },
        { name: 'Концепты' },
    ],
    cars: [
        {
            brand: 'Toyota',
            model: 'Camry',
            year: 2021,
            color: 'Черный',
            engine_type: 'Бензин',
            bodywork_type: 'Седан',
            gear_type: 'Автомат',
            new: true,
            logo: 'uploads/toyota_camry.png',
            typeId: '66b9804945c346146bf30305',
        },
        {
            brand: 'BMW',
            model: 'X5',
            year: 2020,
            color: 'Белый',
            engine_type: 'Дизель',
            bodywork_type: 'Внедорожник',
            gear_type: 'Автомат',
            new: false,
            logo: 'uploads/bmw_x5.png',
            typeId: '66b9804945c346146bf30302',
        },
    ]
}
