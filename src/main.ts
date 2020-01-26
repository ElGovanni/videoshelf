import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { AxiosStatic } from "axios";
import { setup } from "axios-cache-adapter";
import localforage from "localforage";
// @ts-ignore
import memoryDriver from "localforage-memoryStorageDriver";

localforage.defineDriver(memoryDriver);

const localforageStore = localforage.createInstance({
  // List of drivers used
  driver: [
    localforage.INDEXEDDB,
    localforage.LOCALSTORAGE,
    memoryDriver._driver
  ],
  name: "axios-cache"
});

const api = setup({
  cache: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // set cache time to 7 days
    exclude: { query: false },
    store: localforageStore
  }
});
Vue.prototype.$http = api;

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
