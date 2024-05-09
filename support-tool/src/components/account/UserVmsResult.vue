<template>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="!isLoading && error">{{ error }}</p>
  <div v-else-if="results.length > 0">
    <h1 @click="toggleCollapse"> Users <span class="collapse-indicator" :class="{ 'pointer': !collapsed }">{{ collapsed ? '+' : '^' }}</span> </h1>
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
export default {
  props: ['isLoading', 'error', 'results'],
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    }
  }
};

</script>

<style scoped>
.collapsible h1 {
  cursor: pointer !important;
  background-color: #f1f1f1;
  padding: 10px;
  margin: 0;
}

.collapsible h1 span {
  float: right;
  cursor: pointer !important;
}

.collapsible table {
  display: none;
  width: 100%;
}

.collapsible table thead {
  background-color: #f1f1f1;
}

.collapsible table th,
.collapsible table td {
  padding: 8px;
  text-align: left;
}

.collapsible table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.collapsible table tbody tr:hover {
  background-color: #ddd;
}

.collapsible table tbody tr td {
  border-bottom: 1px solid #ddd;
}

.collapsible h1 {
  cursor: pointer;
  background-color: #f1f1f1;
  padding: 10px;
  margin: 0;
}

.collapsible .collapse-indicator {
  float: right;
  padding: 0 8px; /* Add padding to make it easier to click */
  transition: all 0.3s ease; /* Add transition for smooth animation */
}

.collapsible .collapse-indicator.pointer {
  cursor: pointer;
  color: #007bff; /* Change color to make it stand out */
}

.collapsible .collapse-indicator:hover {
  background-color: #ee0b0b !important; /* Highlight on hover */
}

@import '/src/assets/css/account.css'
</style>