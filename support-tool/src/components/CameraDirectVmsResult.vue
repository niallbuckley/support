<template>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="!isLoading && error">{{ error }}</p>
  <div v-else-if="results.length > 0">
  <table v-for="result in results" :key="result.device_id">
  <th colspan="2"> VMS Database </th>
  <tr>
    <td><strong>Esn</strong></td>
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
tr, td, th {
  text-align: center;
}


@import '/src/assets/css/cd-table.css'

</style>
