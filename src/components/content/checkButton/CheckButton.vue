<template>
  <div class="check-button" :class="{check: isChecked}">
    <!-- <div class="icon-selector" :class="{'selector-active': checked}"> -->
      <img src="~/assets/img/cart/tick.svg" alt="">
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
  // data() {
  //   return {
  //     // 如果传过来的isChecked为false，那么不显示选中的样式；否则，显示选中的样式
  //     checked: this.isChecked
  //   }
  // },
  // methods: {
  //   // selectItem() {
  //   //   this.$emit('checkBtnClick')
  //   // }
  // },
  // watch: {
	// 	isChecked(newValue) {
  //     this.checked = newValue
  //   }
  // }
}
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .check {
    background-color: red;
    border-color: red;
  }

  .icon-selector {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }

  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>