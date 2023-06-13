<template>
  <div>
    <IndexAnimation></IndexAnimation>
    <Header background="transparent"></Header>

    <div class="common">
      <div class="home">
        <p>{{ info.introduction }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import IndexAnimation from "@/components/IndexAnimation";
import Header from "@/components/Header";
import { getHome } from '@/api/home.js'
let i = 0;
let timer = null;
export default {
  name: "index",
  components: {
    Header,
    IndexAnimation,
  },
  data() {
    return {
      info: {
        introduction: "",
        introductionTarget: "There is a kind of call to eat together.",
      },
    };
  },
  created () {
    this.getHInfo()
  },
  mounted() {
    this.typing();
  },
  methods: {
    async getHInfo () {
      const res = await getHome()
      console.log(res);
      this.info.introductionTarget = res.data.introduction
    },
    typing() {
      if (i <= this.info.introductionTarget.length) {
        this.info.introduction =
          this.info.introductionTarget.slice(0, i++) + "_";
        timer = setTimeout(this.typing, 100);
      } else {
        this.info.introduction = this.info.introductionTarget; //结束打字,移除 _ 光标
        clearTimeout(timer);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  position: absolute;
  top: 50%;
  width: 100%;
  text-align: center;
  transform: translateY(-50%);
  font-size: 2rem;
  color: #fff;
  font-weight: 500;
}
</style>