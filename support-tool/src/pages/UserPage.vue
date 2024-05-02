<template>
    <router-view></router-view>
    <h1> Users </h1>
    <h2> {{ userId }}</h2>
    <div>
    </div>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userId: '',
      isLoadingVms: false,
      vmsResults: []
    }
  },
  methods: {
    displayUserInfo(){
      this.isLoadingVms = true;
      console.log("hello", this.userId);
      // Get user info from VMS
      axios.get(`http://localhost:9992/api/v2/User/${this.userId}/Info`)
        .then(response => {
          if (response.status === 200) {
            this.error = null;
            return response.data;
          }
        }).then(data => {
          this.isLoadingVms = false;
          const results = [];
          console.log(data.data);
          results.push(data.data);
          this.vmsResults = results;
          console.log(this.vmsResults);
        })
        .catch(error => {
          console.error(error);
          this.isLoadingVms = false;
          this.error = `Could not get device data, ${error.response.status} status code ${error.response.data.Message || error.response.data.message}`;
        });
    }
  },
  watch: {
    '$route.params.id'(newId) {
      this.userId = newId;
      console.log("here")
      this.displayUserInfo();
    }
  },
  beforeMount() {
    this.userId = this.$route.params.id;
  },
  mounted(){
    this.displayUserInfo();
  }
};
</script>