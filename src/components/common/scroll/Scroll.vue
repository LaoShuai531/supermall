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
            pullUpLoad: {
                type: Boolean,
                default: false
            }
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
            // probeType作用：决定是否派发 scroll 事件，probeType 为 0，在任何时候都不派发 scroll 事件，
            // probeType 为 1，仅仅当手指按在滚动区域上，每隔 momentumLimitTime 毫秒派发一次 scroll 事件，
            // probeType 为 2，仅仅当手指按在滚动区域上，一直派发 scroll 事件，
            // probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
            if (this.probeType === 2 || this.probeType === 3) {
                this.scroll.on('scroll', (position) => {
                    // console.log(position);
                    this.$emit('scroll', position)
                })
            }

            console.log(this.scroll); // 没有refresh之前scrollerHeight: 697；给每个图片refresh之后scrollerHeight会做出对应变化
            // 3. 监听上拉事件
            if (this.pullUpLoad) {
                this.scroll.on('pullingUp', () => {
                    // console.log('上拉加载更多');
                    // setTimeout(() => {
                    //     this.scroll.finishPullUp()
                    // }, 2000);
                    this.$emit('pullingUp')
                })
            }
        },
        methods: {
            scrollTo(x, y, time=1000) {
                this.scroll && this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                this.scroll && this.scroll.finishPullUp()
            },
            refresh() {
                console.log('---所引用refresh方法的区域中图片加载完成了---');
                this.scroll && this.scroll.refresh()
            },
            getScrollY() {
                return this.scroll ? this.scroll.y : 0
            }
        }
    }
</script>

<style scoped></style>