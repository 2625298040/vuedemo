<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="left">
        <div class="category" slot="left" v-on:click="$store.commit('ROUTERTO','/category')"></div>
      </div>
      <div slot="center">
        <i class="jd"></i>
        <i class="fangdajing"></i>
        <div class="search-box">
          <input type="text" placeholder="好孩子婴儿推车" v-on:focus="toKeywords('/keyword')" />
        </div>
        <!-- <input v-model="input" placeholder="请输入内容" class="souIpt"  /> -->
      </div>
      <div slot="right">
        <!-- 登录前 -->
        <span v-if="!$store.state.userInfo" @click="tologin('/login')">登录</span>

        <!-- 登录后 -->
        <span v-else class="el-icon-s-custom" @click="toprofile('/profile')"></span>
      </div>
    </nav-bar>
    <hr />
    <scroll
      class="homeContent"
      :probeType="3"
      @parentScroll="HomeScroll"
      ref="homeScrollCom"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <div class="navbg">
        <home-rotation :cbanners="banners"></home-rotation>
        <hr />
      </div>
      <!-- 功能视图 -->
      <home-feature :cfeature="feature" @cfeatureAll="toFeatureAll"></home-feature>
      <hr />
      <div>
        <button style="width:100%" @click="changeDirection">改变商品数据排列</button>
      </div>
      <div class="tabContent">
        <div class="tabTitle">
          <button @click="tabClick('recommend')">recommend</button>
          <button @click="tabClick('news')">news</button>
        </div>
        <goods-list
          :cgoods="showGoodsList"
          :cpath="path"
          :cisDirection="parentDirection"
          :bus="bus"
        ></goods-list>
      </div>
    </scroll>
    <a class="toTop" @click="toTop" v-if="isShowBackTop"></a>
  </div>
</template>

<script>
//引入公共组件
import NavBar from "components/common/navbar/NavBar";
//引入公共组件中跟项目....
import Scroll from "components/contents/scroll/Scroll";
import GoodsList from "components/contents/goods/GoodsList";
// import GoodsList1 from "components/contents/goods/GoodsList1";
//引入当前组件的子组件
import HomeRotation from "./childComp/HomeRotation";
import HomeFeature from "./childComp/HomeFeature";
// import {getHomeBanner} from "network/home"
import { debounce } from "common/utils";
//引入其他文件
//引入网络请求模块部分组件/方法
import { getHomeBanner, getFeature } from "network/home";
//取商品数据
import { getGoods } from "network/goods";

