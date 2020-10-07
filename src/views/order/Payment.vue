<template>
  <div class="pay">
    <navbar>
      <div slot="left">
        <!-- <i></i> -->
        <el-button
          type="text"
          class="el-icon-arrow-left"
          @click="dialogVisible = true"
        ></el-button>

        <el-dialog
          title="确认要离开收银台？"
          :visible.sync="dialogVisible"
          width="99%"
          :show-close="false"
          top="33vh"
        >
          <span>你的订单将在23小时59分内未支付将被取消，请尽快完成支付</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">继续支付</el-button>
            <el-button type="primary" @click="leave">确认离开</el-button>
          </span>
        </el-dialog>
      </div>
      <div slot="center" class="tab-center">京东收银台</div>
      <div slot="right">
        <el-dropdown trigger="click" @command="pushrouper">
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/home">首页</el-dropdown-item>
            <el-dropdown-item command="/keywords">分类搜索</el-dropdown-item>
            <el-dropdown-item command="/search">我的京东</el-dropdown-item>
            <el-dropdown-item command="/profile">浏览记录</el-dropdown-item>
            <el-dropdown-item command="/home">我的关注</el-dropdown-item>
            <el-dropdown-item command="/home">分享</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </navbar>
    <div
      style="border-top: 1px solid #ddd; line-height: 50px"
      v-for="(item, index) in goods"
      :key="index"
    >
      {{ item.money_now }}
    </div>
    <scroll ref="payscroll" class="payscroll">
      <div
        class="p"
        style="border-top-left-radius: 10px; border-top-right-radius: 10px"
      >
        <div></div>
      </div>
      <div style="text-align: left" class="catepay">
        <div>
          <img
            src="https://cdnpay.360buyimg.com/image/pay/home-pay-icon-39d557c44d7afdb354da160af4ed0ff1.png"
            style="width: 24px; height: 24px; margin-right: 8px"
            alt
          />
          <span style="flex: 5">打白条</span>
          <el-radio v-model="radio" label="开通白条并支付"></el-radio>
        </div>
        <div>
          <img
            src="https://storage.360buyimg.com/payment-assets/sdk/icon/BAITIAO_2.0.png"
            style="width: 24px; height: 24px; margin-right: 8px"
            alt
          />
          <span style="flex: 5">使用新卡支付</span>
          <el-radio v-model="radio" label="使用新卡支付"></el-radio>
        </div>

        <div>
          <img
            src="https://storage.360buyimg.com/payment-assets/sdk/bank/BANKCARD1.png"
            style="width: 24px; height: 24px; margin-right: 8px"
            alt
          />
          <div
            style="
              flex: 5;
              display: flex;
              margin-right: -18px;
              flex-wrap: wrap;
              border-bottom: 1px solid #ddd;
            "
          >
            <span style="flex: 5">
              <div>京东小金库</div>
              <div style="padding-bottom: 8px">请设置数字支付密码后使用</div>
            </span>
            <el-radio
              v-model="radio"
              label
              style="margin-right: 18px"
            ></el-radio>
          </div>
        </div>

        <div>
          <div style="flex: 1"></div>
          <span style="flex: 5">全部付款方式</span>
          <el-button type="text" @click="dialogVisible1 = true">
            查看
            <i class="el-icon-arrow-right"></i>
          </el-button>
          <el-dialog
            title="付款方式"
            :visible.sync="dialogVisible1"
            width="100%"
          >
            <div>
              <div>
                <span style="flex: 5">打白条</span>
                <el-radio v-model="radio" label="开通白条并支付"></el-radio>
              </div>

              <div>
                <span style="flex: 5">使用新卡支付</span>
                <el-radio v-model="radio" label="使用新卡支付"></el-radio>
              </div>

              <div>
                <div
                  style="
                    flex: 5;
                    display: flex;
                    margin-right: -18px;
                    flex-wrap: wrap;
                    border-bottom: 1px solid #ddd;
                  "
                >
                  <span style="flex: 5">
                    <div>京东小金库</div>
                    <div style="padding-bottom: 8px">
                      请设置数字支付密码后使用
                    </div>
                  </span>
                  <el-radio
                    v-model="radio"
                    label
                    style="margin-right: 18px"
                  ></el-radio>
                </div>
              </div>
            </div>
          </el-dialog>
        </div>

        <div>
          <span style="flex: 5">
            <div>微信支付方式</div>
            <div style="padding-bottom: 8px">
              仅安装微信6.0.2及以上版本客户端使用
            </div>
          </span>
          <el-radio v-model="radio" label="微信支付"></el-radio>
          <!-- </div> -->
        </div>
      </div>
    </scroll>
    <div class="paybar">
      <el-button
        type="danger"
        round
        style="width: 90%; margin-top: 10px"
        @click="paygo"
        v-for="(item, index) in goods"
        :key="index"
        >{{ radio }}￥{{ item.money_now }}</el-button
      >
    </div>
  </div>
