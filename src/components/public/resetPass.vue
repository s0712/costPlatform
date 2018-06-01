<template>
  <section class="resetPass">
  	 <el-dialog @close="resetForm('navform')" :modal="false" :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false" title="修改密码" size="tiny" v-model="alert.new_info">
                <el-form class="false" :model="navform" ref="navform" label-width="87px">
                    <el-form-item label="旧密码:">
                       <el-input placeholder="请输入旧密码" v-model="navform.conAgentName"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码:">
                       <el-input placeholder="请输入新密码" v-model="navform.conAgentName"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码:">
                       <el-input placeholder="请输入新密码" v-model="navform.conAgentName"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                   <el-button class="mlem false" :plain="true" type="primary" @click="alert.new_info=false">取 消</el-button>
                    <el-button class="mlem false" type="primary" @click="submitForm('navform','saveNewInfo','newinfo')">保存</el-button>
                </div>
            </el-dialog>
  </section>
</template>
<script>
export default {
  data() {
    return {
      alert:{
        new_info:true
      },
      navform:{

      }
    }
  },
  computed: {

  },
  created() {

  },
  methods: {

  }
}

</script>
<style lang='less'>
@import '../../assets/css/mixin.less';

.resetPass{
   .el-dialog{
       height: 344px;
     .pub_margintop(344px);
     .el-input{
       width: 300px;
      }
      .dialog-footer{
        text-align: center;
      }
    }
}

</style>