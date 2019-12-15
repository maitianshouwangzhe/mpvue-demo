import {RECEIVE_LIST,

} from './mutation-types'

export default {
  [RECEIVE_LIST](state, {list_data}){
    console.log('list_data的数据',  list_data, typeof (list_data) )
    state.listTemp = list_data
  }
}
