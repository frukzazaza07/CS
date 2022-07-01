<template>
  <div class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper height-100vh width-100vw" v-if="isPage404 === true">
      <router-view />
    </div>

    <div class="wrapper" v-else-if="authen.isLogin === true">
      <Preloader></Preloader>

      <Navbar :setLoggedIn="setLogoutHandler" />

      <div class="row">
        <div class="col-md-3 col-lg-3 col-xl-2 pr-md-0 container-sidebar">
          <Sidebar></Sidebar>
          <ControlSidebar></ControlSidebar>
        </div>
        <div class="col-md-9 col-lg-9 col-xl-10 pl-md-0">
          <div class="content-wrapper main-content m-0 p-0">
            <!-- <ContentHeader></ContentHeader> -->
            <section class="content mt-2 section-content-container">
              <div class="container-fluid">
                <router-view />
              </div>
            </section>
          </div>
          <Footer></Footer>
        </div>
      </div>
    </div>

    <div class="wrapper height-100vh width-100vw" v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "../node_modules/admin-lte/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css";
import "../node_modules/admin-lte/plugins/select2/css/select2.min.css";
// config

import Preloader from "@/components/dashboard/Preloader.vue";
// import ContentHeader from "@/components/dashboard/ContentHeader.vue";
// import ExampleForm from "@/components/ExampleForm.vue"
import Navbar from "@/components/dashboard/Navbar.vue";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import Footer from "@/components/dashboard/Footer.vue";
import ControlSidebar from "@/components/dashboard/ControlSidebar.vue";
// import { check404 } from "./store/check404.module.js";
// import {authCookie} from '@/services/authen/authCookie';
import { routes } from "./router/";

export default {
  name: "App",
  components: {
    Preloader,
    // ContentHeader,
    // ExampleForm,
    Navbar,
    Sidebar,
    Footer,
    ControlSidebar,
  },
  data() {
    return {
      authen: {
        isLogin: false,
      },
      isPage404: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;

    },
  },
  created() {
    this.authen.isLogin = this.loggedIn;
    // console.log(this.authen.isLogin);
  },
  methods: {
    initializeSelect2() {
      //Initialize Select2 Elements
      $(".select2").select2();

      //Initialize Select2 Elements
      $(".select2bs4").select2({
        theme: "bootstrap4",
      });
    },

    checkPage404() {
      const pathUrl = window.location.pathname;
      let check = 0;

      for (let i = 0; i < routes.length; i++) {
        if (pathUrl === routes[i].path) {
          check++;
        }
        if (routes[i].children !== undefined) {
          for (let x = 0; x < routes[i].children.length; x++) {
            if (routes[i].path + "/" + routes[i].children[x].path === pathUrl) {
              check++;
            }
          }
        }
      }
      if (check === 0) {
        this.isPage404 = true;
      } else {
        this.isPage404 = false;
      }
    },

    setLogoutHandler() {
      // this.authen.isLogin = false;
      this.$store.dispatch("auth/logout");
      // this.$router.push("/auth/login");
      window.location.reload();
    },
  },
  mounted() {
    this.initializeSelect2();
    this.checkPage404();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback");
@import "./styles/main.css";
@import "./styles/bootstrap4/main.css";
@import "./styles/navbar/main.css";
@import "./styles/sidebar/main.css";
@import "./styles/content/main.css";
@import "./styles/content/main.css";
@import "./styles/footer/main.css";
</style>
