<template>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="!isLoading && error">{{ error }}</p>
  <div v-else-if="results.length > 0">
    <h1> Users </h1>
    <table>
      <thead>
      <tr>
        <th><strong>Email</strong></th>
        <th><strong>Account Id</strong></th>
        <th><strong>User Id</strong></th>
        <th><strong>Name</strong></th>
        <th><strong>Parent</strong></th>
      </tr>
      </thead>
      <tbody v-for="result in results" :key="result.account_id">
        <tr>
          <td>{{ result.email }}</td>
          <td>{{ result.account_id }}</td>
          <td>{{ result.user_id }}</td>
          <td>{{ result.first_name }} {{ result.last_name }}</td>
          <td>{{ result.parent_account_id }}</td>
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
th, td {
  text-align: center;
  vertical-align: middle;
}

@import '/src/assets/css/account.css'
</style>


