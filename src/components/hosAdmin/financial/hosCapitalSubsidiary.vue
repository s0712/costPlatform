<template>
  <section class="hosCapitalSubsidiary">
  <nav class="pub_select">
      <el-form ref="form" :model="form" label-width="86px">
        <el-row>
          <el-col>
            <el-form-item label="医生姓名:" prop="fullname">
              <el-select v-model="form.fullname" placeholder="请选择医生"  clearable>
                <el-option v-for="(item,index) in array.doctorOption" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
           <el-col>
             <el-form-item label="交易类型:" prop="type">
              <el-select v-model="form.type" placeholder="请选择交易类型" clearable>
                <el-option v-for="(item,index) in consumption" :key="index" :label="item" :value="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-button class="mlem" type="primary" @click='queryData(1)'>查询</el-button>
          <el-button class="mlem" @click="resetForm('form','queryData')">重置</el-button>
        </el-row>
      </el-form>
    </nav>
       <section class="pub_hr">
      <div>
        <el-breadcrumb>
          <el-breadcrumb-item>财务管理</el-breadcrumb-item>
          <el-breadcrumb-item>资金明细</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <el-button class="mlem" type="primary" @click='queryData(1)'>刷新</el-button>
        <span class="mlem">
          交易记录共<font class='pub_count'>{{other.count}}</font>条
        </span>
      </div>
    </section>
   <section class='main'>
      <el-table :data="array.tableData" border height="100">
        <el-table-column label="账户名称" prop="accountName" show-overflow-tooltip></el-table-column>
        <el-table-column label="消费种类" prop="orderName"></el-table-column>
       <el-table-column label="消费金额" prop="orderAmount">
          <template scope="scope">
          <span>{{scope.row.finaType==0?'+':'-'}}</span>
            <span>{{ toThousands(scope.row.orderAmount)}}元</span>
          </template>
        </el-table-column>
        <el-table-column label="消费时间" prop="startTime" width="200" show-overflow-tooltip>
          <template scope="scope">
            <span>{{formatDate(scope.row.startTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="账户余额" prop="currentBalanceA">
          <template scope="scope">
            <span>{{ toThousands(scope.row.currentBalanceA+scope.row.currentBalanceB)}}元</span>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <section class="pub_footer">
      <el-pagination @size-change="(el)=>{queryData(1,el)}" @current-change="(el)=>{queryData(el)}" :current-page="other.page" :page-size="other.pageSize" :page-sizes="pageSizeArr" layout="total, sizes, prev, pager, next, jumper" :total="other.count">
      </el-pagination>
    </section>
  </section>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      form:{
        hospitalID:'',//所属医院
         type:'',//消费类型
        fullname:'',//医生姓名
      },
      array:{
        tableData:[],
        doctorOption:[],//医生下拉框
      },
      other:{
        page: 1,
        pageSize: 20,
        count: 0, //默认所有的检查项目的条数
        rules:{},
      }
    }
  },
  computed: {
    ...mapState([
      'pageSizeArr',
      'consumption',
      'userMsg'
    ])
  },
  created() {
    this.$set(this.form,'hospitalID',this.userMsg.hospitalID);
      this.getDoctor();
      this.queryData(1);

  },
  methods: {
      //获取医生姓名
    getDoctor(){
      this.get('paygetUserFullnames',{
          params:{
            hospitalID:this.form.hospitalID||''
          }
         }).then(data => {
         this.array.doctorOption=data.data||[];
      })
    },
    //获取数据
    queryData(page,pageSize=this.other.pageSize) {
       this.get('paygetAccountInfoList',{
          params:{
            ...this.form,
            page:page-1,
            pageSize:pageSize
          }
         }).then(data => {
          console.log(data)
        this.other.count = _.get(data, 'data.count', 0);
        this.array.tableData=_.get(data, 'data.data', []);
      })
    },
  }
}

</script>
<style lang='less' scoped>
@import '../../../assets/css/mixin.less';
.hosCapitalSubsidiary{
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  .main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    .el-table {
      flex-grow: 1;
    }
  }
}

</style>