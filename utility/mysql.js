'use strict'
const {
    db_book_config
} = require('../config/dev')

const mysql = require('mysql');

const returnStruct = { code: 2000, message: 'database faild', count: 0, fn: '', result: null };

// const db_book = mysql.createPool({
//     // ...clientOpts,
//     host: db_book_config.host,
//     user: db_book_config.user, // e.g. 'my-db-user'
//     password: db_book_config.password, // e.g. 'my-db-password'
//     database: db_book_config.database, // e.g. 'my-database'
//     socketPath: (process.env.IS_CLOUD ? '/cloudsql/woven-sequence-389701:us-west1:cms-main' : undefined), // e.g. '/cloudsql/project:region:instance'
// });
const db_connection = mysql.createPool(db_book_config);


/**
 * @param {*} db_connection database 連線
 * @param {string} sql sp 名稱 or sql 語法
 * @param {array} para 陣列參數
 * @returns 
 */
const action = function (sql, para) {
    let _ret = Object.assign({ ...returnStruct, fn: 'db', code: 2099 }, {});

    return new Promise((Y, N) => {
        db_connection.getConnection(function (error, connection) {
            
            if (error) {
                console.warn(error);
                if (connection) connection.release();
                return Y({ ..._ret, result: error });
            }

            connection.query(sql, para, (err, result,) => {
                if (connection) connection.release();

                if (err) {
                    return Y({ ..._ret, result: err });
                } else if (result && [...result].length < 0) {
                    return Y({ ..._ret, message: 'Data not found', code: 2097, result: result });
                }

                _ret.code = 0;
                _ret.count = [...result].length;
                _ret.message = 'Success';
                _ret.result = result
                return Y(_ret);
            });
        });
    });
};
module.exports.action = action;

    
// action('select * from Book.Waterfall where Id = ? limit 100;', ['1']).then(v => {
//     console.log('v: ' + JSON.stringify(v));
// });

module.exports.sp_book_Waterfall_sel = async(theActive) => { 
    return action(`
        select *
        from Book.Waterfall
        where Active = ?
        limit 100
    `, [theActive])
};


module.exports.sp_restaurant_type_sel = async() => { 
    return action(`
        select Id, Name as Classification
        from Restaurant.Type
        limit 100
    `, [])
};

module.exports.sp_restaurant_food_sel = async(theType) => { 
    let sql = `
        select f.Type, t.Name as Country, f.Name, f.Price
        from Restaurant.Food as f
        inner join Restaurant.Type as t on t.Id = f.Type
    `;
    if (theType > 0) sql = sql.concat(`where f.Type = ? `);
    sql = sql.concat(`limit 100`);

    return action(sql, [theType]);
};