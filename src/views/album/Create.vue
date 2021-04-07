<template>
  <div>
    <h1>アルバム登録</h1>
    <form @submit.prevent="submitCreate">
      <label>Name</label><br />
      <input v-model="form.name" placeholder="Enter album name" /><br />
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { createAlbum } from "../../graphql/mutations";

export default {
  name: "AlbumCreate",
  data() {
    return {
      form: {
        name: "",
      },
    };
  },
  methods: {
    async submitCreate() {
      await API.graphql({
        query: createAlbum,
        variables: { input: this.form },
      })
        .then((result) => {
          console.log(result);
          this.$router.push({ name: "AlbumIndex" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
