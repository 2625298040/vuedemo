<template>
  <div>
    <scroll id="cartScroll" v-loading="$store.state.loading">
      <nav-bar class="cartNavBar" ref="cartNavBar">
        <div slot="left" class="left" v-on:click="$store.commit('BACK')">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center">
          <div class="title">购物车</div>
          <!-- <p class="address">配送至:{{address}}</p> -->
        </div>
        <div slot="right" class="right">
          <!-- el-icon-more -->
          <el-dropdown trigger="click" @command="pushRouter">
            <span class="el-dropdown-link">
              <i class="el-icon-more-outline el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/home">首页</el-dropdown-item>
              <el-dropdown-item command="/keywords">分类搜索</el-dropdown-item>
              <el-dropdown-item command="/profile">我的京东</el-dropdown-item>
              <el-dropdown-item command="/profile" disabled
                >浏览记录</el-dropdown-item
              >
              <el-dropdown-item command="/profile" divided
                >我的关注</el-dropdown-item
              >
              <el-dropdown-item command="/profile" divided
                >分享</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </nav-bar>

      <div class="cart_address_box">
        <div class="cart_address">
          <div style="width: 80%; height: 100%">
            <div class="address" @click="open('distribution')" v-show="dsp">
              <p>配送至: {{ address | changeAddr }}</p>
              <!-- {{ addr | changeAddr }} -->
            </div>
          </div>
          <el-drawer
            title="配送至"
            direction="btt"
            :close-on-press-escape="false"
            :visible.sync="distribution"
            :append-to-body="true"
            size="70%"
          >
            <ul
              style="
                text-align: left;
                line-height: 20px;
                font-size: 14px;
                padding: 0 10px;
              "
              v-if="$store.state.userInfo"
            >
              <li
                style="padding: 10px 0"
                v-for="(item, index) in allAddress"
                :key="index"
                @click="changeAddr(item)"
              >
                <!-- 使用过滤器吧地址进行拼接 -->
                {{ item.takeover_addr | changeAddr }}
              </li>
            </ul>
            <div v-else>省市县三级列表菜单</div>
          </el-drawer>
          <span class="btn" @click="isshow">{{ msg }}</span>
          <div></div>
        </div>
      </div>
      <div v-if="!$store.state.userInfo" class="shopcart_login_bar">
        登录可以同步账号下的购物车信息
        <router-link tag="a" to="/login">登录</router-link>
      </div>
      <div>
        <!-- 正常判断购物车数据 ShopCart 为空。。 -->
        <div class="cart_empty" v-if="shopCart == null || shopCart.length == 0">
          <img :src="urlPath + '/routine/cart_empty.png'" alt />
          <p>您的购物车还没有任何数据，请添加商品</p>
        </div>
        <div v-else>
          <cart-goods
            v-for="(item, key) in shopCart"
            :key="key"
            :shopName="key"
            ref="cart_goods"
            @checknorm="selectNorm"
            :goods="item"
            @ischeckshopall="is_check_shop_all"
          ></cart-goods>
        </div>
      </div>
      <hr />
      <div
        v-if="!$store.state.userInfo && localShopCart.length > 0"
        style="background-color: #fff; margin-top: 10px"
      >
        <div v-for="(item, i) in localShopCart" :key="i">
          {{ item }}
          <hr />
        </div>
      </div>
      <div class="shopBox">aaaa</div>
    </scroll>
    <cart-tab-bar
      ref="tabBar"
      @checkall="check_shop_all"
      @confirm="confirmOrder"
    ></cart-tab-bar>
  </div>
</template>

<script>
//公共组件
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/contents/scroll/Scroll";
//内部子组件
import CartTabBar from "./childComp/CartTabBar";
import CartGoods from "./childComp/CartGoods";