export default {
  name: "Home",
  data() {
    return {
      path: "http://106.12.85.17:8090/public/image",
      banners: null,
      feature: [],
      input: "",
      num: 500,
      isShowBackTop: false,
      //接收商品的obj
      goods: {
        recommend: {
          page: 0,
          list: [],
        },
        news: {
          page: 10,
          list: [],
        },
      },
      tabCurrentType: "recommend", //当前被选中tab按钮的类型
      parentDirection: true, // goods展示的时候是否切换横向/纵向展示
      isLoadmore: true, //是否加载更多
      bus: "homeImageLoad",
      saveY: 0, //保存滚动条y的值
      postData: {
        like: "", //模糊查询
        order: {
          // c2_id: "UtoD",
          // money_now: "DtoU",
        },
        minMoney: 0,
        maxMoney: 0,
        exact: {
          //精确查找
        },
      },
    };
  },
  components: {
    NavBar,
    Scroll,
    GoodsList,
    HomeRotation,
    HomeFeature,
  },
  created() {
    //vue实例在创建时的钩子函数
    //页面在创建的时候，我们需要请求数据
    this.getHomeBanner();
    //获取功能视图数据
    this.getFeature(1);
    // var arr = [1,2,3,4,5]
    // this.filterFeatrue(100)
    this.getGoodsMax("recommend");
    this.getGoodsMax("news");
    console.log(this.feature);
  },
  activated() {
    console.log("组件激活状态");
    //在组件激活的时候，调整滚动条的位置。
    console.log(this.saveY);
    this.$refs.homeScrollCom.scroll.scrollTo(0, this.saveY, 0);
    // this.$refs.homeScrollCom.scrollTo1(0, this.saveY, 0);
    // this.$refs.homeScrollCom.refreshScroll();
  },
  deactivated() {
    console.log("组件未激活状态");
    //在组件离开的时候，记录滚动条的位置
    this.saveY = this.$refs.homeScrollCom.scroll.y;
    console.log(this.saveY);
  },
  computed: {
    //显示的goods是哪一个
    showGoodsList() {
      return this.goods[this.tabCurrentType].list;
    },
  },
  methods: {
    //取banner的数据
    getHomeBanner() {
      getHomeBanner().then((res) => {
        this.banners = res.data;
      });
    },
    //定义功能视图的数据
    getFeature() {
      getFeature().then((res) => {
        console.log(res);
        //if (res.code != 200) return console.log("getFeature没有请求到数据");
        let arr = res.data;
        for (let i = 0; i < arr.length / 10; i++) {
          this.feature.push([]);
          arr.forEach((item, index) => {
            parseInt(index / 10) == i ? this.feature[i].push(item) : "";
          });
        }
      });
    },
    //获取滚动条滚动的值
    HomeScroll(position) {
      // console.log(position);
      this.isShowBackTop = -position.y > 1000;
    },
    //回到顶部
    toTop() {
      // console.log("回到顶部");
      this.$refs.homeScrollCom.scrollTo1(0, 0, 300);
    },
    //取出home页现实的goods数据
    getGoodsMax(type) {
      // let page = this.goods[type].page + 1;
      let data = {
        page: this.goods[type].page + 1,
        pagesize: 10,
      };
      getGoods(data).then((res) => {
        // console.log(res);
        this.goods[type].page += 1;
        this.goods[type].list.push(...res.data);
        this.$refs.homeScrollCom.finishpullup();
        console.log(this.$refs.homeScrollCom);
        this.isLoadmore = true; //获取到一次数据后isLoadmore 才变为true，才能进行下一次请求
      });
    },
    //加载更多数据
    loadMore() {
      if (!this.isLoadmore) return; //如果this.isLoadmore 则代表上一次请求没完成。不能下一次请求
      this.isLoadmore = false;
      this.getGoodsMax(this.tabCurrentType);
    },
    //点击切换
    tabClick(type) {
      this.tabCurrentType = type;
    },
    //跳转category页面
    toCategory() {
      this.$router.push("/category");
    },
    //跳转关键字页面
    toKeywords() {
      console.log("focus");
      this.$router.push("/keywords");
    },
    //跳转login页面
    tologin() {
      this.$router.push("/login");
    },
    //
    toprofile() {
      this.$router.push("/profile");
    },
    //点击功能视图的全部，执行的跳转事件
    toFeatureAll() {
      console.log("功能视图组件的全部被点击触发");
      this.$router.push("/home/feature");
    },
    //切换功能视图横纵向展示事件
    changeDirection() {
      this.parentDirection = !this.parentDirection;
    },
  },
  mounted() {
    // 使用防抖方法，放置图片刷新被多次循环调用，在指定事件内，如果没有图片加载完成，我们在刷新scroll高度
    const refresh = debounce(this.$refs.homeScrollCom.refreshScroll, 50);
    this.$bus.$on(this.bus, () => {
      //当图片加载完成 在GoodsListItem中通过$bus总线 执行 当前方法 goodsImageLoad ,
      //然后对BScroll  进行重新计算高度
      // console.log("aaa");
      // this.$refs.homeScrollCom.refresh(); // this.$refs.homeScrollCom   =>> 没找到 refresh方法()
      refresh();
    });
  },
  filters: {
    changePrice: (data, str) => {
      return str + data;
    },
  },
};
</script>
<style lang='less' scoped>
.category {
  margin: 14px 0 0 15px;
  width: 20px;
  height: 18px;
  display: block;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgAgMAAAAdw9KTAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURUdwTP///////////waf0AoAAAADdFJOUwDjSYAlncUAAAAbSURBVBjTY5j/Hwq+MdTDmH+RmUgK6AuGhcsAU5tyB6Ji+x0AAAAASUVORK5CYII=)
    no-repeat;
  background-size: 100% 100%;
}
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav-bar {
  background-image: url(https://m.360buyimg.com/mobilecms/s1125x939_jfs/t1/130443/4/9312/6569/5f560374E6edf9c74/aac332227b6b2a16.png);

  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 100%/0 0 20% 20%;
}
.homeContent {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
}
.center i.jd {
  width: 20px;
  height: 15px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAMAAABpA6zvAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURUdwTOo8Puo7Peo7Pek7Peo7Pe0/Qek7PvE+SP9SUuo7Peo7Peo7Pus8P+o7Peo7Pek7PZSxd20AAAAQdFJOUwBV8eG+hyGkEQbGmWs/rthNA0r+AAAA5klEQVQ4y63T0RaDIAgAUEDRUjP//2u3CI/T1vJhvM3uVBAANGx5xwLgiwSZ3TI6uMYANSyuc7AUs03CUvgHRMTEflcZ76FezDGJTE/wTYNI9whhDePhNxAcDVveQWDJbgK6Y8FPQDBH2WdgPlZmYNQvj5D7tP8Ap4+2s8lQX56g4AK34bGPshJ8gbl/wrXoASOUDanlgvVFB3g2T5sGZ2on9xCp23BJ8tusPVzw7O/zhuxtHSIZDYGRo891WUemjeVZgsu4kmY8ju8Ifb2f/i3WV+/gzq0Zgs0xba0eHCSsj4zLR91f1fAfiWsqzlEAAAAASUVORK5CYII=)
    no-repeat;
  background-size: 20px 15px;
  margin: 14px 8px 0 20px;
  position: relative;
  z-index: 1;
  float: left;
}
.center i.jd::after {
  content: "";
  position: absolute;
  border-right: 1px solid #ddd;
  top: 0;
  left: 26px;
  height: 16px;
}
.center .fangdajing {
  display: block;
  width: 18px;
  height: 15px;
  background: url(https://st.360buyimg.com/so/images/search/jd-sprites.png?__inline=)
    no-repeat;
  background-position: -80px 0;
  background-size: 200px;
  margin: 15px 0 0 0;
  position: relative;
  z-index: 1;
  float: left;
}
.center .search-box {
  display: inline-block;
  width: 70%;
  border: none;
  border-radius: 15px;
  height: 30px;
  overflow: hidden;
  background: #f7f7f7;
  font-size: 12px;
  -webkit-box-align: center;
  line-height: 30px;
  position: absolute;
  top: 0;
  left: 0;
  margin: 1.8% 15%;
  padding-right: 10px;
  box-sizing: border-box;
}
.center .search-box input {
  border: none;
  outline: 0;
  background: 0 0;
  font-size: 12px;
  color: #232326;
  padding-left: 55px;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  height: auto;
  margin: 0 0 0 20px;
  vertical-align: middle;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
.souIpt {
  border-radius: 50px;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 30px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 90%;
}

.toTop {
  position: absolute;
  bottom: 100px;
  right: 5px;
  /* background-color: red; */
  background-image: url(~assets/img/common/top.png);
  display: block;
  width: 40px;
  height: 40px;
  background-size: 100%;
}
.tabContent {
  display: flex;
  flex-wrap: wrap;
}
.tabContent .tabTitle {
  width: 100%;
  display: flex;
}
.tabContent .tabTitle button {
  width: 50%;
  height: 64px;
  flex: 1;
  border: none;
}
.tabContent div {
  width: 100%;
  background: #fff;
}
.tabContent div ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
/* .tabContent div ul li{
  width:95%;
  margin:0 2.5%;
 

}
.tabContent div ul li img{
  width:40%;
}
.tabContent div ul li a{
  width:100%; 
  display: flex;
}
.tabContent div ul li a span{
  width:58%;
  padding:1%;
} */
.tabContent div ul li {
  width: 50%;
}
.tabContent div ul li img {
  width: 60%;
  margin: 0 20%;
}
.tabContent div ul li span {
  width: 98%;
}
.tabTitle button:first-child {
  border-right: 1px solid grey;
}
</style>
