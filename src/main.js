// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from './libs/commonAxio.js'
import sysData from './libs/commonData.js'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

/** Event hub */
let eventBus = new Vue()

/** Http get / post with loading */
Vue.prototype.$http = http
Vue.prototype.$httpget = (url, data, callback) => {
  http.get(url, data, function (res) {
    eventBus.$emit('loading', false)
    callback(res)
  })
  eventBus.$emit('loading', true)
}
Vue.prototype.$httppost = (url, data, callback) => {
  http.post(url, data, function (res) {
    eventBus.$emit('loading', false)
    callback(res)
  })
  eventBus.$emit('loading', true)
}
Vue.prototype.$sys = sysData

Vue.use(Mint)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
    eventBus: eventBus
  },
  components: { App },
  template: '<App/>'
})
