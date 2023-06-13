<template>
  <div>
    <mu-dialog :fullscreen="!isPC" width="60%" :open.sync="openModel">
      <mu-auto-complete 
        action-icon="search" 
        label-float :data="keywords" 
        label="文章搜索" 
        :max-search-results="20"
        v-model="keyword" 
        open-on-focus 
        avatar 
        full-width 
        @change="handleSearch"
        :action-click="handleSearch"
      >
        <template slot-scope="scope">
          <mu-list-item-action>
            <mu-avatar color="primary">
              {{ scope.item.substring(0, 1) }}
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content v-html="scope.highlight"></mu-list-item-content>
        </template>
      </mu-auto-complete>

      <div v-if="list && list.length === 0" class="no-content">暂无内容</div>
      <mu-list v-else class="list" textline="two-line">
        <mu-list-item v-for="item in list" :key="item._id" button @click="goDetail(item)">

          <mu-list-item-action>
            <mu-avatar><img :src="item.cover" alt=""></mu-avatar>
          </mu-list-item-action>

          <mu-list-item-content>
            <mu-list-item-title>{{ item.title }}</mu-list-item-title>
            <mu-list-item-sub-title><span>{{ item.introduction }}</span></mu-list-item-sub-title>
          </mu-list-item-content>

          <mu-list-item-action style="min-width:140px;">{{ (item.createTime | filterDate) }}</mu-list-item-action>
        </mu-list-item>
      </mu-list>
    </mu-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/articles'
import { getTags } from "@/api/tags.js"
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    openModel: {
      get() {
        return this.open;
      },
      set(val) {
        this.$emit("update:open", val);
      }
    }
  },
  data() {
    return {
      list: [
        // {
        //   categories: "技术",
        //   collect: 0,
        //   comment: 0,
        //   content:
        //     "### 1.toRefs↵把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref↵↵`应用`: ",
        //   cover: "http://nevergiveupt.top/vue/vue_composition_api.jpeg",
        //   createTime: 1611739740,
        //   introduction:
        //     "toRefs把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref ，和响应式对象 property 一一对应。",
        //   isCollect: true,
        //   isComment: true,
        //   isLike: true,
        //   isReward: false,
        //   like: 0,
        //   publishStatus: 1,
        //   sort: 0,
        //   status: 1,
        //   tags: ["Vue"],
        //   title: "Vue3.x-toRefs & shallowReactive & shallowRef & shallowReadonly",
        //   updateTime: 1611739813,
        //   views: 5,
        //   _id: "6011325cc4ae0128013d3210",
        // }
      ],
      keyword: '',
      keywords: []
    }
  },
  created() {
    this.getTags();
  },
  mounted() {
  },
  methods: {
    async getTags(){
      const res = await getTags()
      this.keywords = res.data.list.map(item => item.name);
    },
    async getList(query) {
      const res = await getList(query);
      this.list = res.data.list;
    },
    handleSearch() {
      if (!this.keyword) return;
      if (!this.keywords.includes(this.keyword)) {
        this.getList({ title: this.keyword });
      } else {
        this.getList({ tags: this.keyword });
      }
    },
    goDetail(item) {
      this.$router.push(`/articles/details/${item._id}`)
    }
  },
}
</script>

<style scoped lang="less">
.list {
  overflow-y: auto;
  max-height: 450px;
}

.no-content {
  text-align: center;
}

</style>