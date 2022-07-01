<template>
  <div class="">
    <Form
      class="mt-4 row"
      @submit="handleAddCompany"
      :validation-schema="schema"
    >
      <div class="form-group col-12 col-md-4">
        <label for="companyCode">Company code</label>
        <Field
          name="companyCode"
          type="text"
          class="form-control"
          plceholder="companyCode"
          :class="
            validate.errorcompanyCode === true
              ? 'validate-textfield-danger'
              : ''
          "
          v-model="formAddCompany.companyCode"
        />
        <ErrorMessage
          name="companyCode"
          class="error-feedback validate-font-danger"
        />
      </div>
      <div class="form-group col-12 col-md-8">
        <label for="companyName">Company name</label>
        <Field
          name="companyName"
          type="text"
          class="form-control"
          plceholder="companyName"
          :class="
            validate.errorCompanyName === true
              ? 'validate-textfield-danger'
              : ''
          "
          v-model="formAddCompany.companyName"
        />
        <ErrorMessage
          name="companyName"
          class="error-feedback validate-font-danger"
        />
      </div>
      <div class="form-group col-12 col-md-4">
        <label for="companyBranch">Company branch</label>
        <Field
          name="companyBranch"
          type="text"
          class="form-control"
          plceholder="companyBranch"
          :class="
            validate.errorCompanyBranch === true
              ? 'validate-textfield-danger'
              : ''
          "
          v-model="formAddCompany.companyBranch"
        />
        <ErrorMessage
          name="companyBranch"
          class="error-feedback validate-font-danger"
        />
      </div>

      <div class="form-group col-12 col-md-4">
        <label for="companyTelephone">Company telephone</label>
        <Field
          name="companyTelephone"
          type="text"
          class="form-control"
          plceholder="companyTelephone"
          :class="
            validate.errorCompanyTelephone === true
              ? 'validate-textfield-danger'
              : ''
          "
          v-model="formAddCompany.companyTelephone"
        />
        <ErrorMessage
          name="companyTelephone"
          class="error-feedback validate-font-danger"
        />
      </div>
      <div class="form-group col-12 col-md-4">
        <label for="companyFax">Company fax</label>
        <Field
          name="companyFax"
          type="text"
          class="form-control"
          plceholder="companyFax"
          :class="
            validate.errorCompanyFax === true ? 'validate-textfield-danger' : ''
          "
          v-model="formAddCompany.companyFax"
        />
        <ErrorMessage
          name="companyFax"
          class="error-feedback validate-font-danger"
        />
      </div>

      <div class="form-group col-12 col-md-6">
        <label for="companyAddress">Company address</label>
        <Field
          name="companyAddress"
          as="textarea"
          class="form-control"
          plceholder="companyAddress"
          :class="
            validate.errorCompanyAddress === true
              ? 'validate-textfield-danger'
              : ''
          "
          v-model="formAddCompany.companyAddress"
        />
        <ErrorMessage
          name="companyAddress"
          class="error-feedback validate-font-danger"
        />
      </div>

      <div class="form-group col-12 col-md-6">
        <label for="companyRemark">Company remark</label>
        <Field
          name="companyRemark"
          as="textarea"
          class="form-control"
          plceholder="companyRemark"
          :class="
            validate.errorCompanyRemark === true
              ? 'validate-textfield-danger'
              : ''
          "
          v-model="formAddCompany.companyRemark"
        />
        <ErrorMessage
          name="companyRemark"
          class="error-feedback validate-font-danger"
        />
      </div>
      <div class="form-group col-12 col-lg-6">
        <label for="companyLogo">Company logo</label>
        <preview-image
          :handleFileChange="handleFileChange"
          :handleFileKey="fileKey.companyLogo"
        />
        <ErrorMessage
          name="companyLogo"
          class="error-feedback validate-font-danger"
        />
        <main-image />
      </div>
      <div class="form-group col-12 col-lg-6">
        <label for="companyMap">Company map</label>
        <preview-image
          :handleFileChange="handleFileChange"
          :handleFileKey="fileKey.companyMap"
        />
        <ErrorMessage
          name="companyMap"
          class="error-feedback validate-font-danger"
        />
      </div>

      <div class="form-group col-12 d-flex justify-content-center gap-7px mb-0">
        <button class="btn btn-primary pl-md-4 pr-md-4" :disabled="disabled">
          <span
            v-show="loginLoading"
            class="spinner-border spinner-border-sm"
          ></span>
          <span>Add company</span>
        </button>
      </div>
    </Form>
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
import PreviewImage from "@/components/previewImage/PreviewImage.vue";

