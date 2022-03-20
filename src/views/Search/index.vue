<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removecategoryName">×</i>
            </li>
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-show="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removetrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(attrItem, index) in searchParams.props"
              :key="index"
            >
              {{ attrItem.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrdata="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active: showOrder}" @click="sortType(1)">
                  <a href="#">综合<span v-show="showOrder" class="iconfont" :class="showOrderType"></span></a>
                </li>
                <li :class="{active: !showOrder}" @click="sortType(2)">
                  <a href="#">价格<span v-show="!showOrder" class="iconfont" :class="showOrderType"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div @click="jumpdetail(good.id)">
                    <div class="p-img">
                    <a href="javascript:;">
                      <img v-lazy="good.defaultImg" />
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      href="javascript:;"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >
                      {{ good.title }}
                    </a>
                  </div>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo = "searchParams.pageNo" :pageSize = "searchParams.pageSize" :total = "gettotal" :continues = "5" @jumpNum = "jumpNum"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters } from "vuex";

export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        // 分类名
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序
        order: "1:desc",
        // 分页器页面
        pageNo: 1,
        // 返回的数据数量
        pageSize: 3,
        // 平台售卖属性
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    // 合并对象，对象中相同的属性，后面的对象会覆盖第一个对象的内容
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },

  mounted() {
    this.getdata();
    this.resetSearchParams();
  },
  computed: {
    ...mapGetters(["goodsList", "gettotal"]),
    // 获取order信息
    getorderId() {
      return this.searchParams.order.split(':')[0]
    },
    getorderType() {
      return this.searchParams.order.split(':')[1]
    },
    // 判断是综合还是价格排序
    showOrder() {
      return this.getorderId == 1 ? true : false
    },
    // 判断显示升降符号
    showOrderType() {
      if(this.getorderType == 'desc') {
        return 'icon-arrowdown'
      }else {
        return 'icon-arrowup'
      }
    }
  },
  methods: {
    getdata() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 请求之后重置三个ID
    resetSearchParams() {
      this.searchParams.category1Id = "";
      this.searchParams.category3Id = "";
      this.searchParams.category2Id = "";
    },
    // 移除关键字
    removecategoryName() {
      this.searchParams.categoryName = "";
      this.$router.push({
        name: "search",
        params: { keyword: this.searchParams.keyword || undefined },
      });
    },
    // 移除keyword
    removeKeyword() {
      this.$bus.$emit("removeKey");
      this.searchParams.keyword = "";
      this.$router.push({
        name: "search",
        query: this.$route.query,
      });
    },
    // 点击品牌事件
    trademarkInfo(trademarkItem) {
      this.searchParams.trademark = `${trademarkItem.tmId}:${trademarkItem.tmName}`;
      this.getdata();
    },
    // 移除品牌面包屑
    removetrademark() {
      this.searchParams.trademark = "";
      this.getdata();
    },
    // 得到props参数,商品参数的数组
    attrInfo(attr, attrValue) {
      let attrItem = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      if (this.searchParams.props.indexOf(attrItem) == -1) {
        this.searchParams.props.push(attrItem);
      }
      this.getdata();
    },
    // 移除props参数
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      this.getdata();
    },
    // 选中排序方式
    sortType(id) {
      let orderId = this.getorderId
      let orderType = this.getorderType
      let newOrder = `${id}:desc`
      if(id == orderId) {
        orderType = orderType == 'desc' ? 'asc' : 'desc'
        newOrder = `${id}:${orderType}`
        this.searchParams.order = newOrder
      }else {
        this.searchParams.order = newOrder
      }
      this.getdata()
    },
    // 获取选取页面的数据
    jumpNum(num) {
      this.searchParams.pageNo = num
      this.getdata(this.searchParams)
    },
    // 跳转到详细页
    jumpdetail(goodId) {
      this.$router.push(`/detail/${goodId}`)
    }

  },
  watch: {
    $route() {
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getdata();
      this.resetSearchParams();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>