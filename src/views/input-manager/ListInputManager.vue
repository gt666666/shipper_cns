<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title=">> 搜索条件 （点击展开或收缩）" name="1">
        <el-form :model="query" ref="searchForm" label-width="100px" class="demo-ruleForm">
          姓名:&nbsp;&nbsp;&nbsp;
          <el-input v-model="query.name" @input="getList" style="width: 15%"></el-input>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          生日:&nbsp;&nbsp;&nbsp;
          <el-date-picker @input="getList" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="query.birthday"
                          style="width: 15%"></el-date-picker>

          &nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="primary" @click="getList">查询</el-button>
          <el-button @click="resetSearchForm">重置</el-button>
          <el-button @click="export2Excel">导出</el-button>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <el-table
      :data="tableData"
      border
      style="width: 100%" id="table-content">
      <el-table-column
        label="日期"
        width="150" fixed align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.birthday}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        width="100" fixed align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.city}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="性别"
        width="250" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.gender}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="余额"
        width="250" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="爱好"
        width="250" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.hobby}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="时间"
        width="250" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.everyTip }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="学历"
        width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.education }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="城市"
        width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.city}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="220" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row,scope.row.hobby)">编辑
          </el-button>
          <el-button
            size="mini"
            type="info"
            @click="handleDetails(scope.row,scope.row.hobby)">详情
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="申请编辑" :visible.sync="editFormVisible" width="90%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" style="width: 25%"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-select v-model="ruleForm.city" placeholder="请选择城市" style="width: 20%">
            <el-option label="北京" value="北京">北京</el-option>
            <el-option label="上海" value="上海">上海</el-option>
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
        <el-form-item label="爱好" prop="hobbys">
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
        <!--    <el-form-item label="图片上传">-->
        <!--      <el-upload-->
        <!--        class="upload-demo"-->
        <!--        action="https://jsonplaceholder.typicode.com/posts/"-->
        <!--        :on-preview="handlePreview"-->
        <!--        :on-remove="handleRemove"-->
        <!--        :file-list="fileList"-->
        <!--        list-type="picture" style="width: 40%">-->
        <!--        <el-button size="small" type="primary">点击上传</el-button>-->
        <!--        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        <!--      </el-upload>-->
        <!--    </el-form-item>-->
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark" style="width: 30%"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSave">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="申请详情" :visible.sync="detailsFormVisible" width="90%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" disabled style="width: 25%"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-select v-model="ruleForm.city" disabled placeholder="请选择城市" style="width: 20%">
            <el-option label="上海" value="上海">上海</el-option>
            <el-option label="北京" value="北京">北京</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-select v-model="ruleForm.education" disabled placeholder="请选择学历" style="width: 20%">
            <el-option label="大学" value="大学"></el-option>
            <el-option label="高中" value="高中"></el-option>
            <el-option label="初中" value="初中"></el-option>
            <el-option label="小学" value="小学"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" required>
          <el-form-item prop="birthday">
            <el-date-picker disabled value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.birthday"
                            style="width: 25%"></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="时间">
          <el-form-item prop="everyTip">
            <el-time-picker disabled value-format="hh:mm:ss" placeholder="选择时间" v-model="ruleForm.everyTip"
                            style="width:  25%;"></el-time-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="是否锁定" prop="isLock">
          <el-switch disabled v-model="ruleForm.isLock"></el-switch>
        </el-form-item>
        <el-form-item label="余额" prop="money">
          <el-input disabled v-model="ruleForm.money" style="width: 25%"></el-input>
        </el-form-item>
        <el-form-item label="爱好" prop="hobbys">
          <el-checkbox-group disabled v-model="ruleForm.hobbys">
            <el-checkbox label="篮球">篮球</el-checkbox>
            <el-checkbox label="足球">足球</el-checkbox>
            <el-checkbox label="乒乒球">乒乒球</el-checkbox>
            <el-checkbox label="羽毛球">羽毛球</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <el-radio-group disabled v-model="ruleForm.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="头像" prop="gender">
          <el-image  style="width: 150px;height: 150px" src="F:/image/timg1.jpg"></el-image>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input disabled type="textarea" v-model="ruleForm.remark" style="width: 30%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsFormVisible = false">返回</el-button>
      </div>
    </el-dialog>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.page"
        :page-sizes="[10, 20, 30, 40,50]"
        :page-size="query.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>
