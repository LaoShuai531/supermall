<template>
    <div class="shopcart-list">
        <!-- scroll必须要有固定高度 -->
        <scroll class="content" ref="scroll">
           <shopcart-list-item 
                v-for="(item, index) in cartList" 
                :key="index" 
                :item-info="item">
            </shopcart-list-item>
        </scroll>
    </div>
</template>

<script>
    import Scroll from '@/components/common/scroll/Scroll.vue';
    import ShopcartListItem from './ShopcartListItem.vue';

    import { mapGetters } from 'vuex';

    export default {
        name: 'ShopcartList',
        components: {
            Scroll,
            ShopcartListItem
        },  
        computed: {
            ...mapGetters(['cartList'])
        },
        activated() {
            this.$refs.scroll.refresh()
        }
    }
</script>

<style scoped>
    /* .shopcart-list {
        height: calc(100vh - 44px - 49px);
    } */

    .content {
        /* height: 100%; */
        height: calc(100vh - 44px - 49px);
        overflow: hidden;
    }
</style>