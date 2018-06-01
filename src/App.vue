<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <header class="this_header">
      <div class="left">
        <div class="logo"></div>
        <div class="txt">岱江Saas结算服务平台</div>
      </div>
      <div class="elmenu">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{user.fullname}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <!--  <span class="el-dropdown-link">
            院区管理员<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <span class="el-dropdown-link">
            哈医生<i class="el-icon-caret-bottom el-icon--right"></i>
          </span> -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button type="text" @click="alert.resetPass=true">修改密码</el-button>
            </el-dropdown-item>
            <el-dropdown-item @click="loginout">
              <el-button type="text" @click='loginout'>退出</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <article class="this_section">
      <nav class="this_nav">
        <el-button type="text" class="icon iconfont icon-zhankai" @click="isCollapse=!isCollapse"></el-button>
        <!-- 系统管理员 -->
        <el-menu :router="true" :unique-opened="true" class="el-menu-vertical-demo" @open="handleOpen" :collapse="isCollapse" v-if="user.category==0">
          <el-submenu index="1">
            <template slot="title">
              <i class="icon iconfont icon-set"></i>
              <span slot="title">系统设置</span>
            </template>
            <el-menu-item index="/checkPrice">
              <span slot="title">检查服务费</span>
            </el-menu-item>
            <el-menu-item index="/discountIsSet">
              <span slot="title">医院折扣设置</span>
            </el-menu-item>
            <!--  <el-menu-item index="/params">
              <span slot="title">系统参数</span>
            </el-menu-item>
            <el-menu-item index="/dataDictionary">
              <span slot="title">数据字典</span>
            </el-menu-item> -->
          </el-submenu>
        </el-menu>
        <!-- 系统财务管理员 -->
        <el-menu :router="true" :unique-opened="true" class="el-menu-vertical-demo" @open="handleOpen" :collapse="isCollapse" v-if="user.category==4">
          <el-submenu index="1">
            <template slot="title">
              <i class="icon iconfont icon-set"></i>
              <span slot="title">系统设置</span>
            </template>
            <el-menu-item index="/payRecords">
              <span slot="title">医院充值记录</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="icon iconfont icon-caiwujichushezhi"></i>
              <span slot="title">财务设置</span>
            </template>
            <el-menu-item index="/capitalSubsidiary">
              <span slot="title">资金明细</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="icon iconfont icon-zhanghushezhi"></i>
              <span slot="title">账户设置</span>
            </template>
            <el-menu-item index="/balanceMy">
              <span slot="title">我的余额</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <!-- 院区管理员 -->
        <el-menu :router="true" :unique-opened="true" class="el-menu-vertical-demo" @open="handleOpen" :collapse="isCollapse" v-if="user.category==1">
          <el-submenu index="1">
            <template slot="title">
              <i class="icon iconfont icon-set"></i>
              <span slot="title">系统设置</span>
            </template>
            <el-menu-item index="/checkProjectPrice">
              <span slot="title">项目价格设置</span>
            </el-menu-item>
            <el-menu-item index="/hosDiscount">
              <span slot="title">医院折扣设置</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="icon iconfont icon-caiwujichushezhi"></i>
              <span slot="title">财务设置</span>
            </template>
            <el-menu-item index="/hosCapitalSubsidiary">
              <span slot="title">资金明细</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="icon iconfont icon-zhanghushezhi"></i>
              <span slot="title">账户设置</span>
            </template>
            <el-menu-item index="/hosBalanceMy">
              <span slot="title">我的余额</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <!-- 医生本人 -->
        <el-menu :router="true" :unique-opened="true" class="el-menu-vertical-demo" @open="handleOpen" :collapse="isCollapse" v-if="user.category==2">
          <el-submenu index="1">
            <template slot="title">
              <i class="icon iconfont icon-caiwujichushezhi"></i>
              <span slot="title">财务设置</span>
            </template>
            <el-menu-item index="/docCapitalSubsidiary">
              <span slot="title">资金明细</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="icon iconfont icon-zhanghushezhi"></i>
              <span slot="title">账户设置</span>
            </template>
            <el-menu-item index="/docBalanceMy">
              <span slot="title">我的余额</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </nav>
      <main class="this_main">
        <router-view class="view"></router-view>
      </main>
    </article>
    <section class="resetPass">
      <el-dialog @close="resetForm('navform')" title="修改密码" size="tiny" v-model="alert.resetPass">
        <el-form class="false" :model="navform" ref="navform" label-width="87px">
          <el-form-item label="旧密码:" prop="oldPassword">
            <el-input type="password" placeholder="请输入旧密码" v-model="navform.oldPassword"></el-input>
          </el-form-item>
          <el-form-item label="新密码:" prop="newPassword">
            <el-input type="password" placeholder="请输入新密码" v-model="navform.newPassword"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="mlem false" :plain="true" type="primary" @click="alert.resetPass=false">取 消</el-button>
          <el-button class="mlem false" type="primary" @click="submitForm('navform','resetpass','resetPass')">保存</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: 'app',
  data() {
    return {
      isCollapse: true,
      user: {

      },
      alert: {
        resetPass: false, //修改密码
      },
      navform: {
        oldPassword: '',
        newPassword: ''
      }
    }
  },
  computed: {
    ...mapState([
      "userMsg"
    ])
  },
  created() {
    this.login();
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    //登录
    login() {
      let promise = new Promise(resolve => {
        let storage = window.localStorage;
        this.get('paylogin', {
          params: {
            username: storage.username,
            password: storage.password,
          }
        }).then(data => {
          console.log(data)
          this.user = this.copy(_.get(data, 'data', {}));
          this.$set(this.user, data.data);
          this.$store.dispatch("setUserMsg", _.get(data, 'data', {}));
          if (data.httpCode == "OK") {
            resolve(data.data);
          }
        })
      })
      this.$store.commit('toPrepare', promise);
      //  this.get('paylogin', {params:{
      // username:'zhang',
      // password:'888888',
      // }}).then(data => {
      //   // this.$router.go('');
      //   console.log(data)
      //   data.data=this.copy(_.get(data,'data',{}));
      //   this.$set(data.data,data.data);
      //   this.$store.dispatch("setUserMsg",_.get(data,'data',{}));
      //   })

    },
    //退出登录
    loginout() {
      this.get('paylogout').then(data => {
        console.log(data);
        if (data.httpCode == 'OK') {
          this.$message({
            message: data.message,
            type: 'success'
          });
          this.$store.dispatch("setUserMsg", {});
          setTimeout(() => {
            self.location = 'login.html';
          }, 1000)
        }
      })
    },
    //修改密码
    resetpass(resolve) {
      this.get('payupdatePassword', {
        params: {
          ...this.navform,
          id: this.user.id
        }
      }).then(data => {
        console.log(data);
        resolve();
        if (data.httpCode == 'OK') {
          this.$message({
            message: data.message,
            type: 'success'
          });
          // this.$store.dispatch("setUserMsg", {});
          setTimeout(() => {
            self.location = 'login.html';
          }, 1000)
        }
      })
    }
  }

}

