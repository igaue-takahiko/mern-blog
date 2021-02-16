export const initialState = {
  auth: {
    loading: false,
    registerErrors: [],
    loginErrors: [],
    token: "",
    user: "",
  },
  post: {
    loading: false,
    createErrors: [],
    redirect: false,
    message: "",
    posts: [],
    perPage: 0,
    count: 0,
    post: {},
    postStatus: false,
  }
}