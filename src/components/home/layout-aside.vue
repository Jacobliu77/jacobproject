<template>
  <div class="layout-aside">
    <div class="title">
      <img src="../../assets/img/logo_admin.png" alt />
    </div>
    <!-- 左侧导航组件  开启路由 :router="true" 或者 router-->
    <el-menu
      router
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
    >
      <!-- 没有折叠选项 -->
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>
      <!-- 二级折叠菜单 -->
      <el-submenu index="1">
        <!-- 具名插槽 -->
        <template slot="title">
          <i class="el-icon-s-management"></i>
          <span>内容管理</span>
        </template>
        <!-- 匿名插槽 -->
        <el-menu-item index="/home/publish">
          <span>发布文章</span>
        </el-menu-item>
        <el-menu-item index="/home/articles">文章列表</el-menu-item>
        <el-menu-item index="/home/comment">评论管理</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <!-- 具名插槽 -->
        <template slot="title">
          <i class="el-icon-star-on"></i>
          <span>粉丝管理</span>
        </template>
        <!-- 匿名插槽 -->
        <el-menu-item index="/home/picture">图文数据</el-menu-item>
        <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fanspicture">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/userinfo">
        <i class="el-icon-user-solid"></i>
        <span>账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  created () {
    eventBus.$on('forderchange', status => {
      this.isCollapse = status
    })
  }
}
</script>

<style lang='less' scoped>
.layout-aside {
//   width: 230px;
  .el-menu {
    border-right: none;
  }
  .title {
    background-color: #2e2f32;
    text-align: center;
    padding: 10px 0;
    img {
      height: 35px;
    }
  }
}
</style>
