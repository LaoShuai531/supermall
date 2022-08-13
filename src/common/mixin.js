// 混入
import { debounce } from "./utils"
import BackTop from "@/components/content/backTop/BackTop.vue"

export const itemListenerMixin = {
    data() {
        return {
            itemImageListener: null
        }
    },
    mounted() {
        // 定义一个变量来接收防抖后的数据
        const refresh = debounce(this.$refs.scroll.refresh, 100)

        // 对监听的事件做一个保存（这里就是典型的一个闭包）
        this.itemImageListener = () => { refresh() }

        this.$bus.$on('itemImageLoad', this.itemImageListener)
        console.log('我是混入中的内容');
    }
}

// import { debounce } from "./utils"
// export const itemListenerMixin = {
//     data() {
//         return {
//             itemImageListener: null,
//             refresh: null
//         }
//     },
//     mounted() {
//         // 定义一个变量来接收防抖后的数据
//         this.refresh = debounce(this.$refs.scroll.refresh, 500)

//         // 对监听的事件做一个保存（这里就是典型的一个闭包）
//         this.itemImageListener = () => { this.refresh() }

//         this.$bus.$on('itemImageLoad', this.itemImageListener)
//         console.log('我是混入中的内容');
//     }
// }

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backClick() {
            // console.log('可以监听');
            // this.$refs.scroll.scroll.scrollTo(0, 0, 1000)
            // 下面是封装的思想
            this.$refs.scroll.scrollTo(0, 0)
        },
    }
}