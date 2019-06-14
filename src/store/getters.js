/*
基于state的getter计算属性对象
* */
export default {
  totalCount (state) {
    return state.cartFoods.reduce((totalPre, food) => totalPre + food.count, 0)
  },
  totalPrice (state) {
    return state.cartFoods.reduce((totalPre, food) => totalPre + food.count * food.price, 0)
  },
  positiveCount (state) {
    return state.shopRatings.reduce((totalPre, rating) => totalPre + (rating.rateType ? 0 : 1), 0)
  }
}
