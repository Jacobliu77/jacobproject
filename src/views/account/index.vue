<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">个人中心</template>
    </bread-crumb>
    <el-form
      :model="formData"
      status-icon
      :rules="rules"
      ref="myForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="formData.name" style="width:40%"></el-input>
      </el-form-item>
      <el-form-item label="个人简介" prop="info">
        <el-input type="text" v-model="formData.intro" style="width:40%"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" style="width:40%"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:40%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveUserInfo">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-upload :http-request="uploadImg" class="head-upload" action :show-file-list="false">
      <img :src="formData.photo ? formData.photo : defaultImg" alt />
    </el-upload>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: ''
      },
      defaultImg: '../../assets/img/loginpng.png',
      rules: {
        name: [
          { required: true, message: '用户名不能为空' },
          {
            min: 1,
            max: 7,
            message: '用户名长度在1到7个字符'
          }
        ],
        email: [
          { required: true, message: '邮箱不能为空' },
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: '邮箱格式不正确'
          }
        ]
      }
    }
  },
  methods: {
    uploadImg (params) {
      this.loading = true // 打开弹层
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        this.loading = false // 关闭弹层
        this.formData.photo = result.data.photo // 给当前的头像赋值
        // 认为保存成功 => 通知header组件 更新信息
        eventBus.$emit('updateUserInfo')
      })
    },
    getuserinfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    },
    saveUserInfo () {
      this.$refs.myForm.validate().then(result => {
        //  调用保存接口
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(result => {
          this.$message({
            type: 'success',
            message: '保存用户信息成功'
          })
          // 认为保存成功 => 通知header组件 更新信息
          eventBus.$emit('updateUserInfo')
        })
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  created () {
    this.getuserinfo()
  }
}
</script>
<style lang="less" scope>
  .head-upload{
    border-radius: 50%;
    position: absolute;
    top: 180px;
    right: 260px;
    img{
      width: 200px;
      height: 200px;
    }
  }
</style>
