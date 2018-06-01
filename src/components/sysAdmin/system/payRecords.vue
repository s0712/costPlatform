<template>
  <section class="payRecords">
    <nav class="pub_select">
      <el-form ref="form" :model="form" label-width="86px">
        <el-row>
           <el-col>
            <el-form-item label="地区名称:" prop="postCode">
              <el-cascader :props="regionProps" :options="array.obtainOption" v-model="form.postCode" change-on-select placeholder="请选择地区" @change='(postCode)=>{getHospital(postCode,false)}'></el-cascader>
            </el-form-item>
          </el-col>
           <el-col>
            <el-form-item label="院区名称:" prop="hospitalID">
                <el-select v-model="form.hospitalID" placeholder="请选择院区">
                <el-option v-for="(item,index) in array.hostitalOption" :key="index" :label="item.hospitalName" :value="item.id"></el-option>
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
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统设置</el-breadcrumb-item>
          <el-breadcrumb-item>医院充值记录</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
      <el-button class="mlem" type="danger"  :disabled="!other.currow" @click='lessShow'>扣除</el-button>
        <el-button class="mlem" type="primary" @click="createDialog">新建</el-button>
        <el-button class="mlem" @click='queryData(1)'>刷新</el-button>
        <span class="mlem">
           医院充值记录共<font class='pub_count'>{{other.count}}</font>条
        </span>
      </div>
    </section>
    <section class='main'>
      <el-table :data="array.tableData" border height="100" highlight-current-row @row-click='handleClick'>
        <el-table-column label="院区名称" prop="accountName" ></el-table-column>
        <el-table-column label="充值金额" prop="orderAmount">
          <template scope="scope">
            <span>{{toThousands(scope.row.orderAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="院区余额" prop="orderAmount">
           <template scope="scope">
            <span>{{toThousands(scope.row.currentBalanceA+scope.row.currentBalanceB)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单类型" prop="orderName"></el-table-column>
        <el-table-column label="充值时间" >
          <template scope="scope">
            <span>{{formatDate(scope.row.startTime)}}</span>
          </template>
        </el-table-column>

      </el-table>
    </section>
    <section class="create">
       <el-dialog @close="resetForm('navform')" :close-on-click-modal="false" title="新增医院充值" size="tiny" v-model="alert.new_info">
            <el-form class="false" :model="navform" :rules="other.rules" ref="navform" label-width="87px">
            <el-form-item label="地区名称:">
              <el-cascader :props="regionProps" :options="array.obtainOption" v-model="navform.postCode" change-on-select placeholder="请选择地区" @change='(postCode)=>{getHospital(postCode,true)}'></el-cascader>
            </el-form-item>
              <el-form-item label="院区名称:" prop="hospitalID">
                <el-select v-model="navform.hospitalID" placeholder="请选择充值医院">
                <el-option v-for="(item,index) in array.nav_hostitalOption" :key="index" :label="item.hospitalName" :value="item.id"></el-option>
              </el-select>
                    </el-form-item>
                    <el-form-item label="充值金额:" prop="price" >
                        <el-input type="number" placeholder="请输入充值金额" v-model="navform.price">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                   <el-button class="mlem false" :plain="true" type="primary" @click="alert.new_info=false">取 消</el-button>
                    <el-button class="mlem false" type="primary" @click="submitForm('navform','saveNewInfo')">保存并新建</el-button>
                    <el-button class="mlem false" type="primary" @click="submitForm('navform','saveNewInfo','new_info')">保存</el-button>
                </div>
            </el-dialog>
    </section>
    <section class="less">
         <el-dialog @close="resetForm('lessform')" :close-on-click-modal="false" :title="lessform.hospitalName" size="tiny" v-model="alert.less_info">
            <el-form class="false" :model="lessform" ref="lessform" label-width="87px">
                    <el-form-item label="扣除金额:" prop="price" >
                        <el-input placeholder="请输入扣除金额" v-model="lessform.price">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                   <el-button class="mlem false" :plain="true" type="primary" @click="alert.less_info=false">取 消</el-button>
                    <el-button class="mlem false" type="primary" @click="saveless">保存</el-button>
                </div>
            </el-dialog>
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
      form: {
        postCode: [], //获取邮编
        hospitalID:'',//院区id
        
      },
      navform:{//弹窗数据
        price:'',//充值金额
        hospitalID:'',//院区id
        postCode:[]//获取邮编
      },
      lessform:{ //扣除金额弹窗
        price:'',//扣除金额
        hospitalID:''//院区id
      },
      array: {
        tableData: [], //表格数据
        obtainOption: [], //地区树形
        hostitalOption: [], //根据院区获取所有医院
        nav_hostitalOption:[],//弹窗中的所有医院下拉列表
      },
      alert: {
        new_info: false, //新建弹窗
        less_info:false,//扣除金额窗口
      },
      other:{
        page: 1,
        pageSize: 30,
        count: 0, //默认所有的检查项目的条数
        currow:'',//选中表格某条数据
        rules:{
           hospitalID: [{ 
                    required: true,
                    message: '请选择充值医院',
                    trigger: 'change',
                    validator: (rule, value, callback) => {
                        if (value == '') {
                            callback(new Error());
                        } else {
                            callback();
                        }
                    }
                }],
                price: [{ 
                    required: true,
                    message: '请输入充值金额',
                    trigger: 'change',
                    validator: (rule, value, callback) => {
                       if (value ===''||value<0) {
                            callback(new Error());
                        } else {
                            callback();
                        }
                    }
                }]
        },
      }
    }
  },
  computed: {
       ...mapState([
      'pageSizeArr',
      'regionProps'
    ])
  },
  created() {
    this.getObtain();
    this.getHospital();
    this.queryData(1);
  },
  methods: {
     //获取所有地区
    getObtain() {
      this.get('paygetHospitalAreaTree').then(data => {
        this.array.obtainOption = _.get(data, 'data.data', []);
      })
    },
    //根据地区获取医院(can为true,修改弹窗中的院区数据,为false.修改条件栏中的院区数据)
    getHospital(val,can) {
      // console.log(val,can)
      let postcode=can?this.navform.postCode:this.form.postCode;
      can?this.navform.hospitalID='':this.form.hospitalID='';
      this.get('paygetHospitals', {
        params: {
          postCode: _.last(postcode) || ''
        }
      }).then(data => {
        console.log(data);
        if(can){
          this.array.nav_hostitalOption=_.get(data, 'data.data', []);
        }else{
          this.array.hostitalOption = _.get(data, 'data.data', []);
        }
      })
    },
    //获取数据
    queryData(page,pageSize=this.other.pageSize) {
      console.log(this.form)
       this.get('paygetAccountInfoList',{
          params:{
            ...this.form,
            page:page-1,
            pageSize:pageSize,
            type:3
          }
         }).then(data => {
        this.other.count = _.get(data, 'data.count', 0);
        this.array.tableData=_.get(data, 'data.data', []);
      })
    },
    //新建弹窗
    createDialog(){
      this.alert.new_info=true;
      this.navform.postCode=this.copy(this.form.postCode);
      this.navform.hospitalID=this.copy(this.form.hospitalID);
      this.array.nav_hostitalOption=this.copy(this.array.hostitalOption);
    },
    //保存弹窗数据
    saveNewInfo(resolve){
         this.get('payrecharge4Hospital',{
          params:{
            ...this.navform
          }
         }).then(data => {
       this.$message({
          message: data.message,
          type: 'success'
        });
        resolve();
        this.queryData(1);
      })
    },
    //选中某条医院记录
    handleClick(val){
      this.other.currow=this.copy(val)
    },
    //扣除医院金额弹窗
    lessShow(){
      console.log(this.other.currow)
      this.lessform.hospitalID=this.copy(this.other.currow.accountID);
      this.lessform.hospitalName='扣除'+this.other.currow.accountName;
      this.alert.less_info=true;
    },
    //扣除医院金额
    saveless(){
        this.get('paydeleteRecharg4Hospital',{
          params:{
            ...this.lessform
          }
         }).then(data => {
        console.log(data);
        this.$message({
          message: data.message,
          type: 'success'
        });
        this.queryData(1);
        this.alert.less_info=false;
        this.other.currow='';
      })
    },
  }
}

</script>
<style lang='less'>
@import '../../../assets/css/mixin.less';
.payRecords {
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
  .create,.less{

    .el-dialog{
       height: 340px;
       .el-dialog__body{
        padding-bottom: 10px;
       }
     .pub_margintop(340px);
      .el-select,.el-input{
       width: 300px;
      }
      .dialog-footer{
        text-align: center;
      }
    }
  }
  .less{
        .el-dialog{
           height: 200px;
            .pub_margintop(200px);
        }
  }
}

</style>
