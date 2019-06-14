<template>
  <section class="search">
    <header-top title="搜索"></header-top>
    <form class="search_form" @click.prevent="submitSearch">
      <input type="search" name="search" placeholder="请输入商家或美食名称"
             class="search_input" v-model="keyword">
      <input type="submit" name="submit" class="search_submit">
    </form>
    <section class="list" v-if="!emptySearch">
      <ul class="list_container">
        <router-link :to="{path:'/shop', query:{id:item.id}}" tag="li" v-for="item in searchShops"
                     :key="item.id" class="list_li">
          <section class="item_left">
            <img :src="imageUrl+item.image_path"
                 class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{itemName(item.name)}}</span>
              </p>
              <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
              <p>{{item.float_minimum_order_amount}} 元起送 / 距离 {{item.distance}} 公里</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <div class="search_none" v-else>很抱歉！无搜索结果</div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import HeaderTop from '../../components/HeaderTop/HeaderTop'

  export default {
    data () {
      return {
        keyword: '',
        imageUrl: 'http://cangdu.org:8001/img/',
        emptySearch: false
      }
    },
    components: {
      HeaderTop
    },
    mounted () {
      if (!this.searchShops.name) {
        return
      }
      this.searchScroll = new BScroll('.list', {
        click: true
      })
    },
    computed: {
      ...mapState(['searchShops'])

    },
    methods: {
      submitSearch () {
        const keyword = this.keyword.trim()
        if (keyword) {
          this.$store.dispatch('searchShops', keyword)
        }
      },
      itemName (name) {
        if (!name) {
          return
        }
        if (name.length > 15) {
          return name.slice(0, 15) + '...'
        }
        return name
      }
    },
    watch: {
      searchShops (value) {
        if (!value.length) {
          this.emptySearch = true
        } else {
          this.emptySearch = false
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .search //搜索
    width 100%

    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px

      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none

        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2

        &.search_submit
          float right
          width 18%
          border 4px solid #02a774
          font-size 16px
          color #fff
          background-color #02a774

    .list
      .list_container
        background-color: #fff;
        margin-bottom 45px
        .list_li
          display: flex;
          justify-content: center;
          padding: 10px
          border-bottom: 1px solid $bc;

          .item_left
            margin-right: 10px

            .restaurant_img
              width 50px
              height 50px
              display block

          .item_right
            font-size 12px
            flex 1

            .item_right_text
              p
                line-height 12px
                margin-bottom 6px

                &:last-child
                  margin-bottom 0

    .search_none
      margin: 0 auto
      color: #333
      background-color: #fff
      text-align: center
      margin-top: 0.125rem
</style>
