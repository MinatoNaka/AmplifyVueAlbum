<template>
  <div>
    <h1>写真登録</h1>
    <form @submit.prevent="submitCreate">
      <label>Name</label><br />
      <input v-model="form.name" placeholder="Enter photo name" /><br />
      <label>Photo</label><br />
      <input type="file" @change="onFileChange" /><br />
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { createPhoto } from "../../graphql/mutations";
import { Storage } from "aws-amplify";

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
        s3key: "",
      },
      image: null,
    };
  },
  methods: {
    onFileChange(e) {
      this.image = e.target.files[0];
    },
    async submitCreate() {
      const s3key = new Date().getTime().toString(16) + this.image.name;

      await Storage.put(s3key, this.image, {
        level: "private",
      })
        .then((result) => {
          this.form.s3key = result.key;
        })
        .catch((error) => {
          console.log(error);
        });

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
