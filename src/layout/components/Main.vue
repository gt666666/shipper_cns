<template>
<div>
  <div >
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item >
       <span style="font-size: 16px;color:#000000;">
         {{title}}
       </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
    <hr style="height:1px;border:none;border-top:1px solid #409EFF;"/>
</div>
<div>
  <keep-alive>
    <router-view />
  </keep-alive>
</div>
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
        //console.log(this.$route.matched)
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
<style  lang="scss">

</style>
