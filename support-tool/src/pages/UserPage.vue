<template>
    <router-view></router-view>
    <h1> Users </h1>
    <h2> {{ this.userId }}</h2>
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
  mounted() {
    const userId = this.$route.params.id;
    // Now you can use the value of `userId` in your component
    this.userId = userId;
    console.log(userId);
  }
};
</script>