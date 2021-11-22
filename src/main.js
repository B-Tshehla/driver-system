import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueQrcodeReader from "vue-qrcode-reader";
import { initializeApp } from "firebase/app";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhy6iVtdOuA91oPrFk6zr4dG5r346PCy0",
    authDomain: "student-transport-c3da9.firebaseapp.com",
    projectId: "student-transport-c3da9",
    storageBucket: "student-transport-c3da9.appspot.com",
    messagingSenderId: "77797843144",
    appId: "1:77797843144:web:0e69fcf8971af79e3185fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueQrcodeReader);
Vue.config.productionTip = false

new Vue({
    app,
    router,
    render: h => h(App),
}).$mount('#app')