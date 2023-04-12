<template>
  <div class="header">
    <mu-appbar :color="background">
      <!-- 昵称 -->
      <span style="cursor:pointer">Setinsung</span>
      <!-- 头像 -->
      <!-- <mu-avatar slot="left" :size="50" class="header-avatar">
        <img src="" alt="">
      </mu-avatar> -->

      <mu-button @click="go(item)" v-show="isPC" flat slot="right" v-for="(item, index) in info.menu" :key="item.name"
        :color="lightIndex == index ? '#00e676' : ''">
        <mu-icon size="16" :value="item.icon"></mu-icon>
        {{ item.name }}
      </mu-button>

      <!-- 移动端用bottomSheet底部弹窗菜单 -->
      <mu-button v-show="!isPC" flat slot="left" @click="toggleWapMenu(true)">
        <mu-icon value="menu"></mu-icon>
      </mu-button>

      <mu-bottom-sheet :open.sync="openWapMenu">
        <mu-list @item-click="toggleWapMenu(false)">
          <mu-list-item @click="go(item)" button v-for="(item, index) in info.menu" :key="item.name">
            <mu-list-item-action>
              <mu-icon :value="item.icon" :color="lightIndex == index ? '#00e676' : ''"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title :style="{ color: lightIndex == index ? '#00e676' : '' }">
              {{ item.name }}
            </mu-list-item-title>
          </mu-list-item>

        </mu-list>
      </mu-bottom-sheet>


      <!-- 主题切换 -->
      <!-- flat 表示扁平按钮 -->
      <mu-button flat slot="right" ref="theme" @click="openTheme = !openTheme">
        <mu-icon value="color_lens"></mu-icon>
      </mu-button>
      <mu-popover :open.sync="openTheme" :trigger="triggerTheme">
        <mu-list>
          <mu-list-item button>
            <mu-list-item-title>Light</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>Dark</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-popover>
      <!-- 用户 -->
      <mu-button flat slot="right" ref="userbutton" @click="openUser = !openUser">
        <div class="user">
          <span>好好学习aaaaaaaaaaaa</span>
          <mu-icon value="expand_more"></mu-icon>
        </div>
      </mu-button>
      <mu-popover :open.sync="openUser" :trigger="triggerUser">
        <mu-list>
          <mu-list-item button>
            <mu-list-item-title>Personal Center</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>Sign Out</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-popover>


    </mu-appbar>
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
export default {
  props: {
    // 选中的一项变色
    lightIndex: {
      type: Number,
      default: 0
    },
    // 在不同页面Bar的背景颜色不同
    background: {
      type: String,
    }
  },
  data() {
    return {
      info: {
        menu: menus
      },
      openWapMenu: false,
      openTheme: false,
      openUser: false,
      triggerTheme: null,
      triggerUser: null
    }
  },
  methods: {
    toggleWapMenu(bool) {
      this.openWapMenu = bool
    },
    go(item) {
      // 如果单击同一个当前路由，停止
      if (this.$route.name === item.router) return;
      this.$router.push({
        name: item.router
      })
    }
  },
  mounted() {
    this.triggerTheme = this.$refs.theme.$el
    this.triggerUser = this.$refs.userbutton.$el
  }
}
</script>

<style lang="less" scoped>
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
    min-width: 2rem;
  }
}

// 让右边用户选项中的文字不换行，多则显示省略号
.user {
  display: flex;
  justify-content: space-around;
  align-items: center;

  span {
    display: block;
    width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;
  }
}


</style>