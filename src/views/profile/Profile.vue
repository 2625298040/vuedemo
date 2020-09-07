<template>
  <div style="background:#f2f2f2">
    <scroll id="ProfileScroll">
      <nav-bar class="cartNavBar" ref="cartNavBar">
        <div slot="left" class="left" v-on:click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center">
          <div class="title">我的京东</div>
        </div>
        <div slot="right" class="right">
          <el-dropdown trigger="click" @command="pushRouter">
            <span class="el-dropdown-link">
              <i class="el-icon-more-outline el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/home">首页</el-dropdown-item>
              <el-dropdown-item command="/keywords">分类搜索</el-dropdown-item>
              <el-dropdown-item command="/profile">我的京东</el-dropdown-item>
              <el-dropdown-item command="/profile" disabled>浏览记录</el-dropdown-item>
              <el-dropdown-item command="/profile" divided>我的关注</el-dropdown-item>
              <el-dropdown-item command="/profile" divided>分享</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </nav-bar>

      <div v-if="!$store.state.userInfo" @click="$store.commit('ROUTERTO','/login')">登录</div>

      <div v-else @click="signOut">退出</div>

      <!-- 内容 -->
      <div class="personal">
        <div class="personal-message">
          <div class="personal-left">
            <div class="personal-img">
              <img
                src="https://img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png"
                alt
              />
            </div>
            <div class="personal-sm">待实名认证></div>
          </div>

          <div class="user-right">
            <div class="ur-top">
              <span v-if="userInfo">{{userInfo.name}}</span>
            </div>
            <div class="ur-m" v-if="userInfo">用户名:{{userInfo.name}}</div>
          </div>

          <div class="user-bottom">
            <div class="ub jx">京享值4511</div>
            <div class="ub xb">小白信用67.5 ></div>
          </div>

          <div class="user-set">
            <!-- <img src="../../images/user-shezhi.png" alt /> -->
            账户设置
          </div>

          <div class="bheader"></div>
        </div>
        <div class="middle-one">
          <div class="middle-top-tu">
            <div class="tu-three">
              <span>0</span>
              <br />商品收藏
            </div>
            <div class="tu-three">
              <span>0</span>
              <br />店铺收藏
            </div>
            <div class="tu-three">
              <span>2</span>
              <br />我的足迹
            </div>
          </div>
        </div>
      </div>

      <div class="content-middle">
        <div class="middle-one">
          <div class="middle-top-tu">
            <div class="tu-one" @click="tomyOrder">
              <img src="./profile/1.png" alt />
              <br />代付款
            </div>
            <div class="tu-one">
              <img src="./profile/2.png" alt />
              <br />待收货
            </div>
            <div class="tu-one">
              <img src="./profile/3.png" alt />
              <br />退换/售后
            </div>
            <div class="tu-one">
              <img src="./profile/4.png" alt />
              <br />全部订单
            </div>
          </div>
        </div>

        <div class="middle-one">
          <div class="middle-top-tu">
            <div class="tu-two">
              <span>0张</span>
              <br />京东券
            </div>
            <div class="tu-two">
              <span>开通有礼</span>
              <br />白条
            </div>
            <div class="tu-two">
              <span>12个</span>
              <br />京豆
            </div>
            <div class="tu-two">
              <span>0元</span>
              <br />红包
            </div>
            <div class="tu-two">
              <img src="./profile/5.png" alt />
              <br />我的资产
            </div>
          </div>
        </div>

        <div class="middle-four">
          <div class="middle-top-tu">
            <div class="tu-four">
              <img src="./profile/7.png" alt />
              <br />客户服务
            </div>
            <div class="tu-four">
              <img src="./profile/8.png" alt />
              <br />我的预约
            </div>
            <div class="tu-four">
              <img src="./profile/9.png" alt />
              <br />高价回收
            </div>
            <div class="tu-four">
              <img src="./profile/10.png" alt />
              <br />全部订单
            </div>
            <div class="tu-four">
              <img src="./profile/11.png" alt />
              <br />全部订单
            </div>
            <div class="tu-four">
              <img src="./profile/12.png" alt />
              <br />全部订单
            </div>
            <div class="tu-four">
              <img src="./profile/13.png" alt />
              <br />全部订单
            </div>
            <div class="tu-four">
              <img src="./profile/14.png" alt />
              <br />全部订单
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
//公共组件
// import $ from "jquery";
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/contents/scroll/Scroll";
import { ROUTERTO } from "store/mutation-types";
export default {
  name: "Profile",
  data() {
    return {};
  },
  created() {
    // this.$store.state.userInfo=null;
    if (!this.$store.state.userInfo) {
      this.$store.commit("AUTO_CODE");
    }

    console.log(this.$store.state.userInfo);

    if (this.$store.state.userInfo.id != null) {
      this.$router.push("/profile");
    } else if (this.$store.state.userInfo.id == null) {
      this.$router.push("/login");
    }
  },
  components: {
    NavBar,
    Scroll,
  },
  methods: {
    pushRouter(path) {
      this.$router.push(path);
    },
    tomyOrder() {
      // if(this.$store.state.userInfo.id){
      //   this.$router.push("/myorder")
      // }else{
      //   this.$router.push("/login")
      // }

      console.log(this.$store.state.userInfo);

      if (this.$store.state.userInfo != null) {
        this.$router.push("/myorder");
      } else if (this.$store.state.userInfo == null) {
        this.$router.push("/login");
      }
    },
    routerTo(path) {
      this.$store.commit(ROUTERTO, path);
    },
    signOut() {
      this.$store.state.userInfo = null;
      this.$store.state.shopCart = null;
      this.$store.state.shopCartLength = 0;
      let path = window.location.origin + "/jd";
      localStorage.setItem(path, "");
      if (this.$store.state.userInfo == null) {
        this.$router.push("/home");
        window.location.reload();
      }
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  beforeRouteLeave(to, from, next) {
    // 如果取得页面时login页面，则记录页面
    if (to.path == "/login") {
      this.$store.state.loginHistory = from.path;
    }
    next();
  },
};
</script>
<style lang='less' scoped>
#ProfileScroll {
  height: calc(100vh - 49px);
  overflow: hidden;

  .personal {
    width: 100%;
    // height: 135px;
    position: relative;
    overflow: hidden;
    border-radius: 0 0 35px 35px;
    background: linear-gradient(90deg, #eb3c3c, #ff7459);
    box-sizing: border-box;
    min-height: 110px;
    padding-top: 25px;
    .middle-one {
      line-height: 30px;
      margin: 15px 0;
      background: #fff;
      .middle-top-tu {
        background: linear-gradient(90deg, #eb3c3c, #ff7459);
        display: flex;
        position: relative;
        .tu-one {
          width: 25%;
          text-align: center;
          color: #fff;
          font-size: 12px;
          img {
            width: 20px;
            height: 20px;
            margin-top: 10px;
          }
        }
        .tu-two {
          width: 20%;
          text-align: center;
          color: black;
          font-size: 12px;
          margin-top: 10px;
          span {
            font-size: 10px;
            line-height: 18px;
            height: 18px;
            color: black;
          }
          img {
            width: 20px;
            height: 20px;
          }
        }
        .tu-three {
          width: 33.3%;
          text-align: center;
          color: #fff;
          font-size: 12px;
          margin-top: 10px;
          span {
            font-size: 16px;
            line-height: 18px;
            height: 18px;
            color: #fff;
            font-weight: bold;
          }
          img {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    .personal-message {
      padding: 0 0 10px 15px;
      position: relative;

      .personal-left {
        float: left;
        .personal-img {
          width: 60px;
          height: 60px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
          border: 1px solid hsla(0, 0%, 100%, 0.4);
          border-radius: 60px;
          transform: translateZ(0);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .personal-sm {
          position: absolute;
          left: 12%;
          bottom: -20px;
          z-index: 1;
          transform: translateX(-50%);
          padding: 0 5px 0 6px;
          height: 15px;
          line-height: 15px;
          border-radius: 15px;
          font-size: 10px;
          white-space: nowrap;
          color: hsla(0, 0%, 100%, 0.7);
          background-color: rgba(0, 0, 0, 0.5);
        }
      }
      .user-right {
        flex: 1;
        padding: 0 0 0 80px;
        position: relative;
        .ur-top {
          font-size: 14px;
          color: #fff;
          display: flex;
          span:nth-child(2) {
            flex-shrink: 0;
            margin: 4px 0 0 10px;
            width: 12px;
            height: 12px;
            vertical-align: middle;
            // background: url("../../images/user-bi.png");
            background-size: 12px;
            display: inline-block;
          }
        }
        .ur-m {
          font-size: 12px;
          color: #f2f2f2;
          line-height: 18px;
          text-align: left;
        }
      }
      .user-bottom {
        div.ub {
          float: left;
          height: 16px;
          line-height: 16px;
          padding: 0 8px;
          margin: 6px 8px 0 0;
          border-radius: 10px;
          font-size: 10px;
          color: #fff;
          background: #c8483f;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: JDZH-Regular;
        }
        div.jx {
          width: 70px;
          margin-left: 20px;
        }
        div.xb {
          width: 93px;
        }
      }
      .user-set {
        position: absolute;
        right: 15px;
        top: -25px;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        color: rgba(76, 0, 0, 0.7);
        font-size: 12px;
        padding-left: 15px;
        height: 40px;
        line-height: 40px;
        img {
          display: inline-block;
          width: 12px;
          height: 12px;
          position: relative;
          top: 2px;
          right: 2px;
        }
      }
      .bheader {
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;
        font-size: 12px;
        margin-top: 40px;
      }
    }
  }

  .content-middle {
    background: #f2f2f2;
    height: 500px;
    .middle-one {
      line-height: 30px;
      margin: 15px 0;
      background: #fff;
      .middle-top-tu {
        display: flex;
        position: relative;
        .tu-one {
          width: 25%;
          text-align: center;
          color: #666;
          font-size: 12px;
          img {
            width: 20px;
            height: 20px;
            margin-top: 10px;
          }
        }
        .tu-two {
          width: 20%;
          text-align: center;
          color: #666;
          font-size: 12px;
          margin-top: 10px;
          span {
            font-size: 10px;
            line-height: 18px;
            height: 18px;
            color: #e93b3d;
          }
          img {
            width: 20px;
            height: 20px;
          }
        }
        .tu-three {
          width: 33.3%;
          text-align: center;
          color: #666;
          font-size: 12px;
          margin-top: 10px;
          span {
            font-size: 16px;
            line-height: 18px;
            height: 18px;
            color: #000;
            font-weight: bold;
          }
          img {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    .middle-four {
      background: #fff;
      margin: 15px 0;
      .middle-top-tu {
        overflow: hidden;
        position: relative;
        height: 130px;
        .tu-four {
          padding: 10px 0 8px;
          text-align: center;
          height: 65px;
          box-sizing: border-box;
          float: left;
          width: 25%;
          position: relative;
          color: #666;
          font-size: 12px;
          line-height: 24px;
          img {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    .middle-five {
      background: #fff;
      margin: 15px 0;
      span {
        position: relative;
        margin: 15px 0;
        background: #fff;
        height: 45px;
        line-height: 45px;
        font-size: 14px;
        width: 100%;
        float: left;
        display: block;
        text-align: left;
        i {
          text-align: right;
        }
      }
    }
  }
}
</style>
