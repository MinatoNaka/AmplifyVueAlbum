<template>
  <div>
    <h1>写真登録</h1>
    <form @submit.prevent="submitCreate">
      <label>Name</label><br />
      <input v-model="form.name" placeholder="Enter photo name" /><br />
      <p>ここに画像登録フォーム</p>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { createPhoto } from "../../graphql/mutations";

export default {
  name: "PhotoCreate",
  props: {
    albumId: String,
  },
  data() {
    return {
      form: {
        albumID: this.albumId,
        name: "",
      },
    };
  },
  methods: {
    async submitCreate() {
      await API.graphql({
        query: createPhoto,
        variables: { input: this.form },
      })
        .then((result) => {
          console.log(result);
          this.$router.push({
            name: "AlbumShow",
            params: { albumId: this.albumId },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
