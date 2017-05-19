// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vueTap from 'v-tap'
import VueCookie from 'vue-cookie'

Vue.config.productionTip = false
Vue.prototype.browVersions=function(){
   var u = navigator.userAgent, app = navigator.appVersion;
   return {
        trident: u.indexOf('Trident') > -1, //IE内核  
        presto: u.indexOf('Presto') > -1, //opera内核  
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
        mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端  
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器  
        iPad: u.indexOf('iPad') > -1, //是否iPad  
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部  
        weixin:u.indexOf('MicroMessenger') > -1,//weixin
        weibo:u.indexOf('Weibo') > -1
    };  
}(); 
  
Vue.prototype.deviceN = function(){
	if(typeof deviceName == 'undefined' || typeof deviceName !== 'function'){
		return false;
	}else if(typeof deviceName == 'function'){
		return deviceName();
	}
}
Vue.use(vueTap);
Vue.use(VueCookie);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
