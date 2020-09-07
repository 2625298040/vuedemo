<style lang="less" scoped>
.vivo {
  width: 100%;
  height: 100%;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  position: relative;
  .vivo-flex {
    background: #151414;
    padding-top: 3rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 15px;
    position: relative;
    .vivo-log {
      width: 50px;
      height: 50px;
      margin-right: 0.5rem;
      .img {
        width: 100%;
        height: 100%;
      }
    }
    .shops_name {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      min-width: 0;
      color: #fff;
      font-size: 15px;
      .shops_name {
        color: #fff;
        font-size: 20px;
      }
    }
    .shop_right {
      padding-left: 30px;
      .Collection {
        font-style: normal;
        display: block;
        float: left;
        background: none;
        border: 1px solid rgba(255, 255, 255, 0.9);
        border-radius: 33px;
        font-weight: normal;
        font-size: 0.8rem;
        padding: 0.2rem 0.6rem;
        color: #fff;
      }
    }
  }
}
.left {
  float: left;
}
.right {
  float: right;
}
.input {
  width: 20%;
  float: left;
}
</style>
<template>
  <div class="Store">
    <section class="vivo">
      <div class="vivo-flex">
        <div class="vivo-log">
          <img
            class="img"
            src="//img11.360buyimg.com/cms/jfs/t1/7954/10/8984/12420/5c110c69E17f8948f/1bc5cf5cb56386d1.jpg"
            alt
          />
        </div>
        <div class="shop_name">
          <h2 class="shops_name">vivo京东自营官方旗舰店</h2>
        </div>
        <div class="shop_right">
          <nav-bar>
            <div slot="center">
              <button class="Collection">
                <i></i>
                收藏
              </button>
            </div>
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
      <div>
        <div class="left">
          <el-input class="input" v-model="input" placeholder="11" v-on:focus="toKeywords"></el-input>
        </div>
        <div class="rigth">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
          </el-tabs>
          <router-view></router-view>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "Shops",
  data() {
    return {
      input: "",
    };
  },
  components: {
    //组件
    NavBar,
  },
  computed: {},
  created() {
    let a = [
      {
        goods_id: "7",
        goods_name:
          "舌里%20蛋黄酥12枚装雪媚娘饼干蛋糕早餐代餐网红面包休闲零食小吃500g/箱",
        money_now: "19.9",
        money_old: "25",
        norm: "{}",
        num: 1,
        shop_id: 8,
        takeover_addr: "北京市,北京市,昌平区,",
        user_id: 14,
      },
      {
        goods_id: "21",
        goods_name:
          "南极人女鞋夏季气垫鞋休闲鞋女士飞织透气女时尚学生板鞋运动跑步鞋韩版百搭潮鞋网鞋镂空",
        money_now: "73",
        money_old: "80",
        norm: "{}",
        num: 1,
        shop_id: 4,
        takeover_addr: "北京市,北京市,昌平区,",
        user_id: 14,
      },
    ];
    console.log(a);
  },
  activated() {
    //激活
  },
  deactivated() {
    //未激活
  },
  mounted() {
    //渲染
  },
  methods: {
    toKeywords() {
      console.log("focus");
      this.$router.push("/keywords");
    },
  },
  watch: {
    //监听
  },
};
</script>
