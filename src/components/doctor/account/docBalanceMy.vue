<template>
  <section class="docBalanceMy">
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
          <h3><b>{{toThousands(other.price)}}</b>  <span class="pub_count">元</span> <el-button class="mlem" type="primary" disabled>充值</el-button><el-button class="mlem" type="primary" disabled>提现</el-button></h3>
          <div class="two">
            <div class="jin"><span class='txt'>金币 : </span><b>{{toThousands(this.other.currentBalanceA)}}</b><span class='txt'>分</span>
            </div>
            <div class="line"></div>
            <div class="yin"><span class='txt'>银币 : </span><b>{{toThousands(this.other.currentBalanceB)}}</b><span class='txt'>分</span></div>
          </div>
        </div>
      </div>
    </section>
    <section class='main'>
      <el-tabs v-model="activeName">
        <el-tab-pane label="最近交易记录" name="first">
          <el-table :data="array.tableData" border height="100">
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
      activeName: 'first',
      array: {
        tableData: []
      },
      other: {
        user: '',
        page: 1,
        pageSize: 20,
        count: 0, //默认所有的检查项目的条数
        price: 0,
        currentBalanceA: 0, //金币
        currentBalanceB: 0, //银币
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
    this.loginState.then(data => {
      this.$set(this.other, 'user', this.userMsg.fullname);
      this.accountBalance();
      this.queryData(1);
    })
  },
  methods: {
    //获取账户余额
    accountBalance() {
      this.get('paygetCurrencyBalance').then((data) => {
        this.other.price = data.data.currentBalanceA + data.data.currentBalanceB;
        this.other.currentBalanceA = data.data.currentBalanceA;
        this.other.currentBalanceB = data.data.currentBalanceB;
      })
    },
    //获取数据
    queryData(page, pageSize = this.other.pageSize) {
      this.get('paygetAccountInfoList', {
        params: {
          hospitalID: this.userMsg.hospitalID,
          fullname: this.userMsg.fullname,
          page: page - 1,
          pageSize: pageSize
        }
      }).then(data => {
        // console.log(data)
        this.other.count = _.get(data, 'data.count', 0);
        this.array.tableData = _.get(data, 'data.data', []);
      })
    },
  }
}

</script>
<style lang='less'>
      .docBalanceMy {
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
      // border:1px solid green;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      color: #1F2D3D;
      margin-left: 20px;
      h1 {
        color: #8492A6;
        font-size: 1.5em;
        span {
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
        .el-button {
          padding: 5px 15px;
          span {
            font-size: 5px;
          }
        }
      }
      .two {
        // border:1px solid red;
        margin-top: 10px;
        display: flex;
        div {
          display: flex;
          align-items: flex-end;
        }
        .jin {
          background: url('../../../assets/images/jin.png') no-repeat;
          background-size: auto 100%;
          padding-left: 28px;
        }
        .yin {
          background: url('../../../assets/images/jyin.png') no-repeat;
          background-size: auto 100%;
          padding-left: 28px;
        }
        .line {
          border-left: 1px solid #ddd;
          margin: 0 1em;
        }
        .txt {
          font-size: 1em;
          color: #C0CCDA;
        }
        b {
          color: #8492A6;
          font-size: 20px;
          margin: 0 3px;
        }
      }
    }
  }
  .main {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    .btn {
      position: absolute;
      right: 1em;
      top: 3px;
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
