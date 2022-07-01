<template>
  <div>
    <table-lite
      :dataColumns="colums"
      :searchRequest="searchData"
      :rows="rows"
    />
    <!-- <bootstrap-vue-table /> -->
  </div>
</template>

<script>
import TableLite from "@/components/datatable/TableLite.vue";
import {
  handleDialogMessage,
  showDialogError,
} from "../../libaries/handleDialogMessage";
export default {
  name: "ViewCompany",
  components: {
    TableLite,
  },
  data() {
    return {
      loginLoading: false,
      disabled: false,
      rerender: 0,
      rows: [],
      colums: [
        {
          label: "Company code",
          field: "Company_code",
          // width: "3%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Company name",
          field: "Company_name",
          // width: "10%",
          sortable: true,
        },
        {
          label: "Company address",
          field: "Company_address",
          // width: "15%",
          sortable: true,
        },
        {
          label: "Company branch",
          field: "Company_branch",
          // width: "15%",
          sortable: true,
        },
        {
          label: "Company telephone",
          field: "Company_telephone",
          // width: "15%",
          sortable: true,
        },
        {
          label: "Company fax",
          field: "Company_fax",
          // width: "15%",
          sortable: true,
        },
        {
          label: "Company remark",
          field: "Company_remark",
          // width: "15%",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    async searchData(keyword) {
      return await new Promise((resolve, reject) => {
        try {
          //   table.isLoading = true;
          // Remove setTimeout() and change to your Axios request or AJAX request on here.
          setTimeout(() => {
            // table.isLoading = false;
            let newData = this.rows.filter(
              (x) =>
                x.Company_code.toLowerCase().includes(keyword.toLowerCase()) ||
                x.Company_name.toLowerCase().includes(keyword.toLowerCase()) ||
                x.Company_address.toLowerCase().includes(
                  keyword.toLowerCase()
                ) ||
                x.Company_branch.toLowerCase().includes(
                  keyword.toLowerCase()
                ) ||
                x.Company_remark.toLowerCase().includes(
                  keyword.toLowerCase()
                ) ||
                x.Company_fax.toLowerCase().includes(keyword.toLowerCase()) ||
                x.Company_telephone.toLowerCase().includes(
                  keyword.toLowerCase()
                )
            );
            resolve(newData);
          }, 100);
        } catch (error) {
          console.log("Fetch error", error);
          reject();
        }
      });
    },
    async fetchCompanyData() {
      let messageList = [];
      try {
        await this.$store.dispatch("company/retive");

        this.rows = this.$store.state.company.companyData;

        this.loginLoading = false;
        this.disabled = false;
        // if (addCompanyData.status === true) {
        //   await this.$store.dispatch("company/retive");
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
    },
  },

  created() {
    this.fetchCompanyData();
  },
};
</script>
