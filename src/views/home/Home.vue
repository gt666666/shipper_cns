<template>
  <div>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="12" :md="12" :lg="6" v-for="(list,i) in lists" :key="i">
      <div class="grid-content bg-purple" :style="{background:list.color}" style="height: 100px">
        <div>{{list.name}}</div>
        <countTo  :startVal='0' :endVal='list.number' :duration='list.duration'></countTo>
      </div>
    </el-col>
  </el-row>
  <!-- 图表 -->
  <div id="mychart" style="width:100%;height:300px;"></div>
  </div>
</template>
<script>
  import CountTo from 'vue-count-to'
  import echarts from 'echarts'
  export default{
    data(){
      return {
        lists:[
          {name:'最高回报',color:'#67ca3a',number:120000,duration:2000},
          {name:'最高回报',color:'#f60',number:120000,duration:3000},
          {name:'最高回报',color:'#f56c6c',number:120000,duration:1500},
          {name:'最高回报',color:'#409eff',number:120000,duration:3500}
        ],
        chart:null
      }
    },
    methods:{
      initecharts(){
        // 基于准备好的dom，初始化echarts实例
        this.chart=echarts.init(document.getElementById("mychart"));
        // 指定图表的配置项和数据
       var  option = {
          title : {
            text: '南丁格尔玫瑰图',
            subtext: '纯属虚构',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            x : 'center',
            y : 'bottom',
            data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {
                show: true,
                type: ['pie', 'funnel']
              },
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          series : [
            {
              name:'半径模式',
              type:'pie',
              radius : [20, 110],
              center : ['25%', '50%'],
              roseType : 'radius',
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              lableLine: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              data:[
                {value:10, name:'rose1'},
                {value:5, name:'rose2'},
                {value:15, name:'rose3'},
                {value:25, name:'rose4'},
                {value:20, name:'rose5'},
                {value:35, name:'rose6'},
                {value:30, name:'rose7'},
                {value:40, name:'rose8'}
              ]
            },
            {
              name:'面积模式',
              type:'pie',
              radius : [30, 110],
              center : ['75%', '50%'],
              roseType : 'area',
              data:[
                {value:10, name:'rose1'},
                {value:5, name:'rose2'},
                {value:15, name:'rose3'},
                {value:25, name:'rose4'},
                {value:20, name:'rose5'},
                {value:35, name:'rose6'},
                {value:30, name:'rose7'},
                {value:40, name:'rose8'}
              ]
            }
          ]
        };


        // 使用刚指定的配置项和数据显示图表。
        this.chart.setOption(option);
  }
    },
    mounted(){
      this.initecharts();
      window.onresize = ()=>{   //根据窗口大小自适应
        this.chart.resize();
      }
    },
    components:{
      CountTo
    }
  }

</script>
<style lang="scss">

</style>
