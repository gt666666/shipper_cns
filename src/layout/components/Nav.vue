<template>
  <div>

    <el-dropdown style="float: right; ">
      <el-button type="primary"
                 style="background-color: #303133;height:57px; border-radius: 13px; border: 1px #409EFF solid">
        用户中心<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><span @click="logout">退出</span></el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <i style="color: #409EFF;font-size: 30px; float: right;margin-top: 13px;margin-right: 23px"
       class="el-icon-s-custom"></i>
    <i style="color: #409EFF;font-size: 37px; float:left;margin-top: 10px;"
       class="el-icon-loading"></i>




    <el-breadcrumb separator="/">
      <el-breadcrumb-item style="margin-top: 36px;margin-left: 40px">
       <span style="color:#ffffff; font-size: 16px;margin-left: 8px;">
         {{title}}
       </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        title: ''
      }
    },
    methods: {
      getRouter () {
        if (this.$route.matched.length === 1) {
          this.title = this.$route.matched[0].meta.title
        }
        if (this.$route.matched.length === 2) {
          this.title = this.$route.matched[1].meta.title
        }

        //this.items = this.$route.matched.filter(v=> v.meta && v.meta.title);
      },
      logout () {
        this.$confirm('是否退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/login');
          this.$message({
            type: 'success',
            message: '退出成功'
          });

        }).catch(() => {

        });

      }
    },
    created () {
      this.getRouter()
    },
    watch: {
      $route (to, from) {  //监听路由变化
        this.getRouter()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .el-menu {
    border: none;
  }
</style>
