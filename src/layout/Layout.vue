<template>
  <div class="home">
  <el-container >
    <el-aside  style=" width: 220px;border-right:#409EFF;border-right-style: solid;border-right-width:2px  " >
      <Slidebar/>
    </el-aside>

    <el-container>

      <el-header style="border-bottom:#409EFF;border-bottom-style:solid;border-bottom-width: 3px;" >
        <Nav/>
      </el-header>
<!--    给一个height值,mian页面自己撑开-->
      <el-main style="height: 500px">
        <Main/>
      </el-main>

    </el-container>
  </el-container>
  </div>
</template>
<script>
  import {Slidebar, Nav, Main} from './components'
  // import Slidebar from  './components/Slidebar';
  // import   Nav from './components/Nav';
  // import   Main from  './components/Main';
  export default {
    data () {
      return {}
    },
    components: {
      Slidebar,
      Nav,
      Main
    }
  }
</script>
<style>
  .el-header{
    background-color:#303133;
  }

  .el-aside {
    line-height: 200px;
  }


</style>
