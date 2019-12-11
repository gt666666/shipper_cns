<template>
<div style="height:100vh;background-color: #303133">
  <el-menu  router
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#303133"
    text-color="#ffffff"
    active-text-color="#ffd04b" >
    <div style="margin-top: -40px">  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img  src="@/assets/images/user.png">&nbsp;&nbsp;
      <span  style="font-size:16px; color: #ffffff;">用户名&nbsp;</span></div>
    <el-menu-item index="/"  style="margin-top: -55px">
      &nbsp;&nbsp; <i class="el-icon-document"></i>
      <span slot="title"   style="font-size:16px;margin-top: 20px">首&nbsp;&nbsp;&nbsp;&nbsp;页&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </el-menu-item>

    <el-menu-item index="/loan-input/loanInput">
      &nbsp;&nbsp; <i class="el-icon-menu"></i>
      <span slot="title" style="font-size:16px">贷款申请</span>
    </el-menu-item>

    <el-menu-item index="/input-manager/inputManager">
      &nbsp;&nbsp; <i class="el-icon-setting"></i>
      <span slot="title" style="font-size:16px">申请管理</span>
    </el-menu-item>
    <el-submenu index="/loan-manager">
    <template slot="title" >
      &nbsp;&nbsp;  <i class="el-icon-message-solid"></i>
      <span style="font-size:16px"   >贷款审批</span>
    </template>
    <el-menu-item index="/firstTrial" style="font-size:16px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;初审</el-menu-item>
    <el-menu-item  index="/lastInstance" style="font-size:16px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;终审</el-menu-item>
  </el-submenu>

    <el-submenu index="5">
      <template slot="title">
        &nbsp;&nbsp;  <i class="el-icon-location"></i>
        <span slot="title" style="font-size:16px">权限管理</span>
      </template>
      <el-menu-item index="5-1" style="font-size:16px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建管理员</el-menu-item>
      <el-menu-item index="5-2" style="font-size:16px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;列表展示</el-menu-item>
    </el-submenu>

    <el-menu-item index="6">
      &nbsp;&nbsp; <i class="el-icon-setting"></i><span slot="title" style="font-size:16px">标的管理</span>
    </el-menu-item>

  </el-menu>
</div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.el-menu{
  border: none;
}
</style>
