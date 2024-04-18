<template>
    <router-view></router-view>
    <h1> Camera Direct </h1>
    <div>
      <input type="text" v-model="searchInput" placeholder="Enter ESN/ Mac Address">
      <button @click="loadDevice(searchInput)">Search</button>
    </div>
    <div>
    <cd-vms-result
      :isLoading="isLoadingVms"
      :error="error"
      :results="results"
    ></cd-vms-result>
    </div>

</template>

<script>
import CdVmsResult from '../components/CameraDirectVmsResult.vue';
import axios from 'axios';

export default {
  components: {
    CdVmsResult,
  },
  data() {
    return {
      results: [],
      isLoadingVms: false,
      searchInput: '',
      error: null,
      esnPattern : /^[0-9A-Fa-f]{8}$/,
      macAddressPattern : /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
    };
  },
  methods: {
    loadDevice(si) {
      var url = "";
      this.searchInput = si;
      this.isLoadingVms = true;
      if (this.isEsn(this.searchInput)){
        url = "esn=" + this.searchInput;
      }
      else if (this.isMac(this.searchInput)) {
        url = "mac_addr=" + encodeURIComponent(this.searchInput);
      }
      else{
        // error handling
        this.error = "Not a valid MAC or ESN value!";
        this.isLoadingVms = false;
        return;
      }
      axios.get(`http://localhost:9992/api/v2/CameraDirect/VmsRequest?active_brand=eagleeyenetworks.com&${url}`)
        .then(response => {
          if (response.status === 200) {
            this.error = null;
            return response.data;
          }
        }).then(data => {
          this.isLoadingVms = false;
          const results = [];
          results.push(data.data);
          this.results = results;
        })
        .catch(error => {
          console.error(error);
          this.isLoadingVms = false;
          this.error = `Could not get device data, ${error.response.status} status code ${error.response.data.Message || error.response.data.message}`;
        });

      axios.get(`http://localhost:9992/api/v2/CameraDirect/GlobalDispatchInfo?${url}`)
        .then(response => {
          if (response.status === 200) {
            this.error = null;
            return response.data;
          }
        }).then(data => {
          this.isLoadingVms = false;
          const results = [];
          results.push(data.data);
          this.results = results;
        })
        .catch(error => {
          console.error(error);
          this.isLoadingVms = false;
          this.error = `Could not get device data, ${error.response.status} status code ${error.response.data.Message || error.response.data.message}`;
        });

    },

    isEsn(identifier) {
      return this.esnPattern.test(identifier);
    },
    
    isMac(identifier) {
      return this.macAddressPattern.test(identifier);
    }
  }

};
</script>

  <style scoped>
  li {
    margin: 1rem 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 12px;
    padding: 1rem;
  }
  
  li h3 {
    margin: 0.5rem 0;
    font-size: 1.25rem;
  }
  
  li .team-members {
    margin: 0.5rem 0;
  }
  
  a {
    text-decoration: none;
    color: white;
    display: inline-block;
    padding: 0.5rem 1.5rem;
    background-color: #11005c;
  }
  
  a:hover,
  a:active {
    background-color: #220a8d;
  }
  </style>