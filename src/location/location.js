import {title} from './title.js';
import system from './system.js';

var sxy={
paylogin:title+'pay/login',//用户登录
paylogout:title+'pay/logout',//用户登出
payupdatePassword:title+'pay/updatePassword',//修改密码

paygetExamineItemList:title+'pay/getExamineItemList',//获取收费项目列表信息
paygetAllProcess:title+'pay/getAllProcess',//获取所有服务类型
payupdateExamineItem:title+'pay/updateExamineItem',//设置价格
paygetHospitalAreaTree:title+'pay/getHospitalAreaTree',//获取地区树形
paygetHospitals:title+'pay/getHospitals',//根据地区查询院区信息数据
paygetPlaExamineType:title+'pay/getPlaExamineType',//查询从运维取检查类型
payinitExamineItem:title+'pay/initExamineItem',//同步所有的检查项目


paygetDiscountList:title+'pay/getDiscountList',//获取折扣院区列表
payaddDiscount:title+'pay/addDiscount',//新建折扣
payupdatePayDiscount:title+'pay/updatePayDiscount',//更新折扣
paydeleteDiscount:title+'pay/deleteDiscount',//删除折扣


payrecharge4Hospital:title+'pay/recharge4Hospital',//新增线下充值
paydeleteRecharg4Hospital:title+'pay/deleteRecharg4Hospital',//扣除线下充值
paygetAccountInfoList:title+'pay/getAccountInfoList',//查询账户消费
paygetUserFullnames:title+'pay/getUserFullnames',//获取医生下拉框

paygetCurrencyBalance:title+'pay/getCurrencyBalance',//获取账户余额


paygetAssHospitals:title+'pay/getAssHospitals',//根据地区获取可协助的医院

}


var location={
	...sxy,
}
Object.assign(location, system);
export default location;