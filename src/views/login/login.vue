<template>
  <div class="login">
    <el-card class="box-card">
      <img src="../../assets/img/logo_index.png" alt />
      <el-form ref="myForm" :model="formdata" :rules="loginRules">
        <el-form-item prop="tel">
          <el-input v-model="formdata.tel" placeholder="请输入手机号码" class="tel"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="formdata.code" placeholder="请输入验证码" class="code"></el-input>
          <el-button plain style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="formdata.check" class="check">我已阅读用户协议且同意上述条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" class="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callBack) {
      value ? callBack() : callBack(new Error('您必须同意无条件被我们蒙骗')) // 炫技模式
    }
    return {
      formdata: {
        tel: '',
        code: '',
        check: false
      },
      loginRules: {
        tel: [
          { required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }
        ],
        code: [
          { required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字' }
        ],
        agree: [{ validator }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.myForm.validate(function (isOK) {
        if (isOK) {
          console.log('校验成功')
        }
      })
    }
  }
}
</script>

<style lang="less">
.login {
  background-image: url("../../assets/img/bgc.jpg");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    width: 440px;
    height: 320px;
    opacity: 0.9;
    img {
      height: 40px;
      margin-bottom: 20px;
    }
    .code {
      float: left;
      width: 70%;
    }
    .check {
      float: left;
    }
    .submit {
      width: 100%;
    }
  }
}
</style>
