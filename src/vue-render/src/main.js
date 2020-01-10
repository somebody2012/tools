// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./styles/global-style.css"
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
import "./styles/element-variables.scss"
Vue.use(Element, { size: 'small', zIndex: 3000 });
Vue.config.productionTip = false
Vue.mixin({
  mounted(){
    (window.comps || (window.comps = {}))[this.$options.name || "anonymous"] = this;
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
