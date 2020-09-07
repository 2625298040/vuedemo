<style lang="less" scoped>
#confirmOrder {
  .scroll {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 49px;
    overflow: hidden;
    .address {
      border-bottom: 1px solid baack;
      box-shadow: 0 1px 1px burlywood;
      margin-bottom: 10px;
      padding: 10px;
      .selectAddr {
        text-align: left;
        h2 {
          margin-bottom: 8px;
        }
      }
    }
    .replaceAddr {
      position: fixed;
      top: 44px;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.3);
      font-size: 14px;
      > div {
        position: absolute;
        top: 20%;
        left: 15%;
        right: 15%;
        bottom: 30%;
        background-color: #fff;
        padding: 10px;
        .t {
          line-height: 30px;
        }
        .a {
          line-height: 18px;
          margin-bottom: 10px;
        }
        .all {
          li {
            padding: 5px 0;
            display: flex;
            span {
              display: block;
            }
            .l {
              flex: 0.5;
              margin: 0 10px;
            }
            .r {
              flex: 9.5;
              text-align: left;
            }
          }
        }
        .btn-box {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 40px;
          display: flex;
          margin-bottom: 10px;
          button {
            flex: 1;
            margin: 0 10px;
            height: 40px;
            border-radius: 20px;
            border: none;
            color: red;
          }
          button.ok {
            background-color: red;
            color: #fff;
          }
        }
      }
    }
  }
}
#OrderScroll {
  height: calc(100vh - 49px);
  overflow: hidden;
  .OrderNavBar {
    background: #fff;
  }
  .Order-address {
    padding-bottom: 16px;
    background-size: 64px 5px;
    border-top: 1px solid #ddd;
    padding: 10px 15px;
    line-height: 25px;
    .addAddress {
      border: none;
      width: 100%;
      text-align: left;
      background: #fff;
      font-size: 18px;
      outline: none;
    }
    ul {
      position: relative;
      padding-right: 30px;
      li {
        font-size: 14px;
        text-align: left;
        &:first-child {
          font-weight: bold;
        }
        &:nth-child(2) {
          color: #666;
        }
      }
    }
  }
  .order-list {
    dd {
      margin: 0;
    }
    background: #fff;
    margin-top: 15px;
    margin-bottom: 15px;
    position: relative;
    border-radius: 10px;
    dt {
      display: block;
      position: relative;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 700;
      border-bottom: 1px solid #efebeb;
      padding: 0 10px;
      text-align: left;
      i {
        display: inline-block;
        vertical-align: middle;
        margin-top: -2px;
        margin-right: 5px;
        width: 16px;
        height: 15px;
        background-size: 16px auto;
      }
    }
    dd.order-shopm {
      position: relative;
      min-height: 75px;
      padding: 0;
      font-size: 12px;
      padding: 15px 15px;
      margin: 0;
      border-bottom: 1px solid #efebeb;
      img {
        width: 75px;
        height: 75px;
        position: absolute;
        top: 15px;
        left: 10px;
        border-radius: 6px;
      }
      .order-sm-r {
        color: #333;
        line-height: 20px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-left: 85px;
        text-align: left;
        p {
          color: red;
          font-size: 16px;
          span {
            color: #999;
            font-size: 12px;
          }
        }
      }
      div.zhuyi {
        padding: 0 0 0 85px;
        overflow: hidden;
        position: relative;
        li {
          float: left;
          font-size: 12px;
          color: #999;
          margin-right: 25px;
          img {
            width: 15px;
            height: 15px;
            margin: -2px 2px 0 0;
            position: absolute;
            top: 1px;
            left: 67px;
          }
          img.jiage {
            position: absolute;
            top: 1px;
            left: 195px;
          }
        }
      }
    }
    dd.peisong {
      padding: 10px 20px 10px 0;
      position: relative;
      border-bottom: 1px solid #efebeb;
      strong {
        position: absolute;
        left: 0;
        top: 12px;
        font-weight: 400;
        font-size: 16px;
        padding: 0 10px;
      }
      p {
        color: #666;
        font-size: 12px;
        text-align: right;
        margin-top: 5px;
      }
      .pei-justify {
        overflow: hidden;
        margin: 0;
        color: #999;
        font-size: 12px;
        padding: 0 10px;
        text-align: right;
        .left {
          float: left;
          font-size: 12px;
        }
      }
    }
  }
  div.detailed {
    margin-bottom: 15px;
    dd {
      margin: 0;
    }
    dd.detail {
      background: #fff;
      padding: 10px 20px 10px 0;
      position: relative;
      border-bottom: 1px solid #efebeb;
      strong {
        position: absolute;
        left: 0;
        top: 12px;
        font-weight: 400;
        font-size: 16px;
        padding: 0 10px;
      }
      p {
        color: #666;
        font-size: 12px;
        text-align: right;
        margin-top: 5px;
      }
    }
  }
  div.shopMoney {
    background: #fff;
    dd {
      margin: 0;
    }
    dd.detail {
      padding: 0 20px 0 0;
      position: relative;
      strong {
        position: absolute;
        left: 0;
        top: 12px;
        font-weight: 400;
        font-size: 14px;
        padding: 0 10px;
      }
      p {
        color: red;
        font-size: 12px;
        text-align: right;
        padding-top: 10px;
      }
    }
  }
  a.hdfk {
    display: block;
    position: relative;
    padding: 10px 50px;
    overflow: hidden;
    background: #fff;
    i {
      display: block;
      width: 40px;
      height: 40px;
      position: absolute;
      top: 50%;
      margin-top: -20px;
      left: 6px;
      background-size: 100%;
    }
    h3 {
      margin: -1px 0;
      font-size: 14px;
      font-weight: 400;
      color: #333;
    }
    p {
      font-size: 10px;
      color: #999;
    }
    &::after {
      content: "";
      position: absolute;
      display: inline-block;
      width: 6px;
      height: 6px;
      border-top: 2px solid #ccc;
      border-left: 2px solid #ccc;
      top: 50%;
      transform: translate(0, -50%) rotate(135deg);
      right: 11px;
    }
  }
  div.jd_footer {
    margin: 25px 0 75px;
    div {
      display: block;
      width: 100px;
      height: 20px;
      margin: 0 auto;
      background-size: 100%;
    }
  }
}
.el-message-box {
  width: 80% !important;
}
</style>
<template>
  <div id="confirmOrder">
    <scroll id="OrderScroll" class="scroll">
      <nav-bar>
        <div slot="left" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center">确认订单</div>
        <div slot="right">
          <span @click="$store.commit('ROUTERTO','/home')" v-if="!isShow">去登录</span>
        </div>
      </nav-bar>
      <div v-if="isShow">
        <div class="address">
          <div v-if="$store.state.ShoppingAddress == null">
            <button @click="$store.commit('ROUTERTO','/newAddr/0')">+ 请添加地址</button>
          </div>
          <div v-else class="selectAddr" @click="$store.commit('ROUTERTO','/allAddr')">
            <h2>
              {{address.takeover_name}}
              <span>{{ address.takeover_tel | changeTel}}</span>
            </h2>
            <p>{{address.takeover_addr}}</p>
          </div>
        </div>
      </div>
      <div v-if="!isShow">
        用户没有登录的显示
        <div>
          电话
          <input type="text" />
        </div>
        <div>
          验证码
          <input type="text" />
        </div>
        <hr />
        <div>配送信息</div>
        <div>
          姓名
          <input type="text" />
        </div>
        <div>
          电话
          <input type="text" />
        </div>
        <div>
          城市
          <input type="text" />
        </div>
        <div>
          详细信息
          <input type="text" />
        </div>
        <div>
          <input type="button" value="提交" />
        </div>
        {{shop}}
      </div>
      <div class="order-con">
        <div class="order-list" v-for="(item,index) in shop" :key="index">
          <dt>
            <i></i>
            <span>{{item.shop_name}}</span>
          </dt>
          <dd class="order-shopm">
            <img :src="$store.state.urlPath+'/goods/'+item.img_cover" alt />
            <div class="order-sm-r">
              <strong>{{item.goods_name}}</strong>
              <p>
                ￥{{item.money_now}}.00
                <span style="float:right">x{{item.num}}</span>
              </p>
            </div>
            <div class="zhuyi">
              <ul>
                <li>
                  <img alt />
                  支持7天无理由退货
                </li>
                <li>
                  <img alt class="jiage" />
                  价格说明
                </li>
              </ul>
            </div>
          </dd>

          <dd class="peisong">
            <strong>配送</strong>
            <p>快递运输</p>
            <div class="pei-justify">
              <div class="left">中小件送货时间</div>工作日、双休日与节假日均可送货
            </div>
          </dd>

          <dd class="peisong">
            <strong>退换无忧</strong>
            <div style="font-size: 12px;color:#666;line-height:24px;">退换货可获运费赔付或免费取件</div>
            <p style="color:red;float: right;margin-top: -20px;">商家赠送</p>
          </dd>

          <dd class="peisong">
            <strong>店铺备注</strong>
            <p>选填,给商家留言</p>
          </dd>
        </div>
        <div class="detailed">
          <dd class="detail">
            <strong>发票信息</strong>
            <p>个人商品明细</p>
          </dd>
          <dd class="detail">
            <strong>礼品卡</strong>
            <p>无可用</p>
          </dd>
          <dd class="detail">
            <strong>红包</strong>
            <p>不可用</p>
          </dd>
          <dd class="detail">
            <strong>京豆</strong>
            <p>共12个,未满1000个,暂不可使用</p>
          </dd>
        </div>

        <div class="shopMoney" v-for="(i,j) in shop" :key="j">
          <dd class="detail">
            <strong>商品金额</strong>
            <p>￥{{i.money_now*i.num}}.00</p>
          </dd>
          <dd class="detail">
            <strong>运费</strong>
            <p>+￥0.00</p>
          </dd>
          <h5 style="margin-right:18px;text-align:right">实际金额：￥{{i.money_now*i.num}}.00</h5>
        </div>

        <el-button
          type="primary"
          round
          style="width:90%;font-size:16px;margin-top:20px"
          @click="payment"
        >在线支付</el-button>
        <!-- <button @click="payment">确认订单-跳转支付页面-也可以打开一个模态框 进行支付</button> -->
        <div class="jd_footer">
          <div></div>
        </div>
      </div>
      <!-- 用户登陆后 订单没有详细配送地址的 遮罩层 -->
      <div v-if="replaceAddr" class="replaceAddr">
        <div>
          <h3 class="t">更换地址</h3>
          <div class="a">您在浏览商品是更换了地址，是否匹配更换</div>
          <ul class="all">
            <li
              v-for="(item,index) in $store.state.allAddress"
              :key="index"
              @click="repAddrId = item.id"
            >
              <span class="l">
                <input type="radio" :id="'a'+item.id" :checked="repAddrId == item.id" />
              </span>
              <span class="r">
                <label :for="'a'+item.id">{{item.takeover_addr | changeAddr}}</label>
              </span>
            </li>
          </ul>
          <div class="btn-box">
            <button @click="$store.commit('ROUTERTO','/newAddr/0')">新建地址</button>
            <button @click="replAddr(repAddrId)" class="ok">确认</button>
          </div>
          {{repAddrId}}
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/contents/scroll/Scroll";
import { create_order, create_details_order } from "network/order";
//获取用户地址的 网络请求
import { get_user_address } from "network/address";
import { UpdataShopCart } from "network/shopCart";
export default {
  name: "ConfirmOrder",
  components: {
    //组件
    NavBar,
    Scroll,
  },
  data() {
    return {
      orderData: {
        user_id: "",
      },
      isShow: false,
      replaceAddr: false, //替换地址的遮罩层显示
      repAddrId: 1, // 需要替换的addr的id
    };
  },
  beforeRouteLeave(to, from, next) {
    console.log(from);
    this.$store.state.configOrderHistory = from.path;
    console.log(this.$store.state.configOrderHistory);
    next();
  },
  methods: {
    //事件
    payment() {
      //获取要提交的数据
      this.orderData.user_id = this.$store.state.userInfo.id;
      //确认订单的时候，需要把该订单内所有商品的配送地址都改成一样的
      let temp = {
        name: this.address.takeover_name,
        tel: this.address.takeover_tel,
        addr: this.address.takeover_addr,
      };
      this.orderData.takeover_addr = JSON.stringify(temp);
      if (window.confirm("是否确认提交订单")) {
        //从购物车键入订单
        if (this.$store.state.areacodeHistory.indexOf("/cart") != -1) {
          this.orderData.shopcarts_id = [];
          this.shop.forEach((item) => {
            this.orderData.shopcarts_id.push(item.id);
          });
          create_order(this.orderData).then((res) => {
            console.log(res);
            if (res.code != 200) {
              //失败的话 给用于一个提示。当用户点击确认的时候。跳转页面
              this.$router.push("/profile");
              return console.log("下单失败");
            }
            //提交订单成功后。把默认的配送地址取回来。放到购物车页面
            this.$store.state.ShoppingAddress = this.$store.state.userInfo.defaddr;
            this.$router.push("/payment/" + res.data.order_id);
          });
        }
        //从details进入确认订单
        if (this.$store.state.areacodeHistory.indexOf("/details") != -1) {
          //取出传递过来的数据   只能有1条数据  可能会有组合商品
          this.shop.forEach((item) => {
            this.orderData.goods_id = item.goods_id;
            this.orderData.num = item.num;
            this.orderData.norm = item.norm;
          });
          create_details_order(this.orderData).then((res) => {
            console.log(res);
            if (res.code != 200) {
              //失败的话 给用于一个提示。当用户点击确认的时候。跳转页面
              this.$router.push("/profile");
              return console.log("下单失败");
            }
            //提交订单成功后。把默认的配送地址取回来。放到购物车页面
            this.$store.state.ShoppingAddress = this.$store.state.userInfo.defaddr;
            this.$router.push("/payment/" + res.data.order_id);
          });
        }
        this.$store.state.payMentData = null;
        //清除本地存储中 存放的确认订单数据
        let data = window.localStorage.getItem(this.localData);
        data =
          data != undefined && data != null && data != ""
            ? JSON.parse(data)
            : {};
        //如果data.payMentData  不为Null
        //通过三目运算判断  data.payMentData 是否存在。存在就删除 否则什么都不做
        data.payMentData != undefined && data.payMentData != null
          ? delete data["payMentData"]
          : null;
        window.localStorage.setItem(this.localData, JSON.stringify(data));
      }
    },
    //替换地址遮罩层显示后的确认按钮事件
    replAddr(id) {
      if (id == null) return;
      console.log(id);
      this.$store.state.ShoppingAddress = null;
      // 循环过滤 取出  item.id == id  的值，存到数组中
      let arr = this.$store.state.allAddress.filter((item) => {
        if (item.id == id) {
          return true;
        }
        return false;
      });
      //把数组中的值 赋值 给  this.$store.state.ShoppingAddress
      this.$store.state.ShoppingAddress = arr[0];
      //把替换地址遮罩层 隐藏起来
      this.replaceAddr = false;
    },
    //定义一个显示替换配送地址遮罩层的函数
    showReplAddr() {
      this.replaceAddr = true;
      get_user_address({
        user_id: this.$store.state.userInfo.id,
      }).then((res) => {
        let arr = res.data.filter((item) => {
          if (item.default == 1) {
            return true;
          }
          return false;
        });
        this.repAddrId = arr[0].id;
        this.$store.state.allAddress = res.data;
      });
    },
    //用于判断页面的来源 source 来源  page 页面
    sourcePage() {
      if (this.$store.state.areacodeHistory.indexOf("/cart") != -1) {
        console.log("从购物车页面进入的");
        if (!this.$store.state.userInfo) {
          this.$router.push("/home");
          return;
        }
        this.isShow = true;
        //从购物车页面过来后。如果用户登录了。我们就查看一下 传过来的数据中，是否有配送地址不完整的。
        //详细地址

        for (let i = 0, temp = true; i < this.shop.length; i++) {
          let addr = this.shop[i].takeover_addr.split(",");
          if (addr[3] == "" && temp) {
            this.showReplAddr();
            temp = false; // 作用是为了让当前的if 只执行一次
          }
          //修改确认订单页面 购买商品的配送地址
          this.UpdataShopCart({
            id: this.shop[i].id,
            num: this.shop[i].num,
            norm: this.shop[i].norm,
            ischeck: 1,
            takeover_addr: this.address.takeover_addr,
          });
        }
      }
      if (this.$store.state.areacodeHistory.indexOf("/details") != -1) {
        console.log("从详情页面进入的");
        let addr = this.shop[0].takeover_addr.split(",");
        console.log(addr);
        if (this.$store.state.userInfo) {
          this.isShow = true;
          //用户存在
          //证明配送地址的最后一位(详细地址) 没有值。
          //替换地址   执行替换的方法
          if (addr[3] == "") {
            this.showReplAddr();
          }
        } else {
          //用户不存在
          this.isShow = false;
          console.log("用户不存在");
          //打开一个遮罩层。里面有注册  和填写地址
          //去登陆
          //填写地址 ---在后边的电话注册后。添加地址                    电话号   ---注册
        }
      }
    },
    //修改默认配送地址
    UpdataShopCart(data) {
      // 离开购物车页面的时候，修改购物车的网络请求需要添加字段
      UpdataShopCart(data).then((res) => {
        console.log(res);
      });
    },
  },
  computed: {
    //计算
    address() {
      return this.$store.state.ShoppingAddress;
    },
    //获取提交的购物车数据
    shop() {
      let data =
        this.$store.state.payMentData != null
          ? this.$store.state.payMentData
          : JSON.parse(window.localStorage.getItem(this.localData)).payMentData;
      return data;
    },
    localData() {
      return this.$store.state.localData;
    },
  },
  created() {
    if (
      window.localStorage.getItem(this.localData) == undefined ||
      window.localStorage.getItem(this.localData) == null ||
      window.localStorage.getItem(this.localData) == ""
    ) {
      this.$router.push("/home");
    }
    //传递数据到确认订单页面的时候，如果数据都是依靠地址栏路径进行传递的话，一件商品还可以。2件甚至多见商品时。确认订单页面容易出现空白页面。原因是由于地址栏的地址过长，有写数据被修剪，导致读取不出传送过来的数据值，

    //看看是从那个页面跳转的   确认订单页面
    this.sourcePage();
  },

  filters: {
    changeTel(val) {
      return val.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    },
    changeAddr(val) {
      return val.split(",").join("");
    },
  },
};
</script>



