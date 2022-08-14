import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types"

export default {
    // context上下文
    addCart(context, payload) {
        // payload新添加的商品
        // 方法一
        // let oldProduct = null;
        // for (let item of state.cartList) {
        //     if (item.iid === payload.iid) {
        //         oldProduct = item
        //     }
        // }
        // 方法二(查找之前数组中是否有该商品；没有该商品的话，oldProduct就是null)
        let oldProduct = context.state.cartList.find((item => {
            return item.iid === payload.iid
        }))

        // dispatch：含有异步操作；而commit只是同步操作，都是提交 mutation.
        // 因为只能在mutation中才能够改变state中的值，
        // 然而mutation中只能进行同步操作，从而actions就出现了，actions允许异步和同步操作，
        // 但是对于actions的操作其实就是提交mutation来完成；

        // 2. 判断oldProduct是否有值
        if (oldProduct) {
            // oldProduct.count += 1
            context.commit(ADD_COUNTER, oldProduct)
        } else {
            payload.count = 1
            // context.state.cartList.push(payload)
            context.commit(ADD_TO_CART, payload)
        }
    }
}