<template>
  <div>
    <mu-dialog
      title="登录"
      width="500"
      max-width="90%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="open"
    >
      <mu-form ref="form" :model="validateForm">
        <mu-form-item label="Email" prop="email" :rules="emailRules">
          <mu-text-field v-model.trim="validateForm.email" prop="email"></mu-text-field>
        </mu-form-item>

        <mu-form-item label="密码" prop="password" :rules="passwordRules">
          <mu-text-field v-model.trim="validateForm.password" type="password" prop="password"></mu-text-field>
        </mu-form-item>

        <mu-form-item label="验证码" prop="captcha" :rules="captchaRules">
          <mu-text-field placeholder="区分大小写" v-model.trim="validateForm.captcha" prop="captcha">
            <div @click="getCaptcha" class="captcha" v-html="captcha"></div>
          </mu-text-field>
        </mu-form-item>
      </mu-form>

      <mu-button slot="actions" flat href="/api/v1/web/github/login">
        <mu-avatar style="margin-right:10px" size="30">
          <img :src="Icon.github" alt />
        </mu-avatar>
        Github
      </mu-button>

      <mu-button slot="actions" flat small @click="clear">取消</mu-button>
      <mu-button slot="actions" flat small color="primary" @click="submit">登录</mu-button>
    </mu-dialog>
  </div>
</template>
<script>
import { Icon } from "@/utils";

export default {
  props: {
    open: {
      type: Boolean,
      default: false
    },
    close() {
      this.open = false;
    },
    ok() {
      this.close();
    }
  },
  data() {
    return {
      captcha: "",
      emailRules: [{ validate: val => !!val, message: "邮箱必填！" }],
      passwordRules: [{ validate: val => !!val, message: "密码必填！" }],
      captchaRules: [{ validate: val => !!val, message: "请输入验证码" }],
      validateForm: {
        email: "",
        password: "",
        captcha: ""
      },
      Icon
    };
  },
  methods: {
    async getCaptcha() {

    },
    submit() {
      this.$refs.form.validate().then(async result => {
        if (result) {
          console.log(this.validateForm);
        }
      });
    },
    clear() {
      console.log("clear");
      this.$refs.form.clear();
      this.validateForm = {
        email: "",
        password: "",
        captcha: ""
      };
      this.$emit("toggle", false);
    }
  },
  watch: {
    open(newVal) {
      if (newVal) {
        this.getCaptcha(); // 每次打开弹框就获取一下验证码
      }
    }
  }
};
</script>
<style lang="less" scoped>
.captcha {
  cursor: pointer;
  /deep/ svg {
    vertical-align: middle;
  }
}
</style> 