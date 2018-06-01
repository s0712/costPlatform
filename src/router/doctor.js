

//医生本人->财务管理->资金明细
const docCapitalSubsidiary = resolve => {
  require.ensure(['../components/doctor/financial/doccapitalSubsidiary.vue'], () => {
    resolve(require('../components/doctor/financial/doccapitalSubsidiary.vue'))
  })
}

//医生本人->账户管理->我的余额
const docBalanceMy = resolve => {
  require.ensure(['../components/doctor/account/docBalanceMy.vue'], () => {
    resolve(require('../components/doctor/account/docBalanceMy.vue'))
  })
}


//院区管理员->初始页面
const hello = resolve => {
  require.ensure(['../components/public/hello.vue'], () => {
    resolve(require('../components/public/hello.vue'))
  })
}
let doctor = [
  // { path: '/', component: hello },
  { path: '/docCapitalSubsidiary', component: docCapitalSubsidiary },//资金明细
  { path: '/docBalanceMy', component: docBalanceMy },//我的余额
]

export default doctor;
