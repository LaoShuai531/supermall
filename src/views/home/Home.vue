<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物广场</div>
        </nav-bar>
        <!-- 想滚动的内容直接放到scroll中就行 -->
        <!-- probe-type中不加 : 传过去的就都是字符串类型 -->
        <scroll class="content" 
                ref="scroll" 
                :probe-type="3" 
                @scroll="contentScroll" 
                :pull-up-load="true">
                <!-- @pullingUp="loadMore" -->
            <home-swiper :banners="banners"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control class="tab-control" 
                        :titles="['流行', '新款', '精选']" 
                        @tabClick="tabClick"></tab-control>
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
                isShowBackTop: false
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

            // 3. 监听item中图片是否加载完成
            // 利用事件总线接收 itemImageLoad
            this.$bus.$on('itemImageLoad', () =>{
                console.log('GoodsListItem中图片加载完成了');
                this.$refs.scroll.refresh()
            })
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
                this.isShowBackTop = -(position.y) > 1000
            },
            // loadMore() {
            //     console.log('上拉加载更多');
            //     this.getHomeGoods(this.currentType)

            //     // this.$refs.scroll.scroll.refresh()
            // },
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
            getHomeGoods(type) {
                const page = this.goods[type].page + 1
                getHomeGoods(type, page).then(res => {
                    // console.log(res);
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1

                    // this.$refs.scroll.finishPullUp()
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
        
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        z-index: 99;
    }
    
    .tab-control {
        /* position: sticky没滑动规定距离之前是sticky属性，但是滑动到了规定距离之后就是flex属性 */
        position: sticky;
        top: 44px;
        z-index: 99;
    }

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
</style>