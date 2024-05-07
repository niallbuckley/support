<template>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="!isLoading && error">{{ error }}</p>
  <div v-else-if="results.length > 0">
    <h1> Sub-Accounts </h1>
    <table>
      <thead>
      <tr>
        <th><strong>Name</strong></th>
        <th><strong>Account Id</strong></th>
        <th><strong>Cluster</strong></th>
        <th><strong>Sw Group</strong></th>
        <th><strong>Parent</strong></th>
        <th><strong>status</strong></th>
      </tr>
      </thead>
      <tbody v-for="result in results" :key="result.account_id">
        <tr>
          <td>{{ result.name }}</td>
          <td>{{ result.account_id }}</td>
          <td>{{ result.cluster }}</td>
          <td>{{ result.software_group }}</td>
          <td>{{ result.parent_account_id }}</td>
          <td>
            <span v-for="(flag, index) in result.status" :key="index">
              {{ flag.trim() }}<span v-if="index !== result.status.length - 1">, 
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
