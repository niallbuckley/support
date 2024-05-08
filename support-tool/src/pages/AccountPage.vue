<template>
  <router-view></router-view>
  <h1> Account </h1>
  <h2> {{ accountId }}</h2>
  <div>
    <account-vms-result
      :isLoading="isLoadingAccount"
      :error="errorAccount"
      :results="accountResults"
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
      // account information component
      isLoadingAccount: false,
      errorAccount: false,
      accountResults: [],
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
      // Get account info from vms database
      (async () => {
        try {
          const response = await axios.get(`http://localhost:9992/api/v2/Account/${this.accountId}/Info`);

          this.isLoadingAccount = false;
          if (response.status === 200){
            this.errorAccount = null;
            const data = response.data;

            const results = [];
            // This is a backend bug the Info endpoint will always return data even if the user id is not real
            if (data.data[0].account_id !== ''){
              results.push(data.data[0]);
              this.accountResults = results;
            }
            else{
              this.errorAccount = `No information for account: ${this.accountId} exist in vms database`
            }
          }
        } catch (error) {
          // Handle error
          console.error(error);
          this.isLoadingAccount = false;
          this.errorAccount = `Error while processing account information for ${this.accountId}, ${error.response.data.Message || error.response.data.message}`;
        }
      })();
    },
    getUserInfo(){
      // Get user info from VMS
      (async () => {
        try {
          const response = await axios.get(`http://localhost:9992/api/v2/Account/${this.accountId}/Users`);

          this.isLoadingUser = false;
          if (response.status === 200){
            this.errorUser = null;
            const data = response.data;

            const results = [];
            // This is a backend bug the Info endpoint will always return data even if the user id does not exist
            if (data.data.length > 0){
              for (var i=0; i < data.data.length; i++) {
                var user = data.data[i]
                results.push(user);
              }
              this.userResults = results;
            }
            else{
              this.error = `No users for account: ${this.accountId} exist in vms database`
            }
          }
        } catch (error) {
          // Handle error
          console.error(error);
          this.isLoadingUser = false;
          this.errorUser = `Error while processing sub account(s) for ${this.accountId}`;
        }
      })();
    },
    getSubAccountInfo(){
      // Get sub account info from VMS
      (async () => {
        try {
          const response = await axios.get(`http://localhost:9992/api/v2/Account/${this.accountId}/SubAccounts`);

          this.isLoadingSubAccount = false;
          if (response.status === 200){
            this.errorSubAccount = null;
            const data = response.data;
            
            // parse the information 
            const results = [];
            if (data.data.length > 0){
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
          }
        } catch (error) {
          // Handle error
          console.error(error);
          this.isLoadingSubAccount = false;
          this.errorSubAccount = `Error while processing sub account(s) for ${this.accountId}`;
        }
      })();
    },
    getDeviceInfo(){
      // Get accout device information. This will only return data when end-user account is given.
      (async () => {
        try {
          const response = await axios.get(`http://localhost:9992/api/v2/Account/${this.accountId}/Devices`);

          this.isLoadingDevice = false;
          if (response.status === 200){
            this.errorDevice = null;
            const data = response.data;
            
            // parse the information 
            if (data.data.length > 0){
              const results = [];
              for (var i=0; i < data.data.length; i++) {
                var device = data.data[i]
                if (device.type == "account"){
                  continue
                }
                results.push(device);
              }
              this.deviceResults = results;
            }
            else{
              // No devices
              this.errorDevice = ``
            }
          }
        } catch (error) {
          // Handle error
          console.error(error);
          this.isLoadingDevice = false;
          this.errorDevice = `Error while processing device(s) for ${this.accountId}`;
        }
      })();
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
