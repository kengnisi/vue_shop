<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
  
  
</template>

<script>
  import Header from "components/Header";
  import Footer from "components/Footer"
export default {
  name: 'App',

  data() {
    return {
      
    };
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    this.$store.dispatch('categroyList');
  },

  methods: {
    
  },
};
</script>

<style scoped>
  @import 'assets/css/reset.css';
</style>