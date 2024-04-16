<template>
    <router-view></router-view>
    <h1> Camera Direct </h1>
    <div>
      <button @click="loadExperiences">Load Submitted Experiences</button>
    </div>
    <p v-if="isLoading">Loading...</p>
    <p v-else-if="!isLoading && error">{{ error }}</p>
    <!-- <p v-else-if = "!isLoading">{{ error }}</p>
    <p
      v-else-if="!isLoading && (!results || results.length === 0)"
    >No stored experiences found. Start adding some survey results first.</p> -->
    <ul v-else>
      <camera-direct-result
        v-for="result in results"
        :key="result.device_id"
        :device="result.device_id"
        :name="result.name"
      ></camera-direct-result>
    </ul>
</template>

<script>
import CameraDirectResult from './../components/CameraDirectResult.vue';

export default {
  components: {
    CameraDirectResult,
  },
  data() {
    return {
      results: [],
      isLoading: false,
      error: null,
    };
  },
  methods: {
    loadExperiences() {
      this.isLoading = true;
      //this.error = "OK this is awesome";
      // This can be changed to /api/v2/CameraDirect/VmsRequest?active_brand=eagleeyenetworks.com&esn=100c5908
      fetch('http://localhost:9992/api/v2/CameraDirect/VmsRequest?active_brand=eagleeyenetworks.com&esn=100c5908', {method:'GET'})
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.isLoading = false;
          const results = [];
          console.log(data.data)
          results.push(data.data)
          console.log(results);
          this.results = results;
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.error = 'Failed to fetch data - please try again later.';
        });
    },
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