'use strict'

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(express.json());

// 使用 Morgan 設定日誌記錄
app.use(morgan('dev'));

// 禁用日誌記錄
app.use((req, res, next) => {
    // 不執行任何記錄日誌的操作
    next();
});

const router = express.Router();
app.use('/', router);

const routes = require('./routes/index')
routes.forEach(api => {
    router[String(api.method).toLowerCase()](api.path, api.handler);
})
  
app.set('port', PORT)
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);