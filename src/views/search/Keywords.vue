<template>
  <div class="keyword">
    <nav-bar class="home-nav-bar">
      <div slot="left" class="left" @click="$router.go(-1)">&lt;</div>
      <div slot="center">
        <input placeholder="汽车香水" class="souIpt" v-model="keywordIpt" />
      </div>
      <div slot="right">
        <button @click="toSearch">搜索</button>
      </div>
    </nav-bar>

    <div class="keybox">
      <ul>
        <li v-for="item in keywordData" :key="item" @click="searchDetail(item.id)">
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>

    <div class="showbox" style="height: 600px;
      background: #efefef;
      margin-top: -13px;">
      <div class="searchBox" v-show="aww">
        <div class="searchBox-head" style="padding: 3px 15px 11px 0;height:29px;">
          <span
            style="font-size: 15px;line-height: 29px;color: #232326;float: left;width: 100px;padding-left: 1px"
          >热门搜索</span>
          <div style="float: right;color: #999;font-size: 15px;line-height: 29px;">
            <span :label="true" @click="aaa">隐藏</span>
          </div>
        </div>
        <div class="searchBox-contend">
          <span>
            <a href="javascript:;" style="color:#e93b3d">高清线</a>
          </span>
          <span>
            <a href="javascript:;" style="color:#e93b3d">户外急救包</a>
          </span>
          <span>
            <a href="javascript:;" style="color:#e93b3d">演唱会望远镜</a>
          </span>
          <span>
            <a href="javascript:;">自拍杆</a>
          </span>
          <span>
            <a href="javascript:;">保湿护手霜</a>
          </span>
          <span>
            <a href="javascript:;">办公室靠枕</a>
          </span>
          <span>
            <a href="javascript:;">电子秤</a>
          </span>
          <span>
            <a href="javascript:;">无线扩音器</a>
          </span>
          <span>
            <a href="javascript:;">电脑椅</a>
          </span>
          <span>
            <a href="javascript:;">洗面奶</a>
          </span>
          <span>
            <a href="javascript:;">薰衣草精油</a>
          </span>
          <span>
            <a href="javascript:;">北极星挂钟</a>
          </span>
        </div>
      </div>
      <div class="searchBox" v-show="!aww">
        <div class="searchBox-head" style="padding: 3px 15px 11px 0;height:29px;">
          <span
            style="font-size: 15px;line-height: 15px;color: #232326;float: left;width: 100px;padding-left: 1px"
          >热门搜索</span>
          <div style="float: right;color: #999;font-size: 15px;line-height: 15px;">
            <span :label="false" @click="aaa">显示</span>
          </div>
        </div>
        <div class="searchBox-contend">
          <div style>已隐藏搜索发现</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { get_jd_category_three } from "network/category";

export default {
  name: "keyword",
  data() {
    return {
      aww: true,
      keywordIpt: "",
      keywordName: [],
      jd_category_three: [],
      searchName: [],
      keywordData: [],
    };
  },
  components: {
    NavBar,
  },
  computed: {},
  created() {
    this.get_jd_category_three();
    this.$root.$children[0].isTabBar = false;
  },
  mounted() {
    // 当前组件的跟组件下的 app.vue组件 再去改变isTabbar得值
    this.$parent.isTabBar = false;
  },
  methods: {
    aaa() {
      this.aww = !this.aww;
    },
    toSearch() {
      this.$router.push("/search");
    },
    get_jd_category_three() {
      get_jd_category_three().then((res) => {
        if (res) this.jd_category_three.push(...res);
        for (let i = 0; i < res.length; i++) {
          this.keywordName = res[i].c3_name;
        }
      });
    },
    searchDetail(sid) {
      this.$router.push("/details/" + sid);
    },
  },
  watch: {
    keywordIpt(newVal) {
      this.searchName.forEach((i) => {
        if (newVal == i.name.substr(0, 1)) {
          document.querySelector(".keybox").style.display = "block";
          this.keywordData.push(i);
          this.$store.state.searchData = this.keywordData;
          console.log(this.$store.state.searchData);
        }
      });
      console.log(newVal);
    },
  },
  beforeRouteUpdate(to, from, next) {
    // 路由改变，组件被复用，
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.$root.$children[0].isTabBar = true;
    next();
  },
};
</script>
<style lang="less">
a {
  text-decoration: none;
}
.keyword {
  .left {
    width: 50px;
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
  .right button {
    padding-right: 10px;
    width: 40px;
    height: 30px;
    font-size: 12px;
    background: #e93b3d;
    color: #fff;
    border: none;
  }
  .searchBox {
    margin-bottom: 0;
    padding-left: 13px;
    margin-top: 15px;
    background: #fff;
    height: 200px;
  }
  .searchBox-contend {
    padding-right: 2px;
    overflow: hidden;
    font-size: 12px;
    text-align: center;
  }
  .searchBox-contend span {
    display: block;
    max-width: 100%;
    overflow: hidden;
    padding-right: 10px;
    padding-bottom: 10px;
    float: left;
    height: 13px;
    background: #f0f2f5;
    line-height: 23px;

    margin: 5px 5px;
    font-size: 12px;
  }
  .searchBox-contend span a {
    padding: 13px;
    color: #686868;
  }
  .showbox {
    height: 30px;
    margin: 29px auto 40px;
    line-height: 30px;
    text-align: center;
    color: #999;
    position: relative;
  }
  .keybox {
    background: #fff;
    width: 100%;
    position: absolute;
    top: 45px;
    left: 0;
    z-index: 100;
    display: none;
    ul {
      padding-left: 12px;
      display: block;
      li {
        height: 45px;
        line-height: 45px;
        display: block;
        padding-right: 12px;
        list-style: none;
        border-bottom: 1px solid #eeeeee;

        span {
          display: block;
          color: #232326;
          font-size: 13px;
          padding-top: 1px;
          padding-bottom: 1px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 200px;
          display: block;
        }
      }
    }
  }
}
</style>
