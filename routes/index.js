'use strict'

const waterfallController = require('../controllers/waterfallController');
const restaurantController = require('../controllers/restaurantController');

const routes = [
    {
        method: 'get',
        path: '/waterfall/list',
        handler: waterfallController.list
    },
    {
        method: 'post',
        path: '/restaurant/foodlist',
        handler: restaurantController.foodlist
    },
    {
        method: 'post',
        path: '/restaurant/types',
        handler: restaurantController.types
    }
]

module.exports = routes;