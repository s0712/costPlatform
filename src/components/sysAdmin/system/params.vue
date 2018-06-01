<template>
  <section class="params">
    <nav class="pub_select">
      <el-form ref="form" :model="form" label-width="86px">
        <el-row>
          <el-col>
            <el-form-item label="地区名称:" prop="postCode">
              <el-cascader :props="regionProps" :options="array.obtainOption" v-model="form.postCode" change-on-select placeholder="请选择地区"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="参数分组:" prop="postCode">
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
          <el-breadcrumb-item>系统参数</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <el-button class="mlem" @click="getHospital">刷新</el-button>
        <span class="mlem">
         系统参数共<font class='pub_count'>0</font>条
        </span>
      </div>
    </section>
    <section class='main'>
      <el-table :data="array.tableData" border height="100" @row-dblclick='showCurrow'>
        <el-table-column label="操作" prop="name" width="120" align="center">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button size="mini" icon="edit" class="false" :plain="true" type="success" @click='showCurrow(scope.row)'></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="序号" prop=""></el-table-column>
        <el-table-column label="参数分组" prop=""></el-table-column>
        <el-table-column label="参数代码" prop=""></el-table-column>
        <el-table-column label="参数名称" prop=""></el-table-column>
        <el-table-column label="参数值" prop=""></el-table-column>
        <el-table-column label="参数说明" prop=""></el-table-column>
      </el-table>
    </section>
  </section>
</template>
<script>
import { mapState } from "vuex";
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
        state: 1, //同步按钮状态
        rules: {
          servicePrice: [{
            required: true,
            message: '请输入平台服务费(0~100元)',
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value == '') {
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
              if (value == '') {
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
              if (value == '') {
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
    //双击编辑显示当前行内容
    showCurrow(val) {
      console.log(val);
      this.other.title = `编辑${val.hospitalName}`
      this.hosForm.hospitalID = val.id;
      this.alert.createServe = true;
      this.queryData();
    },
  }
}

</script>
<style lang='less' scoped>
@import '../../../assets/css/mixin.less';
.params {
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
        }
      }
      .dialog-footer {
        text-align: center;
      }
    }
  }
}

</style>
