<template>
  <div>
    <h1>アルバム編集</h1>
    <form @submit.prevent="submitUpdate">
      <label>Name</label><br />
      <input v-model="form.name" placeholder="Enter album name" /><br />
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { getAlbum } from "../../graphql/queries";
import { updateAlbum } from "../../graphql/mutations";

export default {
  name: "AlbumEdit",
  props: {
    albumId: String,
  },
  async created() {
    this.getAlbum();
  },
  data() {
    return {
      form: {
        id: "",
        name: "",
      },
    };
  },
  methods: {
    async getAlbum() {
      await API.graphql({
        query: getAlbum,
        variables: { id: this.albumId },
      })
        .then((result) => {
          console.log(result);
          this.form.id = result.data.getAlbum.id;
          this.form.name = result.data.getAlbum.name;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async submitUpdate() {
      await API.graphql({
        query: updateAlbum,
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
