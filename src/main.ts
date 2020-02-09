import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate, {
  inject: true,
  locale: "en"
});

new Vue({
  router,
  store,
  vuetify,
  beforeCreate() {
    this.$store.commit("init");
  },
  render: h => h(App)
}).$mount("#app");

store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});
