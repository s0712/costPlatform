<template>
  <section id="login">
    <vue-particles color="#dedede" :particleOpacity="0.7" :particlesNumber="40" shapeType="circle" :particleSize="4" linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="300" :moveSpeed="3" :hoverEffect="false" hoverMode="grab" :clickEffect="true" clickMode="push">
    </vue-particles>
    <div>
      <section class="content">
        <div class="left">
          <p class="title">欢迎使用</p>
          <p class="title">岱江结算服务平台</p>
          <p class="welcome"> 技术支持400-0571-121 </p>
          <p class="welcome">
            Welcome to Daijiang Billing System
            <br>
          </p>
        </div>
        <div class="right">
          <el-form :rules="rules" class="form" ref="form" :model="form">
            <el-form-item prop="username">
              <el-input v-model="form.username" placeholder="请输入用户名">
                <template slot="prepend"><i class="icon iconfont icon-yonghu"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" placeholder="请输入密码" v-model="form.password" @keydown.enter.native="login">
                <template slot="prepend"><i class="icon iconfont icon-mima01"></i></template>
              </el-input>
            </el-form-item>
            <!-- <el-form-item prop="save">
              <el-checkbox v-model="form.save">保存密码</el-checkbox>
            </el-form-item> -->
            <el-button type="primary" @click="login">登 录</el-button>
          </el-form>
        </div>
      </section>
    </div>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: 'login',
  data() {
    return {
      form: {
        username: '',
        password: ''
        // username: 'admin',
        // password: '888888'
      },
      rules: {
        username: [{
          required: true,
          message: '请输入账号',
          trigger: 'change'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'change'
        }]
      }
    }
  },
  computed: {
    ...mapState([
      "userMsg"
    ])
  },
  created() {
    var storage = window.localStorage;
    if (storage["username"]) {
      this.form.username = storage["username"];
    }
  },
  methods: {
    //登录
    login() {
      this.get('paylogin', { params: this.form }).then(data => {
        // console.log(data)
        if (data.httpCode == 'OK') {
          this.$message({
            message: data.message,
            type: 'success'
          });
          // this.$store.dispatch("setUserMsg", _.get(data, 'data', {}));
          if (!window.localStorage) {
            alert("浏览器需要支持本地存储");
            return false;
          } else {
            var storage = window.localStorage;
            storage["username"] = this.form.username;
            storage["password"] = this.form.password;
            storage["category"] = data.data.category;
          }
          setTimeout(() => {
            self.location = 'index.html';
          }, 1000)
        }
      })
    },

    handleSelect() {

    }
  }
}

</script>
<style lang='less' scoped>
#login {
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
  #particles-js {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    background: -webkit-gradient(linear, 20% 100%, 100% 0, from(#46c6ac), to(#8cd4ac));
    position: absolute;
  }
  .content {
    z-index: 100;
    width: 860px;
    height: 460px;
    border-radius: 20px;
    box-shadow: 0 0 50px rgba(0, 0, 0, .1);
    opacity: .86;
    display: flex;
    .left {
      width: 50%;
      border-radius: 20px 0 0 20px;
      background: url('./assets/images/left-bg.png');
      background-size: 100% 100%; // display: flex;
      p.title {
        margin-left: 45px;
        color: #fff;
        font-size: 28px;
        margin-top: 12px;
      }
      p.title:first-child {
        margin-top: 134px;
      }
      .welcome {
        color: #fff;
        font-size: 16px;
        margin-top: 28px;
        margin-left: 45px;
      }
    }
    .right {
      width: 50%;
      background: #fff;
      border-radius: 0 20px 20px 0;
      display: flex; // align-items:center;
      justify-content: center;
      .form {
        margin-top: 100px;
        display: flex;
        flex-direction: column; // align-items:flex-end;
        width: 60%;
        height: 60%;
        >div {
          // margin-bottom: 23px;
          .el-autocomplete,
          .el-select {
            display: block;
          }
        }
      }
    }
  }
}

</style>
