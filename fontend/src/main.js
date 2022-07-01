import {
    createApp
} from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
window.$ = window.jQuery = require("jquery");

import {
    FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";
import {
    dom,
    library
} from '@fortawesome/fontawesome-svg-core';
import {
    fas
} from '@fortawesome/free-solid-svg-icons'
import {
    fab
} from '@fortawesome/free-brands-svg-icons';
import {
    far
} from '@fortawesome/free-regular-svg-icons';
import {
    faLock,
    faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebook,
    faGooglePlus
} from '@fortawesome/free-brands-svg-icons';


// router
import router from '@/router' // <---

// store
import store from "@/store";

//import adminlte scripts
import "../node_modules/admin-lte/dist/js/adminlte.min.js"
import "../node_modules/admin-lte/plugins/select2/js/select2.full.min.js"
import "../node_modules/admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js"
import "../node_modules/admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"
//import "../node_modules/admin-lte/plugins/summernote/summernote-bs4.min.js"
//import "../node_modules/admin-lte/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"
import "../node_modules/admin-lte/plugins/daterangepicker/daterangepicker.js"
//mport "../node_modules/admin-lte/plugins/moment/moment.min.js"
import "../node_modules/admin-lte/plugins/jquery-knob/jquery.knob.min.js"
//import "../node_modules/admin-lte/plugins/jqvmap/maps/jquery.vmap.usa.js"
//import "../node_modules/admin-lte/plugins/jqvmap/jquery.vmap.min.js"
import "../node_modules/admin-lte/plugins/sparklines/sparkline.js"
//import "../node_modules/admin-lte/plugins/chart.js/Chart.min.js"
import "../node_modules/admin-lte/plugins/jquery/jquery.min.js"
import "../node_modules/admin-lte/plugins/jquery-ui/jquery-ui.min.js"
import "../node_modules/admin-lte/plugins/inputmask/jquery.inputmask.min.js"
//import "../node_modules/admin-lte/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"
import "../node_modules/admin-lte/plugins/bootstrap-switch/js/bootstrap-switch.min.js"
import "../node_modules/admin-lte/plugins/bs-stepper/js/bs-stepper.min.js"
import "../node_modules/admin-lte/plugins/dropzone/min/dropzone.min.js"


//import adminlte styles
import '../node_modules/admin-lte/dist/css/adminlte.min.css'
import "../node_modules/admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css"
import "../node_modules/admin-lte/plugins/summernote/summernote-bs4.min.css"
import "../node_modules/admin-lte/plugins/daterangepicker/daterangepicker.css"
import "../node_modules/admin-lte/plugins/jqvmap/jqvmap.min.css"
import "../node_modules/admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css"
import "../node_modules/admin-lte/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css"
import "../node_modules/admin-lte/plugins/bootstrap4-duallistbox/bootstrap-duallistbox.min.css"
import "../node_modules/admin-lte/plugins/bs-stepper/css/bs-stepper.min.css"
import "../node_modules/admin-lte/plugins/dropzone/min/dropzone.min.css"

// google login
import gAuthPlugin from 'vue3-google-oauth2';
const gauthOption = {
  clientId: '366255957559-10oiqhc8t5cnpagu8v5kgsnte9sk415c.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'select_account'
  scope: 'email',
  prompt: 'consent',
  plugin_name: "google+ api",
}


library.add(fas, fab, far, faLock, faEnvelope, faFacebook, faGooglePlus);
dom.watch()



// createApp().component("font-awesome-icon", FontAwesomeIcon, router).mount('#app')

const myV3App = createApp(App)
myV3App.component("font-awesome-icon", FontAwesomeIcon)
myV3App.use(router)
myV3App.use(store)
myV3App.use(Vuex)
myV3App.use(gAuthPlugin, gauthOption)
myV3App.mount('#app')
