<template>
    <router-view></router-view>
    <h1> Camera Direct </h1>
    <div>
      <button @click="loadExperiences">Load Submitted Experiences</button>
    </div>
    <p v-if="isLoading">Loading...</p>
    <p v-else-if="!isLoading && error">{{ error }}</p>
    <p v-else-if = "!isLoading">{{ error }}</p>
    <!-- <p
      v-else-if="!isLoading && (!results || results.length === 0)"
    >No stored experiences found. Start adding some survey results first.</p> -->
    <ul v-else>
      <survey-result
        v-for="result in results"
        :key="result.id"
        :name="result.name"
        :rating="result.rating"
      ></survey-result>
    </ul>
</template>

<script>
export default {
  components: {
    //SurveyResult,
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
      this.error = "OK this is awesome";
      fetch('url', {headers:{"cookie":"auth_key=null"}})
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.isLoading = false;
          const results = [];
          for (const id in data) {
            console.log("id: " + id);
            results.push({id});
            // results.push({
            //   id: id,
            //   name: data[id].name,
            //   rating: data[id].rating,
            // });
          }
          this.results = results;
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.error = 'Failed to fetch data - please try again later.';
          console.log("HEREEE")
        });
    },
  }
  // mounted() {
  //   this.loadExperiences();
  // },
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