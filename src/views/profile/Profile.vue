<template>
    <div>
        <scroll class="content">
            <ul>
            <li>个人信息1</li>
            <li>个人信息2</li>
            <li>个人信息3</li>
            <li>个人信息4</li>
            <li>个人信息5</li>
            <li>个人信息6</li>
            <li>个人信息7</li>
            <li>个人信息8</li>
            <li>个人信息9</li>
            <li>个人信息1</li>
            <li>个人信息2</li>
            <li>个人信息3</li>
            <li>个人信息4</li>
            <li>个人信息5</li>
            <li>个人信息6</li>
            <li>个人信息7</li>
            <li>个人信息8</li>
            <li>个人信息9</li>
            <li>个人信息1</li>
            <li>个人信息2</li>
            <li>个人信息3</li>
            <li>个人信息4</li>
            <li>个人信息5</li>
            <li>个人信息6</li>
            <li>个人信息7</li>
            <li>个人信息8</li>
            <li>个人信息9</li>
            <li>个人信息1</li>
            <li>个人信息2</li>
            <li>个人信息3</li>
            <li>个人信息4</li>
            <li>个人信息5</li>
            <li>个人信息6</li>
            <li>个人信息7</li>
            <li>个人信息8</li>
            <li>个人信息9</li>
            </ul>
        </scroll>  
    </div>
</template>

<script>
    import Scroll from '@/components/common/scroll/Scroll.vue'

    export default{
        name: 'Profile',
        components: {
            Scroll
        }
    }
</script>

<style scoped>
    .content{
        height: 300px;
        background-color: coral;
        overflow: hidden;
    }
</style>