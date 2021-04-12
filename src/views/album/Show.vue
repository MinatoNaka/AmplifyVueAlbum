<template>
  <div>
    <h1>アルバム詳細</h1>
    <h2>{{ album.name }}</h2>
    <router-link
      custom
      v-slot="{ navigate }"
      :to="{ name: 'PhotoCreate', params: { albumId: albumId } }"
    >
      <button @click="navigate">Add Photo</button>
    </router-link>
    <table border="1">
      <tr v-for="(photo, index) in album.photos.items" :key="photo.id">
        <td>{{ photo.name }}</td>
        <td>
          <amplify-s3-image :img-key="photo.s3key" level="private" />
        </td>
        <td>
          <button @click="deletePhoto(index, photo)">Delete Photo</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { getAlbum } from "../../graphql/queries";
import { deletePhoto } from "../../graphql/mutations";
import { Storage } from "aws-amplify";

export default {
  name: "AlbumShow",
  props: {
    albumId: String,
  },
  async created() {
    this.getAlbum();
  },
  data() {
    return {
      album: {
        name: null,
        photos: []
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
          this.album = result.data.getAlbum;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deletePhoto(index, photo) {
      if (!confirm("Delete Photo?")) return;

      await Storage.remove(photo.s3key, {
        level: "private",
      })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });

      await API.graphql({
        query: deletePhoto,
        variables: { input: { id: photo.id } },
      })
        .then((result) => {
          console.log(result);
          this.album.photos.items.splice(index, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
amplify-s3-image {
  --height: 100px;
}
</style>
