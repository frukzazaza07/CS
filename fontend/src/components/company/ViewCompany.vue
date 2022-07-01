<template>
  <table-lite :dataColumns="colums" :searchRequest="myRequest" />
</template>

<script>
import TableLite from "@/components/datatable/TableLite.vue";

export default {
  name: "ViewCompany",
  data() {
    return {
      rows: [],
      colums: [
        {
          label: "ID",
          field: "id",
          width: "3%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Name",
          field: "name",
          width: "10%",
          sortable: true,
        },
        {
          label: "Email",
          field: "email",
          width: "15%",
          sortable: true,
        },
      ],
    };
  },
  setup() {
      const myRequest = async (keyword) => {
      const fakeData = [];
      for (let i = 0; i < 126; i++) {
        fakeData.push({
          id: i,
          index: i,
          name: "TEST" + i,
          email: "test" + i + "@example.com",
        });
      }
      return await new Promise((resolve, reject) => {
        try {
        //   table.isLoading = true;
          // Remove setTimeout() and change to your Axios request or AJAX request on here.
          setTimeout(() => {
            // table.isLoading = false;
            let newData = fakeData.filter(
              (x) =>
                x.email.toLowerCase().includes(keyword.toLowerCase()) ||
                x.name.toLowerCase().includes(keyword.toLowerCase())
            );
            resolve(newData);
          }, 1000);
        } catch (error) {
          console.log("Fetch error", error);
          reject();
        }
      });
    };
    return {
        myRequest
    };
  },
  components: {
    TableLite,
  },
};
</script>
