<template>
    <router-view></router-view>
    <h1> Users </h1>
    <h2> {{ userId }}</h2>
    <div>
    <user-vms-result
      :isLoading="isLoadingVms"
      :error="error"
      :results="vmsResults"
    ></user-vms-result>
    </div>

</template>

<script>
import axios from 'axios';
import UserVmsResult from '../components/UserVmsResult.vue';

export default {
  components: {
    UserVmsResult
  },
  data() {
    return {
      userId: '',
      isLoadingVms: false,
      error: false,
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
          // This is a backend bug the Info endpoint will always return data even if the user id is not real
          if (data.data[0].user_id !== ''){
            const results = [];
            console.log(data.data);
            results.push(data.data[0]);
            this.vmsResults = results;
            console.log(this.vmsResults);
          }
          else{
            this.error = `The user id ${this.userId} does not exist in vms database`
          }
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
      console.log("here");
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