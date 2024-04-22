<template>
    <router-view></router-view>
    <h1> Users </h1>
    <div>
      <input type="text" v-model="searchInput" placeholder="Enter ESN/ Mac Address">
      <button @click="loadDevice(searchInput)">Search</button>
    </div>
    <div>
    </div>

</template>

<script>
export default {
  mounted() {
    const userId = this.$route.params.id;
    // Now you can use the value of `userId` in your component
    console.log(userId);
  }
};
</script>