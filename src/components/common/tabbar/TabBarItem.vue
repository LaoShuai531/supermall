<template>
      <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>    
            <slot name="item-icon-active"></slot>
        </div>
        <!-- <div v-bind:class="{active: isActive}"></div> -->
        <div v-bind:style="activeStyle">
            <slot name="item-text"></slot>
        </div>
        <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
        <div>首页</div> -->
      </div>
</template>

<script>
    export default {
        name: 'TabBarItem',
        // 父组件向子组件传值，子组件用props来接收
        props: {
            path: String,
            activeColor: {
                type: String,
                default: 'rgb(255, 87, 119)'
            }
        },
        data() {
            return {
                // isActive: true
            }
        },
        computed: {
            isActive() {
                // 这里面的$route是当前哪一个路由处于活跃状态就指的是哪个路由对象
                // /home -> item0(/home) = true
                // /home -> item1(/category) = false
                // /home -> item2(/shopcart) = false
                // /home -> item3(/profile) = false
                return this.$route.path.indexOf(this.path) !== -1
            },
            activeStyle() {
                return this.isActive ? {color: this.activeColor} : {} 
            }
        },
        methods: {
            itemClick() {
                this.$router.replace(this.path)
            }
        }
    }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img{
    height: 24px;
    width: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

  .active{
    color: rgb(255, 87, 119);
  }
</style>