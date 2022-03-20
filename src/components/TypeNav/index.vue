<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件的委派|鼠标离开 -->
      <div @mouseleave="leave">
        <h2 class="all" @mouseenter="sortShow">全部商品分类</h2>
        <transition name="sort"><!-- 三级联动 -->
        <div class="sort" v-show="show">
          <!-- 利用事件委派+编程式导航 -->
          <div class="all-sort-list2" @click="gosearch">
            <div
              class="item"
              :class="{ active: index === currentIndex }"
              v-for="(item1, index) in categroy"
              :key="item1.categoryId"
              @mouseenter="enter(index)"
            >
              <h3>
                <a
                  :data-categoryName="item1.categoryName"
                  :data-category1Id="item1.categoryId"
                  >{{ item1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix" v-show="currentIndex === index">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="item2 in item1.categoryChild"
                    :key="item2.categoryId"
                  >
                    <dt>
                      <a
                        :data-categoryName="item2.categoryName"
                        :data-category2Id="item1.categoryId"
                        >{{ item2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="item3 in item2.categoryChild"
                        :key="item3.categoryId"
                      >
                        <a
                          :data-categoryName="item3.categoryName"
                          :data-category3Id="item1.categoryId"
                          >{{ item3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
        
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 引入lodash中的节流函数throttle
import throttle from "lodash/throttle";

import { mapState, mapActions } from "vuex";
export default {
  name: "TypeNav",

  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },

  mounted() {
    // this.categroyList();
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      // state为vuex的state
      categroy: (state) => {
        return state.home.categroyList;
      },
    }),
  },
  methods: {
    // 由于每次跳转到新的页面的时都会创建一次三级联动组件,所有每次都会发送请求,存储在vuex中就没有意义了,
    // 而App组件只会创建一次,所有在App组件mounted中执行
    // ...mapActions({
    //   categroyList: "categroyList",
    // }),
    // 使用节流函数，防止用户操作过快出现卡顿现象

    enter: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    leave() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    // 进行路由跳转的方法
    gosearch(event) {
      // 最好的决解方案：编程式导航+事件委派
      // 利用事件委派存在一些问题：1：点击一定是a标签 2：如何获取参数【1，2，3】联动的分类产品名字和categoryId
      // 点击a标签的时候，才会进行路由挑转【怎么确定点击的一定式标签】
      // 存在另外一个问题：即使你能确定点击的式a标签，如何曲风式一级、二级、三级的分类标签

      // 第一个问题:把子节点当中a标签，我加上自定义熟悉data-categroyName,其余子节点是没有的
      let element = event.target;
      // 获取到当前触发这个事件的节点【h3、a、dt、dl】，需要带data-categoryname这样的节点【一定是a标签】
      // 节点有一个熟悉dataset属性，可以获取节点的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 如果身上拥有categoryname一定是a标签
      if (categoryname) {
        // 整理路由跳转参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 一级分类，二级分类，三级分类
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 整理玩参数
        // 判断:如果路由挑战的时候,带有params参数,也要带过去
        if(this.$route.params) {
          location.params = this.$route.params
        }
        location.query = query;
        this.$router.push(location);
      }
    },
    // 使在search中鼠标进入全部商品类使,显示三级联动
    sortShow() {
      this.show = true;
    },
  },
};
</script>

<style lang="less" scoped>
.active {
  background: rgb(158, 155, 155);
}
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        // text-decoration: none;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 510px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      // overflow-y: hidden;
      // overflow-x: visible;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            // padding: 0 20px;
            margin: 0;

            a {
              display: inline-block;
              width: calc(100% - 20px);
              padding-left: 20px;
              text-decoration: none;
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
    .sort-enter {
      height: 0;
    }
    .sort-enter-to {
      height: 510px;
    }
    .sort-enter-active {
      transition: all .2s linear;
    }
    .sort-leave {
      height: 510px;
    }
    .sort-leave-to {
      height: 0px;
    }
    .sort-leave-active {
      transition: all .1s linear;
    }
  }
}
</style>