// const mysqlService = require('../service/mysqlService')
const mysql = require('../utility/mysql');
const returnStruct = { code: 9000, message: 'waterfall Controller faild', count: 0, result: null, api: '' };

module.exports.foodlist = async (req, res) => {
    let ret = Object.assign({ ...returnStruct, api: 'foodlist', code: 9000 }, {});

    try {
        // console.log('req', req);
        const { type: type = 0 } = req.body;

        const food = await mysql.sp_restaurant_food_sel(type);
        // console.log('food', food);
        const classification = [...food.result].reduce((obj, item) => {
            if (!obj[item.Type]) obj[item.Type] = [];
            obj[item.Type].push({...item, Type: undefined});
            return obj;
        }, {});

        ret.code = 0;
        ret.count = classification.length;
        ret.message = 'Success';
        ret.result = classification;
        // console.log('classification', classification);

        return res.json({...ret}).end();
    } catch (catchError) {
        return res.json({...ret, stack: catchError.stack}).end();
    }
}

module.exports.types = async (req, res) => {
    let ret = Object.assign({ ...returnStruct, api: 'types', code: 9000 }, {});

    try {

        const types = await mysql.sp_restaurant_type_sel();

        return res.json({...ret, ...types}).end();
    } catch (catchError) {
        return res.json({...ret, stack: catchError.stack}).end();
    }
}