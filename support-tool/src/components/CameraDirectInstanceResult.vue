<template>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="!isLoading && error">{{ error }}</p>
  <div v-else-if="results.length > 0">
  <table>
  <th colspan="2" style="text-align: center;"> Camera Instance </th>
  <tr v-for="(tuple, index) in results" :key="index">
    <td style="text-align: center;"><strong>{{ tuple[0] }}</strong></td>
    <td style="text-align: center;">{{ tuple[1] }}</td>
  </tr>
  </table> 
  </div>
</template>

<script>
export default {
  props: ['isLoading', 'error', 'results']
}

</script>

<style>

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

tr, td {
  text-align: center;
  /* vertical-align: middle; */
} 


</style>

