// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import animated from 'animate.css'
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style
import 'swiper/css/swiper.css'
import 'lib-flexible'

Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper)
Vue.use(dataV)
Vue.use(elementUI);
Vue.use(animated);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

//监听浏览器变化
window.onresize = function() {
	setAppScale();
};
 
function setAppScale() {
  
   var ratioY = $(window).height()/$('#app').height();
   
    var ratioX = $(window).width()/$('#app').children().width();
    // console.log($(window).width(),$('#app').children().width(),31)
		$("body").css({
			transform: "scale("+ratioX+","+ratioY+")",
			transformOrigin: "left top",
			overflow:"hidden"
		});
 }
 
 
$().ready(function(){
  //初始化时调整大小
  setAppScale();
});
