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
    <cd-gdi-result
      :isLoading="isLoadingGdi"
      :error="errorGdi"
      :results="resultsGdi"
    ></cd-gdi-result>
    <cd-cam-instance-result
      :isLoading="isLoadingCamI"
      :error="errorCamI"
      :results="resultsCameraInstance"
    ></cd-cam-instance-result>
    </div>

</template>

<script>
import CdVmsResult from '../components/CameraDirectVmsResult.vue';
import CdGdiResult from '../components/CameraDirectGdiResult.vue';
import CdCamInstanceResult from '../components/CameraDirectInstanceResult.vue';
import axios from 'axios';

export default {
  components: {
    CdVmsResult,
    CdGdiResult,
    CdCamInstanceResult
  },
  data() {
    return {
      results: [],
      isLoadingVms: false,
      resultsGdi: [],
      isLoadingGdi: false,
      errorGdi: null,
      resultsCameraInstance: [],
      isLoadingCamI: false,
      errorCamI: null,
      searchInput: '',
      error: null,
      esnPattern : /^[0-9A-Fa-f]{8}$/,
      macAddressPattern : /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
      macAddress: ''
    };
  },
  methods: {
    camelCaseToReadable(camelCaseString) {
      return camelCaseString.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    },
    parseCameraInpect(camInfo){
      // using an array to preserve order.
      const filteredData = [];
      for (const key in camInfo.currentState) {
        if (camInfo.currentState[key] !== "" && camInfo.currentState[key] !== null && camInfo.currentState[key] !== undefined) {
          if (key === "cameraSessionInfo") {
            filteredData.push(["Session Id", camInfo.currentState[key].sessionId]);
            filteredData.push(["Service Id", camInfo.currentState[key].serviceId]);
            continue;
          }
          this.isLoadingCamI = false;
          filteredData.push([this.camelCaseToReadable(key), camInfo.currentState[key]]);
        }
      }
      // This condition is only met if the device has been added in the last 6 months 
      if (camInfo.lastAddAttemptInfo.deviceId !== 0) {
        for (const key in camInfo.lastAddAttemptInfo) {
          if (camInfo.lastAddAttemptInfo[key] !== "" && camInfo.lastAddAttemptInfo[key] !== null && camInfo.lastAddAttemptInfo[key] !== undefined) {
            filteredData.push([key, camInfo.lastAddAttemptInfo[key]]);
          }
        }
      }
      this.resultsCameraInstance = filteredData;
    },

    callCameraInstance(macAddress, hostName, port){
      axios.get(`http://localhost:9992/api/v2/CameraDirect/CameraInstance?address=${encodeURIComponent(macAddress)}&cluster_host=${hostName}&port=${port}`)
        .then(response => {
          if (response.status === 200) {
            this.errorCamI = null;
            return response.data;
          }
        }).then(data => {
          if (data.data.currentState.added === true || data.data.lastAddAttemptInfo.deviceId !== 0 ){
            console.log("ds", data.data);
            //display the data.
            this.parseCameraInpect(data.data);
          }
        })
        .catch(error => {
          this.isLoadingCamI = false;
          console.error(error);
          this.errorCamI = `Could not get camera instance data, ${error.response.status} status code ${error.response.data.Message || error.response.data.message}`;
      });
    },

    callGlobalDispatch(macAddr) {
      var url = "mac_addr=" + encodeURIComponent(macAddr);
        axios.get(`http://localhost:9992/api/v2/CameraDirect/GlobalDispatchInfo?${url}`)
          .then(response => {
            if (response.status === 200) {
              this.errorGdi = null;
              return response.data;
            }
          }).then(data => {
            this.isLoadingGdi = false;
            const resultsGdi = [];
            resultsGdi.push(data.data);
            this.resultsGdi = resultsGdi;
          })
          .catch(error => {
            console.error(error);
            this.isLoadingGdi = false;
            this.errorGdi = `Could not get device data, ${error.response.status} status code ${error.response.data.Message || error.response.data.message}`;
          });
    },
    loadDevice(si) {
      var url = "";
      this.searchInput = si;
      this.isLoadingVms = true;
      this.isLoadingGdi = true;
      this.isLoadingCamI = true;

      // Check format of search input, determine if it is an ESN or MAC addt
      if (this.isEsn(this.searchInput)){
        url = "esn=" + this.searchInput;
      }
      else if (this.isMac(this.searchInput)) {
        this.macAddress = this.searchInput;
        url = "mac_addr=" + encodeURIComponent(this.macAddress);
      }
      else{
        // error handling
        this.error = "Not a valid MAC or ESN value!";
        this.isLoadingVms = false;
        this.isLoadingGdi = false;
        this.isLoadingCamI = false;
        return;
      }
      // If MAC addr is already given we don't have to wait for VMS response
      if (this.macAddress) {
        this.callGlobalDispatch(this.macAddress)
      }

      // Make request to VMS Database
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
          if (!this.macAddress) {
            this.macAddress = data.data.mac_address;
            this.callGlobalDispatch(this.macAddress);
          }
          // TODO: else if macAddress exists (it was passed in) and macAddress does not equal this mac Address display warning.
        })
        .catch(error => {
          console.error(error);
          this.isLoadingVms = false;
          this.error = `Could not get device data, ${error.response.status} status code ${error.response.data.Message || error.response.data.message}`;
        });

      // Make request to Eureka Info
      axios.get(`http://localhost:9992/api/v2/CameraDirect/EurekaInfo`)
        .then(response => {
          if (response.status === 200) {
            return response.data;
          }
        }).then(data => {
          for (const cluster of data.data){
            this.callCameraInstance(this.macAddress, cluster.hostName, cluster.port);
          }
        })
        .catch(error => {
          console.error(error);
          this.isLoadingCamI = false;
          this.errorCamI = `Could not get eureka information, ${error.response.status} status code ${error.response.data.Message || error.response.data.message}`;
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
