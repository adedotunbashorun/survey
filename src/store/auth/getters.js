
export const getters = {
  allUsers: (state ) => {
    return state.users   
  },
  authUser: (state) => {
    return state.user
  },
  isLoggedIn: (state) => {
    return state.token
  }

}


