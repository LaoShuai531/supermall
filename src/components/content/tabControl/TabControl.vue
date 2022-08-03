<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles"
             class="tab-control-item" :class="{active: index === currentIndex}"
             @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default{
        name:'TabControl',
        // 父组件可以使用 props 把数据传给子组件。
        props: {
            titles: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                currentIndex: 0
            }
        },
        methods: {
            itemClick(index) {
                this.currentIndex = index;
                // 子组件可以使用 $emit 触发父组件的自定义事件。
                this.$emit('tabClick', index)
            }
        }
    }
</script>

<style>
    .tab-control{
        display: flex;
        text-align: center;
        /* border-top: 8px solid #eee; */
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        background-color: #fff;
        z-index: 99;
    }
    .tab-control-item{
        flex: 1;
    }
    .tab-control-item span{
        padding: 5px;
    }
    .active{
        color: var(--color-high-text);
    }
    .active span{
        border-bottom: 3px solid var(--color-tint);
    }
</style>