</script>
<style lang="less">
@import './assets/css/mixin.less';
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .this_header {
    height: 80px;
    width: 100%;
    background: #009933;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 6px;
    .left {
      display: flex;
      align-items: center;
      .txt {
        font-size: 30px;
        font-weight: 400;
        color: #fff;
        margin-left: 18px;
      }
      .logo {
        width: 54px;
        height: 54px;
        background: url('./assets/images/djlogo.png');
        background-size: 100%;
        border-radius: 50%;
      }
    }
    .elmenu {
      .el-dropdown-link {
        color: #fff;
      }
    }
  }

  .this_section {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    display: flex;
    .this_nav {
      height: 100%;
      display: flex;
      flex-direction: column;
      background: #eef1f6;
      .iconfont {
        font-size: 1.1em;
      }
      .icon-zhankai {
        font-weight: 600;
        font-size: 1.5em;
      }
      .icon-zhanghushezhi {
        font-size: 1.3em;
      }
      .this_spread {
        width: 100%;
        background: #eef1f6;
      }
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        height: 100%;
        max-height: 100%;
      }
    }
    .this_main {
      width: 830px;
      height: 100%;
      padding: 15px 20px 0 20px;
      flex-grow: 1;

      .view {
        width: 100%;
        height: 100%;
      }
    }
  }
  .resetPass {
    .el-dialog {
      height: 260px;
      .pub_margintop(260px);
      .el-dialog__body {
        padding-bottom: 10px;
      }
      .el-input {
        width: 300px;
      }
      .dialog-footer {
        text-align: center;
      }
    }
  }
}

.el-dropdown-menu {
  right: 6px;
  max-width: 75px;
  .el-button--text {
    color: #333 !important;
  }
}

</style>
