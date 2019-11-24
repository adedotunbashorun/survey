
import {getters} from './getters'
import {mutations} from './mutations'
import { actions } from './actions'
import { AsyncStorage } from 'react-native'

export default {
  state: {
    users: [],
    headers:'',
    vendor:{},
    order:{},
    error: '',
    user: JSON.parse(AsyncStorage.getItem('user')) || {},
    token: AsyncStorage.getItem('token') || '',
    showLoader: false,
  },
  mutations,
  getters,
  actions
}
