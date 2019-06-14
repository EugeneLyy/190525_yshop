/*
使用mockjs提供mock数据接口
* */
import Mock from 'mockjs'
import data from './data'

// 提供goods接口
Mock.mock('/shop_goods', {code: 0, data: data.goods})
// 提供info接口
Mock.mock('/shop_info', {code: 0, data: data.info})
// 提供ratings接口
Mock.mock('/shop_ratings', {code: 0, data: data.ratings})
