import Vue from 'vue';
import location from '../location/location.js';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);


//全局混合
Vue.mixin({
  data() {
    return {
    
    };
  },
  methods: {
    //提交表单验证
    submitForm(formName, fun, can) {
      //formName 表单名称
      //fun      回调函数
      // can     是否消失
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //提交成功方法
          if (can) {
            new Promise((resolve, reject) => {
              if (fun && Array.isArray(can)) fun(reject);
              else if (typeof(fun) === "function") fun(resolve);
              else if (typeof(fun) === "string") this[fun](resolve, reject);
            }).then(data => {
              this.resetForm(formName, can);
              if (typeof(_.get(data, 'success', false)) === 'function') data.success();
            }, data => {
              this.resetForm(formName, can);
              if (data.next) data.next();
            });
          } else {
            new Promise((resolve, reject) => {
              if (typeof(fun) === "function") fun(resolve);
              else if (fun) this[fun](resolve, reject);
            }).then(() => {
              this.resetForm(formName);
            });
          }
        } else {
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName, parameter) {
      console.log(parameter)
      if (parameter) {
        if (typeof(this[parameter]) === 'function') {
           console.log(1)
          this.$refs[formName].resetFields();
          this[parameter](1);
        }
        if (typeof(parameter) === 'function') {
          this.$refs[formName].resetFields();
          parameter();
        }
        if (typeof(parameter) === 'string') {
          this.alert[parameter] = false;
          this.$nextTick(() => this.$refs[formName].resetFields());
        }
        if (Array.isArray(parameter)) {
          // parameter.forEach(el=> Object.defineProperty(this[formName],el,{writable:false}));
          let obj = {};
          parameter.forEach(el => obj[el] = this[formName][el]);
          this.$refs[formName].resetFields();
          // this.$nextTick(() =>parameter.forEach(el=> Object.defineProperty(this[formName],el,{writable:true})));
          this.$nextTick(() => parameter.forEach(el => this[formName][el] = obj[el]));
        }
      } else {
        this.$refs[formName].resetFields();
      }
    },

    //深拷贝对象
    copy(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    //非空判断
    isEmpty(value) {
      var type;
      if (value == null) { // 等同于 value === undefined || value === null
        return true;
      }
      type = Object.prototype.toString.call(value).slice(8, -1);
      switch (type) {
        case 'String':
          return !$.trim(value);
        case 'Array':
          return !value.length;
        case 'Object':
          return $.isEmptyObject(value); // 普通对象使用 for...in 判断，有 key 即为 false
        default:
          return false; // 其他对象均视作非空
      }
    },

    //千位分割
    toThousands(num) {
      num += '';
      num = num.split('.');
      if (num[1]) {
        return num[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + num[1]
      }
      return num[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    },
   
    // 将时间戳转换成 yyyy-mm-dd形式
    formatDate(time){
     return  new Date(time).toLocaleString(); 
    },
    // 处理时间,转换成时间戳,can 时间日期,type存在 则为结束时间
    formatTime(can, type) {
      if (type) {
        return new Date(new Date(can).toLocaleDateString()).getTime() + 86400000;
      } else {
        return new Date(new Date(can).toLocaleDateString()).getTime();
      }
    },
   
    // //表格就诊类别变色
    // row_style(row) {
    //   return { color: row.fontColor };
    // },
    // //显示组件
    // showComponents(name, item) {
    //   this.$refs[name].$emit('start', this.copy(item));
    // },
    // showControl(row, column, ) {
    //   if (column.label == '操作' || column.label == undefined) {
    //     this.displayControl = row;
    //   }
    // },
    //get请求
    get(url, canObject) {
      return axios(location[url], canObject);
    },
    //post请求
    post(url, canObject) {
      return axios.post(location[url], canObject);
    },
  }
})
