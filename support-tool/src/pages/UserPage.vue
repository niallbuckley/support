<template>
    <router-view></router-view>
    <h1> Users </h1>
    <h2> {{ userId }}</h2>
    <div>
    </div>

</template>

<script>
export default {
  data() {
    return {
      userId: ''
    }
  },
  watch: {
    '$route.params.id'(newId) {
      this.userId = newId;
    }
  },
  beforeMount() {
    const userId = this.$route.params.id;
    this.userId = this.$route.params.id;
    console.log(userId);
  }
};
</script>