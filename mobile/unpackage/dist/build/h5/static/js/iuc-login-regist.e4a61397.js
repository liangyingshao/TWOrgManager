(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["iuc-login-regist"],{"67af":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={data:function(){return{registModel:{}}},methods:{regist:function(t){this.registModel=t.detail.value,this.registModel.password===this.registModel.confirmPwd?uni.request({url:"",method:"POST",success:function(t){},fail:function(t){}}):uni.showToast({title:"两次输入的密码不一致",icon:"none"})}}};i.default=n},"6a5e":function(t,i,e){"use strict";var n,s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",[e("cu-custom",{attrs:{bgColor:"bg-gradual-blue"}},[e("template",{attrs:{slot:"content"},slot:"content"},[t._v("用户注册")])],2),e("v-uni-view",{staticClass:"margin-lr margin-tb"},[e("v-uni-form",{on:{submit:function(i){arguments[0]=i=t.$handleEvent(i),t.regist.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"cu-form-group"},[e("v-uni-view",{staticClass:"title"},[t._v("账户名")]),e("v-uni-input",{attrs:{placeholder:"请输入您的账户名",name:"userName"}})],1),e("v-uni-view",{staticClass:"cu-form-group"},[e("v-uni-view",{staticClass:"title"},[t._v("密码")]),e("v-uni-input",{attrs:{placeholder:"请输入您的密码",name:"password",password:!0}})],1),e("v-uni-view",{staticClass:"cu-form-group"},[e("v-uni-view",{staticClass:"title"},[t._v("确认密码")]),e("v-uni-input",{attrs:{placeholder:"再输一次相同的密码",name:"confirmPwd",password:!0}})],1),e("v-uni-view",{staticClass:"cu-form-group"},[e("v-uni-view",{staticClass:"title"},[t._v("电话")]),e("v-uni-input",{attrs:{placeholder:"您的电话号码",name:"telephone"}})],1),e("v-uni-view",{staticClass:"cu-form-group"},[e("v-uni-view",{staticClass:"title"},[t._v("邮箱")]),e("v-uni-input",{attrs:{placeholder:"您的电子邮箱",name:"email"}})],1),e("v-uni-view",{staticClass:"flex flex-direction margin-tb"},[e("v-uni-button",{staticClass:"cu-btn bg-blue lg",attrs:{"form-type":"submit"}},[t._v("注册")])],1)],1)],1)],1)},u=[];e.d(i,"b",function(){return s}),e.d(i,"c",function(){return u}),e.d(i,"a",function(){return n})},"7c68":function(t,i,e){"use strict";e.r(i);var n=e("6a5e"),s=e("8f83");for(var u in s)"default"!==u&&function(t){e.d(i,t,function(){return s[t]})}(u);var a,r=e("f0c5"),o=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,"0c28ebe2",null,!1,n["a"],a);i["default"]=o.exports},"8f83":function(t,i,e){"use strict";e.r(i);var n=e("67af"),s=e.n(n);for(var u in n)"default"!==u&&function(t){e.d(i,t,function(){return n[t]})}(u);i["default"]=s.a}}]);