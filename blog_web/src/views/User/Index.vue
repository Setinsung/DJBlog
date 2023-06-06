<template>
  <div class="user">
    <mu-card class="slider-card">
      <mu-button color="grey600" class="edit" icon @click="openUpdateModal = true">
        <mu-icon value="edit" left></mu-icon>
      </mu-button>
      <mu-avatar class="avatar" size="100">
        <img v-lazy="userInfo.avatar" alt="">
        <input type="file" class="file" accept="image/*" @change="uploadFile">
      </mu-avatar>

      <div class="title">{{ info.nickName }}</div>
      <div class="email">{{ userInfo.email }}</div>
      <div class="desc">{{ info.desc }}</div>
    </mu-card>
    <UpdateUserForm :userInfo="userInfo" :open="openUpdateModal" @toggle="toggleUpdateModal"></UpdateUserForm>

    <div class="right">
      <mu-appbar class="title">
        <mu-button icon slot="left" @click="$router.go(-1)">
          <mu-icon value="arrow_back" left></mu-icon>
        </mu-button>我的收藏

        <mu-menu slot="right" open-on-hover>
          <mu-button icon>
            <mu-icon value="menu"></mu-icon>
          </mu-button>
          <mu-list slot="content">
            <mu-list-item button @click="cancelCollect(null)">
              <mu-list-item-title>一键取消</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-menu>

      </mu-appbar>

      <div class="wrapper">

        <div class="card-box" v-if="collectList && collectList.length > 0">
          <mu-card class="card" v-for="item in collectList" :key="item._id">
            <mu-card-media :title="item.title">
              <img :src="item.cover" alt="">
            </mu-card-media>
            <mu-card-text @click="goDetail(item)">{{ item.introduction }}</mu-card-text>
            <mu-card-actions class="action">

              <mu-button flat color="pink500" @click="cancelCollect(item._id)">
                <mu-icon value="remove_circle" left></mu-icon>
                取消
              </mu-button>

              <mu-button flat color="primary" @click="like(item._id)">
                <mu-icon value="thumb_up" left></mu-icon>
                点赞
              </mu-button>

            </mu-card-actions>
          </mu-card>
        </div>

        <NotFound v-else title="暂无收藏内容" desc="卧槽！我竟然没有收藏文章！"></NotFound>

      </div>
    </div>
  </div>
</template>

<script>

import UpdateUserForm from '@/components/UpdateUserForm'
import NotFound from '@/views/NotFound'
import { getIntro } from '@/api/webconfig'
export default {
  name: 'user',
  components: {
    UpdateUserForm,
    NotFound
  },
  data () {
    return {
      // email:JSON.parse(localStorage.getItem('user')).email,
      openUpdateModal: false,
      collectList: [{
        categories: "技术",
        collect: 0,
        comment: 0,
        content:
          "### 1.toRefs↵把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref↵↵`应用`: ",
        cover: "http://nevergiveupt.top/vue/vue_composition_api.jpeg",
        createTime: 1611739740,
        introduction:
          "toRefs把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref ，和响应式对象 property 一一对应。",
        isCollect: true,
        isComment: true,
        isLike: true,
        isReward: false,
        like: 0,
        publishStatus: 1,
        sort: 0,
        status: 1,
        tags: ["Vue"],
        title: "Vue3.x-toRefs & shallowReactive & shallowRef & shallowReadonly",
        updateTime: 1611739813,
        views: 5,
        _id: "6011325cc4ae0128013d3210",
      }],
      userInfo: {
        avatar: 'https://pic3.zhimg.com/v2-ab5c6c7643d5bedeece7fccb5d7ec2a1_r.jpg',
        nickName: '莫伊莱',
        email: '450096639@qq.com',
        introduction: '有4年前端开发经验，熟悉Vue、React、Angular前端框架。熟悉小程序开发（Taro、Remax、MpVue、Wepy、 云开发）。熟悉NodeJs、Koa，Egg等后端知识。具有良好的沟通能力、工作协调能力、不断学习新技术、熟练前端技术、热衷于前端开发。'
      },
      info: {}
    }
  },
  created () {
    this.getIntroInfo()
  },
  mounted () {
    // if(!this.email){
    //   return this.$router.push('/articles')
    // }

    this.userInfo = {
      avatar: 'https://pic3.zhimg.com/v2-ab5c6c7643d5bedeece7fccb5d7ec2a1_r.jpg',
      nickName: '莫伊莱',
      email: '450096639@qq.com',
      introduction: '有4年前端开发经验，熟悉Vue、React、Angular前端框架。熟悉小程序开发（Taro、Remax、MpVue、Wepy、 云开发）。熟悉NodeJs、Koa，Egg等后端知识。具有良好的沟通能力、工作协调能力、不断学习新技术、熟练前端技术、热衷于前端开发。'
    }
  },
  methods: {
    async getIntroInfo () {
      const res = await getIntro()
      console.log("res", res)
      this.info = res.data
    },
    uploadFile (e) {
      console.log(e)
    },
    goDetail (item) {
      this.$router.push({
        name: 'articleDetail',
        query: {
          id: item._id
        }
      })
    },
    cancelCollect (id) {
      console.log(id)
    },
    like (id) {
      console.log(id)
    },
    toggleUpdateModal (bool) {
      this.openUpdateModal = bool
    }

  }
}

</script>
<style scoped lang="less">
.user {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .slider-card {
    width: 15rem;
    position: relative;
    text-align: center;
    padding: 16px;
    border-radius: 0;

    .avatar {
      cursor: pointer;
      margin-top: 20px;
      box-shadow: 0 3px 3px -2px rgba(0, 0, 0, .2),
        0 3px 4px 0 rgba(0, 0, 0, .14), 0 1px 8px 0 rgba(0, 0, 0, .12);
    }

    .file {
      width: 100px;
      height: 100px;
      opacity: 0;
      position: absolute;
      cursor: pointer;
    }

    .edit {
      position: absolute;
      right: 20px;
      top: 20px;
    }

    .title {
      font-size: 20px;
      color: #00e676;
    }

    .email {
      font-size: 16px;
    }

    .desc {
      font-size: 14px;
      margin: 10px 0;
      text-align: left;
    }
  }
}

.right {
  flex: 1;

  .wrapper {
    padding-left: 5%;
    padding-top: 70px;

    .card-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }

    .card {
      width: 100%;
      margin-bottom: 20px;
      margin-right: 4%;
      max-width: 18rem;
    }
  }
}

.action {
  display: flex;
  justify-content: space-around;
}
</style>