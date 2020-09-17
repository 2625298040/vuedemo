<template>
  <div class="GoodsList">
    <router-link
      :to="'/details/'+i.id"
      :class="{transverse:isDirection,portrait:!isDirection}"
      v-for="(i,key) in cgoods"
      :key="key"
    >
      <img :src="path+i.img_cover" alt width="100%" @load="loadMore" />
      <p>{{i.name}}</p>
      <div class="box">
        <span class="left">{{i.money_now | fMoney}}</span>
        <span class="right">看相似</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "GoodsList",
  data() {
    return {};
  },
  props: {
    cgoods: {
      //goods[xxx].list是一个数组
      type: Array,
      default() {
        return [];
      },
    },
    path: {
      type: String,
      default: "http://106.12.85.17:8090/public/image/goods/",
    },
    isDirection: {
      type: Boolean, //true 代表独占一行 false 代表不独占一行
      default: true,
    },
  },
  components: {},
  computed: {},
  methods: {
    loadMore() {
      // 默认情况下,在vue中不存在有bus总线,使用的时候,需要我们先定义$bus总线
      this.$bus.$emit("goodsImageLoad");
    },
  },
  filters: {
    fMoney(msg) {
      return "$ " + parseFloat(msg).toFixed(2);
    },
  },
};
</script>
<style lang='less' scoped>
.GoodsList {
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  a {
    background-color: #fff;
    border: 1px solid #eeeeee;
    padding: 0 1% 6% 1%;
    text-decoration: none;
  }
  .transverse {
    width: 96%;
  }
  .portrait {
    width: 46%;
  }
  p {
    display: -webkit-box; //将对象转为弹性盒模型展示
    -webkit-box-orient: vertical; //设置弹性盒模型子元素的排列方式
    -webkit-line-clamp: 2; //限制文本行数
    overflow: hidden;
    color: rgb(37, 37, 37);
  }
  .left {
    color: #f23030;
  }
  .right {
    padding: 4px;
    font-size: 12px;
    border: 1px solid gray;
    color: rgb(66, 66, 66);
  }
}
</style>
