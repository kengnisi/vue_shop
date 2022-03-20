<template>
  <div class="swiper-container" ref="floor1Swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carouselItem in list"
        :key="carouselItem.id"
      >
        <img :src="carouselItem.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入轮播图组件
import Swiper from "swiper";

export default {
  name: "Carsousel",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    delay: {
      type: Number,
      default() {
        return 3000;
      },
    },
    speed: {
      type: Number,
      default() {
        return 1000;
      },
    },
    effect: {
      type: String,
      default() {
        return "slide";
      },
    },
  },
  data() {
    return {};
  },
  watch: {
    floorList: {
      immediate: true,
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.floor1Swiper, {
            // 设置自动播放
            
            autoplay: { 
              delay: this.delay,
              disableOnInteraction: false,
            },
            speed: this.speed,
            //轮播效果
            effect : this.effect,
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>