<template>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="!isLoading && error">{{ error }}</p>
  <div v-else-if="results.length > 0" class="collapsible">
    <h1> Devices 
      <span class="collapse-indicator" :class="{ 'pointer': !collapsed }">
        <span class="collapse-box" @click="toggleCollapse">{{ collapsed ? '+' : '-' }}</span>
      </span>
    </h1>
    <div v-show="!collapsed">
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
