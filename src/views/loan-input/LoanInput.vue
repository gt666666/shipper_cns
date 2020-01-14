<template>
  <div>
  <el-row :gutter="20">
    <el-form :inline="true" :rules="rules" ref="formInline" :model="formInline" class="demo-form-inline">
      <el-col :lg="6" :md="12" :xs="24">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formInline.name" placeholder="姓名" style="width: 250px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="6" :md="12" :xs="24">
        <el-form-item label="身份证号" prop="idNumber">
          <el-input v-model="formInline.idNumber" placeholder="身份证号" style="width: 250px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="6" :md="12" :xs="24">
        <el-form-item label="年龄" prop="age">
          <el-input v-model="formInline.age" placeholder="年龄" style="width: 250px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="6" :md="12" :xs="24">
        <el-form-item label="注册日期" prop="date1">
          <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date"
                          style="width: 250px"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :lg="6" :md="12" :xs="24">
        <el-form-item label="即时配送">
          <el-switch v-model="formInline.delivery"></el-switch>
        </el-form-item>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="请选择活动区域">
            <el-option label="上海" value="shanghai"></el-option>
            <el-option label="北京" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="6" :md="12" :xs="24">
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="请选择活动区域">
            <el-option label="上海" value="shanghai"></el-option>
            <el-option label="北京" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="6" :md="12" :xs="24">
        <el-form-item label="特殊资源">
          <el-radio-group v-model="formInline.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>

      <el-col :lg="24">
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="formInline.desc" style="width: 350px;"></el-input>
        </el-form-item>
      </el-col>

      <el-form-item style="margin-left:50%">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-row>

  <div id="printTest" >
    　　　　　　<p>明月照于山间</p>
    　　　　　　<p>清风来于江上 </p>
    　　　　</div>
  　　　　<button v-print="'#printTest'">打印</button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        formInline: {
          name: '',
          idNumber: '',
          age: '',
          type: [],
          date:'',
          delivery: false,
          region: '',
          resource: '',
          desc:''
        },
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}

          ],
          idNumber: [
            {required: true, message: '请输入身份证号', trigger: 'blur'}
          ],
          age: [
            {required: true, message: '请输入年龄', trigger: 'blur'},
            {type: 'number', message: '年龄必须为数字值'}
          ],
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      }
    }
  }
</script>
<style lang="scss">

</style>
