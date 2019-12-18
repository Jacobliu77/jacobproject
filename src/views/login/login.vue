<template>
  <div class="login">
    <el-card class="box-card">
      <img src="../../assets/img/logo_index.png" alt />
      <el-input v-model="formdata.tel" placeholder="请输入手机号码" class="tel"></el-input>
      <el-input v-model="formdata.code" placeholder="请输入验证码" class="code"></el-input>
      <el-button plain style="float:right">发送验证码</el-button>
      <el-checkbox v-model="formdata.checked" class="check">我已阅读用户协议且同意上述条款</el-checkbox>
      <el-button type="primary" class="submit">登录</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        tel: '',
        code: '',
        checked: false
      }
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
    .tel {
      margin-bottom: 20px;
    }
    .code {
      float: left;
      width: 70%;
    }
    .check{
        margin-top: 20px;
         float: left;
    }
    .submit{
        margin-top: 20px;
        width: 100%;
    }
  }
}
</style>
