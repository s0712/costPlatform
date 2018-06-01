//系统管理员->系统设置->充值记录
const payRecords = resolve => {
  require.ensure(['../components/sysAdmin/system/payRecords.vue'], () => {
    resolve(require('../components/sysAdmin/system/payRecords.vue'))
  })
}

//系统管理员->系统设置->插件管理
const plugin = resolve => {
  require.ensure(['../components/sysAdmin/system/plugin.vue'], () => {
    resolve(require('../components/sysAdmin/system/plugin.vue'))
  })
}

//系统管理员->系统设置->检查节点佣金
const checkPrice = resolve => {
  require.ensure(['../components/sysAdmin/system/checkPrice.vue'], () => {
    resolve(require('../components/sysAdmin/system/checkPrice.vue'))
  })
}

//系统管理员->系统设置->医院折扣设置
const discountIsSet = resolve => {
  require.ensure(['../components/sysAdmin/system/discountIsSet.vue'], () => {
    resolve(require('../components/sysAdmin/system/discountIsSet.vue'))
  })
}

//系统管理员->系统设置->系统参数
const params = resolve => {
  require.ensure(['../components/sysAdmin/system/params.vue'], () => {
    resolve(require('../components/sysAdmin/system/params.vue'))
  })
}
//系统管理员->系统设置->数据字典
const dataDictionary = resolve => {
  require.ensure(['../components/sysAdmin/system/dataDictionary.vue'], () => {
    resolve(require('../components/sysAdmin/system/dataDictionary.vue'))
  })
}



//系统管理员->财务管理->资金明细
const capitalSubsidiary = resolve => {
  require.ensure(['../components/sysAdmin/financial/capitalSubsidiary.vue'], () => {
    resolve(require('../components/sysAdmin/financial/capitalSubsidiary.vue'))
  })
}

//系统管理员->账户管理->我的余额
const balanceMy = resolve => {
  require.ensure(['../components/sysAdmin/account/balanceMy.vue'], () => {
    resolve(require('../components/sysAdmin/account/balanceMy.vue'))
  })
}



//系统管理员->初始页面
const hello = resolve => {
  require.ensure(['../components/public/hello.vue'], () => {
    resolve(require('../components/public/hello.vue'))
  })
}
let sysAdmin = [
  // {path: '/',       component: hello,  },
  { path: '/payRecords', component: payRecords, name: '充值记录' },
  { path: '/plugin', component: plugin, name: '插件管理' },
  { path: '/checkPrice', component: checkPrice, name: '检查节点佣金' },
  { path: '/params', component: params, name: '系统参数' },
  { path: '/dataDictionary', component: dataDictionary, name: '数据字典' },
  { path: '/discountIsSet', component: discountIsSet, name: '医院折扣设置' },
  { path: '/capitalSubsidiary', component: capitalSubsidiary, name: '资金明细' },
  { path: '/balanceMy', component: balanceMy, name: '我的余额' },
]

export default sysAdmin;
