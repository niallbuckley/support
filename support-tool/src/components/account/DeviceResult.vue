<template>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="!isLoading && error">{{ error }}</p>
  <div v-else-if="results.length > 0">
    <h1> Devices </h1>
    <table>
      <thead>
      <tr>
        <th><strong>Name</strong></th>
        <th><strong>Type</strong></th>
        <th><strong>Cluster</strong></th>
        <th><strong>ESN</strong></th>
        <th><strong>Serial #</strong></th>
        <th><strong>Make/ Model</strong></th>
        <th><strong>Archivers</strong></th>
      </tr>
      </thead>
      <tbody v-for="result in results" :key="result.device_id">
        <tr>
          <td>{{ result.name }}</td>
          <td>{{ result.type }}</td>
          <td>{{ result.cluster }}</td>
          <td>{{ result.device_id }}</td>
          <td>{{ result.mac_address }}</td>
          <td>{{ result.make }} {{ result.model }} {{ result.hardware_version }}</td>
          <td>
            <span v-for="(arch, index) in result.archivers" :key="index">
              {{ arch.trim() }}<span v-if="index !== result.archivers.length - 1">, 
            </span>
          </span>
          </td>
        </tr>
      </tbody>
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
