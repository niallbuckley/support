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
    <sub-account-result
      :isLoading="isLoadingSubAccount"
      :error="errorSubAccount"
      :results="subAccountResults"
    ></sub-account-result>
    <user-vms-result
      :isLoading="isLoadingUser"
      :error="errorUser"
      :results="userResults"
    ></user-vms-result>
    <device-result
      :isLoading="isLoadingDevice"
      :error="errorDevice"
      :results="deviceResults"
    ></device-result>
  </div>
</template>

<script>
import axios from 'axios';
import AccountVmsResult from '../components/account/AccountVmsResult.vue';
import UserVmsResult from '../components/account/UserVmsResult.vue';
import SubAccountResult from '../components/account/SubAccountResult.vue';
import DeviceResult from '../components/account/DeviceResult.vue';

export default {
  components: {
    AccountVmsResult,
    UserVmsResult,
    SubAccountResult,
    DeviceResult
  },
  data() {
    return {
      accountId: '',
      // account vms component
      isLoadingVms: false,
      error: false,
      vmsResults: [],
      // account end-users component
      isLoadingUser: false,
      errorUser: false,
      userResults: [],
      // sub-account component
      isLoadingSubAccount: false,
      errorSubAccount: false,
      subAccountResults: [],
      // device component
      isLoadingDevice: false,
      errorDevice: false,
      deviceResults: []
    }
  },
  methods: {
    getAccountInfo(){
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
    },
    getUserInfo(){
      // Get user info from VMS
      axios.get(`http://localhost:9992/api/v2/Account/${this.accountId}/Users`)
      .then(response => {
          if (response.status === 200) {
            this.errorUser = null;
            return response.data;
          }
        }).then(data => {
          this.isLoadingUser = false;
          const results = [];
          // This is a backend bug the Info endpoint will always return data even if the user id is not real
          if (data.data[0].account_id !== ''){
            for (var i=0; i < data.data.length; i++) {
              var user = data.data[i]
              results.push(user);
            }
            this.userResults = results;
          }
          else{
            this.error = `The user id ${this.accountId} does not exist in vms database`
          }
        })
        .catch(error => {
          console.error(error);
          this.isLoadingUser = false;
          this.errorUser = `Could not get account user data, ${error.response.status} status code ${error.response.data.Message || error.response.data.message}`;
        });
    },
    getSubAccountInfo(){
      // Get sub account info from VMS
      axios.get(`http://localhost:9992/api/v2/Account/${this.accountId}/SubAccounts`)
      .then(response => {
          if (response.status === 200) {
            this.errorSubAccount = null;
            return response.data;
          }
        }).then(data => {
          this.isLoadingSubAccount = false;
          const results = [];
          if (data.data.length >= 1){
            for (var i=0; i < data.data.length; i++) {
              var sub = data.data[i]
              results.push(sub);
            }
            this.subAccountResults = results;
          }
          else{
            // No sub-accounts
            this.errorSubAccount = ``
          }
        })
        .catch(error => {
          console.error(error);
          this.isLoadingSubAccount = false;
          this.errorSubAccount = `Error while processing sub account(s) for ${this.accountId}`;
        });
    },
    getDeviceInfo(){
      axios.get(`http://localhost:9992/api/v2/Account/${this.accountId}/Devices`)
      .then(response => {
          if (response.status === 200) {
            this.errorDevice = null;
            return response.data;
          }
        }).then(data => {
          this.isLoadingDevice = false;
          const results = [];
          if (data.data.length >= 1){
            for (var i=0; i < data.data.length; i++) {
              var device = data.data[i]
              // accounts are included in Device call - backend bug?
              if (device.type == "account"){
                continue
              }
              results.push(device);
            }
            this.deviceResults = results;
          }
          else{
            // No devices
            this.errorDevice= ``
          }
        })
        .catch(error => {
          console.error(error);
          this.isLoadingDevice = false;
          this.errorDevice = `Error while processing device(s) for ${this.accountId}`;
        });
    },
    displayAccountInfo(){
      this.isLoadingVms = true;
      this.isLoadingUser = true;
      this.isLoadingSubAccount = true;
      this.getAccountInfo();
      this.getUserInfo();
      this.getSubAccountInfo();
      this.getDeviceInfo();
    }
  },
  watch: {
    '$route.params.id'(newId) {
      this.accountId = newId;
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
