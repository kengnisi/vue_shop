<template>
  <div class="detail">
    <!-- 商品分类导航 -->
    <TypeNav />

    <!-- 主要内容区域 -->
    <section class="con">
      <!-- 导航路径区域 -->
      <div class="conPoin">
        <span v-show="categoryView.category1Id">{{
          categoryView.category1Name
        }}</span>
        <span v-show="categoryView.category2Id">{{
          categoryView.category2Name
        }}</span>
        <span v-show="categoryView.category3Id">{{
          categoryView.category3Name
        }}</span>
      </div>
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果-->
          <Zoom :imageList = "skuInfo.skuImageList"/>
          <!-- 小图列表 -->
          <ImageList :imageList = "skuInfo.skuImageList"/>
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">{{ skuInfo.skuName }}</h3>
            <p class="news">
              推荐选择下方[移动优惠购],手机套餐齐搞定,不用换号,每月还有花费返
            </p>
            <div class="priceArea">
              <div class="priceArea1">
                <div class="title">
                  价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
                </div>
                <div class="price">
                  <i>¥</i>
                  <em>{{ skuInfo.price }}</em>
                  <span>降价通知</span>
                </div>
                <div class="remark">
                  <i>累计评价</i>
                  <em>65545</em>
                </div>
              </div>
              <div class="priceArea2">
                <div class="title">
                  <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
                </div>
                <div class="fixWidth">
                  <i class="red-bg">加价购</i>
                  <em class="t-gray"
                    >满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</em
                  >
                </div>
              </div>
            </div>
            <div class="support">
              <div class="supportArea">
                <div class="title">
                  支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持
                </div>
                <div class="fixWidth">
                  以旧换新，闲置手机回收 4G套餐超值抢 礼品购
                </div>
              </div>
              <div class="supportArea">
                <div class="title">配 送 至</div>
                <div class="fixWidth">广东省 深圳市 宝安区</div>
              </div>
            </div>
          </div>

          <div class="choose">
            <div class="chooseArea">
              <div class="choosed"></div>
              <dl v-for="spuSaleAttr in spuSaleAttrList" :key="spuSaleAttr.id">
                <dt class="title">{{ spuSaleAttr.saleAttrName }}</dt>
                <dd
                  v-for="spuSaleAttrValue in spuSaleAttr.spuSaleAttrValueList"
                  :class="{active: spuSaleAttrValue.isChecked == 1}"
                  :key="spuSaleAttrValue.id"
                  @click="AttrClcik(spuSaleAttrValue, spuSaleAttr.spuSaleAttrValueList)"
                >
                  {{ spuSaleAttrValue.saleAttrValueName }}
                </dd>
              </dl>
              <div class="cartWrap">
                <div class="controls">
                  <input autocomplete="off" class="itxt" :value="goodsNum" @change="goods" oninput = "value=value.replace(/[^\d]/g,'')"/>
                  <a href="javascript:;" class="plus" @click="goodsNum++">+</a>
                  <a href="javascript:;" class="mins" @click="goodsNum < 2 ? 1:goodsNum--">-</a>
                </div>
                <div class="add">
                  <a @click="addShopcart">加入购物车</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Section />
  </div>
</template>

<script>
import ImageList from "./ImageList/ImageList";
import Zoom from "./Zoom/Zoom";
import Section from "./Section";
import { mapGetters } from "vuex";

