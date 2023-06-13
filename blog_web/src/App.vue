<template>
  <div id="app">
    <router-view />
    <Footer :fixed="footerFixed"></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import { fixedFooterRouters } from '@/utils'
export default {
  name: 'App',
  components: {
    Footer
  },
  data() {
    return {
    }
  },
  computed: {
    footerFixed() {
      console.log('routename', this.$route.name);
      console.log(fixedFooterRouters);
      // 判断是否需要 fixed
      console.log('fixedFooterRouters.includes(this.$route.name)',fixedFooterRouters.includes(this.$route.name));
      return fixedFooterRouters.includes(this.$route.name);
    },
  },
  watch: {
    footerFixed(fixed) {
      this.$store.commit('app/setFooterFixed', fixed); // 修改全局状态
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang="less"></style>
