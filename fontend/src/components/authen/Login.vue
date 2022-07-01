<template>
  <div
    class="login-main row width-100vw height-100vh d-md-flex justify-content-center align-items-center"
  >
    <div
      class="login-container d-md-flex align-items-center pl-1 pr-1 pl-md-3 pr-md-3 position-relative"
    >
      <div class="login-main-header">
        <h5 class="mb-0">Customer Request Management System</h5>
      </div>
      <div class="col-md-6">
        <div class="card card-container" style="box-shadow: none">
          <img
            id="profile-img"
            src="../../assets/login.png"
            class="profile-img-card"
          />
        </div>
      </div>
      <div class="col-md-6 pb-md-5 pt-3 pt-md-5 pl-md-3 pr-md-3">
        <div class="position-relative">
          <div class="position-absolute top--1rem pl-3 pr-3 width-100-percent">
            <div class="login-header m-md-auto">Login</div>
          </div>
          <div class="p-3 border-1px-d4d4d4">
            <Form
              class="mt-4"
              @submit="handleLogin"
              :validation-schema="schema"
            >
              <!-- <h1>Is Initialized: {{ Vue3GoogleOauth.isInit }}</h1>
            <h1>Is Authorized: {{ Vue3GoogleOauth.isAuthorized }}</h1> -->
              <h2 v-if="googleUser">Logged in googleUser: {{ googleUser }}</h2>
              <div class="form-group">
                <label for="username">Username</label>
                <Field
                  name="username"
                  type="text"
                  class="form-control"
                  plceholder="Username"
                  :class="
                    validate.errorUsername === true
                      ? 'validate-textfield-danger'
                      : ''
                  "
                  v-model="formLogin.username"
                />
                <ErrorMessage
                  name="username"
                  class="error-feedback validate-font-danger"
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  class="form-control"
                  plceholder="password"
                  :class="
                    validate.errorPassword === true
                      ? 'validate-textfield-danger'
                      : ''
                  "
                  v-model="formLogin.password"
                />
                <ErrorMessage
                  name="password"
                  class="error-feedback validate-font-danger"
                />
              </div>
              <div class="d-flex justify-content-between">
                <div class="form-group">
                  <Field
                    name="rememberMe"
                    v-model="formLogin.rememberMe"
                    type="checkbox"
                    value="1"
                  />
                  <span> Remember me</span>
                </div>
                <div class="form-group">
                  <a class="" data-widget="" href="#" role="button">
                    Forgot password
                  </a>
                </div>
              </div>

              <div
                class="form-group d-flex justify-content-center gap-7px mb-0"
              >
                <button
                  type="button"
                  class="btn btn-danger pl-md-4 pr-md-4"
                  :disabled="disabled"
                  @click="handleGoogleSignIn"
                >
                  <span
                    v-show="loginGoogleLoading"
                    class="spinner-border spinner-border-sm ml-2"
                  ></span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    aria-hidden="true"
                    class="mr-1"
                  >
                    <title>Google</title>
                    <g fill="none" fill-rule="evenodd">
                      <path
                        fill="#4285F4"
                        d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"
                      ></path>
                      <path
                        fill="#EA4335"
                        d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"
                      ></path>
                    </g>
                  </svg>
                  <span>Google</span>
                </button>
                <button
                  class="btn btn-secondary pl-md-4 pr-md-4"
                  :disabled="disabled"
                >
                  <span
                    v-show="loginLoading"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  <span>Login</span>
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Lib from "@/libaries/Lib";
import {
  handleDialogMessage,
  showDialogError,
} from "../../libaries/handleDialogMessage";
import { inject } from "vue";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");
    return {
      Vue3GoogleOauth,
    };
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
      rememberMe: yup.string(),
    });
    return {
      googleUser: "",
      loginLoading: false,
      loginGoogleLoading: false,
      // message: "",
      schema,
      disabled: false,
      formLogin: {
        username: "",
        password: "",
        rememberMe: "0",
      },
      validate: {
        errorUsername: false,
        errorPassword: false,
      },
      lib: "",
    };
  },
  mounted() {
    this.lib = new Lib();
  },
  methods: {
    async handleLogin(user) {
      user.rememberMe = user.rememberMe === "1" ? true : false;
      this.loginLoading = true;
      this.disabled = true;
      const validateData = this.validateForm();
      let messageList = [];
      if (validateData.status === false) {
        messageList = handleDialogMessage(validateData.errorsResults);
        showDialogError(messageList);
        return;
      }
      // console.log(this.formLogin.rememberMe);
      try {
        this.loginLoading = false;
        this.disabled = false;
        let loginData = await this.$store.dispatch("auth/login", user);

        if (loginData.status === true) {
          setTimeout(() => {
            // this.$router.push("/home");
            window.location.reload();
          }, 1000);
        }
      } catch (error) {
        console.log(error);
        this.loginLoading = false;
        this.disabled = false;
        messageList.push(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        );

        messageList = handleDialogMessage(messageList);
        showDialogError(messageList);
      }
      // );
    },
    validateForm() {
      const data = [
        {
          key: "username",
          value: this.formLogin.username,
          option: ["isEmpty"],
        },
        {
          key: "password",
          value: this.formLogin.password,
          option: ["isEmpty"],
        },
      ];
      const validateResults = this.lib.validateAllData(data);
      return validateResults;
    },
    async handleGoogleSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        // console.log(this.$gAuth.signIn);
        if (!googleUser) {
          return null;
        }

        const googleToken = googleUser.getAuthResponse().id_token;
        const googleLogin = googleUser.getBasicProfile();
        const googleUserData = {
          googleUserToken: googleToken,
          googleId: googleLogin.gY, // google id
          email: googleLogin.gw, // google email
          firstname: googleLogin.xZ, // google first name
          lastname: googleLogin.LX, // google last name
          roles: "user",
          rememberMe: this.formLogin.rememberMe === "1" ? true : false,
        };

        let loginData = await this.$store.dispatch(
          "auth/googleLogin",
          googleUserData
        );

        if (loginData.status === true) {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    
  },
};
</script>
<style scoped>
@import "../../styles/authen/main.css";
@import "../../styles/sweetalert2/main.css";
@import "../../styles/error/main.css";
/* ... */
</style>
