import { createRouter, createWebHistory } from "vue-router";
import SignIn from "../views/SignIn.vue";
import AlbumIndex from "../views/album/Index.vue";
import AlbumCreate from "../views/album/Create.vue";
import AlbumEdit from "../views/album/Edit.vue";
import AlbumShow from "../views/album/Show.vue";
import PhotoCreate from "../views/photo/Create.vue";

const routes = [
  {
    path: "/",
    redirect: { name: "AlbumIndex" },
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/albums",
    name: "AlbumIndex",
    component: AlbumIndex,
  },
  {
    path: "/albums/create",
    name: "AlbumCreate",
    component: AlbumCreate,
  },
  {
    path: "/albums/:albumId/edit",
    name: "AlbumEdit",
    component: AlbumEdit,
    props: true,
  },
  {
    path: "/albums/:albumId",
    name: "AlbumShow",
    component: AlbumShow,
    props: true,
  },
  {
    path: "/albums/:albumId/photo/create",
    name: "PhotoCreate",
    component: PhotoCreate,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
