<template>
  <section class="checkProjectPrice">
    <nav class="pub_select">
      <el-form ref="form" :model="form" label-width="86px">
        <el-row>
          <el-col>
             <el-form-item label="检查类型:" prop="examineType">
                <el-select v-model="form.examineType" multiple placeholder="请选择检查类型">
                  <el-option v-for="item,index in array.checkOption" :key='index' :value='item.examineType' :label='item.examineType'></el-option>
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
          <el-breadcrumb-item>检查项目价格设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
      <el-button class="mlem" @click='queryData(1)'>刷新</el-button>
        <span class="mlem">
          检查项目价格记录共<font class='pub_count'>{{other.count}}</font>条
        </span>
      </div>
    </section>
    <section class='main'>
      <el-table :data="array.tableData" border height="100" @row-dblclick='edit'>
         <el-table-column label="操作" prop="name">
            <template scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <el-button size="mini" icon="edit" class="false" :plain="true" type="success" @click='edit(scope.row)'></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="检查类型" prop="examineType"></el-table-column>
          <el-table-column label="检查项目" prop="examineItem"></el-table-column>
            <el-table-column label="书写定价" >
            <template scope="scope">
              <span>{{scope.row.writePrice}}元</span>
            </template>
          </el-table-column>
          <el-table-column label="审核定价">
            <template scope="scope">
              <span>{{scope.row.auditPrice}}元</span>
            </template>
          </el-table-column>
           <el-table-column label="引流定价">
            <template scope="scope">
              <span>{{scope.row.drainagePrice}}元</span>
            </template>
          </el-table-column>
      </el-table>
    </section>
    <section class="create">
      <el-dialog @close="resetForm('navform')" :close-on-click-modal="false" :title="other.title" size="tiny" v-model="alert.new_info">
        <el-form class="false" :model="navform" :rules="other.rules" ref="navform" label-width="120px">
            <el-form-item label="书写定价:" prop="writePrice">
            <el-input type="number" placeholder="请输入书写定价(0~100元)" v-model="navform.writePrice">
            </el-input>
          </el-form-item>
          <el-form-item label="审核定价:" prop="auditPrice">
            <el-input type="number"  placeholder="请输入审核定价(0~100元)" v-model="navform.auditPrice">
            </el-input>
          </el-form-item>
           <el-form-item label="引流定价:" prop="drainagePrice">
            <el-input type="number"  placeholder="请输入引流定价(0~100元)" v-model="navform.drainagePrice">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="mlem false" :plain="true" type="primary" @click="alert.new_info=false">取 消</el-button>
          <el-button class="mlem false" type="primary" @click="submitForm('navform','saveNewInfo','new_info')">保存</el-button>
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
        hospitalID:'',//院区id
          examineType:[] //检查类型
      },
      navform: { //弹窗数据

      },
      array: {
        tableData: [], //表格数据
        checkOption:[],//获取所有检查类型
      },
      alert: {
        new_info: false, //新建弹窗
      },
      other: {
        title:'',
        page: 1,
        pageSize: 30,
        count: 0, //默认所有的检查项目的条数
        rules: {
           writePrice: [{
            required: true,
            message: '请输入书写定价(0~1000元)',
            trigger: 'blur',
            validator: (rule, value, callback) => {
              // console.log(typeof(parseInt(value)))
             if (value ===''||value<0) {
                callback(new Error());
              } else {
                callback();
              }
            }
          }],
          auditPrice: [{
            required: true,
            message: '请输入审核定价(0~1000元)',
            trigger: 'blur',
            validator: (rule, value, callback) => {
             if (value ===''||value<0) {
                callback(new Error());
              } else {
                callback();
              }
            }
          }],
           drainagePrice: [{
            required: true,
            message: '请输入引流定价(0~1000元)',
            trigger: 'blur',
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
      'userMsg'
    ])
  },
  created() {
    this.form.hospitalID=this.userMsg.hospitalID;
      this.getCheckType();
      this.queryData(1);
  },
  methods: {
    //获取检查类型
    getCheckType() {
      this.get('paygetPlaExamineType').then(data => {
        console.log(data)
        this.array.checkOption = _.get(data, 'data', []);
      })
    },
    //获取所有收费项目
    queryData(page=1,pageSize=this.other.pageSize) {
      this.get('paygetExamineItemList', {
        params: {
          ...this.form,
          page:page-1,
          pageSize: pageSize,
        }
      }).then(data => {
        console.log(data);
        this.other.page=page;
        this.other.pageSize = pageSize;
        this.other.count = _.get(data, 'data.count', 0);
        this.array.tableData = _.get(data, 'data.data', []);
      })
    },
     //编辑项目服务费
    edit(val){
      this.other.title=`设置 ${val.examineType}--${val.examineItem} 的价格`;
      this.alert.new_info=true;
      this.navform=this.copy(val);
    },
    //新建弹窗
    createDialog() {
      this.alert.new_info = true;
    },
    //保存弹窗数据
    saveNewInfo(resolve) {
         this.post('payupdateExamineItem',this.navform).then(data => {
        console.log(data);
         this.$message({
          message: data.message,
          type: 'success'
        });
         resolve();
         this.queryData(1);
      })
    }
  }
}

</script>
<style lang='less'>
@import '../../../assets/css/mixin.less';
.checkProjectPrice {
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
  .create {

    .el-dialog {
      height: 300px;
      .pub_margintop(300px);
      .el-select,
      .el-input {
        width: 300px;
      }
      .el-dialog__body{
        padding: 20px;
      }
      .el-dialog__footer{
        padding-top: 0px;
      }
      .dialog-footer {
        text-align: center;
      }
    }
  }
}

</style>
