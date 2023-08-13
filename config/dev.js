'use strict'
const cloudSqlInstance = (process.env.IS_CLOUD ? '/cloudsql/woven-sequence-389701:us-west1:cms-main' : undefined); // e.g. '/cloudsql/project:region:instance'
const db_commom = {
    host: "34.145.26.43",   //34.145.26.43
    port: 3306,
    user: "root",
    password: "12345678",
    // database: "Book",
    connectionLimit: 3000
}
module.exports = {
    db_book_config: {
        ...db_commom,
        database: "Book",
        socketPath: cloudSqlInstance
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
    }

}
