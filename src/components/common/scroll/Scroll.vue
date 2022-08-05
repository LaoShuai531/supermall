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
        data() {
            return {
                scroll: null
            }
        },
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType :3,
                pullUpLoad: true
            })
            this.scroll.on('scroll', (position) => {
                console.log(position);
            })
            this.scroll.on('pullingUp', () => {
                console.log('上拉加载更多');

                setTimeout(() => {
                    this.scroll.finishPullUp()
                }, 2000);
            })
        }
    }
</script>

<style scoped></style>