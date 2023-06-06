<template>
  <div>
    <div class="comment-item">
      <mu-card class="card" :class="[classStyle]"  v-for="item in list" :key="item._id">

        <mu-card-header :title="item.nickName" :sub-title="(item.commentTime | filterDate)">
          <mu-avatar slot="avatar"><img :src="item.avatar" alt=""></mu-avatar>
        </mu-card-header>
        <mu-card-text>
          <span v-if="prevWho" class="who">@{{prevWho}}</span>
          {{item.currentReplayContent}}
          <mu-badge v-if="(item.auditStatus == 3)" content="未审核" color="#ccc"></mu-badge>
        </mu-card-text>
        <mu-card-action v-if="(user && user.nickName !==item.nickName && user.email !== item.email)">
          <mu-button @click="replay(item)"  small color="primary">回复</mu-button>
        </mu-card-action>

        <!-- 递归组件调用自身，必须要指定name属性为commentList -->
        <div v-if="item.children">
          <comment-list :list="item.children" :articleId="articleId"
          :articleTitle="articleTitle" :prevWho="item.nickName"  classStyle="sub-card">

          </comment-list>
        </div>
      </mu-card>
    </div>

    <mu-dialog :title="modalTitle" width="600" max-width="80%" :open.sync="open" 
    :esc-press-close="false" :overlay-close="false">
      <mu-text-field v-model="replayContent" 
      placeholder="说点什么..." multi-line :rows="4" full-width></mu-text-field>
      <mu-button slot="actions" flat color="primary" @click="close()">取消</mu-button>
      <mu-button slot="actions" flat color="primary" @click="ok()">确定</mu-button>
    </mu-dialog>

  </div>
</template>

<script>

export default{
  name:'commentList',
  props:{
    list:{
      type:Array
    },
    articleId:{
      type:String,
      default:""
    },
    articleTitle:{
      type:String,
      default:""
    },
    classStyle:{
      type:String,
      default:""
    },
    prevWho:{
      type:String,
      default:""
    },
    
  },
  data(){
    return{
      open:false,
      user:JSON.parse(localStorage.getItem('user')),
      modalTitle:'',
      replayContent:""
    }
  },
  methods:{
    replay(item) {
      if (!this.user) {
        this.$toast.info("登录才能回复");
        return;
      }
      this.open = true;
      this.modalTitle = `回复 @${item.nickName}`;
    },
    close(){
      this.open = false;
      this.replayContent = "";
    },
    ok(){
      if(!this.replayContent){
        this.$toast.info('请输入恢复内容');
        return;
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-item{
  padding-bottom:0.53333rem;
  /deep/.mu-card-text{
    padding-top:0;
    .who{
      color:#e91e63;
    }
  }
}
.card{
  margin:0.42667rem 1.0667rem 0 1.0667rem;
  padding-bottom:0.426667rem;
  box-shadow:none;
  border-radius:0;
}
.sub-card{
  border-left:1px dashed #00e676;
  border-bottom:1px dashed #00e676;
  box-shadow:none;
  border-radius:0;
}

</style>