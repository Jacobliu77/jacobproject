<template>
<!-- el-row -->
  <el-row class='layout-header' type='flex' align="middle">
      <!-- 先定义一行 -->
     <el-col class='left' :span="12">
         <i  @click="forder" :class='{"el-icon-s-unfold":isCollapse,"el-icon-s-fold":!isCollapse}'></i>
         <span>热点资讯后台管理©华东交通大学</span>
     </el-col>
     <el-col class='right' :span="12">
         <el-row type='flex' justify="end" align="middle">
             <img :src="userInfo.photo ? userInfo.photo : defaultImg" alt="">
             <!-- 下拉菜单 -->
             <el-dropdown @command="clickMenu">
                 <!-- 匿名插槽  下拉菜单显示的元素内容 -->
                 <span>{{ userInfo.name }}</span>
                 <el-dropdown-menu slot="dropdown">
                     <el-dropdown-item command="info">个人信息</el-dropdown-item>
                     <el-dropdown-item command="git">git地址</el-dropdown-item>
                     <el-dropdown-item command="lgout">退出</el-dropdown-item>
                 </el-dropdown-menu>
             </el-dropdown>
         </el-row>
     </el-col>
  </el-row>
</template>
<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      isCollapse: false,
      userInfo: {
      }, // 定义一个用户对象
      defaultImg: require('../../assets/img/loginpng.png') // 先将图片转化成了一个变量
    }
  },
  created () {
    this.getUserInfo()
    eventBus.$on('updateUserInfo', () => {
      // 认为别人更新了数据 自己也应该更新
      this.getUserInfo()
    })
  },
  methods: {
    forder () {
      this.isCollapse = !this.isCollapse
      eventBus.$emit('forderchange', this.isCollapse)
    },
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.userInfo = result.data
      })
    },
    //   点击菜单项时触发
    clickMenu (command) {
      if (command === 'info') {
        this.$router.push('/home/userinfo') // 个人中心
      } else if (command === 'git') {
        //   跳转到git地址
        window.location.href = 'https://github.com/Jacobliu77/'
      } else {
        //    退出
        window.localStorage.removeItem('user-token') // 删除令牌
        this.$router.push('/login') // 回到登录页
      }
    }
  }
}
</script>

<style lang='less' scoped>
.layout-header {
    height:60px;
    .left {
        font-size: 20px;
        span {
           color: #2c3e50;
           font-size: 16px;
           margin-left:4px;
        }
    }
    .right {
      img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 5px;
      }
    }
}
</style>
