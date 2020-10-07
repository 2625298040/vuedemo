<template>
  <div class="homeFooter">
    <div class="home-footer">
      <ul class="home-sever">
        <li>
          <a v-if="!$store.state.userInfo" @click="tologin('/login')">登陆</a>
          <a v-else>{{ this.$store.state.userInfo.name }}</a>
        </li>
        <li>
          <a v-if="!$store.state.userInfo" @click="tologin('/login')">注册</a>
          <a v-else @click="signOut">退出</a>
        </li>
        <li>
          <a href>客户服务</a>
        </li>
        <li>
          <a v-on:click="toTop()">返回顶部</a>
        </li>
      </ul>
      <ul class="common-edition">
        <li>
          <a href>
            <img
              src="//m.360buyimg.com/mobilecms/jfs/t16423/186/2517573622/5186/75a541f7/5ab1c0deN947bdcba.png"
              alt
            />
          </a>
        </li>
        <li>
          <a href>
            <img
              src="//m.360buyimg.com/mobilecms/jfs/t18550/294/898388074/6574/3a8c5413/5ab0b8e9Ne9c48331.png"
              alt
            />
          </a>
        </li>
        <li>
          <a href>
            <img
              src="//m.360buyimg.com/mobilecms/jfs/t14581/218/2689195961/4696/203b872a/5ab1c0f2N51c3f1bb.png"
              alt
            />
          </a>
        </li>
      </ul>
      <div class="home-copyright">
        Copyright © 2004-2019 京东JD.com 版权所有
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeFooter",
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
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
    tologin() {
      this.$router.push("/login");
    },
    toTop() {
      this.$emit("ctoTop");
    },
  },
};
</script>
<style lang='less'  scoped>
.home-footer {
  padding-bottom: 10px;
  width: 100%;
  height: 150px;
  margin: 0 auto;
  background-color: #fff;
  .home-sever {
    height: 50px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
    padding: 4.26667vw 5.33333vw;
    li {
      float: left;
      text-align: center;
      width: 25%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 5px;
      box-sizing: border-box;
      a {
        position: relative;
        display: block;
        box-sizing: border-box;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #848689;
        font-size: 3.73333vw;
        padding-top: 3px;
        text-decoration: none;
      }
      a:after {
        content: "";
        display: inline-block;
        height: 70%;
        width: 1px;
        background-color: #d7d7d7;
        position: absolute;
        right: 0;
        top: 15%;
      }
    }
  }
  .common-edition {
    height: 50px;
    border-bottom: 1px solid #e5e5e5;
    padding: 1vw 2vw;
    li {
      float: left;
      text-align: center;
      width: 33%;
      a {
        display: block;
        width: 100%;
        position: relative;
        img {
          width: 7vh;
          vertical-align: middle;
        }
      }
    }
  }
  .home-copyright {
    text-align: center;
    color: #848689;
    font-size: 1vh;
    padding: 2vw 0;
  }
}
</style>