export default {
  name: "ViewCompany",
  components: {
    Form,
    Field,
    ErrorMessage,
    PreviewImage,
  },
  data() {
    const schema = yup.object().shape({
      companyCode: yup
        .string()
        .required("Company code is required!")
        .max(255, "Company code is max 255."),
      companyName: yup
        .string()
        .required("Company name is required!")
        .max(255, "Company name is max 255."),
      companyAddress: yup
        .string()
        .required("Company address is required!")
        .max(255, "Company address is max 255."),
      companyBranch: yup
        .string()
        .required("Company branch is required!")
        .max(255, "Company branch is max 255."),
      companyTelephone: yup
        .string()
        .required("Company telephone is required!")
        .max(255, "Company telephone is max 255.")
        .matches("^[0-9]+$", "Company telephone is number only"),
      companyFax: yup
        .string()
        .required("Company fax is required!")
        .max(255, "Company fax is max 255.")
        .matches("^[0-9]+$", "Company fax is number only"),
      companyRemark: yup
        .string()
        .required("Company remark is required!")
        .max(500, "Company remark is max 500."),
      //   companyLogo: yup.string().required("companyCode is required!"),
      //   companyMap: yup.string().required("companyCode is required!"),
    });
    return {
      googleUser: "",
      loginLoading: false,
      loginGoogleLoading: false,
      // message: "",
      schema,
      disabled: false,
      fileKey: {
        companyLogo: "companyLogo",
        companyMap: "companyMap",
      },
      formAddCompany: {
        userId: this.$store.state.auth.user.id,
        companyCode: "",
        companyName: "",
        companyAddress: "",
        companyBranch: "",
        companyTelephone: "",
        companyFax: "",
        companyRemark: "",
        companyLogo: "",
        companyMap: "",
      },
      validate: {
        errorcompanyCode: false,
        errorCompanyName: false,
        errorCompanyAddress: false,
        errorCompanyBranch: false,
        errorCompanyTelephone: false,
        errorCompanyFax: false,
        errorCompanyRemark: false,
      },
      lib: "",
    };
  },
  mounted() {
      console.log(this.$store.state.auth.user)
    this.lib = new Lib();
  },
  methods: {
    async handleAddCompany() {
      this.loginLoading = true;
      this.disabled = true;
      const validateData = this.validateForm();
      let messageList = [];
      if (validateData.status === false) {
        this.loginLoading = false;
        this.disabled = false;
        messageList = handleDialogMessage(validateData.errorsResults);
        showDialogError(messageList);
        return;
      }
      // console.log(this.formAddCompany.rememberMe);
      try {
        
        this.formAddCompany.companyLogo = await this.lib.convertFileTobase64(this.formAddCompany.companyLogo[0]);
        this.formAddCompany.companyMap = await this.lib.convertFileTobase64(this.formAddCompany.companyMap[0]);
        let addCompanyData = await this.$store.dispatch(
          "company/add",
          this.formAddCompany
        );
        console.log(addCompanyData);
        this.loginLoading = false;
        this.disabled = false;
        // if (addCompanyData.status === true) {
        // }
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
          key: "companyCode",
          value: this.formAddCompany.companyCode,
          option: ["isEmpty", "isString", "isMaxValue:255"],
        },
        {
          key: "companyName",
          value: this.formAddCompany.companyName,
          option: ["isEmpty", "isString", "isMaxValue:255"],
        },
        {
          key: "companyAddress",
          value: this.formAddCompany.companyAddress,
          option: ["isEmpty", "isString", "isMaxValue:255"],
        },
        {
          key: "companyBranch",
          value: this.formAddCompany.companyBranch,
          option: ["isEmpty", "isString", "isMaxValue:255"],
        },
        {
          key: "companyTelephone",
          value: this.formAddCompany.companyTelephone,
          option: ["isEmpty", "isString", "isNumeric", "isMaxValue:255"],
        },
        {
          key: "companyFax",
          value: this.formAddCompany.companyFax,
          option: ["isEmpty", "isString", "isNumeric", "isMaxValue:255"],
        },
        {
          key: "companyRemark",
          value: this.formAddCompany.companyRemark,
          option: ["isEmpty", "isString", "isMaxValue:500"],
        },
        {
          key: "companyLogo",
          value: this.formAddCompany.companyLogo,
          option: ["validateFile:3000:jpeg,png,jpg"],
        },
        {
          key: "companyMap",
          value: this.formAddCompany.companyMap,
          option: ["validateFile:3000:jpeg,png,jpg"],
        },
      ];
      const validateResults = this.lib.validateAllData(data);
      return validateResults;
    },
    handleFileChange(file, key) {
      this.formAddCompany[key] = file;
    },
    
  },
};
</script>
