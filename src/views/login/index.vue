<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
      :model="loginForm"
      :rules="rules"
    >
      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/login-logo.png" alt="">
        </h3>
      </div>
      <!-- 输入框 -->
      <el-form-item prop="mobile">
        <span class="svg-container el-icon-user-solid"></span>
        <el-input v-model="loginForm.mobile" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container ">
          <SvgIcon iconClass="password" />
        </span>
        <el-input ref="pwd" v-model="loginForm.password" :type="passwordType" />
        <span class="svg-container " @click="showType">
          <SvgIcon :iconClass="passwordType ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" class="loginBtn" @click="login">登陆</el-button>
      <div class="tips">
        <span style="margin-right:20px;">账号: 13800000002</span>
        <span> 密码: 123456</span>
      </div>

    </el-form>
  </div>
  <!-- 环境变量的作用
  1. 正常公司中 有几个环境 4 开发 dev 测试 test 预发 uat 线上 pro
  2. 在项目里如何配置这几个环境  通过 .env 配置 base api
  开发环境的接口前缀 /api
  线上环境的接口前缀 /prod-api
   -->

  <!--
    实现密码盒子的切换
      1.点击闭眼图片切换成睁眼 判断密码框的 type属性 不为password的时候睁眼
      2.点击睁眼切换成闭眼 type切换成 password属性
    -->
</template>
<script>
import { valuePhone } from '@/utils/validate'
import SvgIcon from '@/components/SvgIcon/index.vue'
export default {
  name: 'Login',
  data() {
    const phoneValue = (rule, value, callback) => {
      if (valuePhone(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      loading: false,
      passwordType: 'password',
      loginForm: {
        mobile: '13800000002',
        password: '123456'
      },
      rules: {
        mobile: [
          { required: true, message: '手机号必填', trigger: 'blur' },
          { validator: phoneValue, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码必填', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '密码格式不正确 6~16之间',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    showType() {
      this.passwordType ? this.passwordType = '' : this.passwordType = 'password'
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    async login() {
      try {
      // 获取表单里的数据并校验 是否通过
        await this.$refs.loginForm.validate()
        this.loading = true
        // dispatch 触发actions里面的方法
        await this.$store.dispatch('user/loginAction', this.loginForm)
        this.$router.push('/')
      // 接口请求
      } finally {
      // 不论是否成功 都会调用这个方法
        this.loading = false
      }
    }
  },
  components: { SvgIcon }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#68b0fe;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/login.jpg'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
  }
  .el-form-item__error {
    color: #fff
  }
  .loginBtn {
    background: #407ffe;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
    width:100%;
    margin-bottom:30px;
    margin-bottom: 30px;
    border: 0;
    color: #fff;
  }

}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#68b0fe;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
