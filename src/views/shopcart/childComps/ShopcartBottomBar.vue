<template>
  <div class="bottom-bar">
    <!-- 左侧全选 -->
    <check-button class="select-all" :is-checked="isSelectAll" @click.native="checkClick" />
    <span>全选</span>
    <!-- 中间合计 -->
    <span class="total-price">合计:{{ totalPrice }}</span>
    <!-- 右侧结算 -->
    <span class="buy-product" @click="calcClick">去结算({{ checkLength }})</span>
  </div>
</template>

<script>

import CheckButton from '@/components/content/checkButton/CheckButton.vue'
// import Toast from 'components/common/toast/Toast'

import { mapGetters } from 'vuex'

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton,
    // Toast
  },
  data() {
    return {
      orderlist: []
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      // 只有选中的商品再计算总价(filter筛选，reduce汇总)
      return '￥' + this.cartList.filter(item => item.checked).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      // 去结算的结算算数量 
      return this.cartList.filter(item => item.checked).length
    },
    
    // 判断是否全部选中
    isSelectAll() {
      if(!this.cartList.length) return false
      // 1.使用filter：有没有选中的就返回false，对于不是0的数字，取反返回false；对于0，取反返回true
      // return !(this.cartList.filter(item => !item.checked).length)

      // 2.使用find：效率更高
      // 找到符合条件的立即返回当前遍历的元素，否则一直遍历，最终返回undefined，对undefined取反是true
      return !this.cartList.find(item => !item.checked)

      // 3.普通遍历：这个会有bug
      // for(let item of this.cartlist) {
      //   if(!item.checked) return false
      // }
      // return true
    }
  },
  methods: {
    // 全选按钮的点击事件
    checkClick() {
      if(this.isSelectAll) {  // 全选 
        this.cartList.forEach(item => item.checked = false)
      }else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if(!this.checkLength) {  // 如果没有商品选中，那么就弹出提示
        this.$toast.show('请选择商品',1000)
        // alert('请选择商品')
      }else if(this.$store.state.usr.length == 0){
        this.$toast.show('未登录账号，无法购买',1000)
      }else{
        // console.log(123)
        this.$toast.show('购买成功',1000)
        this.orderlist.push(...this.cartList.filter(item => item.checked))
        console.log(this.orderlist)
        this.$store.commit('addToOrder',this.orderlist)
        console.log(this.$store.state.orderList)
        this.$store.commit('handleDelete')
      }
    },
    
  }
}
</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-bar .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-bar .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-bar .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  } 
</style>