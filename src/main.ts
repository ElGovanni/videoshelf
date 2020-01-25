import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios, { AxiosStatic } from "axios";

Vue.prototype.$http = axios;
declare module "vue/types/vue" {
  interface Vue {
    $http: AxiosStatic;
  }
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
