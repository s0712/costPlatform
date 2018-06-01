<template>
  <section class="discount">
    <nav class="pub_select">
      <el-form ref="form" :model="form" label-width="86px">
        <el-row>
          <el-col>
            <el-form-item label="地区名称:" prop="postCode">
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
          <el-breadcrumb-item>医院折扣设置</el-breadcrumb-item>
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
        <el-table-column label="操作" prop="name" width="120">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button size="mini" icon="edit" class="false" :plain="true" type="success" @click='showCurrow(scope.row)'></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="院区名称" prop="assHospitalName" width="300"></el-table-column>
        <el-table-column label=""></el-table-column>
      </el-table>
    </section>
    <!-- 获取医院下所有节点 -->
    <section class="createHos">
      <el-dialog :close-on-click-modal="false" :title="other.hostitle" v-model="alert.createServe">
        <el-row class='hr'>
          <div>服务类型列表(
            <font class='pub_count'>{{other.count}}</font>)</div>
          <el-button class="mlem crbtn false" type="primary" @click="createInfo(false)">新建</el-button>
        </el-row>
        <el-table :data="array.tableData" border height="100" @row-dblclick='createInfo'>
          <el-table-column label="操作" prop="name">
            <template scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <el-button size="mini" icon="edit" class="false" :plain="true" type="success" @click='createInfo(scope.row)'></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <el-button size="mini" icon="delete" class="false" :plain="true" type="success" @click='deleteInfo(scope.row,scope.$index)'></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="服务类型" prop="serviceNode"></el-table-column>
          <el-table-column label="折扣率" prop="discount"></el-table-column>
        </el-table>
        <!--  <section class="pub_footer">
          <el-pagination @size-change="(el)=>{queryData(1,el)}" @current-change="(el)=>{queryData(el)}" :current-page="other.page" :page-size="other.pageSize" :page-sizes="pageSizeArr" layout="total, sizes, prev, pager, next, jumper" :total="other.count">
          </el-pagination>
        </section> -->
        <div slot="footer" class="dialog-footer">
          <el-button class="mlem false" :plain="true" type="primary" @click="alert.createServe=false">关 闭</el-button>
        </div>
      </el-dialog>
    </section>
    <!-- 设置服务折扣率 -->
    <section class="create">
      <el-dialog @close="resetForm('navform')" :close-on-click-modal="false" :title="other.title" size="tiny" v-model="alert.new_info">
        <el-form class="false" :model="navform" :rules="other.rules" ref="navform" label-width="87px">
          <el-form-item label="服务类型:" prop="serviceNode">
            <el-select v-model="navform.serviceNode" placeholder="请选择服务类型">
              <el-option v-for="item in array.serviceOption" :key='item' :value='item' :label='item'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="折扣率:" prop="discount">
            <el-input placeholder="请输入折扣率(0.00~1.00)" v-model="navform.discount">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="mlem false" :plain="true" type="primary" @click="alert.new_info=false">取 消</el-button>
          <el-button class="mlem false" type="primary" @click="submitForm('navform','saveNewInfo')" v-if="other.title=='新建服务折扣'">保存并新建</el-button>
          <el-button class="mlem false" type="primary" @click="submitForm('navform','saveNewInfo','new_info')">保存</el-button>
        </div>
      </el-dialog>
    </section>
  </section>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        postCode: [] //获取邮编
      },
      navform: { //弹窗数据
        targetID: '', //目标院区
        discount: '', //折扣率,
        type: 1, //0：系统对院区的折扣，1：院区之间的折扣，2：系统对个人的协议价'(目前没2）,
        serviceNode: '', //服务类型名字
      },
      hosForm: { //医院对象
        targetID: '', //院区id
        type: 1, //0：系统对院区的折扣，1：院区之间的折扣，2：系统对个人的协议价'(目前没2）,
      },
      array: {
        tableData: [], //表格数据
        obtainOption: [], //地区树形
        hostitalOption: [], //根据院区获取所有医院
        serviceOption: [], //获取所有服务类型
      },
      alert: {
        new_info: false, //新建服务弹窗
        createServe: false, //新建服务院区弹窗
      },
      other: {
        title: '',
        url: '', //保存折扣路径
        page: 1,
        pageSize: 10,
        count: 0, //默认所有的检查项目的条数
        rules: {
          serviceNode: [{
            required: true,
            message: '请选择服务类型',
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value == '') {
                callback(new Error());
              } else {
                callback();
              }
            }
          }],
          discount: [{
            required: true,
            message: '请输入折扣率(0.00~1.00)',
            trigger: 'change',
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
      'regionProps'
    ])
  },
  created() {
    this.getObtain();
    this.getHospital();
    this.getServiceType();
  },
  methods: {
    //获取所有地区
    getObtain() {
      this.get('paygetHospitalAreaTree').then(data => {
        this.array.obtainOption = _.get(data, 'data.data', []);
      })
    },
    //获取所有服务类型
    getServiceType() {
      this.get('paygetAllProcess',{
        params:{
          nodeType:1
        }
      }).then(data => {
        console.log(data)
        this.array.serviceOption = _.get(data, 'data', []);
      })
    },
    //根据地区获取医院
    getHospital() {
      this.post('paygetAssHospitals', {
      
          postCode: _.last(this.form.postCode) || '',
          assHospitalID:'',
      
      }).then(data => {
        // console.log(1)
        // console.log(data)
        this.array.hostitalOption = _.get(data, 'data',[]);
        // console.log(this.array.hostitalOption)
      })
    },
    //双击编辑显示当前行内容
    showCurrow(val) {
      console.log(val);

      this.other.hostitle = `编辑${val.assHospitalName}`
      this.hosForm.targetID = val.assHospitalID;
      this.navform.targetID = val.assHospitalID;
      this.alert.createServe = true;
      this.queryData();
    },
    //获取所有折扣类型
    queryData() {
      // console.log(this.hosForm)
      this.get('paygetDiscountList', {
        params: {
          ...this.hosForm,
        }
      }).then(data => {
        console.log(data);
        this.other.count = _.get(data, 'data.count', 0);
        this.array.tableData = _.get(data, 'data.data', []);
      })
    },

    //编辑项目服务费
    createInfo(val) {
      if (val) {
        this.other.title = '编辑服务折扣';
        this.other.url = 'payupdatePayDiscount';
        setTimeout(() => {
          this.navform = this.copy(val);
        }, 0);
      } else {
        this.other.title = '新建服务折扣';
        this.other.url = 'payaddDiscount';
      }
      this.alert.new_info = true;
    },
    //保存弹窗数据
    saveNewInfo(resolve) {
      this.post(this.other.url, this.navform).then(data => {
        this.$message({
          message: data.message,
          type: 'success'
        });
        resolve();
        this.queryData();
      })
    },
    //删除折扣
    deleteInfo(item, index) {
      console.log(item)
      this.$confirm(`是否确认删除${item.serviceNode}服务折扣?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.get('paydeleteDiscount', {
          params: {
            id: item.id,
          }
        }).then(data => {
          this.$message({
            type: 'success',
            message: data.message
          });
          this.array.tableData.splice(index, 1)
          this.other.count--;
        }, () => {
          console.log('错误')
        })
      }).catch(() => {});
    }
  }
}

</script>
<style lang='less'>
@import '../../../assets/css/mixin.less';
.discount {
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
      height: 260px;
      .pub_margintop(260px);
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
      height: 400px;
      display: flex;
      flex-direction: column;
      .pub_margintop(400px);
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
