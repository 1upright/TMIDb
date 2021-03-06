import router from "@/router"
import movie from "@/api/movie"
import review from "@/api/review"
import account from "@/api/account"
import _ from "lodash"

export default {
  state: {
    movies: [],
    movie: {},
    isReview: false,
    currentUser: {},
    is_liked: false,
  },

  getters: {
    movies: (state) => state.movies,
    movie: (state) => state.movie,
    isReview(state) {
      state.isReview = false
      state.movie.reviews?.forEach(review => {
        if (review.user.username === state.currentUser.username) {
          state.isReview = true
        }
      })
      return state.isReview
    },
    is_liked(state) {
      state.is_liked = false
      state.movie.like_users?.forEach(user => {
        if (user.username === state.currentUser.username) {
          state.is_liked = true
          // console.log(state.is_liked)
        }
      })
      return state.is_liked
    },
  },

  mutations: {
    SET_MOVIES: (state, movies) => (state.movies = movies),
    SET_MOVIE: (state, movie) => (state.movie = movie),
    SET_MOVIE_REVIEWS: (state, reviews) => (state.movie.reviews = reviews),
    SET_CURRENT_USER: (state, user) => (state.currentUser = user),
  },

  actions: {
    fetchMovies({ commit }) {
      movie
        .all()
        .then((res) => {
          const random_movie = _.sampleSize(res.data, 12)
          commit("SET_MOVIES", random_movie);
        })
        .catch((err) => console.error(err.response))
    },
    // fetchMovies({ commit }, { page }) { // page로 무한스크롤 불러오기 위함
    //   movie
    //     .all(page)
    //     .then((res) => {
    //       commit("SET_MOVIES", res.data);
    //     })
    //     .catch((err) => console.error(err.response))
    // },    
    fetchMovie({ commit }, { moviePk }) {
      movie
        .detail(moviePk)
        .then((res) => {
          commit("SET_MOVIE", res.data)
        })
        .catch((err) => {
          console.error(err.response)
          if (err.response.status === 404) {
            router.push({ name: "NotFound404" });
          }
        })
    },
    likeMovie({ commit }, { moviePk }) {
      movie
        .like(moviePk)
        .then((res) => {
          commit("SET_MOVIE", res.data)
        })
        .catch((err) => console.error(err.response))
    },
    createReview({ commit }, { moviePk, score, content }) {
      const body = { score, content }
      review
        .create(moviePk, body)
        .then((res) => {
          commit("SET_MOVIE_REVIEWS", res.data)
        })
        .catch((err) => console.error(err.response))
    },
    updateReview({ commit }, { moviePk, reviewPk, score, content }) {
      const body = { score, content }
      review
        .update(moviePk, reviewPk, body)
        .then((res) => {
          commit("SET_MOVIE_REVIEWS", res.data)
        })
        .catch((err) => console.error(err.response))
    },
    deleteReview({ commit }, { moviePk, reviewPk }) {
      review
        .delete(moviePk, reviewPk)
        .then((res) => {
          commit("SET_MOVIE_REVIEWS", res.data)
        })
        .catch((err) => console.error(err.response))
        location.reload()
    },
    searchMovie({ commit }, { keyword }) {
      movie
        .search(keyword)
        .then((res) => {
          commit("SET_MOVIES", res.data)
        })
    },
    fetchCurrentUser({ commit, getters }) {
      if (getters.isLoggedIn) {
        account.currentUser().then((res) => {
          commit("SET_CURRENT_USER", res.data)
        });
      }
    },
    fetchRecommendMovies({ commit }) {
      movie
        .recommend()
        .then((res) => {
          commit("SET_MOVIES", res.data);
        })
        .catch((err) => console.error(err.response))
    }
  },

}