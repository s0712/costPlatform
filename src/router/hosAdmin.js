//院区管理员->系统设置->项目价格设置
const checkProjectPrice = resolve => {
  require.ensure(['../components/hosAdmin/system/checkProjectPrice.vue'], () => {
    resolve(require('../components/hosAdmin/system/checkProjectPrice.vue'))
  })
}

//院区管理员->系统设置->对其他医院的折扣设置
const discount = resolve => {
  require.ensure(['../components/hosAdmin/system/discount.vue'], () => {
    resolve(require('../components/hosAdmin/system/discount.vue'))
  })
}


//院区管理员->财务管理->资金明细
const hosCapitalSubsidiary = resolve => {
  require.ensure(['../components/hosAdmin/financial/hosCapitalSubsidiary.vue'], () => {
    resolve(require('../components/hosAdmin/financial/hosCapitalSubsidiary.vue'))
  })
}

//院区管理员->账户管理->我的余额
const hosBalanceMy = resolve => {
  require.ensure(['../components/hosAdmin/account/hosBalanceMy.vue'], () => {
    resolve(require('../components/hosAdmin/account/hosBalanceMy.vue'))
  })
}
//院区管理员->初始页面
const hello = resolve => {
  require.ensure(['../components/public/hello.vue'], () => {
    resolve(require('../components/public/hello.vue'))
  })
}
let hosAdmin = [
  // { path: '/', component: hello },
  { path: '/checkProjectPrice', component: checkProjectPrice },//项目检查价格设置
  { path: '/hosDiscount', component: discount }, //医院折扣设置
  { path: '/hosCapitalSubsidiary', component: hosCapitalSubsidiary },//资金明细
  { path: '/hosBalanceMy', component: hosBalanceMy },//我的余额
]

export default hosAdmin;
