<template>
  <div class="login">
    <el-card class="box-card">
       <img src="../../assets/img/logo_admin.png"  style="height:60px;margin-left:40%" />
      <el-form ref="myForm" :model="formdata" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="formdata.mobile" placeholder="请输入手机号码" class="mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="formdata.code" placeholder="请输入验证码" class="code"></el-input>
          <el-button plain style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
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
      value ? callBack() : callBack(new Error('您必须同意无条件被我们蒙骗'))
    }
    return {
      formdata: {
        mobile: '',
        code: '',
        check: false
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }
        ],
        code: [
          { required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字' }
        ],
        check: [{ validator }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.myForm.validate(isOK => {
        if (isOK) {
          this.$axios({
            url: '/authorizations', // 请求地址 axios 没有指定 类型 默认走get类型
            method: 'post', // 类型
            data: this.formdata // body 参数
          }).then(result => {
            // 只接受正确结果
            // 前端缓存 登录成功返回给我们的令牌
            window.localStorage.setItem('user-token', result.data.data.token)
            this.$router.push('/home')
          }).catch(() => {
            this.$message({
              type: 'warning',
              message: '手机号或者验证码错误!'
            })
          })
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
    height: 350px;
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
