<template>
  <div>
    <div style=" margin-left: 5%; margin-top: 300px;width: 800px;">
      <p class="title">信贷后台管理系统</p>
      <p class="title">Loan background management system</p>
    </div>
    <div
      style=" width: 430px;height: 350px;margin-left: 60%;margin-top:-200px;background-color: #ffffff;border-radius:15px">

      <div style="padding-top: 20px;margin-bottom: 25px; margin-left: 180px" slot="header" class="clearfix">
        <span>密&nbsp;码&nbsp;登&nbsp;录</span>
      </div>
      <el-form style="width: 400px" :rules="rules" ref="ruleForm" :model="ruleForm" label-width="80px">
        <el-form-item label="用户名" prop="mid">
          <el-input v-model="ruleForm.mid" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input style="margin-top: 10px" v-model="ruleForm.password" show-password type="password"
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
        <div class="box">
          <!--滑块-->
          <div class="btn"></div>
          <!--文字-->
          <p class="text">请向右滑动登录</p>
          <!--背景-->
          <div class="bg"></div>
        </div>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%;height:45px; " type="primary" @click="submitForm('ruleForm')">
            登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex' // 导入所有的getters、actions操作
  import {setToken, getToken} from '@/utils/cookie.js'

  export default {

    data () {
      return {
        ruleForm: {
          mid: '',
          password: '',
        },
        rules: {
          mid: [
            {required: true, message: '请输入用户名', trigger: 'blur'}

          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapGetters(['token', 'roles']),
    },
    methods: {
      ...mapActions(['setTokenAction', 'setRoles']),

      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = this.$qs.stringify({
              mid: this.ruleForm.mid,
              password: this.ruleForm.password
            })
            this.$http.post('login', params).then(res => {
              if (res.data.code == 1000) {
                this.setTokenAction(res.data.data.session)
                setToken(res.data.data.session)//设置浏览器中的cookies
                this.$router.push('/home')
                this.$message({
                  message: '登录成功',
                  type: 'success',
                  center: true
                })
              }
              if (res.data.code == 1001) {
                this.$message({
                  message: '用户名错误',
                  type: 'error',
                  center: true
                })
              }
              if (res.data.code == 1002) {
                this.$message({
                  message: '密码错误',
                  type: 'error',
                  center: true
                })
              }
              if (res.data.code == 1003) {
                this.$message({
                  message: '被锁了，找管理员解锁去吧！',
                  type: 'warning'
                })
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
    },
    mounted () {
        let _this = this
        //公共方法
        function $ (name) {   //函数申明
          return document.querySelector(name);
        };
        let btn = $(".btn"), //滑块   $(".class")
          box = $(".box"),  //盒子
          bg = $(".bg"),  //背景
          text = $(".text"), //文字
          flag = false;  //验证未成功

        //事件处理
        btn.onmousedown = function (event) {  //按下
          //event 对象  代表事件的状态
          let downX = event.clientX;  //当前按下后与X轴的距离
          btn.onmousemove = function (e) {
            let moveX = e.clientX - downX;  //当前移动后的距离-按下的距离
            //移动的范围
            if (moveX > 0) {
              this.style.left = moveX + 'px'; //滑块left距离
              bg.style.width = moveX + 'px';  //背景width
              if (moveX >= (box.offsetWidth - btn.offsetWidth)) {
                flag = true;  //验证通过

                //事件清除
                btn.onmousedown = null;
                btn.onmousemove = null;
                _this.submitForm('ruleForm');
                text.innerText = '滑动成功';
                text.style.color = '#fff';
              }
            }
          }
        };
        btn.onmouseup = function (event) {  //松开
          //事件清除
          btn.onmousemove = null;
          if (flag) return;
          this.style.left = 0; //滑块left距离
          bg.style.width = 0;  //背景width
        }
      }
  }


</script>
<style>
  .title {
    font-size: 36px;
    font-weight: 600;
    color: #ffffff;
  }
  .box{
    position: relative;
    width: 320px;
    height: 40px;
    background-color: #e8e8e8;
    line-height: 34px;


  }
  .bg{
    position: absolute;
    height: 100%;
    background-color: #7ac23c;
    z-index:1;
  }
  .text{
    position: absolute;
    width: 100%;
    margin: 0;
    text-align: center;
    z-index:2;
  }
  .btn{
    position: absolute;
    top:0;
    width: 40px;
    height: 38px;
    z-index:3;
    background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==) center no-repeat;
    border: 1px solid #ccc;
    cursor: pointer;
  }
</style>
