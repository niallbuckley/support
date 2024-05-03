<template>
    <router-view></router-view>
    <h1> Account </h1>
    <h2> {{ accountId }}</h2>
    <div>
    <account-vms-result
      :isLoading="isLoadingVms"
      :error="error"
      :results="vmsResults"
    ></account-vms-result>
    </div>

</template>

<script>
import axios from 'axios';
import AccountVmsResult from '../components/UserVmsResult.vue';

export default {
  components: {
    AccountVmsResult
  },
  data() {
    return {
      accountId: '',
      isLoadingVms: false,
      error: false,
      vmsResults: []
    }
  },
  methods: {
    displayAccountInfo(){
      this.isLoadingVms = true;
      console.log("hello", this.accountId);
      // Get user info from VMS
      axios.get(`http://localhost:9992/api/v2/Account/${this.accountId}/Info`)
        .then(response => {
          if (response.status === 200) {
            this.error = null;
            return response.data;
          }
        }).then(data => {
          this.isLoadingVms = false;
          // This is a backend bug the Info endpoint will always return data even if the user id is not real
          console.log("Response", data.data);
          if (data.data[0].account_id !== ''){
            const results = [];
            results.push(data.data[0]);
            this.vmsResults = results;
            console.log(this.vmsResults);
          }
          else{
            this.error = `The user id ${this.accountId} does not exist in vms database`
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
      this.accountId = newId;
      console.log("here");
      this.displayAccountInfo();
    }
  },
  beforeMount() {
    this.accountId = this.$route.params.id;
  },
  mounted(){
    this.displayAccountInfo();
  }
};
</script>
