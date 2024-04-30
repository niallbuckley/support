<template>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="!isLoading && error">{{ error }}</p>
  <div v-else-if="results.length > 0" class="my-class">
  <table>
  <th colspan="2"> Camera Instance </th>
  <tr v-for="(tuple, index) in results" :key="index">
    <td><strong>{{ tuple[0] }}</strong></td>
    <td>{{ tuple[1] }}</td>
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

