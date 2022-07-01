<template>
  <div
    class="row width-100vw height-100vh d-md-flex justify-content-center align-items-center pl-1 pr-1 pl-md-3 pr-md-3"
  >
    <div class="col-md-6">
      <div class="card card-container">
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
          <div class="login-header m-md-auto">Register</div>
        </div>
        <div class="p-3 border-1px-d4d4d4">
          <Form class="mt-4" @submit="handleLogin" :validation-schema="schema">
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
                v-model="formRegister.username"
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
                v-model="formRegister.password"
              />
              <ErrorMessage
                name="password"
                class="error-feedback validate-font-danger"
              />
            </div>
            <div class="form-group d-flex justify-content-center gap-7px mb-0">
              <!-- <button
                type="button"
                class="btn btn-danger pl-md-4 pr-md-4"
                :disabled="disabled"
              >
                <span
                  v-show="loginGoogleLoading"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span>Google</span>
              </button> -->
              <button
                class="btn btn-secondary pl-md-4 pr-md-4"
                :disabled="disabled"
              >
                <span
                  v-show="loginLoading"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span>Register</span>
              </button>
            </div>
          </Form>
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
  showDialogSuccess,
} from "@/libaries/handleDialogMessage";
export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      loginLoading: false,
      loginGoogleLoading: false,
      // message: "",
      schema,
      disabled: false,
      formRegister: {
        username: "",
        password: "",
        addressDetail: "",
        addressNo: "",
        district: "",
        firstname: "",
        idCard: "",
        lastname: "",
        postCode: "",
        province: "",
        roles: "",
        subDistrict: "",
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
    handleLogin(user) {
      this.loginLoading = true;
      this.disabled = true;
      const validateData = this.validateForm();
      let messageList = [];
      if (validateData.status === false) {
        messageList = handleDialogMessage(validateData.errorsResults);
        showDialogError(messageList);
        return;
      }

      this.$store.dispatch("auth/register", user).then(
        (res) => {
          // this.$router.push("/profile");
          this.loginLoading = false;
          this.disabled = false;
          messageList.push(
            (res.response &&
              res.response.data &&
              res.response.data.message) ||
              res.message ||
              res.toString()
          );

          messageList = handleDialogMessage(messageList, "alert-success");
          showDialogSuccess(messageList);
        },
        (error) => {
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
      );
    },
    validateForm() {
      const data = [
        {
          key: "username",
          value: this.formRegister.username,
          option: ["isEmpty"],
        },
        {
          key: "password",
          value: this.formRegister.password,
          option: ["isEmpty"],
        },
      ];
      const validateResults = this.lib.validateAllData(data);
      return validateResults;
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
