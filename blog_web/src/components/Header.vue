<template>
  <div class="header">
    <mu-appbar :color="background">
      <!-- title -->
      <span style="cursor: pointer">{{ introInfo.nickName }}</span>

      <mu-avatar slot="left" class="header-avatar" :size="50">
        <img src="https://pic3.zhimg.com/v2-ab5c6c7643d5bedeece7fccb5d7ec2a1_r.jpg" />
      </mu-avatar>

      <!-- 菜单 -->
      <mu-button slot="right" v-for="(item, index) in menu" :key="item.name"
        :color="lightIndex === index ? '#00e676' : ''" flat @click="jumpTo(item)">
        <mu-icon size="16" :value="item.icon"></mu-icon>
        {{ item.name }}


      </mu-button>

      <!-- 主题切换 -->
      <mu-button flat slot="right" ref="theme" @click="openTheme = !openTheme">
        <mu-icon value="color_lens"></mu-icon>
      </mu-button>
      <mu-popover :open.sync="openTheme" :trigger="triggerTheme">
        <mu-list>
          <mu-list-item button @click="toggleTheme('selfLight')">
            <mu-list-item-title>
              <mu-icon :color="me === 'selfLight' ? 'primary' : ''" value="brightness_7"></mu-icon>
            </mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="toggleTheme('selfDark')">
            <mu-list-item-title>
              <mu-icon :color="me === 'selfDark' ? 'primary' : ''" value="brightness_4"></mu-icon>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-popover>

      <!-- 用户 -->
      <mu-button flat slot="right" ref="button" @click="openUser = !openUser">
        <div class="user">
          <span>{{ introInfo.nickName }}</span>
          <mu-icon value="expand_more"></mu-icon>
        </div>
      </mu-button>
      <mu-popover :open.sync="openUser" :trigger="trigger">
        <mu-list>
          <mu-list-item button @click="$router.push('user')">
            <mu-list-item-title>个人中心</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>退出登录</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-popover>
    </mu-appbar>


    <!-- 搜索按钮 -->
    <div class="tool" v-if="isShowAction">

      <!-- 如果用户已经登录了那就不展示登录和注册按钮 !user 控制 -->
      <div v-if="info.login && !user" class="tool-row">
        <mu-slide-left-transition>
          <mu-button v-show="showToolBtn" @click="
            openLoginModal = true;
          showToolBtn = false;
          " fab color="primary">登录</mu-button>
        </mu-slide-left-transition>
      </div>
      <div class="tool-row">
        <mu-tooltip placement="right-start" content="登录/注册/搜索">
          <mu-button @click="showToolBtn = !showToolBtn" fab color="info" class="search-fab">
            <mu-icon value="adb"></mu-icon>
          </mu-button>
        </mu-tooltip>

        <mu-slide-left-transition>
          <mu-button v-show="showToolBtn && info.openSearch" @click="openSearchModal = true; showToolBtn = false;" fab
            color="error">搜索</mu-button>
        </mu-slide-left-transition>
      </div>

      <!-- 如果用户已经登录了那就不展示登录和注册按钮 !user 控制 -->
      <div v-if="info.register && !user" class="tool-row">
        <mu-slide-left-transition>
          <mu-button v-show="showToolBtn" @click="
            openRegisterModal = true;
          showToolBtn = false;
          " fab color="warning">注册</mu-button>
        </mu-slide-left-transition>
      </div>
    </div>

    <RegisterForm :open="openRegisterModal" @toggle="toggleRegisterModal"></RegisterForm>

    <LoginForm :open="openLoginModal" @toggle="toggleLoginModal"></LoginForm>

    <SearchForm :open="openSearchModal" @toggle="toggleSearchModal"></SearchForm>

    <mu-slide-bottom-transition>
      <mu-tooltip placement="top" content="Top">
        <mu-button class="back-top" v-show="showBackTop" @click="scrollTop" fab color="secondary">
          <mu-icon value="arrow_upward"></mu-icon>
        </mu-button>
      </mu-tooltip>
    </mu-slide-bottom-transition>
  </div>
</template>

<script>

const menus = [
  {
    name: "首页",
    router: "index",
    icon: "home",
  },
  {
    name: "文章",
    router: "articles",
    icon: "note_add",
  },
  {
    name: "归档",
    router: "archives",
    icon: "drafts",
  },
  {
    name: "分类",
    router: "categories",
    icon: "dns",
  },
  {
    name: "标签",
    router: "tags",
    icon: "loyalty",
  },
  {
    name: "关于",
    router: "about",
    icon: "perm_identity",
  },
]

