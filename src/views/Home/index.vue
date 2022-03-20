<template>
  <div>
    <TypeNav></TypeNav>
    <LisContainer></LisContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <FloorOne v-for="floor in floorList" :key="floor.id" :floorList = "floor"></FloorOne>
    <Brand></Brand>
  </div>
</template>

<script>
import LisContainer from "./ListContainer"
import Recommend from "./Recommend"
import Rank from "./Rank"
import Like from "./Like"
import FloorOne from "./FloorOne"
import Brand from "./Brand"
import {mapState} from 'vuex'

export default {
  name: 'HomeIndex',
  components: {
    LisContainer,
    Recommend,
    Rank,
    Like,
    FloorOne,
    Brand
    },
  data() {
    return {
      
    };
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  },
  mounted() {
    this.$store.dispatch('getFloorList');
  },

  methods: {
    
  },
};
</script>

<style lang="less" scoped>

</style>