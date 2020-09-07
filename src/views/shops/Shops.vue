<template>
  <div id="shops">
    <div class="shopHeader">
      <div>
        <router-link to="/ShopDetails" class="shopLink">
          <div class="shopLogo">
            <img
              src="//img11.360buyimg.com/cms/jfs/t1/7954/10/8984/12420/5c110c69E17f8948f/1bc5cf5cb56386d1.jpg"
            />
          </div>
          <div class="shopName">傲风AutoFull旗舰店</div>
          <div class="shopIcon">
            <span class="icon"></span>
          </div>
        </router-link>
        <div class="shopCollect">
          <button>收藏</button>
          <div class="shopCollectNumber">2178万人收藏</div>
        </div>
        <nav-bar>
          <div slot="right">
            <el-col>
              <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="/home" icon="el-icon-house">首页</el-dropdown-item>
                  <el-dropdown-item command="/keywords" icon="el-icon-search">分类搜索</el-dropdown-item>
                  <el-dropdown-item command="/cart" icon="el-icon-shopping-cart-1">购物车</el-dropdown-item>
                  <el-dropdown-item command="/profile" icon="el-icon-check">我的京东</el-dropdown-item>
                  <el-dropdown-item command="/profile" icon="el-icon-notebook-1">浏览记录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </div>
        </nav-bar>
      </div>
    </div>

    <div class="about">
      <div class="title">
        <ul>
          <input type="text" placeholder="搜商品" v-on:focus="toKeywords" />
          <li
            :class="{'active':indexTap == index}"
            v-for="(item,index) in lists"
            :key="index"
            @click="indexTap = index"
          >{{item}}</li>
        </ul>
        <div v-if="indexTap == 0">范德萨范德萨</div>
        <div v-if="indexTap == 1">范德萨范德萨</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "shops",
  data() {
    return {
      indexTap: 0,
      lists: [
        "title01",
        "title02",
        "title03",
        "title04",
        "title05",
        "title06",
        "title07",
        "title08",
        "title09",
        "title010",
      ],
    };
  },
  components: {
    //组件
    NavBar,
  },
  methods: {
    toKeywords() {
      console.log("focus");
      this.$router.push("/keywords");
    },
  },
};
</script>
<style lang="less" scoped>
.el-input__inner {
  width: 50px;
}
.shopHeader {
  background-image: url("./shops/1.png");
  height: 100px;
  width: 100%;
}
.shopHeader div .shopLink {
  display: block;
  padding-left: 70px;
  padding-top: 5%;
}
.shopLogo {
  width: 50px;
  height: 50px;
  position: absolute;
  margin: 3%;
  left: 5px;
  top: 10px;
}
.shopLogo img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.shopName {
  color: #fff;
  font-size: 16px;
}
.shopLink {
  width: 51%;
  float: left;
}
.shopLink .shopIcon .icon {
  background-image: url("./shops/3.png");
  background-repeat: no-repeat;
  display: block;
  height: 30px;
  background-size: 30px;
  margin-left: 10px;
  margin-top: 10px;
}
.shopCollect {
  float: left;
  padding-top: 5%;
}
.shopCollect button {
  background-color: #e93b3d;
  border: 1px solid #e93b3d;
  color: #fff;
  padding: 10% 20%;
  font-size: 14px;
  border-radius: 15px;
}
.shopCollect .shopCollectNumber {
  color: #fff;
  padding-top: 5%;
  font-size: 12px;
}
ul::-webkit-scrollbar {
  display: none;
}
.active {
  color: #cd1845;
  font-weight: bolder;
}
.title {
  float: left;
  width: 100%;
  overflow: hidden;
  ul {
    display: flex;
    align-items: center;
    overflow: auto;
    padding-left: 0;
    list-style: none;

    li {
      text-align: center;
      font-size: 16px;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      padding: 10px;
      margin: 5px;
    }
  }
}
</style>