import RegisterForm from './RegisterForm.vue'
import LoginForm from './LoginForm.vue'
import SearchForm from './SearchForm.vue'
import { getIntro } from '@/api/webconfig.js'
import { getHF } from '@/api/hf.js'
export default {
  name: "Header",
  components: {
    RegisterForm,
    LoginForm,
    SearchForm
  },
  props: {
    lightIndex: {
      type: Number,
      default: 0,
    },
    background: {
      type: String,
    },
  },
  data () {
    return {
      introInfo: {},
      showBackTop: false,

      openUser: false,
      openTheme: false,
      openWapMenu: false,

      trigger: null,
      triggerTheme: null,
      menu: menus,
      info: {
        menu: menus,
        login: true, // 是否开启登录
        openSearch: true,// 是否开启搜索
        register: true,// 是否开启注册 
      },
      isShowAction: true, // 是否显示操作按钮
      showToolBtn: false, // 点击切换显示操作按钮
      user: JSON.parse(localStorage.getItem("user")), // 用户信息

      openSearchModal: false, // 打开搜索弹框
      openLoginModal: false, // 打开登录弹框
      openRegisterModal: false, // 打开注册弹框 

      me: ""
    }
  },

  mounted () {
    this.trigger = this.$refs.button.$el
    this.triggerTheme = this.$refs.theme.$el
    window.onscroll = () => {
      if (document.documentElement.scrollTop + document.body.scrollTop > 100) {
        this.showBackTop = true
      } else {
        this.showBackTop = false
      }
    }

    // const hours = new Date().getHours()
    // console.log(hours)
    // let defaultTheme = ''
    // if (hours > 6 && hours < 18) {
    //   defaultTheme = 'selfLight'
    // }
    // else {
    //   defaultTheme = 'selfDark'
    // }

    // this.me = localStorage.getItem('selfTheme') || defaultTheme
  },
  created () {
    this.getHInfo()
  },
  methods: {
    async getHInfo () {
      const res = await getHF()
      console.log(res)
      // this.info = res.data.Headers
    },
    // 跳转
    jumpTo (item) {
      if (item.router === "index") {
        this.$router.push("/")
      } else if (item.router === "archives") {
        this.$router.push("/archives")
      } else if (item.router === "categories") {
        this.$router.push("/categories")
      } else if (item.router === "tags") {
        this.$router.push("/tags")
      } else if (item.router === "about") {
        this.$router.push("/about")
      } else if (item.router === "articles") {
        this.$router.push("/articles")
      }
    },
    toggleRegisterModal (bool) {
      this.openRegisterModal = bool
    },
    toggleLoginModal (bool) {
      this.openLoginModal = bool
    },
    toggleSearchModal (bool) {
      this.openSearchModal = bool
    },
    scrollTop () {
      document.body.scrollIntoView({ block: "start", behavior: "smooth" })
    },
    toggleTheme (me) {
      this.theme.use(me)
      this.me = me
      localStorage.setItem("theme", me)
      this.openTheme = false
    },
    async getIntroInfo () {
      const res = await getIntro()
      console.log(res)
      this.introInfo = res.data
    }
  },
  // computed: {
  //   isShowAction() {
  //     return !(
  //       !this.info.openSearch &&
  //       !this.info.register &&
  //       !this.info.login
  //     );
  //   },
  // },

}
</script>

<style scoped lang="less">
.header {
  position: fixed;
  z-index: 1501;
  width: 100%;
  top: 0;
}

.header-avatar {
  margin-left: 20px;
  cursor: pointer;
}

.mu-appbar {
  .mu-flat-button {
    flex: 1;
  }

  /deep/ .mu-appbar-right {
    flex: 1;
  }
}

.user {
  display: flex;
  justify-content: space-around;
  align-items: center;

  span {
    display: block;
    width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: right;
  }
}

.tool {
  position: fixed;
  left: 0;
  bottom: 2.66667rem;

  .tool-row {
    margin-top: 20px;

    .search-fab {
      margin-left: -28px;
      margin-right: 20px;
    }
  }
}

.back-top {
  position: fixed;
  right: 0.26667rem;
  bottom: 0.4rem;
  background: #595959;
}
</style> 