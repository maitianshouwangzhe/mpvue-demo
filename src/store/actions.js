import {RECEIVE_LIST,

} from './mutation-types'

// 引入本地的mock数据，
// 由于本身的mock数据暴露的为对象， 对象里面为数组
import listData from '../mock/listData'

export default {
  getList({commit}){
    console.log('actions')
    commit(RECEIVE_LIST, listData)
  }
}
