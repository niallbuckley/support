<template>
    <router-view></router-view>
    <h1> Camera Direct </h1>
    <div>
      <input type="text" v-model="searchInput" placeholder="Enter ESN/ Mac Address">
      <button @click="loadDevice(searchInput)">Search</button>
    </div>
    <p v-if="isLoading">Loading...</p>
    <p v-else-if="!isLoading && error">{{ error }}</p>
    <div v-else-if="results.length > 0">
        <camera-direct-result
          v-for="result in results"
          :key="result.device_id"
          :device="result.device_id"
          :mac_address="result.mac_address"
          :name="result.name"
          :type="result.type"
          :account="result.account"
          :cluster="result.cluster"
        ></camera-direct-result>
    </div>
</template>

<script>
import CameraDirectResult from './../components/CameraDirectResult.vue';
import axios from 'axios';

export default {
  components: {
    CameraDirectResult,
  },
  data() {
    return {
      results: [],
      isLoading: false,
      error: null,
      esnPattern : /^[0-9A-Fa-f]{8}$/,
      macAddressPattern : /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
    };
  },
  methods: {
    loadDevice(si) {
      var url = "";
      this.isLoading = true;
      if (this.isEsn(si)){
        url = "esn=" + si;
      }
      else if (this.isMac(si)) {
        url = "mac_addr=" + encodeURIComponent(si);
      }
      else{
        // error handling
        this.error = "Not a valid MAC or ESN value!";
        this.isLoading = false;
        return;
      }
      axios.get(`http://localhost:9992/api/v2/CameraDirect/VmsRequest?active_brand=eagleeyenetworks.com&${url}`)
        .then(response => {
          if (response.status === 200) {
            this.error = null;
            return response.data;
          }
        }).then(data => {
          this.isLoading = false;
          const results = [];
          console.log(data.data);
          results.push(data.data);
          console.log(results);
          this.results = results;
        })
        .catch(error => {
          console.error(error);
          this.isLoading = false;
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