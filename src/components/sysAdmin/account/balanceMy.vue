<template>
  <section class="balanceMy">
    <section class="pub_hr">
      <div>
        <el-breadcrumb>
          <el-breadcrumb-item>账户管理</el-breadcrumb-item>
          <el-breadcrumb-item>我的余额</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
      </div>
    </section>
    <section class="header">
      <div class="left"></div>
      <div class="right">
        <h1>您好,<span class="pub_count">{{other.user}}</span></h1>
        <div class="body">
          <h2>账户余额</h2>
          <h3><b>{{toThousands(other.price)}}</b> <span class="pub_count">元</span></h3>
        </div>
      </div>
    </section>
    <section class='main'>
    <el-button type="primary" class="btn" @click='queryData(1)'>刷新</el-button>
      <el-tabs v-model="activeName" @tab-click="queryData(1)">
        <el-tab-pane label="最近交易记录" name="4">
          <el-table :data="array.tableData" border height="100">
            <el-table-column label="账户名称" prop="accountName"  show-overflow-tooltip width="180"></el-table-column>
            <el-table-column label="账户类型" prop="name" width="120" >
              <template scope="scope">
                <span>{{['个人','医院'][scope.row.accountType]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="消费人" prop="fullname" width="120" show-overflow-tooltip ></el-table-column>
            <el-table-column label="消费种类" prop="orderName"  show-overflow-tooltip width="350"></el-table-column>
            <el-table-column label="消费金额" prop="orderAmount" width="150">
              <template scope="scope">
              <!-- <span>{{scope.row.finaType==0?'+':'-'}}</span> -->
                <span>{{toThousands(scope.row.orderAmount)}}元</span>
              </template>
            </el-table-column>
            <el-table-column label="消费时间" prop="startTime"  show-overflow-tooltip width="250">
              <template scope="scope">
                <span>{{formatDate(scope.row.startTime)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="账户余额" prop="currentBalanceA" width="150">
              <template scope="scope">
                <span>{{toThousands(scope.row.currentBalanceA+scope.row.currentBalanceB)}}元</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="冻结交易记录" name="5">
          <el-table :data="array.tableData" border height="100">
            <el-table-column label="账户名称" prop="accountName"  show-overflow-tooltip width="180"></el-table-column>
            <el-table-column label="账户类型" prop="name" width="120" >
              <template scope="scope">
                <span>{{['个人','医院'][scope.row.accountType]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="消费人" prop="fullname" width="120" show-overflow-tooltip ></el-table-column>
            <el-table-column label="消费种类" prop="orderName"  show-overflow-tooltip width="350"></el-table-column>
            <el-table-column label="消费金额" prop="orderAmount" width="150">
              <template scope="scope">
              <!-- <span>{{scope.row.finaType==0?'+':'-'}}</span> -->
                <span>{{toThousands(scope.row.orderAmount)}}元</span>
              </template>
            </el-table-column>
            <el-table-column label="消费时间" prop="startTime"  show-overflow-tooltip width="250">
              <template scope="scope">
                <span>{{formatDate(scope.row.startTime)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="账户余额" prop="currentBalanceA" width="150">
              <template scope="scope">
                <span>{{toThousands(scope.row.currentBalanceA+scope.row.currentBalanceB)}}元</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
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
      activeName: '4',
      array: {
        tableData: []
      },
      other: {
        user: '',
        page: 1,
        pageSize: 20,
        count: 0, //默认所有的检查项目的条数
        price: 0
      }
    }
  },
  computed: {
    ...mapState([
      'pageSizeArr',
      'userMsg',
      'loginState'
    ])
  },
  created() {
  this.loginState.then(data=>{
    console.log('123sxt')
    console.log(data)
    this.$set(this.other, 'user', data.fullname);
    this.accountBalance();
    this.queryData(1);
  })
  },
  methods: {
    //获取账户余额
    accountBalance() {
      this.get('paygetCurrencyBalance').then((data) => {
        this.other.price =data.data.currentBalanceB;
      })
    },
    //获取数据
    queryData(page, pageSize = this.other.pageSize,type=this.activeName) {
      this.get('paygetAccountInfoList', {
        params: {
          page: page - 1,
          pageSize: pageSize,
          type:type
        }
      }).then(data => {
        console.log(data)
        this.other.count = _.get(data, 'data.count', 0);
        this.array.tableData = _.get(data, 'data.data', []);
      })
    },
  }
}

</script>
<style lang='less'>
.balanceMy {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  .header {
    width: 100%; // border: 1px solid blue;
    margin: 10px 0;
    display: flex;
    .left {
      width: 150px;
      height: 150px;
      background: url('../../../assets/images/people.jpg') center center;
      background-size: 100%;
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      color: #1F2D3D;
      margin-left: 20px;
      h1 {
        color: #8492A6;
        font-size: 1.5em;
         span{
          font-size: 1em;
        }
      }
      h2 {
        background: url('../../../assets/images/yue.png') no-repeat;
        background-size: auto 100%;
        color: #C0CCDA;
        font-size: 16px;
        padding-left: 27px;
      }
      h3 {
        display: flex;
        align-items: flex-end;
        padding-left: 27px;
        b {
          color: #8492A6;
          font-size: 30px;
          margin-bottom: -4px;
        }
        span {
          font-size: 18px;
        }
      }
    }
  }
  .main {
    
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    .cell{
      text-align: center;
    }
    position:relative;
    .btn{
      position: absolute;
      right: 1em;
      top: 3px;
      z-index:10000;
    }
    .el-tabs {
      flex-grow: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      .el-tabs__header {
        margin: 0;
      }
      .el-tabs__content,
      .el-tab-pane {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }
    }
    .el-table {
      width: 100%;
      flex-grow: 1;
    }
  }
}

</style>
