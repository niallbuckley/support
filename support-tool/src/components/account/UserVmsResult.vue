<template>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="!isLoading && error">{{ error }}</p>
  <div v-else-if="results.length > 0" class="collapsible">
    <h1> Users 
      <span class="collapse-indicator" :class="{ 'pointer': !collapsed }">
        <span class="collapse-box" @click="toggleCollapse">{{ collapsed ? '+' : '-' }}</span>
      </span>
    </h1>
    <div v-show="!collapsed">
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
  </div>
</template>

<script>
import { ToggleCollapseMixin } from '@/mixins/ToggleCollapseMixin.js';


export default {
  mixins: [ToggleCollapseMixin],
  props: ['isLoading', 'error', 'results']
};

</script>

<style scoped>

@import '/src/assets/css/account.css'
</style>