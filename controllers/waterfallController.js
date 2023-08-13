'use strict'
const db = require('../utility/mysql')

const returnStruct = { code: 9000, message: 'waterfall Controller faild', count: 0, result: null, api: '' };

exports.list = async (req, res) => {
    
    let ret = Object.assign({ ...returnStruct, api: 'list', code: 9000 }, {});

    // if (Object.entries(req.query).length <= 0) return res.json({ ...ret, code: 1009, message: 'param not found.' });

    try {

        const { } = req.query;
        
        let a = await db.action('select * from Waterfall limit 100;', []);
        if (a.code !== 1000) return res.json({ ...ret, code: 9000, message: 'success', result: a }).end();

        return res.json({ ...ret, ...a, code: 1000}).end();

    } catch (catchError) {
        console.warn({...ret, stack: catchError.stack});
        return res.json({...ret, stack: catchError.stack}).end();
    }
}