<script>
  export default {
    data () {
      return {
        query: {
          page: 1,
          limit: 10,
          name: '',
          birthday: '',
        },
        total: 0,
        tableData: [],
        editFormVisible: false,  //修改弹层
        detailsFormVisible: false,//详情弹层
        activeNames: ['1'], //默认搜索条件打开
        ruleForm: {
          name: '',
          birthday: '',
          city: '',
          age: '',
          gender: '',
          isLock: false,
          everyTip: '',
          money: '',
          img: '',
          hobbys: [],
          remark: '',
          education: '',
        },
        rules: {}
      }
    },
    methods: {
     //导出的方法
     //  exportExcel() {
     //    require.ensure([], () => {
     //      const { export_json_to_excel } = require('../../assets/js/Export2Excel');
     //      const tHeader = ['姓名', '生日', '兴趣爱好'];
     //      // 上面设置Excel的表格第一行的标题
     //      const filterVal = ['name', 'birthday', 'hobbys'];
     //      // 上面的index、nickName、name是tableData里对象的属性
     //      const list = this.tableData;  //把data里的tableData存到list
     //      const data = this.formatJson(filterVal, list);
     //      export_json_to_excel(tHeader, data, '列表excel');
     //    })
     //  },

      export2Excel() {
        require.ensure([], () => {
          let { exportJsonToExcel } = require('../../assets/js/excel/Export2Excel');
          // 表头
          let tHeader = ['姓名', '生日', '兴趣爱好','学历'];
          //表头对应字段名，要和下面数据key对应
          let filterVal = ['name', 'birthday', 'hobby','education'];
          let data = this.formatJson(filterVal, this.tableData); //数据格式化
          exportJsonToExcel(tHeader, data, '表名'); //导出文件
        })
      },
      // 数据格式化
      formatJson(filterVal, jsonData){
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      getList () {
        this.$http.get('/findByQuery', {
          params: {
            page: this.query.page,
            limit: this.query.limit,
            name: this.query.name,
            birthday: this.query.birthday,
          }
        }).then(res => {
            this.tableData = res.data.data
            this.total = res.data.count
          }
        ).catch()
      },
      handleSizeChange (val) {   //一页多少条
        this.query.limit = val
        this.getList()
      },
      handleCurrentChange (val) {   //第几页
        this.query.page = val
        this.getList()
      },
      handleEdit (val, hobby) {
        this.editFormVisible = true
        hobby = hobby.split(',')
        var hobb = []
        for (var i = 0; i < hobby.length; i++) {
          hobb[i] = hobby[i]
        }
        this.ruleForm = Object.assign({}, val)
        this.ruleForm.hobbys = hobb
      },
      handleEditSave () {
        this.$http.post('/updateById', this.ruleForm).then(res => {
          if (res.data.code === 1008) {
            this.editFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            })
          }

        }).catch(res => {
        })
      },
      handleDetails (val, hobby) {
        this.detailsFormVisible = true
        hobby = hobby.split(',')
        var hobb = []
        for (var i = 0; i < hobby.length; i++) {
          hobb[i] = hobby[i]
        }
        this.ruleForm = Object.assign({}, val)
        this.ruleForm.hobbys = hobb
      },
      handleDelete (id) {
        console.log(id)
      },
      resetSearchForm () {
        this.query.name = ''
        this.query.birthday = ''
      }
    },
    filters: {
      gethobby (val) {
        switch (val) {
          case true:
            return '男'
          case  false:
            return '女'
        }
      }
    },
    mounted () {
      this.getList()
    }
  }
</script>