export default {
  name: "Detail",
  data() {
    return {
      // 购买商品的数量
      goodsNum: 1,
    };
  },
  mounted() {
    this.$store.dispatch("GoodsInfo", this.$route.params.goodsId);
  },
  components: {
    ImageList,
    Zoom,
    Section,
  },
  computed: {
    ...mapGetters(["skuInfo", "categoryView", "spuSaleAttrList"]),
  },
  methods: {
    // 购物时挑选商品的参数点击事件
    AttrClcik(item, AttrList) {
      AttrList.forEach(attr => {
        attr.isChecked = 0
      });
      item.isChecked = 1
    },
    // 输入框改变事件
    goods(event) {
      this.goodsNum = parseInt(event.target.value)
    },
    // 加入购物车
    async addShopcart() {
      // 1.在点击加入购物车这个按钮的时候，做的第一件事，将参数带给服务器（发请求），通知服务器加入购物车
      // 2.需要知道1是否成功
      try {
        await this.$store.dispatch('addOrUpdateShopCart', {
          skuId:this.$route.params.goodsId,
          skuNum:this.goodsNum
        })
        // 3.进行路由跳转
        // 4.在路由跳转的时候还需要将产品的信息给下一级的路由组件
        // 一些简单的数据skuNum，通过query形式给路由组件传递过去
        // 产品信息的数据【比较复杂：skuInfo】，通过会话存储（不持久化，会话结束数据会消失
        // 本地存储|会话存储，一般都是存储字符串(将对象内容传唤成字符串)
        sessionStorage.setItem("SKUINFO", JSON.stringify(this.skuInfo))
        this.$router.push({name:'addcartsuccess', query:{skuNum:this.goodsNum}});
        // 通过query直接传递信息，不建议
        // this.$router.push({name:'addcartsuccess', query:{goodscart:skuInfo}});
      }catch(error) {
        // 失败
        alert(error.message)
      }
    }
  },
};
</script>

<style lang="less" scoped>
.detail {
  .con {
    width: 1200px;
    margin: 15px auto 0;

    .conPoin {
      padding: 9px 15px 9px 0;

      & > span + span:before {
        content: "/\00a0";
        padding: 0 5px;
        color: #ccc;
      }
    }

    .mainCon {
      overflow: hidden;
      margin: 5px 0 15px;

      .previewWrap {
        float: left;
        width: 400px;
        position: relative;
      }

      .InfoWrap {
        width: 700px;
        float: right;

        .InfoName {
          font-size: 14px;
          line-height: 21px;
          margin-top: 15px;
        }

        .news {
          color: #e12228;
          margin-top: 15px;
        }

        .priceArea {
          background: #fee9eb;
          padding: 7px;
          margin: 13px 0;

          .priceArea1 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              float: left;
              margin-right: 15px;
            }

            .price {
              float: left;
              color: #c81623;

              i {
                font-size: 16px;
              }

              em {
                font-size: 24px;
                font-weight: 700;
              }

              span {
                font-size: 12px;
              }
            }

            .remark {
              float: right;
            }
          }

          .priceArea2 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;

              .red-bg {
                background: #c81623;
                color: #fff;
                padding: 3px;
              }

              .t-gray {
                color: #999;
              }
            }
          }
        }

        .support {
          border-bottom: 1px solid #ededed;
          padding-bottom: 5px;

          .supportArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;
              color: #999;
            }
          }
        }

        .choose {
          .chooseArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            dl {
              overflow: hidden;
              margin: 13px 0;

              dt {
                margin-right: 15px;
                float: left;
              }

              dd {
                float: left;
                margin-right: 5px;
                color: #666;
                line-height: 24px;
                padding: 2px 14px;
                border-top: 1px solid #eee;
                border-right: 1px solid #bbb;
                border-bottom: 1px solid #bbb;
                border-left: 1px solid #eee;

                &.active {
                  color: red;
                  border: 1px solid red;
                }
              }
            }
          }

          .cartWrap {
            .controls {
              width: 48px;
              position: relative;
              float: left;
              margin-right: 15px;

              .itxt {
                width: 38px;
                height: 37px;
                border: 1px solid #ddd;
                color: #555;
                float: left;
                border-right: 0;
                text-align: center;
              }

              .plus,
              .mins {
                width: 15px;
                text-align: center;
                height: 17px;
                line-height: 17px;
                background: #f1f1f1;
                color: #666;
                position: absolute;
                right: -8px;
                border: 1px solid #ccc;
              }

              .mins {
                right: -8px;
                top: 19px;
                border-top: 0;
              }

              .plus {
                right: -8px;
              }
            }

            .add {
              float: left;

              a {
                background-color: #e1251b;
                padding: 0 25px;
                font-size: 16px;
                color: #fff;
                height: 36px;
                line-height: 36px;
                display: block;
              }
            }
          }
        }
      }
    }
  }
}
</style>