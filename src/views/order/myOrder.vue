<template>
  <div id="allOrder">
    <scroll
      class="ao-content"
      :probeType="3"
      :pull-up-load="true"
      ref="aoScroll"
    >
      <nav-bar class="ao-nav-bar">
        <div slot="left" v-on:click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center">我的订单</div>
        <div slot="right">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/home" icon="el-icon-s-home"
                >首页</el-dropdown-item
              >
              <el-dropdown-item command="/category" divided icon="el-icon-menu"
                >分类搜索</el-dropdown-item
              >
              <el-dropdown-item
                command="/shopcart"
                divided
                icon="el-icon-shopping-cart-2"
                >购物车</el-dropdown-item
              >
              <el-dropdown-item command="/profile" divided icon="el-icon-user"
                >我的京东</el-dropdown-item
              >
              <el-dropdown-item
                command="/category"
                divided
                icon="el-icon-s-order"
                >浏览记录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </nav-bar>
      <div class="inputBox">
        <div class="leftBox">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input"
            clearable
          ></el-input>
        </div>
        <div class="rightBox">
          <el-button v-if="!input">取消</el-button>
          <el-button v-else type="danger">搜索</el-button>
        </div>
      </div>

      <div class="bigBox">
        <el-tabs>
          <el-tab-pane label="全部" name="all">
            <order-box
              v-for="(i, index) in allState"
              :key="index"
              :data="i.id"
            ></order-box>
          </el-tab-pane>
          <el-tab-pane name="one">
            <span slot="label">
              待付款
              <el-badge
                :value="oneState.length"
                v-if="oneState"
                size="mini"
                class="item"
              ></el-badge>
            </span>
            <order-box
              v-for="(i, index) in oneState"
              :key="index"
              :data="i.id"
            ></order-box>
          </el-tab-pane>
          <el-tab-pane label="待收货" name="two">
            <order-box
              v-for="(i, index) in twoState"
              :key="index"
              :data="i.id"
            ></order-box>
          </el-tab-pane>
          <el-tab-pane label="已完成" name="three">
            <order-box
              v-for="(i, index) in threeState"
              :key="index"
              :data="i.id"
            ></order-box>
          </el-tab-pane>
        </el-tabs>
      </div>
    </scroll>
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";
import Scroll from "components/contents/scroll/Scroll";
import orderBox from "./childComp/orderBox";
import { getOrder } from "network/order";
import { haveData } from "common/utils";
export default {
  name: "AllOrder",
  created() {
    console.log(this.$store.state.userInfo);
    if (this.userId) {
      this.getAllOrder(this.userId, 1);
      this.getAllOrder(this.userId, 2);
      this.getAllOrder(this.userId, 3);
    }
  },
  data() {
    return {
      allState: [],
      oneState: null,
      twoState: null,
      threeState: null,
      input: "",
    };
  },
  watch: {
    userId(newVal) {
      console.log(newVal);
      this.getAllOrder(newVal, 1);
      this.getAllOrder(newVal, 2);
      this.getAllOrder(newVal, 3);
    },
  },
  components: {
    navBar,
    Scroll,
    orderBox,
  },
  methods: {
    getAllOrder(a, b) {
      class obj {
        constructor(user_id, state) {
          this.user_id = user_id;
          this.state = state;
        }
      }
      let one = new obj(a, b);
      haveData(getOrder, one, (res) => {
        console.log(res);
        if (res.code != 200) return;
        if (res.data.length >= 1) {
          if (res.data[0].state == 1) {
            this.oneState = res.data;
            this.oneState.forEach((item) => {
              this.allState.push(item);
            });
          } else if (res.data[0].state == 2) {
            this.twoState = res.data;
            this.twoState.forEach((item) => {
              this.allState.push(item);
            });
          } else {
            this.threeState = res.data;
            this.threeState.forEach((item) => {
              this.allState.push(item);
            });
          }
          console.log(this.allState);
        }
      });
    },
  },
  computed: {
    userId() {
      return this.$store.state.userInfo.id;
    },
  },
};
</script>
<style lang='less' scoped>
#allOrder {
  height: 100vh;
  overflow: hidden;
  position: relative;
  letter-spacing: 0.6px;
  .ao-content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 50px;
    width: 100%;
    .ao-nav-bar {
      position: relative;
      border-bottom: 1px solid rgba(230, 230, 230, 0.691);
    }
    .inputBox {
      display: flex;
      line-height: 44px;
      background-color: #fff;
      .leftBox {
        flex: 8;
      }
      .rightBox {
        flex: 2;
        .el-button {
          padding: 8px 18px;
          height: auto;
        }
      }
    }
  }
}
</style>

<style lang="less">
.el-input {
  width: 94%;
  .el-input__inner {
    background-color: rgb(241, 241, 241);
    border: none;
    height: 30px;
    border-radius: 30px;
  }
}
.el-tabs__nav-wrap::after {
  background-color: transparent;
}
.el-tabs__nav {
  width: 100%;
  background-color: #fff;
  border-radius: 0 0 20px 20px;
  .el-tabs__item {
    width: 25%;
    padding: 0;
  }
  .el-tabs__active-bar {
    width: 66px !important;
    left: 15px;
  }
}
</style>
