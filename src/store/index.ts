import Vue from 'vue'
import Vuex from 'vuex'
import { IEditItem, ITodoItem, RouterStatus } from '../utils/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todosList: new Array<ITodoItem>(),
    isEditing: false,
    route: ''
  },
  mutations: {
    addItem(state, item: ITodoItem) {
      if ( !state.todosList ) state.todosList = new Array<ITodoItem>()
      state.todosList.push(item);
    },
    removeItem(state, item: ITodoItem) {
      state.todosList = state.todosList.filter(v => {
        return v != item
      });
    },
    changeItemStatus(state, id: number) {
      state.todosList[id].isCompleted = !state.todosList[id].isCompleted;
    },
    changeItemName(state, payload: IEditItem) {
      state.todosList[payload.id].name = payload.name;
    },
    changeAllItemStatus(state, isCompleted: boolean) {
      state.todosList = state.todosList.map(item => {
        item.isCompleted = isCompleted
        return item
      })
    },
    changeEditingStatus(state, status) {
      state.isEditing = status
    },
    clearCompleted(state) {
      state.todosList = state.todosList.filter(item => !item.isCompleted)
    },
    initRoute(state) {
      state.route = window.location.pathname
    },
    saveInLocalStorage(state) {
      localStorage.setItem('todosList', JSON.stringify(state.todosList))
    },
    initLocalData(state) {
      state.todosList = JSON.parse(localStorage.getItem('todosList') as string)
    }
  },
  getters: {
    listFiltered (state) {
      if ( state.route === RouterStatus.ACTIVE ) {
        return state.todosList.filter((item: ITodoItem) => !item.isCompleted)
      } else if ( state.route === RouterStatus.COMPLETED ) {
          return state.todosList.filter((item: ITodoItem) => item.isCompleted)
      } else {
          return state.todosList
      }
    }
  },
  actions: {
    INIT_LOCAL_DATA: ({commit}) => {
      commit('initLocalData')
    },
    ADD_ITEM: ({commit}, name) => {
      commit('addItem', {
        name,
        isCompleted: false
      });
      commit('saveInLocalStorage')
    },
    CHANGE_ITEM_STATUS: ({commit}, id) => {
      commit('changeItemStatus', id)
      commit('saveInLocalStorage')
    },
    CHANGE_ITEM_NAME: ({commit}, payload: IEditItem) => {
      commit('changeItemName', payload)
      commit('saveInLocalStorage')
    },
    REMOVE_ITEM: ({commit}, payload: ITodoItem) => {
      commit('removeItem', payload)
      commit('saveInLocalStorage')
    },
    CHANGE_ALL_ITEM_STATUS: ({commit}, isCompleted) => {
      commit('changeAllItemStatus', isCompleted)
      commit('saveInLocalStorage')
    },
    CHANGE_EDITING_STATUS: ({commit}, isEditing) => {
      commit('changeEditingStatus', isEditing)
    },
    CLEAR_COMPLETED: ({commit}) => {
      commit('clearCompleted')
      commit('saveInLocalStorage')
    },
    UPDATE_ROUTE: ({commit}) => {
      commit('initRoute')
    }
  },
  modules: {
  }
})
