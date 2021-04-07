<template>
  <div>
    <h1>アルバム一覧</h1>
    <router-link custom v-slot="{ navigate }" :to="{ name: 'AlbumCreate' }">
      <button @click="navigate">Add Album</button>
    </router-link>
    <table border="1">
      <tr v-for="(album, index) in albums" :key="album.id">
        <td>{{ album.name }}</td>
        <td>
          <router-link
            custom
            v-slot="{ navigate }"
            :to="{ name: 'AlbumShow', params: { albumId: album.id } }"
          >
            <button @click="navigate">Show Album</button>
          </router-link>
        </td>
        <td>
          <router-link
            custom
            v-slot="{ navigate }"
            :to="{ name: 'AlbumEdit', params: { albumId: album.id } }"
          >
            <button @click="navigate">Edit Album</button>
          </router-link>
        </td>
        <td>
          <button @click="deleteAlbum(index, album.id)">
            Delete Album
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { listAlbums } from "../../graphql/queries";
import { deleteAlbum } from "../../graphql/mutations";

export default {
  name: "AlbumIndex",
  async created() {
    this.getAlbums();
  },
  data() {
    return {
      albums: [],
    };
  },
  methods: {
    async getAlbums() {
      await API.graphql({
        query: listAlbums,
      })
        .then((result) => {
          console.log(result);
          this.albums = result.data.listAlbums.items;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteAlbum(index, albumId) {
      if (!confirm("Delete Album?")) return;

      await API.graphql({
        query: deleteAlbum,
        variables: { input: { id: albumId } },
      })
        .then((result) => {
          console.log(result);
          this.albums.splice(index, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
