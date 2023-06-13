<template>
  <div class="footer" :class="{ 'fixed-footer': footerFixed }">
    <div class="copyright">
      <a href="#"></a>
      <div>{{ copyright }}</div>
    </div>
  </div>
</template>

<script>
import { getHF } from '@/api/hf.js'
import { mapState } from 'vuex';

export default {
  props: {
  },
  computed: {
    ...mapState('app', ['footerFixed']),
  },
  data() {
    return {
      copyright: ""
    }
  },
  created() {
    this.getHInfo()
  },
  methods: {
    async getHInfo() {
      const res = await getHF()
      console.log(res)
      this.copyright = res.data.footer.copyright
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  text-align: center;
  font-size: 0.3rem;
  margin: 30px 0;
  width: 100%;

  .copyright {
    a {
      color: inherit;
    }
  }
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1;
}
</style>