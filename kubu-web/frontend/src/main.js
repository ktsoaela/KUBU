import Vue from 'vue'
import App from './App'
import router from './router'

// The one stylesheet: the KUBU framework build. No second copy lives in this app.
import '../../../kubu-framework/dist/kubu.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
