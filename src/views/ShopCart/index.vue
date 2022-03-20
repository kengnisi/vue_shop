<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(shopItem, index) in cartInfoList"
          :key="shopItem.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="shopItem.isChecked"
              @click="updateChecked(shopItem, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="shopItem.imgUrl" />
            <div class="item-msg">{{ shopItem.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ shopItem.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <button
              class="mins"
              @click="handler('minus', '-1', shopItem, index)"
            >
              -
            </button>
            <input
              ref="goodsNum"
              autocomplete="off"
              type="text"
              :value="shopItem.skuNum"
              minnum="1"
              class="itxt"
              oninput="value=value.replace(/[^\d]/g,'')"
              @change="handler('change', $event.target.value, shopItem, index)"
            />
            <button class="plus" @click="handler('add', '1', shopItem, index)">
              +
            </button>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ shopItem.skuNum * shopItem.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartItem(shopItem)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="selAll"
          @click="checkAll($event)"
          :disabled="cartInfoList.length == 0"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="checkeddelete">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ cartInfoList.length }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="goTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { debouce } from "../../utils/uuid_token";
// 使用节流
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  data() {
    return {
      cartInfo: "value",
      update: null,
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    this.update = debouce(this.getData, 500);
  },

  computed: {
    ...mapGetters(["cartList"]),
    // 获取购物车商品
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 判断全选按钮状态
    selAll() {
      return this.cartInfoList.every((item) => {
        return item.isChecked == 1;
      });
    },
    // 返回总价格
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuPrice * item.skuNum;
      });
      return sum;
    },
  },
  methods: {
    // 获取购物车数据
    getData() {
      this.$store.dispatch("shopCartList");
    },
    // 修改产品的个数
    async handler(style, changeNum, shopItem, index) {
      let num = this.$refs.goodsNum[index].value;
      switch (style) {
        case "add":
          break;
        case "minus":
          if (num < 2) changeNum = 0;
          break;
        default:
          if (changeNum > shop.skuNum) {
            changeNum -= shopItem.skuNum;
          } else {
            changeNum = shopItem.skuNum - changeNum;
          }
          break;
      }
      try {
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: shopItem.skuId,
          skuNum: changeNum,
        });

        this.update();
        // this.getData()
      } catch {
        alert("失败");
      }
    },
    // 删除商品信息
    async deleteCartItem(shopItem) {
      try {
        await this.$store.dispatch("deleteCartList", { skuId: shopItem.skuId });
        this.update();
      } catch (error) {
        alert(error);
      }
    },
    // 选择产品是否选中
    async updateChecked(shopItem, event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("checkCartList", {
          skuId: shopItem.skuId,
          isChecked: isChecked,
        });
        this.update();
      } catch (error) {
        alert(error);
      }
    },
    // 选中删除
    async checkeddelete() {
      try {
        await this.$store.dispatch("checkeddelete");
        this.update();
      } catch (error) {
        alert(error);
      }
    },
    // 全选按钮
    checkAll: throttle(async function (event) {
      try {
        let allChenk = event.target.checked == true ? 1 : 0;
        await this.$store.dispatch("checkAllShop", allChenk);
        this.update();
      } catch (error) {
        alert(error);
      }
    }, 500),
    // 挑战到结算页面
   goTrade() {
     this.$router.push('/trade');
   }
  },
  
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 15px;
            height: 35px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 15px;
            height: 35px;
            text-align: center;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>