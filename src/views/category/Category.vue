<template>
    <div class="wrapper">
        <!-- <h2>分类</h2> -->
        <div>
            <!-- 1. 无论是否设置click:true, button都可以点击 -->
            <button @click="btnClick">按钮</button>
            <!-- 2. 必须设置click:true, 那么div才能监听点击 -->
            <div @click="btnClick">哈哈哈哈</div>
            
            <ul class="content">
                <button @click="btnClick">按钮</button>
                <li>分类列表1</li>
                <li>分类列表2</li>
                <li>分类列表3</li>
                <li>分类列表4</li>
                <li>分类列表5</li>
                <li>分类列表6</li>
                <li>分类列表7</li>
                <li>分类列表8</li>
                <li>分类列表9</li>
                <li>分类列表1</li>
                <li>分类列表2</li>
                <li>分类列表1</li>
                <li>分类列表2</li>
                <li>分类列表3</li>
                <li>分类列表4</li>
                <li>分类列表5</li>
                <li>分类列表6</li>
                <li>分类列表7</li>
                <li>分类列表8</li>
                <li>分类列表9</li>
                <li>分类列表1</li>
                <li>分类列表2</li>
                <li>分类列表1</li>
                <li>分类列表2</li>
                <li>分类列表3</li>
                <li>分类列表4</li>
                <li>分类列表5</li>
                <li>分类列表6</li>
                <li>分类列表7</li>
                <li>分类列表8</li>
                <li>分类列表9</li>
                <li>分类列表1</li>
                <li>分类列表2</li>
                <li>分类列表1</li>
                <li>分类列表2</li>
                <li>分类列表3</li>
                <li>分类列表4</li>
                <li>分类列表5</li>
                <li>分类列表6</li>
                <li>分类列表7</li>
                <li>分类列表8</li>
                <li>分类列表9</li>
                <li>分类列表1</li>
                <li>分类列表2</li>
                <li>分类列表1</li>
                <li>分类列表2</li>
                <li>分类列表3</li>
                <li>分类列表4</li>
                <li>分类列表5</li>
                <li>分类列表6</li>
                <li>分类列表7</li>
                <li>分类列表8</li>
                <li>分类列表9</li>
                <li>分类列表1</li>
                <li>分类列表2</li>
                <li>分类列表1</li>
                <li>分类列表2</li>
                <li>分类列表3</li>
                <li>分类列表4</li>
                <li>分类列表5</li>
                <li>分类列表6</li>
                <li>分类列表7</li>
                <li>分类列表8</li>
                <li>分类列表9</li>
                <li>分类列表1</li>
                <li>分类列表2</li>
                <li>分类列表1</li>
                <li>分类列表2</li>
                <li>分类列表3</li>
                <li>分类列表4</li>
                <li>分类列表5</li>
                <li>分类列表6</li>
                <li>分类列表7</li>
                <li>分类列表8</li>
                <li>分类列表9</li>
                <li>分类列表1</li>
                <li>分类列表2</li>
                <li>分类列表1</li>
                <li>分类列表2</li>
                <li>分类列表3</li>
                <li>分类列表4</li>
                <li>分类列表5</li>
                <li>分类列表6</li>
                <li>分类列表7</li>
                <li>分类列表8</li>
                <li>分类列表9</li>
                <li>分类列表1</li>
                <li>分类列表2</li>
                <li>分类列表1</li>
                <li>分类列表2</li>
                <li>分类列表3</li>
                <li>分类列表4</li>
                <li>分类列表5</li>
                <li>分类列表6</li>
                <li>分类列表7</li>
                <li>分类列表8</li>
                <li>分类列表9</li>
                <li>分类列表1</li>
                <li>分类列表2</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default{
        name: 'Category',
        data() {
            return {
                scroll: null
            }
        },
        // created生命周期在组件（Vue实例）创建完后开始调用（created创建完组件了，也已经渲染了，就是还没有进行挂载，所以获取不到dom）
        created() {
        //     this.scroll = new BScroll(document.querySelector('.wrapper'),{
        //     })
        },
        mounted() {
            this.scroll = new BScroll(document.querySelector('.wrapper'), {
                probeType: 3,
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
        },
        methods: {
            btnClick() {
                console.log('btnClick');
            }
        }
    }
</script>

<style scoped>
    .wrapper{
        height: 150px;
        background-color: #eee;

        overflow: hidden;
        /* overflow-y: scroll; */
    }
</style>