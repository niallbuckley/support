<template>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="!isLoading && error">{{ error }}</p>
  <div v-else-if="results.length > 0">
  <table v-for="result in results" :key="result.clusterId">
  <th colspan="2"> Global Dispatch Information </th>
  <tr>
    <td><strong>Product</strong></td>
    <td>{{ result.product }}</td>
  </tr>
  <tr>
    <td><strong>Environment</strong></td>
    <td>{{ result.environment }}</td>
  </tr>
  <tr>
    <td><strong>Cluster Id</strong></td>
    <td>{{ getCluster(result.clusterId) }}</td>
  </tr>
  </table> 
  </div>
</template>

<script>
export default {
  props: ['isLoading', 'error', 'results'],
  data() {
    return {
      clusterMap: {
        "0": "aus1p1-c000",
        "1": "aus1p1-c001",
        "5": "aus1p2",
        "12": "aus1p3",
        "14": "aus1p4",
        "15": "aus1p5",
        "16": "aus1p7",
        "17": "aus1p8",
        "18": "aus1p9",
        "20": "aus1p10",
        "21": "aus1p11",
        "23": "aus1p12",
        "24": "aus1p13",
        "26": "aus1p14",
        "13": "fra1p1",
        "22": "lon1p1",
        "25": "yyz1p1",
        "2": "test",
        "55": "jtest",
        "56": "stage"
      }
    };
  },
  
  methods: {
    getCluster(clusterId){
      return this.clusterMap[clusterId];
    }
  }
}
</script>

<style scoped>
table {
  width: 100%; /* Make the table fill the webpage width */
  border-collapse: collapse;
  margin-top: 20px;
}

/* Apply styles to table body cells (td) */
td {
  border: 1px solid #ddd; 
}

/* this needed to be added so the tds would align with midpoint of page (like headers)*/
td:first-child{
  width: 50%;
}

th {
  background-color: #f2f2f2; 
  border: 1px solid #ddd; 
  padding: 8px;
}

/* Apply alternate background color to even rows */
tr:nth-child(even) {
  background-color: #f9f9f9; /* Lighter gray background for even rows */
}
th, td {
  text-align: center;
  vertical-align: middle;
} 

</style>

