<template>
  <div class="container">
    <div class="panel">
      <div class="text-center">
        <h2 class="padding-top">
          <span>{{title}}</span>
        </h2>
        <div>
          <div class="float-left">
            <img src="http://www.nevergiveupt.top/ds-1.gif" alt="">
            <div class="alert">{{desc}}</div>
          </div>
          <div class="float-right">
            <img src="http://www.nevergiveupt.top/ds-2.png" alt="" width="260">
          </div>
        </div>
        <div class="padding-big">
          <a href="/articles" class="button bg-yellow">去看文章</a>
          <a href="/" class="button">返回首页</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default{
  name:'notFound',
  props:{
    title:{
      type:String,
      default:'404错误！抱歉您要找的页面不存在'
    },
    desc:{
      type:String,
      default:'卧槽！页面不见了'
    }
  }
}
</script>

<style scoped lang="less">
.container{
  margin-top:8%;
  .panel{
    margin-top:20px;
    .text-center{
      text-align:center;
      .padding-top{
        padding-top:18px;
      }
    }
  }
  .float-left{
    float:left;
    .alert{
      border-radius:5px;
      padding:15px;
      border:solid 1px #ddd;
      
    }
  }
  .float-right{
    float:right;
  }
}
.padding-big{
  padding-top:20px;
  display:flex;
  justify-content:center;
  .button{
    margin:0 10px;
    border: solid 1px #f90;
  }
  .bg-yellow{
    background-color:#f90;
    color:#fff;
  }
}
</style>