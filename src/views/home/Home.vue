<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物广场</div>
        </nav-bar>
        <tab-control :titles="['流行', '新款', '精选']" 
                         @tabClick="tabClick" 
                         ref="tabControl1"
                         class="tab-control"
                         v-show="isTabFixed"></tab-control>
        <!-- 想滚动的内容直接放到scroll中就行 -->
        <!-- probe-type中不加 : 传过去的就都是字符串类型 -->
        <scroll class="content" 
                ref="scroll" 
                :probe-type="3" 
                @scroll="contentScroll" 
                :pull-up-load="true"
                @pullingUp="loadMore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles="['流行', '新款', '精选']" 
                         @tabClick="tabClick" 
                         ref="tabControl2"></tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>

        <!-- native -> 监听组件根元素的原生事件 -->
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
        <!-- <goods-list-item></goods-list-item> -->
    </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue"
import RecommendView from "./childComps/RecommendView.vue"
import FeatureView from "./childComps/FeatureView.vue"

import NavBar from "@/components/common/navbar/NavBar.vue"
import Scroll from "@/components/common/scroll/Scroll.vue"
import TabControl from "@/components/content/tabControl/TabControl.vue"
import GoodsList from "@/components/content/goods/GoodsList.vue"
import GoodsListItem from "@/components/content/goods/GoodsListItem.vue"
import BackTop from "@/components/content/backTop/BackTop.vue"

import {
    getHomeMultidata,
    getHomeGoods
} from '@/network/home'
import { debounce } from "@/common/utils"



// import Swiper from '@/components/common/swiper/Swiper.vue'
// import SwiperItem from '@/components/common/swiper/SwiperItem.vue'
// import {Swiper, SwiperItem} from '@/components/common/swiper/index'

    export default{
        name: 'Home',
        components: {
            NavBar,
            // Swiper,
            // SwiperItem
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControl,
            GoodsList,
            GoodsListItem,
            Scroll,
            BackTop
        },
        data() {
            return {
                // result: null
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []}
                },
                currentType: 'pop',
                isShowBackTop: false,
                tabOffsetTop: 0,
                isTabFixed: false
            }
        },
        // 计算属性
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        // Vue生命周期的created
        created() {
            // 1. 请求首页多个数据
            this.getHomeMultidata()

            // 2. 请求商品数据
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')
        },
        mounted() {
            // 1. 监听item中图片是否加载完成(事件监听)
            // 定义一个变量来接收防抖后的数据
            const refresh = debounce(this.$refs.scroll.refresh, 500)
            // 利用事件总线接收 itemImageLoad
            this.$bus.$on('itemImageLoad', () => {
                // console.log('GoodsListItem中图片加载完成了');
                // this.$refs.scroll.refresh()
                refresh()
            })

            // 2. 获取tabControl的offsetTop
            // 所有的组件都有一个属性$el: 用于获取组件中的元素
            // console.log(this.$refs.tabControl.$el);
            // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
        },
        methods: {
            /**
             * 事件监听相关的方法
             */
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break;
                    case 1:
                        this.currentType = 'new'
                        break;
                    case 2:
                        this.currentType = 'sell'
                        break;
                    //这里写不写default都可以
                    default:
                        break;
                }
                this.$refs.tabControl1.currentIndex = index
                this.$refs.tabControl2.currentIndex = index
            },
            backClick() {
                // console.log('可以监听');
                // this.$refs.scroll.scroll.scrollTo(0, 0, 1000)
                // 下面是封装的思想
                this.$refs.scroll.scrollTo(0, 0)
            },
            contentScroll(position) {
                // console.log(position);
                // if (position.y < -1000) {
                //     this.isShowBackTop = true
                // }else{
                //     this.isShowBackTop = false
                // }
                // 上面的if-else可以简写成一行代码
                // 1. 判断BackTop是否显示
                this.isShowBackTop = -(position.y) > 1000

                // 2. 决定tabControl是否吸顶(position: fixed)
                this.isTabFixed = -(position.y) > this.tabOffsetTop
            },
            loadMore() {
                console.log('上拉加载更多');
                this.getHomeGoods(this.currentType)
                // refresh()
                // this.$refs.scroll.scroll.refresh()
            },
            swiperImageLoad() {
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            },
            /**
             * 网络请求相关的方法
             */
            getHomeMultidata() {
                getHomeMultidata().then(res => {
                    // console.log(res);
                    // this.result = res
                    this.banners= res.data.banner.list
                    // this.banners= res.data.banner
                    this.recommends = res.data.recommend.list
                    // this.recommends = res.data.recommend
                })
            },
            // 封装的获取home商品的信息列表
            getHomeGoods(type) {
                const page = this.goods[type].page + 1
                getHomeGoods(type, page).then(res => {
                    // console.log(res);
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1

                    // 如果没有下面一行代码，只能多加载一页数据，所以要完成上拉加载更多
                    this.$refs.scroll.finishPullUp()
                })
            }
        }
        
    }
</script>

<style scoped>
    #home{
        /* padding-top: 44px; */
        /* viewport-height视口高度 */
        height: 100vh;
        position: relative;
    }
    .home-nav{
        background-color: var(--color-tint);
        color: #fff;
        
        /* 在我们使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
        /* position: fixed;
        left: 0;
        top: 0;
        right: 0;
        z-index: 99; */
    }
    
    /* .tab-control {
        position: sticky没滑动规定距离之前是sticky属性，但是滑动到了规定距离之后就是flex属性
        吸顶的效果
        position: sticky;
        top: 44px;
        z-index: 99;
    } */

    .content{
        overflow: hidden;        
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
    /* .content {
        height: calc(100% - 93px);
        overflow: hidden;
        margin-top: 44px;
    } */
    
    .tab-control{
        position: relative;
        z-index: 9;
    }
</style>