import { Api } from '../../api'
import { AsyncStorage } from 'react-native';

import {
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  USER_BY_ID,
  USER_BY_ID_SUCCESS,
  USER_BY_ID_FAILURE,
  ALL_USERS,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAILURE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  ACTIVITY,
  ACTIVITY_SUCCESS
} from './mutation-types'

export const actions = {
  allUsers({ commit }, header) {
    commit(ALL_USERS)
    return new Promise((resolve, reject) => {
      Api.User.allUser(header).then( response => {
        commit(ALL_USERS_SUCCESS,response)
        resolve(response)
      }).catch(err => {
        commit(ALL_USERS_FAILURE, err)
        reject(err)
      })
    })
  },

  activity({ commit }, [payload,header]) {
    commit(ACTIVITY)
    return new Promise((resolve, reject) => {
      Api.User.activity(payload,header).then(response => {
        commit(ACTIVITY_SUCCESS, response)
        resolve(response)
      }).catch(err => {
        commit(ACTIVITY_SUCCESS, err)
        reject(err)
      })
    })
  },

  login({commit},payload) {
    commit(LOGIN)
    return new Promise((resolve, reject) => {
      Api.User.login(payload).then(response => {
        commit(LOGIN_SUCCESS, [response.token , response.user])
        AsyncStorage.setItem('user', JSON.stringify(response.user))
        AsyncStorage.setItem('token', response.token)
        resolve(response)
      }).catch(err => {
        commit(LOGIN_FAILURE, err)
        reject(err)
      })
    })
  },

  userById({ commit }, [payload,header]) {
    commit(USER_BY_ID)
    return new Promise((resolve, reject) => {
      Api.User.userById(payload, header).then(response => {
        commit(USER_BY_ID_SUCCESS, response)
        resolve(response)
      }).catch(err => {
        commit(USER_BY_ID_FAILURE, err)
        reject(err)
      })
    })
  },
  addUser ({commit}, payload) {
    commit(ADD_USER)
    return new Promise((resolve, reject) => {
      Api.User.register(payload).then(response => {
        commit(ADD_USER_SUCCESS, [response.token , response.user])
        AsyncStorage.setItem('user', JSON.stringify(response.user))
        AsyncStorage.setItem('token', response.token)
        resolve(response)
      }).catch(err => {
        commit(ADD_USER_FAILURE, err)
        reject(err)
      })
    })
  },

  updateProfile ({commit}, [payload,header]) {
    commit(UPDATE_USER)
    return new Promise((resolve, reject) => {
      Api.User.updateProfile(payload, header).then(response => {
        commit(UPDATE_USER_SUCCESS, response)
        AsyncStorage.removeItem('user')
        AsyncStorage.setItem('user', JSON.stringify(response.user))
        resolve(response)
      }).catch(err => {
        commit(UPDATE_USER_FAILURE, err)
        reject(err)
      })
    })
  },

  forgetPasword ({commit}, payload) {
    return new Promise((resolve, reject) => {
      Api.User.forgetPassword(payload).then(response => {
        console.log(response)
        resolve(response)
      }).catch(err => {
        reject(err)
      })
    })
  },
  logout({ commit }, header){
    commit(LOGOUT)
    return new Promise((resolve, reject) => {
      Api.User.logout(header).then(response => {
        commit(LOGOUT_SUCCESS, response)
        // AsyncStorage.removeItem('user')
        AsyncStorage.removeItem('token')
        resolve(response)
      }).catch(err => {
        commit(LOGOUT_FAILURE, err)
        reject(err)
      })
    })
  },
}


