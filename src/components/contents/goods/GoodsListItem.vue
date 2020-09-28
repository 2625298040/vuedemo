<template>
  <div
    :class="{
      GoodsListItem:true, 
      transverse:isDirection,
      column:!isDirection
      }"
  >
    <!-- @click="toDetails(citem)" -->
    <!-- <a href="javascript:;"> -->
    <router-link tag="a" :to="'/details/'+citem.id">
      <img :src="itemPath+'/goods/'+ citem.img_cover " @load="loadMore" />
      <span class="similar_text">{{citem.name}}</span>
      <span style="float:left">{{citem.money_now}}</span>
      <span style="float:right" @click="/details/">看相似</span>
    </router-link>
    <!-- </a> -->
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    citem: {
      type: Object,
      default() {
        return {};
      },
    },
    itemPath: {
      type: String,
      default: "http://106.12.85.17:8090/public/image",
    },
    isDirection: {
      type: Boolean, //true 代表独占一行 false 代表不独占一行
      default: true,
    },
    bus: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      num: 0,
    };
  },
  components: {},
  computed: {
    //如果想要计算宽度，则需要在计算属性中，进行宽度/数量的公式
  },
  created() {},
  mounted() {},
  methods: {
    toDetails(item) {
      console.log(item);
      this.$router.push("/details/" + item.id);
    },
    loadMore() {
      //默认情况下。在vue中时不存在有bus总线，使用的时候，需要我们先定义$bus总线
      if (!this.bus) return;
      this.$bus.$emit(this.bus);
    },
  },
};
</script>
<style scoped>
/* .GoodsListItem {
  border-bottom: 3px solid black;
} */
.GoodsListItem.transverse {
  /* transverse 横向---独占一行 */
  width: 100%;
}
.GoodsListItem.transverse a {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  text-decoration: none;
  color: black;
  line-height: 20px;
}
.GoodsListItem.transverse a img {
  width: 40%;
}
.GoodsListItem.transverse a span {
  display: block;
  width: 60%;
  background: pink;
  text-align: left;
}
.GoodsListItem.column {
  /*column-- 多列---一行有2个 */
  width: 48%;
  margin: 0 1%;
}
.GoodsListItem.column img {
  display: block;
  width: 50%;
  margin: 10px auto;
}
.GoodsListItem.column span {
  text-align: left;
  display: block;
  line-height: 40px;
  box-sizing: border-box;
  height: 31px;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  color: #232326;
  margin-top: 5px;
  line-height: 16px;
  margin-bottom: 3px;
  padding: 0 4px;
}
</style>>style>
