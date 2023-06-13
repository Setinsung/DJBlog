<template>
  <div class="common" :style="{
    background: `url(${homeConfig.categoriesDetailBgImg}) 0px center no-repeat`,
    backgroundSize: 'cover',
  }">
    <Header :light-index="3" background="transparent"></Header>

    <div class="content">
      <mu-paper class="pc-box" :z-depth="5">
        <div class="sub-title">分类-{{ this.$route.query.name }}</div>
        <mu-list v-for="item in cateInfo.list" :key="item._id">

          <mu-list-item button @click="goDetails(item)">
            <mu-list-item-title class="item">
              <span class="title">文章标题:{{ item.title }}</span>
              <span>创建时间:{{ timestampToDate(item.createTime * 1000) }}</span>
            </mu-list-item-title>
          </mu-list-item>

        </mu-list>
        <div class="pagination">
          <mu-pagination raised circle :total="100" :current.sync="page" :pageSize.sync="pageSize"></mu-pagination>
        </div>
      </mu-paper>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header"
import { getList } from '@/api/articles.js'
import { mapState } from 'vuex';
export default {
  name: "categories",
  components: {
    Header,
  },
  data () {
    return {
      categories: [],
      categoriesDetailsBgImg: "http://nevergiveupt.top/category.jpg",
      page: 1,
      pageSize: 10,
      cateInfo: {}
    }
  },
  computed: {
    ...mapState('app', ['homeConfig']),
  },
  created () {
    this.getCateInfo()
  },
  mounted () { },
  methods: {
    async getCateInfo () {
      const res = await getList({
        page: this.page,
        pageSize: this.pageSize,
        categories: this.$route.query.name
      })
      this.cateInfo = res.data
      console.log("res", res)

    },
    goDetails (item) {
      this.$router.push(`/articles/details/${item._id}`)
    },
    timestampToDate (timestamp) {
      // 创建一个新的Date对象，并将其设置为指定的时间戳
      const date = new Date(timestamp)
      // 使用toLocaleString()方法将日期对象转换为本地日期/时间字符串
      const dateString = date.toLocaleString()
      // 返回格式化后的日期字符串
      return dateString
    }
  },
}
</script>
<style lang="less" scoped>
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

.pc-box {
  width: 50%;

  .header {
    font-size: 0.4rem;
  }

  /deep/.mu-item {
    height: 40px;
  }

  .sub-title {
    font-size: 0.4rem;
    padding-left: 16px;
  }

  .item {
    display: flex;
    justify-content: space-between;

    .title {
      display: inline-block;
      width: 70%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin: 0.53333rem 0;
  }
}
</style> 