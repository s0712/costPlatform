<template>
  <section class="dataDictionary">
    <nav class="pub_select">
      <el-form ref="form" :model="form" label-width="86px">
        <el-row>
          <el-col>
            <el-form-item label="地区名称:" prop="postCode">
              <el-cascader :props="regionProps" :options="array.obtainOption" v-model="form.postCode" change-on-select placeholder="请选择地区"></el-cascader>
            </el-form-item>
          </el-col>
           <el-col>
            <el-form-item label="字典分组:" prop="postCode">
              <el-cascader :props="regionProps" :options="array.obtainOption" v-model="form.postCode" change-on-select placeholder="请选择地区"></el-cascader>
            </el-form-item>
          </el-col>
          <el-button class="mlem" type="primary" @click='getHospital'>查询</el-button>
          <el-button class="mlem" @click="resetForm('form','getHospital')">重置</el-button>
        </el-row>
      </el-form>
    </nav>
    <section class="pub_hr">
      <div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统设置</el-breadcrumb-item>
          <el-breadcrumb-item>检查服务费设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <el-button class="mlem" @click="getHospital">刷新</el-button>
        <span class="mlem">
          服务医院共<font class='pub_count'>0</font>家
        </span>
      </div>
    </section>
    <section class='main'>
      <el-table :data="array.hostitalOption" border height="100" @row-dblclick='showCurrow'>
        <el-table-column label="操作" prop="name" width="120" align="center">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button size="mini" icon="edit" class="false" :plain="true" type="success" @click='showCurrow(scope.row)'></el-button>
            </el-tooltip>
           
          </template>
        </el-table-column>
        <el-table-column label="字典分组" prop="hospitalName" width="300"></el-table-column>
        <el-table-column label="字典标识"></el-table-column>
          <el-table-column label="字典名称"></el-table-column>
            <el-table-column label="父级字典名称"></el-table-column>
      </el-table>
    </section>
    <section class="create">
      <el-dialog @close="resetForm('navform')" :close-on-click-modal="false" title="设置服务费" size="tiny" v-model="alert.new_info">
        <el-form class="false" :model="navform" :rules="other.rules" ref="navform" label-width="130px">
          <el-form-item label="平台服务费:" prop="servicePrice">
            <el-input type="number"  placeholder="请输入基础服务费(0~100元)" v-model="navform.servicePrice">
            </el-input>
          </el-form-item>
        
          <el-form-item label="远程书写服务费:" prop="writePrice">
            <el-input type="number"  placeholder="请输入远程书写服务费(0~100元)" v-model="navform.writePrice">
            </el-input>
          </el-form-item>
          <el-form-item label="远程审核服务费:" prop="auditPrice">
            <el-input type="number"  placeholder="请输入远程审核服务费(0~100元)" v-model="navform.auditPrice">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="mlem false" :plain="true" type="primary" @click="alert.new_info=false">取 消</el-button>
          <el-button class="mlem false" type="primary" @click="submitForm('navform','saveNewInfo','new_info')">保存</el-button>
        </div>
      </el-dialog>
    </section>
    <section class="createHos">
      <el-dialog @close="resetObj" :close-on-click-modal="false" :title="other.title" v-model="alert.createServe">
        <el-form ref="hosForm" :model="hosForm" label-width="86px">
          <el-row>
            <el-col>
              <el-form-item label="检查类型:" prop="examineType">
                <el-select v-model="hosForm.examineType" multiple placeholder="请选择检查类型">
                  <el-option v-for="item,index in array.checkOption" :key='index' :value='item.examineType' :label='item.examineType'></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-button class="mlem" type="primary" @click='queryData(1)'>查询</el-button>
            <el-button class="mlem" @click="resetForm('hosForm','queryData')">重置</el-button>
          </el-row>
        </el-form>
        <el-row class='hr'>
          <div>
            <el-button class="mlem crbtn" type="primary" @click="synchronous" >新建</el-button>
            项目列表(
            <font class='pub_count'>{{other.count}}</font>)</div>
        </el-row>
        <el-table :data="array.tableData" border height="100" @row-dblclick='edit'>
          <el-table-column label="操作" prop="name" align="center" width="150">
            <template scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <el-button size="mini" icon="edit" class="false" :plain="true" type="success" @click='edit(scope.row)'></el-button>
              </el-tooltip>
               <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button size="mini" icon="delete" class="false" :plain="true" type="success" @click='showCurrow(scope.row)'></el-button>
            </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="选项名称" prop="examineType" ></el-table-column>
          <el-table-column label="启用状态" prop="examineItem" ></el-table-column>
        </el-table>
        <section class="pub_footer">
          <el-pagination @size-change="(el)=>{queryData(1,el)}" @current-change="(el)=>{queryData(el)}" :current-page="other.page" :page-size="other.pageSize" :page-sizes="pageSizeArr" layout="total, sizes, prev, pager, next, jumper" :total="other.count">
          </el-pagination>
        </section>
        <div slot="footer" class="dialog-footer">
          <el-button class="mlem false" :plain="true" type="primary" @click="alert.createServe=false">关 闭</el-button>
        </div>
      </el-dialog>
    </section>
  </section>
