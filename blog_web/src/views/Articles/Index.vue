<template>
  <div class="articles">
    <Header :light-index="1"></Header>
    <div class="content">
      <div class="right">
        <RightConfig></RightConfig>
      </div>

      <div class="left">
        <mu-card @click="goDetails(item)" class="card" v-for="item in info.list" :key="item._id">
          <div class="cover">
            <img class="cover-img" v-lazy="item.cover" alt="">
          </div>
          <div class="card-box">
            <div class="title">{{ item.tile }}</div>
            <mu-card-actions class="sub-title">
              <mu-button class="cursor-default" flat color="info">查看{{ item.views }}</mu-button>
              <mu-button class="cursor-default" flat color="error">评论{{ item.comment }}</mu-button>
              <mu-button class="cursor-default" flat color="primary">点赞{{ item.like }}</mu-button>
              <mu-button class="cursor-default" flat color="#9e9e9e">{{ item.createTime }}</mu-button>
            </mu-card-actions>
            <mu-card-text class="text">{{ item.introduction }}</mu-card-text>
            <mu-card-actions>
              <mu-button class="cursor-default chip" flat color="primary">
                <mu-icon left value="dns"></mu-icon>
                {{ item.categories }}
              </mu-button>
              <mu-button v-for="sub in item.tags" :key="sub" class="cursor-default chip" flat>
                <mu-icon left value="loyalty"></mu-icon>
                {{ sub }}
              </mu-button>


            </mu-card-actions>
          </div>
        </mu-card>
      </div>
    </div>
    <div v-if="info.totalCount > pageSize" class="pagination">
      <mu-pagination raised circle :total="info.totalCount" :current.sync="page" :pageSize.sync="pageSize"
        :pageCount="5"></mu-pagination>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import RightConfig from "@/components/RightConfig.vue";
import { getList } from '@/api/articles'
export default {
  name: 'articles',
  components: {
    Header,
    RightConfig
  },

  data() {
    return {
      page: 1,
      pageSize: 20,
      info: {
        page: 1,
        pageSize: 20,
        totalCount: 0,
        // list: [
        //   {
        //     categories: "技术",
        //     collect: 0,
        //     comment: 0,
        //     content: "123",
        //     cover: "http://nevergiveupt.top/canvas/html2canvas.png",
        //     createTime: 1612403820,
        //     introduction:
        //       "有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。",
        //     isCollect: true,
        //     isComment: true,
        //     isLike: true,
        //     isReward: false,
        //     like: 0,
        //     publishStatus: 1,
        //     sort: 0,
        //     status: 1,
        //     tags: ["Canvas", "Pdf.js"],
        //     title: "使用jspdf+canvas2html将网页保存为pdf文件",
        //     updateTime: 1612416421,
        //     views: 9,
        //     _id: "1",
        //   },
        //   {
        //     categories: "生活",
        //     collect: 0,
        //     comment: 0,
        //     content: "123",
        //     cover: "http://nevergiveupt.top/canvas/html2canvas.png",
        //     createTime: 1612403820,
        //     introduction:
        //       "有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。",
        //     isCollect: true,
        //     isComment: true,
        //     isLike: true,
        //     isReward: false,
        //     like: 0,
        //     publishStatus: 1,
        //     sort: 0,
        //     status: 1,
        //     tags: ["Canvas", "Pdf.js"],
        //     title: "使用jspdf+canvas2html将网页保存为pdf文件",
        //     updateTime: 1612416421,
        //     views: 9,
        //     _id: "2",
        //   },
        // ],
      },
    }
  },
  created() {
    this.getList();
  },
  methods: {
    goDetails(item) {
      this.$router.push(`/articles/details/${item._id}`)
    },
    async getList() {
      const res = await getList({
        page: this.page,
        pageSize: this.pageSize
      });
      this.info = res.data;
      console.log('res', res)
      console.log('info', this.info)
    }
  }
}
</script>
<style scoped lang="less">
.articles {
  padding-top: 70px;

  .content {
    padding-bottom: 0.53333rem;
    display: flex;

    .left {
      flex: 9;

      &.wap-left {
        .card {
          float: none;
          width: 90%;
        }
      }

      .card {
        width: 80%;
        float: left;
        margin: 2.82667rem auto 0;
        display: flex;
        flex-wrap: wrap;
        border-radius: 5px;

        &:hover {
          animation: pulse 1s;
        }

        .card-box {
          flex: 2;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        .title {
          padding: 0.42667rem 0.42667rem 0 0.42667rem;
          font-size: 0.4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          cursor: pointer;
        }

        .sub-title {
          display: flex;
          flex-wrap: wrap;
        }

        .text {
          padding: 0 0.42667rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }

        .chip {
          margin-right: 0.26667rem;
        }

        .cover {
          flex: 1;
          border-radius: 0;
          padding: 0.42667rem;

          .cover-img {
            object-fit: cover;

            width: 100%;
            height: 13.26667rem;
            vertical-align: middle;
          }
        }
      }
    }

    .right {
      flex: 3;
      display: flex;
      justify-content: center;
    }
  }
}

.pagination {
  margin: 0.53333rem 0;
  display: flex;
  justify-content: center;

}</style>