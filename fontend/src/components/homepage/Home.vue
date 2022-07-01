<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>
<script>
// import UserService from "@/services/authen/user.service";
import ApiRequest from "@/services/ApiRequest";
const apiRequest = new ApiRequest();
export default {
  name: "Homepage",
  data() {
    return {
      content: "",
    };
  },
  methods: {
    async fetchContent() {
      try {
        const contentData = await apiRequest.fetchContent();
        console.log(contentData);
      } catch (error) {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    },
  },
  mounted() {
    this.fetchContent();
    // UserService.getUserBoard().then(
    //   (response) => {
    //     this.content = response.data;
    //   },
    //   (error) => {
    //     this.content =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //   }
    // );
  },
};
</script>
