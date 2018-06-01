<template>
  <section class="plugin">
   <section class="pub_hr">
      <div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统设置</el-breadcrumb-item>
          <el-breadcrumb-item>插件管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
       
        <el-button class="mlem" type="primary">刷新</el-button>
        <span class="mlem">
          插件管理记录共<font class='pub_count'>0</font>条
        </span>
      </div>
    </section>
  	  <section class='main'>
      <el-table :data="array.tableData" border height="100">
        <el-table-column label="操作" prop="name">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <el-button size="mini" class="false" :plain="true" type="danger" icon="delete"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="name"></el-table-column>
        <el-table-column label="操作" prop="name"></el-table-column>
        <el-table-column label="操作" prop="name"></el-table-column>
      </el-table>
    </section>
  </section>
</template>
<script>
export default {
  data() {
    return {
      array:{
        tableData:[]
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
<style lang='less' scoped>
@import '../../../assets/css/mixin.less';
.plugin{
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  .main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    border: 1px solid green;
    .el-table {
      flex-grow: 1;
    }
  }
}

</style>