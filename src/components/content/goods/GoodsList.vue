<template>
    <div class="goods">
        <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
        <!-- {{goods}} -->
    </div>
</template>

<script>
    import GoodsListItem from './GoodsListItem.vue'

    export default{
        name: 'GoodsList',
        components: {
            GoodsListItem
        },
        props: {
            //接收goods数组
            goods: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style scoped>
  .goods {
    display: flex;
     /* 根据宽度 设置一行显示多少个 */
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>