<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!getUserInfo">
            <span>请</span>
            <!-- <a href="###">登录</a> -->
            <router-link to="/login">登录</router-link>
            <!-- <a href="###" class="register">免费注册</a> -->
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <span>{{getUserInfo}}</span>
            <a class="register" @click="logOut">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <a @click="goOrder">我的订单</a>
          <a @click="goShopCart">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch" key="search">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  name: "headerIndex",

  data() {
    return {
      keyword: '',
      searchParams: {
      "category1Id": "",
      "category2Id": "",
      "category3Id": "",
      // 分类名
      "categoryName": "",
      // 关键字
      "keyword": "",
      // 排序
      "order": "",
      // 分页器页面
      "pageNo": 1,
      // 返回的数据数量
      "pageSize": 3,
      // 平台售卖属性
      "props": [],
      // 品牌
      "trademark": ""
      }
    };
  },

  mounted() {
    // 事件总线事件,处理输入框数据删除
    this.$bus.$on('removeKey', this.resetKey)
  },
  computed: {
    // 获取用户信息
    ...mapGetters(['getUserInfo'])
  },
  methods: {
    goSearch() {
      // 第一种普通字符串写法
      // this.$router.push('/search/'+this.keyword+"?key="+this.keyword.toUpperCase());
      // 第二种模板字符串
      // this.$router.push(`/search/${this.keyword}?key=${this.keyword.toUpperCase()}`)
      // 第三种对象模式
      let location = {name: "search"}
      location.params = {keyword: this.keyword || undefined}
      if(this.$route.query) {
        location.query = this.$route.query
      }
      this.$router.push(location)
      // Object.assign(this.searchParams, this.$route.query, location.params)
      // this.$store.dispatch('getSearchList', this.searchParams);
    },
    // 总线重置key方法
    resetKey() {
      console.log("sad")
      this.keyword = ''
    },
    // 去购物车
    goShopCart() {
      this.$router.push("/shopcart")
    },
    // 去个人订单
    goOrder() {
      this.$router.push('/center')
    },
    // 退出登录
    async logOut() {
      try {
        await this.$store.dispatch('logOut');
        this.$router.push('/home')
      } catch (error) {
        alert(error)
      }
      
    }
  },
};
</script>

<style lang = "less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;
        span{
          margin-right: 5px;
        }
        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>