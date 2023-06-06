<template>
  <div class="right-config">
    <mu-card class="slider-card">
      <mu-avatar class="avatar" size="100">
        <img  alt="" src="https://pic3.zhimg.com/v2-ab5c6c7643d5bedeece7fccb5d7ec2a1_r.jpg">
      </mu-avatar>
      <div class="title">{{introInfo.nickName}}</div>
      <div class="desc">{{introInfo.desc}}</div>
      <div class="tags" v-for="item in introInfo.tags" :key="item">
        <mu-chip class="chip">{{item}}</mu-chip>
        
      </div>
      <div class="friend-link-box">
        <p class="friend-link-title">友情链接</p>
        <div class="friend-links">
          <mu-button fab small>
            <mu-avatar size="40">
              <img src="http://www.nevergiveupt.top/github.png " alt="">
            </mu-avatar>
          </mu-button>
          <mu-button fab small>
            <mu-avatar size="40">
              <img src="http://www.nevergiveupt.top/sf.jpeg " alt="">
            </mu-avatar>
          </mu-button>
          <mu-button fab small>
            <mu-avatar size="40">
              <img src="http://www.nevergiveupt.top/zhihu.jpg " alt="">
            </mu-avatar>
          </mu-button>
        </div>
      </div>
    </mu-card>
    <!-- 广告(无效)-->
    <mu-card class="slider-card">
      <div class="ad">广告</div>
      <mu-carousel style="height: 120px" hide-controls>
        <mu-carousel-item v-for="item in adInfo" :key="item._id">
          <img
            style="width: 100%; cursor: pointer"
            :src=item.imgUrl
          />
        </mu-carousel-item>
      </mu-carousel>
    </mu-card> 
    <mu-card class="slider-card">
      <div class="friend-link-box">
        <p class="friend-link-title">电影推荐</p>
        <div class="friend-links">
          <div class="tags">
            <mu-chip class="chip">唐人街探案3</mu-chip>
          </div>
        </div>
      </div>
    </mu-card>
    <mu-card class="slider-card">
      <img src="http://www.nevergiveupt.top/qianduanxiaokezhan.png" alt="">
    </mu-card>
  </div>
</template>
<script>
  import {getAd,getIntro} from '@/api/webconfig.js'
  export default{
    data(){
      return{
        adInfo:{},
        introInfo:{}
      }
    },
    created(){
      this.getAdInfo(),
      this.getIntroInfo()
    },
    methods:{
      async getAdInfo(){
        const res = await getAd()
        console.log(res)
        this.adInfo = res.data.imgs
      },
      async getIntroInfo(){
        const res = await getIntro()
        console.log(res)
        this.introInfo = res.data
      }
    }
  }
</script>
<style scoped lang="less">
.right-config {
  width: 14rem;
}
.slider-card {
  position: relative;
  margin-top: 16px;
  text-align: center;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14),
    0 1px 8px 0 rgba(0, 0, 0, 0.12); 
  .avatar {
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14),
    0 1px 8px 0 rgba(0, 0, 0, 0.12); 
  }
  .title{
    font-size:20;
    color:#00e676;

  }
  .desc{
    font-size:14px;
    margin:10px 0;
  }
  .tags{
    .chip{
      margin:0 10px 10px 0;
    }
  }
  .friend-link-box{
    .friend-link-title{
      position:relative;
      &::before {
        content: "";
        width: 30%;
        height: 1px;
        background: #ccc;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      &::after {
        content: "";
        width: 30%;
        height: 1px;
        background: #ccc;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }
  }
  .friend-links{
    display:flex;
    justify-content: space-around;
  }
}

.ad{
  position:absolute;
  right:8px;
  top:8px;
  font-size:12px;
  z-index: 1;
}
}
img {
  max-width:100%;
}
</style>