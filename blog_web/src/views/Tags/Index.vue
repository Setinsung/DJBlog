<template>
  <div class="common" :style="{
    background: `url(${tagsBgImg}) center center no-repeat`,
    backgroundSize: 'cover',
  }">

    <Header :light-index="4" background="transparent"></Header>
    <Footer fixed></Footer>
    <div class="content">
      <div class="tags-wap tagcloud">
        <router-link v-for="item in tags" :key="item.name" :to="{ name: 'tagsDetails', query: { id: item.name } }">
          <mu-chip v-if="item.articleNum > 0" class="tag" :color="item.color">{{ item.name }}{{ item.articleNum
          }}</mu-chip>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { getTags } from "@/api/tags.js"
import { randomColor } from '@/utils'
export default {
  name: 'tags',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      tagsBgImg: "http://nevergiveupt.top/tags.jpg",
      tags: [

      ]
    }
  },
  mounted () {
    window.tagcloud({
      selector: ".tagcloud", //元素选择器
      fontsize: 16, //基本字体大小, 单位px
      radius: 100, //滚动半径, 单位px
      mspeed: "normal", //滚动最大速度, 取值: slow, normal(默认), fast
      ispeed: "normal", //滚动初速度, 取值: slow, normal(默认), fast
      direction: 135, //初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
      keep: false, //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
    })
  },
  created () {
    this.getTagInfo()
  },
  methods: {
    async getTagInfo () {
      const res = await getTags()
      console.log("res", res)
      this.TagInfo = res.data.list
      this.tags = this.TagInfo.map(item => {
        return {
          name: item.name,
          articleNum: item.articleNum,
          color: randomColor()
        }
      })
      console.log("res", res)
    },
    clickTagItem (e) {
      console.log("e", e)
      this.$router.push("/tags/details")
    }
  }


}
</script>
<style scoped lang="less">
.common {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.content {
  padding-top: 64px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.tags-wap {
  padding: 0 0.533333rem;
  width: 70%;

  .tag {
    margin-right: 0.533333rem;
    margin-bottom: 0.533333rem;
    cursor: pointer;
  }
}
</style>