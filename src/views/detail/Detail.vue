<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav"></detail-nav-bar>
        <scroll class="content" ref="scroll">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        </scroll>
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar.vue'
    import DetailSwiper from './childComps/DetailSwiper.vue'
    import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
    import DetailShopInfo from './childComps/DetailShopInfo.vue'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
    import Scroll from '@/components/common/scroll/Scroll.vue'

    import {getDetail, Goods, Shop} from '@/network/detail'

    export default{
        name: 'Detail',
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            Scroll
        },
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {}
            }
        },
        methods: {
            imageLoad() {
                this.$refs.scroll.refresh()
            }
        },
        created() {
            // 获取动态路由的参数： this.$route.params.iid
            // 1. 保存传入的iid
            this.iid =  this.$route.params.iid

            // 2. 根据iid请求详情数据（建议同样封装一下）
            getDetail(this.iid).then(res => {
                // 1. 获取数据
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
            })
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