<template>
  <div>
    <mu-dialog
      scrollable
      title="修改资料"
      width="500"
      max-width="90%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="open"
    >
      <mu-form ref="form" :model="validateForm">
        <mu-form-item label="Email（用于登录，不可修改）" prop="email" >
          <mu-text-field
            v-model.trim="validateForm.email"
            prop="email"
            disabled
          ></mu-text-field>
        </mu-form-item>

        <mu-form-item label="昵称" prop="nickName" :rules="nickNameRules">
          <mu-text-field
            v-model.trim="validateForm.nickName"
            prop="nickName"
          ></mu-text-field>
        </mu-form-item>

        <mu-form-item
          label="登录密码"
          prop="password"
          :rules="passwordRules"
        >
          <mu-text-field
            v-model.trim="validateForm.password"
            prop="password"
            :action-icon="visibility ? 'visibility_off' : 'visibility'"
            :action-click="() => (visibility = !visibility)"
            :type="visibility ? 'text' : 'password'"
          ></mu-text-field>
        </mu-form-item>

        <mu-form-item
          label="确认密码"
          prop="confirmPassword"
          :rules="confirmPasswordRules"
        >
          <mu-text-field
            type="password"
            v-model.trim="validateForm.confirmPassword"
            prop="confirmPassword"
          ></mu-text-field>
        </mu-form-item>

        

        <mu-form-item
          label="个人简介"
          prop="introduction"
          :rules="introductionRules"
        >
          <mu-text-field
            v-model="validateForm.introduction"
            prop="introduction"
            multi-line
            :rows="4"
            full-width
          ></mu-text-field>
        </mu-form-item>
      </mu-form>
      
      <mu-button slot="actions" flat small @click="clear">取消</mu-button>
      <mu-button slot="actions" flat small color="primary" @click="submit"
        >注册</mu-button
      >
    </mu-dialog>
  </div>
</template>
<script>
import { Icon } from "@/utils";

export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    userInfo:{
      type:Object,
      default:null,
    },
    close() {
      this.open = false;
    },
    ok() {
      this.close();
    },
  },
  data() {
    return {
      Icon,
      visibility: false,
      captcha: "",
      
      nickNameRules: [
        { validate: (val) => val.length <= 20, message: "昵称最大20个字符！" },
      ],
      passwordRules: [
        { validate: (val) => !!val, message: "密码必填！" },
        {
          validate: (val) => {
            let reg = /^[a-zA-Z]\w{5,19}$/;
            return reg.test(val);
          },
          message: "以字母开头，长度在6~20之间，只能包含字母、数字和下划线！",
        },
      ],
      confirmPasswordRules: [
        { validate: (val) => !!val, message: "请填写确认密码！" },
        {
          validate: (val) => {
            return this.validateForm.password === val;
          },
          message: "密码不一致，请重新输入！",
        },
      ],
      
      introductionRules: [
        {
          validate: (val) => val.length <= 1000,
          message: "最大1000字符",
        },
      ],
      validateForm: {
        email: "",
        nickName: "",
        password: "",
        confirmPassword: "",
        introduction: "",

      },
    };
  },
  computed: {
    isShowAction() {
      return !(
        !this.info.openSearch &&
        !this.info.register &&
        !this.info.login
      );
    },
  },
  methods: {
    async getCaptcha() {
      const res = await this.$axios.get("/captcha");
      if (res) {
        this.captcha = res.data;
      }
    },
    submit() {
      this.$refs.form.validate().then(async (result) => {
        if (result) {
          const res = await this.$axios.post("/register", this.validateForm);
          if (res.data) {
            localStorage.setItem("user", JSON.stringify(res.data));
            this.$toast.success("注册成功");
            location.reload();
            this.$emit("toggle", false);
          } else {
            this.$toast.error(res.msg);
            this.getCaptcha();
          }
        }
      });
    },
    clear() {
      this.$refs.form.clear();
      
      this.$emit("toggle", false);
    },
  },
  watch: {
    open(newVal) {
      if (newVal) {
        this.getCaptcha(); // 每次打开弹框就获取一下验证码
      }
    },
    userInfo(val){
      this.validateForm = {
        ...val,
        password: "",
        confirmPassword: "",
      }
    }
  },
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