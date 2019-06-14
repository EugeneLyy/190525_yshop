<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul ref="menuUl">
          <!--current-->
          <li class="menu-item " v-for="(good, index) in shopGoods" :key="index"
              :class="{current: index===currentIndex}" @click="clickMenuItem(index)" ref="menuList">
            <span class="text bottom-border-1px">
              <img class="icon"
                   :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUl">
          <li class="food-list food-list-hook" v-for="(good, index) in shopGoods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index"
                  @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57"
                       v-lazy="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shop-cart/>
    </div>
    <transition name="fade">
      <Food :food="food" ref="food"></Food>
    </transition>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'

  import CartControl from '../../../components/CartControl/CartControl'
  import Food from '../../../components/Food/Food'
  import ShopCart from '../../../components/ShopCart/ShopCart'

  export default {
    data () {
      return {
        scrollY: 0,
        tops: [],
        food: {}
      }
    },
    mounted () {
      this.$store.dispatch('getShopGoods', () => {
        this.$nextTick(() => {
          this._initScrolls()
          this._initTops()
          this._initMenuTops()
        })
      })
    },
    computed: {
      ...mapState(['shopGoods']),

      // 计算得到当前分类的下标
      currentIndex () {
        // 得到条件数据
        const {scrollY, tops} = this
        const index = tops.findIndex((top, index) => {
          this._initMenuTops(index)
          return scrollY >= top && scrollY < tops[index + 1]
        })
        // this.index = index
        return index
      }
    },
    methods: {
      // 初始化滚动时间
      _initScrolls () {
        this.menuScroll = new BScroll('.menu-wrapper', {
          click: true
        })
        this.foodsScroll = new BScroll('.foods-wrapper', {
          probeType: 2,
          // scrollY: true,
          click: true
        })
        this.foodsScroll.on('scroll', (event) => {
          // console.log(event.y)
          this.scrollY = Math.abs(event.y)
        })
        this.foodsScroll.on('scrollEnd', (event) => {
          // console.log(event.y)
          this.scrollY = Math.abs(event.y)
        })
      },
      // 初始化收集Tops数据
      _initTops () {
        this.tops = this.topsInit(this.$refs.foodsUl.children)
      },
      _initMenuTops (index) {
        // this.menuTops = this.topsInit(this.$refs.menuUl.children)
        let menu = this.$refs.menuList
        let el = menu[index]
        this.menuScroll.scrollToElement(el, 300, 0, -300)
      },
      clickMenuItem (index) {
        const scrollY = this.tops[index]
        this.scrollY = scrollY
        this.foodsScroll.scrollTo(0, -scrollY, 300)
      },
      topsInit (ref) {
        // 1、初始化tops
        const tops = []
        let top = 0 // 开始是顶点位置
        tops.push(top)
        // 2、收集所有分类的li
        const lis = ref
        Array.prototype.slice.call(lis).forEach(li => { // 先将假数组转换为真数组
          top += li.clientHeight
          tops.push(top)
        })
        // 3、更新数据
        return tops
      },
      // 显示点击的food
      showFood (food) {
        // 设置food
        this.food = food
        // 显示food组件 (父组件调用子组件对象的方法)
        this.$refs.food.toggleShowFood()
      }
    },
    components: {
      CartControl,
      Food,
      ShopCart
    },
    watch: {
      /* currentIndex () {
        this.menuScroll.scrollTo(0, -this.menuTops[this.currentIndex], 300)
      } */
      /* shopGoods () {
        this.$nextTick(() => {
          const foodsScrool = new BScroll('.foods-wrapper', {
            probeType: 2,
            // scrollY: true,
            // click: true
          })
          foodsScrool.on('scroll', (event) => {
            console.log(event.y)
            this.scrollY = Math.abs(event.y)
          })
        })
      } */
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.sty"
  .goods
    display flex
    position absolute
    top 195px
    bottom 46px
    width 100%
    background #fff
    overflow hidden

    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7

      .menu-item
        display table
        height 54px
        width 56px
        padding 0 12px
        line-height 14px

        &.current
          position relative
          z-index 10
          margin-top -1px
          background #fff
          color $green
          font-weight 700

          .text
            border-none()

        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat

        .text
          display table-cell
          width 56px
          vertical-align middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size 12px

    .foods-wrapper
      flex 1

      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7

      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))

        &last-child
          border-none()
          margin-bottom 0

        .icon
          flex 0 0 57px
          margin-right 10px

        .content
          flex 1

          .name
            margin 2px 0 8px 0
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)

          .desc, .extra
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)

          .desc
            line-height 12px
            margin-bottom 8px

          .extra
            .count
              margin-right 12px

          .price
            font-weight 700
            line-height 24px

            .now
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)

            .old
              text-decoration line-through
              font-size 10px
              color rgb(147, 153, 159)

          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 12px
</style>
