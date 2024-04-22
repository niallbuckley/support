<template>
  <header>
    <nav class="navbar is-dark">
    <div class="navbar-brand">
      <a class="navbar-item" href="/"><img src="./../assets/images/icon.png"></a>
      <router-link msg="Hello World" class="navbar-item" to="/camera-direct"> <img src="./../assets/images/cloud-drive-icon.png"></router-link>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <input class="input" type="text" v-model="searchInput" placeholder="Enter ESN">
        <button @click="redirectToUserPage(searchInput)">Search</button>
      </div>
    </div>
    </nav>
  </header>
</template>

<script>

export default {
  data() {
    return {
      searchInput: "" 
    };
  },
  methods: {
    redirectToUserPage(si) {
      console.log(si);
      this.searchInput = si;
      // need to add error checking on si here.
      var userPath = '/user/' + si;
      this.$router.push({ path: userPath });
    }
  }
}
</script>

<style scoped>

a {
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

a:hover,
a:active,
a.active {
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}


@import '/src/assets/css/bulma.min.css'
</style>