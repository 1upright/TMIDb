import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import ArticleListView from '@/views/ArticleListView.vue'
import ArticleDetailView from '@/views/ArticleDetailView.vue'
import ArticleNewView from '@/views/ArticleNewView'
import ArticleEditView from '@/views/ArticleEditView'

import MovieHomeView from '@/views/MovieHomeView'
import MovieRecommendView from '@/views/MovieRecommendView'
import MovieDetailView from '@/views/MovieDetailView'
import SearchMovieView from '@/views/SearchMovieView'

import LoginView from '@/views/LoginView.vue'
import LogoutView from '@/views/LogoutView.vue'
import SignupView from '@/views/SignupView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ProfileEditView from '@/views/ProfileEditView.vue'

import WriteArticleListView from '@/views/WriteArticleListView.vue'
import LikeArticleListView from '@/views/LikeArticleListView.vue'
import LikeMovieListView from '@/views/LikeMovieListView.vue'

import NotFound404 from '../views/NotFound404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
  },
  {
    path: '/profile/:username',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/profile/:username/edit',
    name: 'profileEdit',
    component: ProfileEditView
  },
  {
    path: '/profile/:username/writeArticle',
    name: 'writeArticleList',
    component: WriteArticleListView
  },
  {
    path: '/profile/:username/likeArticle',
    name: 'likeArticleList',
    component: LikeArticleListView
  },  
  {
    path: '/profile/:username/likeMovie',
    name: 'likeMovieList',
    component: LikeMovieListView
  },
  // Articles
  {
    path: '/articles',
    name: 'articles',
    component: ArticleListView,
  },
  {
    path: '/articles/new',
    name: 'articleNew',
    component: ArticleNewView,
  },
  {
    path: '/articles/:articlePk',
    name: 'article',
    component: ArticleDetailView,
  },
  {
    path: '/articles/:articlePk/edit',
    name: 'articleEdit',
    component: ArticleEditView,
  },
  // Movies
  {
    path: '/movies',
    name: 'home',
    component: MovieHomeView,
  },
  {
    path: '/movies/recommend',
    name: 'recommend',
    component: MovieRecommendView,
  },
  {
    path: '/movies/:moviePk',
    name: 'movie',
    component: MovieDetailView,
  },
  {
    path: '/movies/search/:keyword',
    name: 'searchMovie',
    component: SearchMovieView,
  },
  {
    path: '/404',
    name: 'NotFound404',
    component: NotFound404
  },
  {
    path: '*',
    redirect: '/404'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  // ?????? ??????????????? ????????? ??????????????? ??????
  store.commit('SET_AUTH_ERROR', null)

  const { isLoggedIn } = store.getters

  // Login ?????? ?????? route??? name
  const noAuthPages = ['login', 'signup', ]

  // ?????? ??????????????? ?????? ???????????? Authentication??? ?????????????
  const isAuthRequired = !noAuthPages.includes(to.name)

  // Auth??? ????????????, ????????? ???????????? ??????????
  if (isAuthRequired && !isLoggedIn) {
    alert('Require Login. Redirecting..')
    next({ name: 'login' })
  } else {
    next()
  }

  if (!isAuthRequired && isLoggedIn) {
    next({ name: 'home'})
  }
})

export default router
