import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/ProdukList.vue'
import EditProduk from '../views/EditProduk.vue'
import PostsView from '../views/PostsView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/posts',
    name: 'Posts',
    component: PostsView
  },
  {
    path: '/edit/:id',
    name: 'EditProduk',
    component: EditProduk,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
