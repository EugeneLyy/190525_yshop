/*
通过mulations间接更新state的多个方法的对象
* */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_SHOP_RATINGS,
  RECEIVE_SHOP_INFO,
  RECEIVE_SHOP_GOODS,
  INCREASE_FOOD_COUNT,
  DECREASE_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'

import {
  reqAddress,
  reqFoodTCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings,
  reqSearchShop
} from '../api'

export default {
  // 异步获取地址
  async getAddress ({commit, state}) {
    // 发送异步AJAX请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    if (result.code === 0) {
      const address = result.data
      // 根据结果提交一个mutation
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  // 异步获取食品分类列表
  async getFoodTCategorys ({commit}) {
    // 发送异步AJAX请求
    const result = await reqFoodTCategorys()
    if (result.code === 0) {
      const categorys = result.data
      // 根据结果提交一个mutation
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },
  // 异步获取商家列表
  async getShops ({commit, state}) {
    // 发送异步AJAX请求
    const {latitude, longitude} = state
    const result = await reqShops(latitude, longitude)
    if (result.code === 0) {
      const shops = result.data
      // 根据结果提交一个mutation
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  // 同步获取用户信息
  recodeUser ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },
  async getUserInfo ({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },

  async logout ({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },
  // 异步获取商户信息
  async getShopInfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const shopInfo = result.data
      commit(RECEIVE_SHOP_INFO, {shopInfo})
    }
  },
  // 异步获取商户商品信息
  async getShopGoods ({commit}, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const shopGoods = result.data
      commit(RECEIVE_SHOP_GOODS, {shopGoods})
      // 回调函数，可执行/可不执行
      callback && callback()
    }
  },
  // 异步获取商户评价信息
  async getShopRatings ({commit}, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const shopRatings = result.data
      commit(RECEIVE_SHOP_RATINGS, {shopRatings})
      callback && callback()
    }
  },
  updateFoodCount ({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCREASE_FOOD_COUNT, {food})
    } else {
      commit(DECREASE_FOOD_COUNT, {food})
    }
  },
  clearCart ({commit}) {
    commit(CLEAR_CART)
  },
  // 异步获取搜索得到的商户信息
  async searchShops ({commit, state}, keywords) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keywords)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})
    }
  }
}
