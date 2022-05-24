import api from "./api"

const END_POINT = "movies"


export default {
  all() {
    return api({
      method: "get",
      url: `${END_POINT}/`,
    })
  },
  detail(id) {
    return api({
      method: "get",
      url: `${END_POINT}/${id}/`,
    })
  },
  like(id) {
    return api({
      method: "post",
      url: `${END_POINT}/${id}/like/`,
    })
  },
}