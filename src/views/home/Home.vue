<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物广场</div>
        </nav-bar>
        <home-swiper :banners="banners"></home-swiper>
        <h2>首页</h2>
    </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue"
import HomeSwiper from "./childComps/HomeSwiper.vue"
import {getHomeMultidata} from '@/network/home'

// import Swiper from '@/components/common/swiper/Swiper.vue'
// import SwiperItem from '@/components/common/swiper/SwiperItem.vue'
// import {Swiper, SwiperItem} from '@/components/common/swiper/index'

    export default{
        name: 'Home',
        components: {
            NavBar,
            // Swiper,
            // SwiperItem
            HomeSwiper
        },
        data() {
            return {
                // result: null
                banners: [],
                recommends: []
            }
        },
        // Vue生命周期的created
        created() {
            // 1. 请求首页多个数据
            getHomeMultidata().then(res =>{
                console.log(res);
                // this.result = res
                this.banners= res.data.banner.list
                // this.banners= res.data.banner
                this.recommends = res.data.recommend.list
                // this.recommends = res.data.recommend
            })
        }
        
    }
</script>

<style>
    .home-nav{
        background-color: var(--color-tint);
        color: #fff;
    }
</style>