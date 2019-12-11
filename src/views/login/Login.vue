<template>
  <div>
    <div style=" margin-left: 15%; margin-top: 300px;width: 800px;">
      <p class="title">信贷后台管理系统</p>
      <p class="title">Loan background management system</p>
    </div>
    <div style=" width: 430px;height: 300px;margin-left: 60%;margin-top:-150px;background-color: #ffffff;border-radius: 10px">

      <div style="padding-top: 20px;margin-bottom: 25px; margin-left: 180px" slot="header" class="clearfix">
        <span>密&nbsp;码&nbsp;登&nbsp;录</span>
      </div>
      <el-form style="width: 400px" :rules="rules" ref="ruleForm" :model="ruleForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input style="margin-top: 10px" v-model="ruleForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%;height:50px;margin-top: 10px;  " type="primary" @click="submitForm('ruleForm')">
            登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        ruleForm: {
          username: '',
          password: ''

        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}

          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = this.$qs.stringify({
              username: this.ruleForm.username,
              password: this.ruleForm.password
            })
            this.$http.post('login', params).then(res => {
              if (res.data.code == 1000) {
                this.$router.push('/home')
                this.$message({
                  message: '登录成功',
                  type: 'success',
                  center: true
                });
              }
              if (res.data.code == 1001) {
                this.$message({
                  message:'用户名错误',
                  type:'error',
                  center:true
                })
              }
              if (res.data.code == 1002) {
                this.$message({
                  message:'密码错误',
                  type:'error',
                  center:true
                })
              }
              if (res.data.code == 1003) {
                this.$message({
                  message: '被锁了，找管理员解锁去吧！',
                  type: 'warning'
                });
              }
            }).catch(error => {
            })
          } else {
            return false
          }
        })
      }
    },
    beforeCreate () {
      document.querySelector('body').setAttribute('style', 'background-color:#2c3e50')
    },
    beforeDestroy () {
      document.querySelector('body').removeAttribute('style')
    }

  }
</script>
<style >
  .title {
    font-size: 36px;
    font-weight: 600;
    color: #ffffff;
  }

</style>
