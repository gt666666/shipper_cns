<template>
  <el-form style="margin-top: 50px" enctype="multipart/form-data" :model="ruleForm" :rules="rules" ref="ruleForm"
           label-width="100px" class="demo-ruleForm">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="ruleForm.name" style="width: 25%" placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item label="城市" prop="city">
      <el-select v-model="ruleForm.city" placeholder="请选择城市" style="width: 20%">
        <el-option label="上海" value="上海">上海</el-option>
        <el-option label="北京" value="北京">北京</el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="学历" prop="education">
      <el-select v-model="ruleForm.education" placeholder="请选择学历" style="width: 20%">
        <el-option label="大学" value="大学"></el-option>
        <el-option label="高中" value="高中"></el-option>
        <el-option label="初中" value="初中"></el-option>
        <el-option label="小学" value="小学"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="出生日期" required>
      <el-form-item prop="birthday">
        <el-date-picker value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.birthday"
                        style="width: 25%"></el-date-picker>
      </el-form-item>
    </el-form-item>
    <el-form-item label="时间">
      <el-form-item prop="everyTip">
        <el-time-picker value-format="hh:mm:ss" placeholder="选择时间" v-model="ruleForm.everyTip"
                        style="width:  25%;"></el-time-picker>
      </el-form-item>
    </el-form-item>
    <el-form-item label="是否锁定" prop="isLock">
      <el-switch v-model="ruleForm.isLock"></el-switch>
    </el-form-item>
    <el-form-item label="余额" prop="money">
      <el-input v-model="ruleForm.money" style="width: 25%"></el-input>
    </el-form-item>
    <el-form-item label="爱好" prop="hobby">
      <el-checkbox-group v-model="ruleForm.hobbys">
        <el-checkbox label="篮球">篮球</el-checkbox>
        <el-checkbox label="足球">足球</el-checkbox>
        <el-checkbox label="乒乒球">乒乒球</el-checkbox>
        <el-checkbox label="羽毛球">羽毛球</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="ruleForm.gender">
        <el-radio label="男">男</el-radio>
        <el-radio label="女">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="图片上传">
      <el-upload
        class="upload-demo"
        action="#####"
        :on-change="handleChange"
        :file-list="fileList"
        :auto-upload="false" style="width: 30%" v-model="ruleForm.photo">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <!--      <input type="file"  @change="handleChange"/>-->
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input type="textarea" v-model="ruleForm.remark" :rows="5" style="width: 30%"></el-input>
    </el-form-item>
    <div style="margin-left: 200px">
      <el-button type="primary" @click="upload">保存</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </div>
  </el-form>
</template>
<script>
  export default {
    data () {
      return {
        fileList: [],
        ruleForm: {
          photo: '',
          name: '',
          birthday: '',
          city: '',
          age: '',
          gender: '',
          isLock: false,
          everyTip: '',
          money: '',
          hobbys: [],
          remark: '',
          education: '',
        },
        rules: {
          // name: [
          //   {required: true, message: '请输入姓名', trigger: 'blur'}
          // ],
          // city: [
          //   {required: true, message: '请选择城市', trigger: 'change'}
          // ],
          // birthday: [
          //   {type: 'date', required: true, message: '请选择出生日期', trigger: 'change'}
          // ],
          // everyTip: [
          //   {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          // ],
          // hobby: [
          //   {required: true, message: '请选择兴趣爱好', trigger: 'change'}
          // ],
          // gender: [
          //   {required: true, message: '请选择性别', trigger: 'change'}
          // ],
          // remark: [
          //   {required: true, message: '请输入备注', trigger: 'change'}
          // ]
        }
      }
    },
    methods: {
      handleChange (file, fileList) {
        this.photo = fileList[0].raw  // 一定要在文件框改变时设置文件内容
      },
      upload () { // 发送一定是post请求
        let formdata = new FormData()// 进行数据包装
        formdata.append('photo', this.photo)
        formdata.append('name', this.ruleForm.name)
        if (this.ruleForm.birthday != null) {
          formdata.append('birthday', this.ruleForm.birthday)
        }
        formdata.append('city', this.ruleForm.city)
        formdata.append('age', this.ruleForm.age)
        formdata.append('gender', this.ruleForm.gender)
        formdata.append('isLock', this.ruleForm.isLock)
        if (this.ruleForm.everyTip != null) {
          formdata.append('everyTip', this.ruleForm.everyTip)
        }
        formdata.append('money', this.ruleForm.money)
        formdata.append('hobbys', this.ruleForm.hobbys)
        formdata.append('remark', this.ruleForm.remark)
        formdata.append('education', this.ruleForm.education)
        this.$http({ // 必须使用此类形式
          method: 'post',
          data: formdata,
          url: '/insertUserInfo'
        }).then(res => {
          if (res.data.code === 1004) {
            this.$notify({
              title: '成功',
              message: '申请成功',
              type: 'success'
            })
            this.$router.push('/ListInputManager')
          }
        }).catch(error => {

        })
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/insertUserInfo', this.ruleForm).then(res => {
              if (res.data.code === 1004) {
                this.$notify({
                  title: '成功',
                  message: '申请成功',
                  type: 'success'
                })
                this.$router.push('/ListInputManager')
              }

            }).catch(error => {

            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handlePreview () {
        console.log('handlePreviewhandlePreview')
      },
      handleRemove () {
        console.log('handleRemovehandleRemovehandleRemove')
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
