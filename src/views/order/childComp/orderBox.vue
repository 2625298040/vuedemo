<template>
  <div id="orderBox">
    <dl v-if="arr">
      <dt>
        <span class="leftBox">
          <i class="el-icon-s-shop"></i>
          {{ arr.length > 1 ? "京东" : arr[0].shop_name }}
        </span>
        <span class="rigthBox">
          <span>已取消</span>
          |
          <i class="el-icon-delete"></i>
        </span>
      </dt>
      <dd>
        <div class="box">
          <div class="imgBox left">
            <img
              v-for="(i, index) in imgArr"
              :key="index"
              :src="path + '/goods/' + i"
            />
          </div>
          <div class="rigthBox">
            查看更多
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <p>
          <span>共{{ allNum }}件商品</span>
          <span>实付金额:</span>
          {{ allMoney | fMoney }}
        </p>
      </dd>
      <p style="text-align: right">
        <el-button round>看相似</el-button>
        <el-button type="danger" round>再次购买</el-button>
      </p>
    </dl>
  </div>
</template>

<script>
import { getOrderGoods } from "network/order";
import { haveData } from "common/utils";
export default {
  name: "orderBox",
  created() {
    console.log(this.data);
    haveData(getOrderGoods, this.data, (res) => {
      if (res.code != 200) return;
      console.log(res.data);
      res.data.forEach((item) => {
        this.allMoney += item.money_now * item.num * 1;
        this.allNum += item.num * 1;
        this.imgArr.push(item.img_cover);
      });
      this.arr = res.data;
      console.log(this.arr);
    });
  },
  props: {
    data: {
      path: "http://106.12.85.17:8090/public/image",
      type: String,
    },
  },
  data() {
    return {
      allMoney: 0,
      allNum: 0,
      imgArr: [],
      arr: null,
    };
  },
  computed: {
    path() {
      return "http://106.12.85.17:8090/public/image";
    },
  },
  filters: {
    fMoney(msg) {
      return "$ " + parseFloat(msg).toFixed(2);
    },
  },
};
</script>
<style lang='less' scoped>
dl {
  background-color: #fff;
  border-radius: 10px;
  width: 90%;
  padding: 15px 10px 1px 10px;
  margin: 20px auto;
  dt {
    display: flex;
    .leftBox {
      flex: 8;
      text-align: left;
    }
    .rigthBox {
      flex: 4;
      text-align: right;
      color: rgb(144, 144, 144);
    }
  }
  dd {
    margin: 0;
    border-bottom: 1px solid #eee;
    .box {
      overflow: hidden;
      line-height: 120px;
      .imgBox {
        display: flex;
        width: 72%;
        overflow: hidden;
        img {
          flex: 0;
          margin: 15px;
          margin-left: 0;
          width: 30%;
          border-radius: 10px;
        }
      }
    }
    p {
      text-align: right;
      span {
        color: rgb(144, 144, 144);
        font-size: 12px;
        margin: 0 3px;
      }
    }
  }
}
</style>