</template>

<script>
import navbar from "components/common/navbar/NavBar";
import scroll from "components/contents/scroll/Scroll";
import { getOrderbyOrderId, getOrderState } from "network/order";
export default {
  name: "pay",
  data() {
    return {
      goods: {},
      order_id: null,
      moneyall: 0,
      radio: "开通白条并支付",
      dialogVisible: false,
      dialogVisible1: false,
    };
  },
  components: {
    navbar,
    scroll,
  },
  created() {
    //创建
    this.order_id = this.$route.params.order_id;
    console.log(this.$route);
    console.log(this.order_id);
    this.getPayMentOrder();
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    getPayMentOrder() {
      getOrderbyOrderId(this.order_id).then((res) => {
        console.log(res);
        if (res.code != 200) {
          //弹出对话框-----获取订单数据失败
          //跳转页面 ----我的
          this.$router.push("/profile");
          return;
        }
        this.goods = res.data;
      });
    },
    leave() {
      getOrderState({ order_id: this.order_id, state: 1 }).then((res) => {
        console.log(res);
      });
      this.$router.push("/myOrder/one");
    },
    paygo() {
      this.dialogVisible = false;
      // // this.$router.push("/zf");
      // this.$router.push("/myorder");
      // // alert("待支付");
      getOrderState({
        order_id: this.order_id,
        state: 2,
      }).then((res) => {
        console.log(res);
      });
      this.$router.push("/myOrder/two");
    },
    pushrouper(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style lang='less'>
.pay {
  .catepay {
    font-size: 14px;
    text-align: left;
    padding: 0 18px;
    > div {
      margin: 20px 0;
      display: flex;
      flex-wrap: wrap;
    }
  }
  .p {
    width: 100%;
    background: linear-gradient(90deg, #fef5f4 0, #fef0ef 100%);
    div {
      background: url("data:image/png;base64,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")
        no-repeat;
      height: 61px;
      margin: 0;
      background-size: 95px 24px;
      background-position: 18px center;
    }
  }
  .paybar {
    position: fixed;
    bottom: 0;
    height: 60px;
    background: white;
    width: 100%;
  }
}
.el-radio__label {
  display: none;
}
.el-radio__input.is-checked .el-radio__inner {
  border: none;
  background: red;
}
.el-radio__inner {
  width: 20px;
  height: 20px;
  &:after {
    width: 0;
    height: 0;
    left: 10%;
    top: 0;
    color: white;
    font-size: 20px;
    content: "√";
  }
}
.el-icon-arrow-left.el-button--text {
  width: 100%;
  color: black;
}
.el-dialog {
  border-radius: 10px;
  position: absolute;
  bottom: 0;
  margin: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.el-dialog__body {
  padding: 0 30px;
  text-align: left;
}
.el-dialog__footer {
  padding: 0;
  button {
    width: 50%;
    border-radius: 10px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom: none;
    &:nth-child(1) {
      border-bottom-right-radius: 0px;
    }
  }
  .el-button + .el-button {
    margin-left: 0;
    border-bottom-left-radius: 0px;
  }
}
</style>