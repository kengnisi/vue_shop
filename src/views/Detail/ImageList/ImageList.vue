<template>
  <div class="swiper-container" v-if="imageList != []" ref="swipe">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(imageItem, index) in imageList"
        :key="imageItem.id"
        
        @click="slideClick(index)"
      >
        <img :src="imageItem.imgUrl" :class="{active: currentIndex == index}"/>
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    imageList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  watch: {
    imageList(newValue, oldValue) {
      this.$nextTick(() => {
        new Swiper(this.$refs.swipe, {
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          // 设置一个页面展示多少张轮播图内容
          slidesPerView : 3,
          // 设置轮播的时候多少为一组
          slidesPerGroup : 1
        });
      });
    },
  },
  methods: {
    slideClick(index) {
      this.currentIndex = index
      this.$bus.$emit("imageId", index)
    },
  },
};
</script>

<style lang="less" scoped>
.active{
  border: 1px solid #f60;
}
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>