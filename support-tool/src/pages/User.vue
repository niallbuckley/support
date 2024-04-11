<template>
    <router-view></router-view>
    <ul>
      <teams-item
        v-for="team in teams"
        :key="team.id"
        :id="team.id"
        :name="team.name"
        :member-count="team.members.length"
      ></teams-item>
    </ul>
  </template>


<script>

export default {
    components: {

    },
}
</script>
