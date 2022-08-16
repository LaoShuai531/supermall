<template>
    <div class="toast" v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script>
    export default {
        name: 'Toast',
        props: {
            // message: {
            //     type: String,
            //     default: ''
            // },
            // isShow: {
            //     type: Boolean,
            //     default: false
            // }
        },
        data() {
            return {
                message: '',
                isShow : false
            }
        },
        methods: {
            show(message='默认文字', duration=2000) {
                // duration = duration || 2000

                this.isShow = true
                this.message = message

                setTimeout(() => {
                    this.isShow = false
                    this.message = ''
                }, duration)
            }
        }
    }
</script>

<style scoped>
    .toast {
        position: fixed;
        height: 60px;
        width: 220px;
        top: 50%;
        left: 50%;
        z-index: 999;
        transform: translate(-50%, -50%);
        /* margin-left: -150px;
        margin-top: -75px; */
        background-color: rgba(28, 28, 28, 0.89);
        border-radius: 10px;
        color: #fff;
        text-align: center;
        line-height: 60px;
        font-size: 20px;
    }
</style>