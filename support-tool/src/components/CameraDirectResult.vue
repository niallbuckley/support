<template>
  <table>
  <th colspan="2"> VMS Database </th>
  <tr>
    <td><strong>Device</strong></td>
    <td>{{ device }}</td>
  </tr>
  <tr>
    <td><strong>Name</strong></td>
    <td>{{ name }}</td>
  </tr>
  <tr>
    <td><strong>MAC Address</strong></td>
    <td>{{ mac_address }}</td>
  </tr>
  <tr>
    <td><strong>Type</strong></td>
    <td>{{ type }}</td>
  </tr>
  <tr>
    <td><strong>Cluster</strong></td>
    <td>{{ cluster }}</td>
  </tr>
  <tr>
    <td><strong>Account</strong></td>
    <td>{{ account }}</td>
  </tr>
  </table>
</template>

<script>
export default {
  props: ['device', 'name', 'mac_address', 'type', 'cluster', 'account']
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