import { get_user_address } from "network/address";
import { UpdataShopCart } from "network/shopCart";
import { SET_USERINFO } from "store/mutation-types";
export default {
  name: "Cart",
  data() {
    return {
      localShopCart: [], //本地存储的购物车
      distribution: false,
      dsp: true,
      msg: "编辑商品",
    };
  },
  created() {
    if (!this.$store.state.userInfo) {
      //请求自动登录接口  传递一个回调函数
      this.$store.state.loading = true;
      this.$store.dispatch("autocode", {
        resolve: (res) => {
          if (res.code != 200) return;
          this.$store.commit(SET_USERINFO, {
            data: res.data,
            success: (res) => {
              this.$store.dispatch("getShopCart", res.data.user.id);
            },
          });
          this.$store.dispatch("getShopCart", res.data.user.id);
        },
      });
    }
    //获取本地存储中购物车的数据
    this.getLocalShopCart();
    console.log(this.getLocalShopCart);
    //如果用户存在。则网络请求shopCart数据
    if (this.$store.state.userInfo) {
      // this.getShopCart();
      this.$store.dispatch("getShopCart", this.$store.state.userInfo.id);
    } else {
      this.getLocalShopCart();
    }
    // if (!this.$store.state.userInfo) {
    // }
  },
  components: {
    NavBar,
    Scroll,
    CartTabBar,
    CartGoods,
  },
  beforeRouteLeave(to, from, next) {
    //如果去的页面时login 页面。 则记录页面
    if (to.path == "/login") this.$store.state.loginHistory = from.path;
    //离开cart页面的时候，修改购物车数据
    if (this.$store.state.userInfo) this.upDateShopCart();
    next();
  },
  computed: {
    allAddress() {
      return this.$store.state.allAddress;
    },
    shopCartLength() {
      return this.$store.state.shopCartLength;
    },
    urlPath() {
      return this.$store.state.urlPath;
    },
    address() {
      //取出地址中的指定默认配送地址
      let addr = "";
      if (this.$store.state.userInfo) {
        addr = this.$store.state.ShoppingAddress.takeover_addr;
        console.log(this.$store.state.ShoppingAddress);
      } else {
        let data = window.localStorage.getItem(this.localPath);
        if (data != null && data != "")
          addr =
            data.orderAddr != undefined
              ? data.orderAddr
              : "北京市,北京市,昌平区,";
        else addr = "北京市,北京市,昌平区,";
      }
      return addr.split(",").join(" ");
    },
    shopCart() {
      return this.$store.state.shopCart;
    },
    localPath() {
      //本地存储的key
      return this.$store.state.localData;
    },
  },
  methods: {
    isshow() {
      this.$refs.cart_goods[0].isshow = !this.$refs.cart_goods[0].isshow;
      console.log(this.$refs.cart_goods[0].isshow);
      this.dsp = !this.dsp;
      if (this.dsp) {
        this.msg = "编辑商品";
      } else {
        this.msg = "完成";
      }
    },
    changeAddr(val) {
      //存到本地存储中 ， 存储的数据，不去存截取后的值，直接存原值
      this.addr = val;
      console.log(val);
      this.$store.state.ShoppingAddress = null;
      this.$store.state.ShoppingAddress = val;
      let data = window.localStorage.getItem(this.localPath);
      if (data != null) {
        data = JSON.parse(data);
      } else {
        data = {};
      }
      data.orderAddr = val;
      window.localStorage.setItem(this.localPath, JSON.stringify(data));
      this.distribution = false;
    },

    pushRouter(path) {
      this.$router.push(path);
      // this.$store.commit('ROUTERTO',path)
    },
    open(val) {
      if (val == "distribution") {
        this.distribution = true;
        if (!this.$store.state.userInfo) {
          //打开省市县 地址
          this.$store.state.allAddress = "弹出个选择框-省-市-县";
          //在弹出框内 的县的位置，点击选择之后。把 省市县的值赋值给  this.$store.state.allAddress
          //并且  "省,市,县," ==>  ['省','市','县','']
          return;
        }
        if (this.allAddress == null) {
          get_user_address({
            user_id: this.$store.state.userInfo.id,
          }).then((res) => {
            this.$store.state.allAddress = res.data;
          });
        }
      }
    },
    //是否是全选商品
    is_check_shop_all() {
      let cart_goods = this.$refs.cart_goods;
      let tabbar = this.$refs.tabBar;
      let allCheck = tabbar.$el.querySelector("#allCheck");
      let temp = 0;
      cart_goods.forEach((item) => {
        let shopNameCheck = item.$el.querySelector(
          ".shop_name input[type=checkbox]"
        );
        if (shopNameCheck.checked) {
          temp++;
        }
      });
      allCheck.checked = temp == cart_goods.length ? true : false;
    },
    //全选按钮事件
    check_shop_all() {
      let e = event;
      this.$refs.cart_goods.forEach((item) => {
        //调用组件内的与全选有关的方法
        item.aaa(e.target.checked);
        item.$el.querySelector(".shop_name input[type=checkbox]").checked =
          e.target.checked;
      });
      if (e.target.checked) {
        this.$store.state.totalPayment = this.$store.state.ShopCartMoneyAll;
        this.$store.state.totalNum = this.$store.state.ShopCartGoodsNum;
      } else {
        this.$store.state.totalPayment = this.$store.state.totalNum = 0;
      }
    },
    selectNorm(obj) {
      console.log(obj);
    },
    //去结算的方法，被carttabbar组件调用
    confirmOrder() {
      //获取cart页面中被选择的订单商品
      let cart_goods = this.$refs.cart_goods;
      this.$store.state.payMentData = [];
      cart_goods.forEach((item) => {
        //获取每个组件内。商品前的复选框组
        let inputAll = item.$el.querySelectorAll(".radio input");
        // console.log(inputAll);
        for (let i = 0; i < inputAll.length; i++) {
          if (inputAll[i].checked) {
            //可以定义cart全局的，方便以后自己及组件使用
            this.$store.state.payMentData.push(item.goods[i]);
          }
        }
      });
      // this.$router.push("/confirm_order/" + JSON.stringify(arr));

      //把购物车提交到订单内的数据 存储到本地中
      let data = window.localStorage.getItem(this.$store.state.localData);
      data =
        data != undefined && data != null && data != "" ? JSON.parse(data) : {};
      //为 本地存储中添加 payMentData ， 值为提交到confirmOrder中的数据
      data.payMentData = this.$store.state.payMentData;
      //存储
      window.localStorage.setItem(
        this.$store.state.localData,
        JSON.stringify(data)
      );
      this.$router.push("/confirm_order/aaa");
    },
    //在页面离开的时候。调用方法，修改数据库的值
    upDateShopCart() {
      //解构赋值购物车当前数据 shopCart
      let shopCart = { ...this.$store.state.shopCart };
      //解构赋值购物车历史数据
      let shopCartHistory = { ...this.$store.state.shopCartHistory };
      for (let i in shopCart) {
        for (let j = 0; j < shopCart[i].length; j++) {
          //如果当前数据和历史数据值不相等
          if (
            shopCart[i][j].ischeck != shopCartHistory[i][j].ischeck ||
            shopCart[i][j].num != shopCartHistory[i][j].num ||
            shopCart[i][j].norm != shopCartHistory[i][j].norm
          ) {
            //就请求修改购物车的接口  把数据传递上去。修改购物车数据
            let data = {};
            data.id = shopCart[i][j].id;
            data.num = shopCart[i][j].num;
            data.ischeck = shopCart[i][j].ischeck;
            data.norm = shopCart[i][j].norm;
            data.takeover_addr = shopCart[i][j].takeover_addr;
            //执行网络请求
            UpdataShopCart(data).then((res) => {
              console.log(res);
            });
          }
        }
      }
    },
    getLocalShopCart() {
      let data = window.localStorage.getItem(this.localPath);
      console.log(data);
      data = data != null ? JSON.parse(data) : [];
      this.localShopCart = data.shopCart ? data.shopCart : [];
      console.log(this.localShopCart);
    },
  },
  filters: {
    changeAddr(val) {
      //去掉重复值的操作。。。。。
      // console.log(val);
      let addr = val.split(",");
      let temp = [];
      for (let i = 0; i < addr.length; i++) {
        if (temp.indexOf(addr[i]) == -1) {
          temp.push(addr[i]);
        }
      }
      addr = temp.join("");
      return addr;
    },
  },
};
</script>
<style lang='less' scoped>
@font-size: 36px;