</template>
<script>
import { mapState,mapAction } from "vuex";
export default {
  data() {
    return {
      form: { //菜单栏
        postCode: [] //获取邮编

      },
      navform: { //弹窗数据

      },
      hosForm: { //医院对象
        hospitalID: '', //院区id
        examineType: [], //获取检查类型
      },
      array: {
        tableData: [], //表格数据
        obtainOption: [], //地区树形
        hostitalOption: [], //根据院区获取所有医院
        checkOption: [], //获取所有检查类型
      },
      alert: {
        new_info: false, //新建服务弹窗
        createServe: false, //新建服务院区弹窗
      },
      other: {
        page: 1,
        pageSize: 10,
        count: 0, //默认所有的检查项目的条数
        state:1,//同步按钮状态
        rules: {
          servicePrice: [{
            required: true,
            message: '请输入平台服务费(0~100元)',
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value ===''||value<0) {
                callback(new Error());
              } else {
                callback();
              }
            }
          }],
          writePrice: [{
            required: true,
            message: '请输入远程书写服务费(0~100元)',
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value ===''||value<0) {
                callback(new Error());
              } else {
                callback();
              }
            }
          }],
         auditPrice: [{
            required: true,
            message: '请输入远程审核服务费(0~100元)',
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
      'regionProps',
      'synchronousState'
    ])
  },
  created() {
    this.getObtain();
    this.getHospital();
    this.getCheckType();
  },
  methods: {
    //获取所有地区
    getObtain() {
      this.get('paygetHospitalAreaTree').then(data => {
        this.array.obtainOption = _.get(data, 'data.data', []);
      })
    },
    //根据地区获取医院
    getHospital() {
      this.get('paygetHospitals', {
        params: {
          postCode: _.last(this.form.postCode) || ''
        }
      }).then(data => {
        console.log(data)
        this.array.hostitalOption = _.get(data, 'data.data', []);
      })
    },
    //获取检查类型
    getCheckType() {
      this.get('paygetPlaExamineType').then(data => {
        console.log(data)
        this.array.checkOption = _.get(data, 'data', []);
      })
    },
    //双击编辑显示当前行内容
    showCurrow(val) {
      console.log(val);
      this.other.title = `编辑${val.hospitalName}`
      this.hosForm.hospitalID = val.id;
      this.alert.createServe = true;
      this.queryData();
    },
    //获取所有收费项目
    queryData(page = 1, pageSize = this.other.pageSize) {
      this.get('paygetExamineItemList', {
        params: {
          ...this.hosForm,
          page: page - 1,
          pageSize: pageSize,
        }
      }).then(data => {
        console.log(data);
        this.other.page = page;
        this.other.pageSize = pageSize;
        this.other.count = _.get(data, 'data.count', 0);
        this.array.tableData = _.get(data, 'data.data', []);
      })
    },
    //关闭弹窗,清空该医院的对象
    resetObj() {
      this.resetForm('hosForm');
      this.other.pageSize = 10;
    },
    //编辑项目服务费
    edit(val) {
      this.alert.new_info = true;
      this.navform = this.copy(val);
    },
    //保存弹窗数据
    saveNewInfo(resolve) {
      this.post('payupdateExamineItem', this.navform).then(data => {
        console.log(data);
        this.$message({
          message: data.message,
          type: 'success'
        });
        resolve();
        this.queryData(1);
      })
    },
    //同步检查项目
    synchronous() {
      this.get('payinitExamineItem').then(data => {
        console.log(data);
        if (data.httpCode == 'OK') {
          this.$message({
            message: data.message,
            type: 'success'
          });
          // this.other.state=1;
          // this.$store.dispatch("setSynchronous",1);
          this.queryData(1);
        }else{
              this.queryData(1);
        }
      })
    }
  }
}

</script>
<style lang='less'>
@import '../../../assets/css/mixin.less';
.dataDictionary {
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
      .cell{
        text-align: center;
      }
    }
  }
  .create {

    .el-dialog {
      height: 330px;
      .pub_margintop(330px);
      .el-select,
      .el-input {
        width: 300px;
      }
      .el-dialog__body {
        padding-bottom: 10px;
      }
      .el-dialog__footer {
        padding-top: 0px;
      }
      .dialog-footer {
        text-align: center;
      }
    }
  }
  .createHos {
    .el-dialog {
      width: 700px;
      height: 600px;
      display: flex;
      flex-direction: column;
      .pub_margintop(600px);
      .el-dialog__body {
        padding-bottom: 10px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        .el-row:not(.hr) {
          display: flex;
          .el-col {
            max-width: 280px;
            .el-form-item {
              margin-bottom: 5px;
            }
          }
          .el-button {
            height: 36px;
          }
          border-bottom: 1px solid #ccc;
        }
        .hr {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .crbtn {
            padding: 3px 9px;
            margin-right: 0.5em;
            cursor: pointer;
          }
          padding:10px 3px;
        }
        .el-table {
          flex-grow: 1;
           .cell{
        text-align: center;
      }
        }
      }
      .dialog-footer {
        text-align: center;
      }
    }
  }
}

</style>
