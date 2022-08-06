<template>
    <!-- ref/children -> 
    ref如果是绑定在组件中的，那么通过 this.$refs.ref名称 获取到的是一个组件对象 
    ref如果是绑定在普通的元素中的，那么通过 this.$refs.ref名称 获取到的是一个元素对象-->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: 'Scroll',
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            // pullUpLoad: {
            //     type: Boolean,
            //     default: false
            // }
        },
        data() {
            return {
                scroll: null
            }
        },
        mounted() {
            // 1. 创建BScroll对象,初始化
            this.scroll = new BScroll(this.$refs.wrapper, {
                click: true,
                probeType : this.probeType,
                pullUpLoad: this.pullUpLoad
            })
            // 2. 监听滚动的位置
            this.scroll.on('scroll', (position) => {
                // console.log(position);
                this.$emit('scroll', position)
            })

            console.log(this.scroll); // 没有refresh之前scrollerHeight: 697；给每个图片refresh之后scrollerHeight会做出对应变化
            // 3. 监听上拉事件
            // this.scroll.on('pullingUp', () => {
            //     // console.log('上拉加载更多');
            //     // setTimeout(() => {
            //     //     this.scroll.finishPullUp()
            //     // }, 2000);
            //     this.$emit('pullingUp')
            // })
        },
        methods: {
            scrollTo(x, y, time=1000) {
                this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                this.scroll.finishPullUp()
            },
            refresh() {
                this.scroll.refresh()
            }
        }
    }
</script>

<style scoped></style>