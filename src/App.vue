<template>
    <div v-if="isSignedIn">
      <amplify-greetings  :username="this.$store.state.user.username"></amplify-greetings>
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

