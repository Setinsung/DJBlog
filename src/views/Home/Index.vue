<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <IndexAnimation></IndexAnimation>
    <Header background="transparent"></Header>
    <Footer fixed></Footer>
    <div class="common">
      <div class="home">
        {{ info.introduction }}
      </div>
    </div>
  </div>
</template>

<script>
import IndexAnimation from '@/components/IndexAnimation.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

let i = 0;
let timer = null;
export default {
  name: 'index',
  components: {
    IndexAnimation,
    Header,
    Footer
  },
  data() {
    return {
      // 打字机效果目标字符串
      info: {
        introduction: '',
        introductionTarget: 'Hello everyone, this is not a blog.'
      }
    }
  },
  methods: {
    // 打字机效果
    typing() {
      if (i <= this.info.introductionTarget.length) {
        this.info.introduction = this.info.introductionTarget.slice(0, i++) + '_'
        timer = setTimeout(this.typing,100);
      }else{
        this.info.introduction = this.info.introductionTarget
        clearTimeout(timer)
      }
    }
  },
  mounted(){
    this.typing()
  }
}
</script>
<style scoped lang="less">
.home {
  position: absolute;
  top: 50%;
  width: 100%;
  text-align: center;
  transform: translateY(-50%);
  font-size: 0.48rem;
  color: #fff;
  font-weight: 500;
}
</style>