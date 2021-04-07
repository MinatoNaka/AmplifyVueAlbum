<template>
  <div v-if="isSignedIn">
    <amplify-greetings  :username="this.$store.state.user.username"></amplify-greetings>
    <router-link custom v-slot="{ navigate }" :to="{ name: 'AlbumIndex' }">
      <button @click="navigate">TOP</button>
    </router-link>
  </div>
  <router-view/>
</template>

<script>
export default {
  computed: {
    isSignedIn() {
      return this.$store.state.user !== null;
    },
  },
};
</script>

