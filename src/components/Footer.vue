<template>
  <!-- 使用CSS动态类传入props设定是否固定底部 -->
  <div class="footer" :class="{ 'fixed-footer': fixed }">
    <div class="copyright">
      <a href=""></a>
      <a target="_blank" href="http://beian.miit.gov.cn">
        Copyright © 2023 Setinsung・浙ICP备XXXXXXXXXX号
      </a>
      <div>本系统由Vue+Muse-UI提供技术支持</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fixed: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
// footer分别需要两个样式，首页需要固定在底部，其它页需要不固定
.footer {
  text-align: center;
  font-style: 0.3rem;
  margin: 30px 0;

  .copyright {
    // 为什么这里要继承，因为之后会直接设置主题，a的颜色就得到了继承
    a {
      color: inherit;

    }
  }
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1;
}
</style>