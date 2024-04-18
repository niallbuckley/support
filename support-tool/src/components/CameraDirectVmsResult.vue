<template>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="!isLoading && error">{{ error }}</p>
  <div v-else-if="results.length > 0">
  <table v-for="result in results" :key="result.device_id">
  <th colspan="2"> VMS Database </th>
  <tr>
    <td><strong>Device</strong></td>
    <td>{{ result.device_id }}</td>
  </tr>
  <tr>
    <td><strong>Name</strong></td>
    <td>{{ result.name }}</td>
  </tr>
  <tr>
    <td><strong>MAC Address</strong></td>
    <td>{{ result.mac_address }}</td>
  </tr>
  <tr>
    <td><strong>Type</strong></td>
    <td>{{ result.type }}</td>
  </tr>
  <tr>
    <td><strong>Cluster</strong></td>
    <td>{{ result.cluster }}</td>
  </tr>
  <tr>
    <td><strong>Account</strong></td>
    <td>{{ result.account }}</td>
  </tr>
  </table> 
  </div>
</template>

<script>
export default {
  props: ['isLoading', 'error', 'results']
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
