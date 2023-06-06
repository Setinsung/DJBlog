<template>
  <div class="common">
    <Header :light-index="5" background="transparent"></Header>
    <Footer fixed></Footer>
    <mu-carousel hide-indicators hide-controls class="carousel">
      <mu-carousel-item v-for="item in info.imgs" :key="item._id">
        <img :src="item.imgUrl">
      </mu-carousel-item>
    </mu-carousel>
    <div class="content">
      <mu-card class="card">
        <mu-card-header>
          <mu-paper class="avatar-box" circle :z-depth="5">
            <img class="avatar" src="https://pic3.zhimg.com/v2-ab5c6c7643d5bedeece7fccb5d7ec2a1_r.jpg">
          </mu-paper>
        </mu-card-header>
        <mu-card-text>
          {{ info.desc }}
        </mu-card-text>
        <div class="tags">
          <mu-chip class="tag" v-for="(item, index) in info.tags" :key="item.name" :color="item.color" delete
            @delete="remove(index)">{{ item.name }}</mu-chip>
          <mu-button @click="reset" color="primary" v-if="info.tags && info.tags.length === 0">reset</mu-button>
        </div>
      </mu-card>
    </div>
  </div>
</template>
<script>
import { randomColor } from "@/utils"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { getAbout } from '@/api/about.js'
export default {
  name: 'about',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      info: {
        desc: "",
        imgs: [],
        tags: []
      }

    }
  },
  created () {
    this.getAboutInfo()
  },
  methods: {
    async getAboutInfo () {
      const res = await getAbout()
      console.log("res", res)
      this.info.desc = res.data.desc
      this.info.imgs = res.data.imgs
      this.info.tags = res.data.tags.map(item => {
        return {
          name: item,
          color: randomColor()
        }
      })
    },

    remove (index) {
      this.info.tags.splice(index, 1)
    },
    reset () {
      this.info.tags = [{
        name: 'Vue',
        color: randomColor()
      },
      {
        name: 'React',
        color: randomColor()
      },
      {
        name: 'JS',
        color: randomColor()
      },]
    }
  }
}
</script>
<style scoped lang="less">
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

.carousel {

  height: 100%;
  position: fixed;
  margin-top: 0;
}

.card {
  max-width: 30rem;
  width: 30rem;
  margin: 0 auto;

  /deep/ .mu-card-header {
    display: flex;
    justify-content: flex-end;
    height: 1.3333rem;
  }
}

.avatar-box {
  width: 4.6667rem;
  height: 4.6667rem;
  position: absolute;
  top: -2.3333rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;

  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}

.tags {
  padding: 0 0.42667rem;

  .tag {
    margin-bottom: 0.42667rem;
    margin-right: 0.42667rem;
  }
}
</style>