.cart_address_box {
  background-color: #fff;
  position: sticky;
  z-index: 100;
  height: 50px;
  .cart_address {
    position: relative;
    padding: 0 18px;
    height: 50px;
    border-radius: 0 0 0.6rem 0.6rem;
    line-height: 50px;
    display: flex;
    font-size: 0.65rem;
    color: #262626;
    .address {
      position: relative;
      flex: 1;
      padding: 0 18px;
      white-space: nowrap;
      overflow: hidden;
    }
    .address::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -6px;
      background-image: url(//wq.360buyimg.com/wxsq_trade/cart/main/images/sprite.img_default_437_9dfdf506.png);
      background-position: -80px -104px;
      background-size: 126px 118px;
      width: 12px;
      height: 12px;
    }
    .address::after {
      content: "";
      position: absolute;
      width: 1px;
      height: 0.5rem;
      background: #bfbfbf;
      top: 50%;
      right: 0;
      margin-top: -0.25rem;
    }
    .btn {
      display: block;
      position: relative;
      flex-shrink: 0;
      margin-left: 0.9rem;
    }
  }
}

#cartScroll {
  height: calc(100vh - 49px);
  overflow: hidden;
  background-color: #f2f2f2;
  color: #262626;
  .cartNavBar {
    background-color: #fff;
    .title {
      font-size: @font-size / 2;
      line-height: 24px;
    }
    .address {
      font-size: 14px;
      line-height: 20px;
      margin: 0 auto;
      max-width: 60%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .shopBox {
    margin-top: 15px;
    border-radius: 10px;
    background-color: #fff;
    height: 5000px;
  }
}
body {
  margin: 0;
}
</style>
