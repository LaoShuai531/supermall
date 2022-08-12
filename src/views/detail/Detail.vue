<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
        <scroll class="content" ref="scroll">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info :param-info="paramInfo" ref="paramOffsetTop"></detail-param-info>
            <detail-comment-info :comment-info="commentInfo" ref="commentOffsetTop"></detail-comment-info>
            <goods-list :goods="recommends" ref="recommendOffsetTop"></goods-list>
        </scroll>
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar.vue'
    import DetailSwiper from './childComps/DetailSwiper.vue'
    import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
    import DetailShopInfo from './childComps/DetailShopInfo.vue'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
    import DetailParamInfo from './childComps/DetailParamInfo.vue'
    import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
    import Scroll from '@/components/common/scroll/Scroll.vue'
    import GoodsList from '@/components/content/goods/GoodsList.vue'

    import {getDetail, Goods, Shop, GoodsParam, getRecommend} from '@/network/detail'
    import { debounce } from '@/common/utils'
    import {itemListenerMixin} from '@/common/mixin'

    export default{
        name: 'Detail',
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            Scroll,
            GoodsList
        },
        // 混入：来解决商品推荐中图片滚动不了的bug
        mixins: [itemListenerMixin],
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                // itemImageListener: null
                themeTopYs: [],
                getThemeTopY: null
            }
        },
        methods: {
            imageLoad() {
                this.$refs.scroll.refresh()
                // 以下是防抖的方法(由于混入已经将mixin.js中的itemImageListener: null,refresh: null传入到Detail.vue的date中了，
                // 所以可以使用this.refresh())
                // this.refresh()

                // 调用getThemeTopY
                this.getThemeTopY()
                
            },
            titleClick(index) {
                console.log(index);
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
            },
        },
        created() {
            // 获取动态路由的参数： this.$route.params.iid
            // 1. 保存传入的iid
            this.iid =  this.$route.params.iid

            // 2. 根据iid请求详情数据（建议同样封装一下）
            getDetail(this.iid).then(res => {
                // 1. 获取数据
                console.log('楼下是详情数据');
                console.log(res);
                const data = res.result;

                // 2. 获取顶部图片的轮播数据（获取顶部的图片数据）
                this.topImages = data.itemInfo.topImages

                // 3. 获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

                // 4. 创建店铺信息的对象
                this.shop = new Shop(data.shopInfo)

                // 5. 获取商品详细信息数据
                this.detailInfo = data.detailInfo

                // 6. 获取参数的信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

                // 7. 获取评价的信息
                if(data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0]
                }
                /*
                // 1. 第一次获取，值不对
                // 值不对的原因：this.$refs.paramOffsetTop.$el压根没有渲染
                this.themeTopYs=[]

                this.themeTopYs.push(0)
                this.themeTopYs.push(this.$refs.paramOffsetTop.$el.offsetTop)
                this.themeTopYs.push(this.$refs.commentOffsetTop.$el.offsetTop)
                this.themeTopYs.push(this.$refs.recommendOffsetTop.$el.offsetTop)

                console.log(this.themeTopYs);

                this.$nextTick(() => {
                    // 2. 第二次获取，值依然不对
                    // 值不对的原因：图片没有计算在内
                    // 点击标题滚到对应内容的另一种方法(此处虽然已经赋完值了，但是直接使用拿不到值是因为还没有渲染，更新一下DOM)
                    // 根据最新的数据，对应的DOM是已经被渲染出来了
                    // 但是图片依然是没有加载完的
                    // offsetTop值不对的时候，基本上都是因为图片的问题
                    this.themeTopYs=[]

                    this.themeTopYs.push(0)
                    this.themeTopYs.push(this.$refs.paramOffsetTop.$el.offsetTop-44)
                    this.themeTopYs.push(this.$refs.commentOffsetTop.$el.offsetTop-44)
                    this.themeTopYs.push(this.$refs.recommendOffsetTop.$el.offsetTop-44)

                    console.log(this.themeTopYs);
                })
                */
            })

            // 3. 请求推荐数据
            getRecommend().then(res => {
                console.log('楼下是推荐数据');
                console.log(res);
                this.recommends = res.data.list
            })

            // 4. 给getThemeTopY赋值
            this.getThemeTopY = () => { 
                this.themeTopYs=[]

                this.themeTopYs.push(0)
                this.themeTopYs.push(this.$refs.paramOffsetTop.$el.offsetTop-44)
                this.themeTopYs.push(this.$refs.commentOffsetTop.$el.offsetTop-44)
                this.themeTopYs.push(this.$refs.recommendOffsetTop.$el.offsetTop-44)

                console.log(this.themeTopYs);
            }
        },
        mounted() {
            // // 定义一个变量来接收防抖后的数据
            // const refresh = debounce(this.$refs.scroll.refresh, 500)

            // // 对监听的事件做一个保存
            // this.itemImageListener = () => { refresh() }

            // this.$bus.$on('itemImageLoad', this.itemImageListener)
        },
        // updated() {
        //     this.themeTopYs=[]

        //     this.themeTopYs.push(0)
        //     this.themeTopYs.push(this.$refs.paramOffsetTop.$el.offsetTop)
        //     this.themeTopYs.push(this.$refs.commentOffsetTop.$el.offsetTop)
        //     this.themeTopYs.push(this.$refs.recommendOffsetTop.$el.offsetTop)

        //     console.log(this.themeTopYs);
        // },
        destroyed() {
            this.$bus.$off('itemImageLoad', this.itemImageListener)
        }
    }
</script>

<style scoped>
    #detail {
        height: 100vh;
        position: relative;
        z-index: 9;
        background-color: #fff;
    }

    .detail-nav{
        position: relative;
        background-color: #fff;
    }

    .content{
        /* 之前用的是定位方法来设置可滚动高度
        这回用calc的方法 */
        height: calc(100% - 43px);
        overflow: hidden;
        /* margin-top: 44px; */
    }

</style>