<template>
    <div class="shopcart">
        <!-- 导航 -->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{length}})</div>
        </nav-bar>

        <!-- 商品的列表栏 -->
        <shopcart-list></shopcart-list>

        <!-- 底部的汇总 -->
    </div>

</template>

<script>
    import NavBar from "@/components/common/navbar/NavBar.vue";

    import ShopcartList from "./childComps/ShopcartList.vue";

    import { mapGetters } from "vuex";

    export default {
        name: 'Shopcart',
        components: {
            NavBar,
            ShopcartList
        },
        computed: {
            // mapGetters使用的两种语法
            // 使用mapGetters可以直接在getters里面设置，然后在计算属性中引用获取的cartLength即可
            // 官方解释：mapGetters辅助函数仅仅是将store中的getter映射到局部的计算属性中
            // ...mapGetters(['cartLength', 'cartList'])
            ...mapGetters({
                length: 'cartLength'
            })
        }
    }
</script>

<style scoped>
    /* .shopcart {
        height: 100vh;
    } */

    .nav-bar {
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9;
        background-color: var(--color-tint);
        color: #fff;
    }
</style>