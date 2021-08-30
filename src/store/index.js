import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
  },
  actions: {
    async fetchTodos(ctx, params) {
      try {
        const { data } = await axios.get(
          `/items?offset=${params[0]}&limit=${params[1]}`
        )
        ctx.commit('updateTodos', data)
      } catch (e) {
        console.log(e)
      }
    },
    async addTodos({ dispatch }, params) {
      try {
        await axios.post('/items', params[0])
        await dispatch('fetchTodos', [params[1], params[2]])
      } catch (e) {
        console.log(e)
      }
    },
    async deleteTodos({ dispatch }, params) {
      try {
        await axios.delete(`/items/${params[0]}`)
        await dispatch('fetchTodos', [params[1], params[2]])
      } catch (e) {
        console.log(e)
      }
    },
    async searchTodos(ctx, query) {
      try {
        const { data } = await axios.get(`/items?search=${query}`)
        ctx.commit('updateTodos', data)
      } catch (e) {
        console.log(e)
      }
    },
    async updateTodos({ dispatch }, params) {
      try {
        await axios.post(`/items/${params.id}`, {
          title: params.title,
          completed: params.status,
        })
        await dispatch('fetchTodos', [
          params.paginationOffset,
          params.paginationLimit,
        ])
      } catch (e) {
        console.log(e)
      }
    },
  },
  mutations: {
    updateTodos(state, todos) {
      state.todos = todos
    },
  },
  getters: {
    getTodos(state) {
      return state.todos.items
    },
    getTodosCount(state) {
      return state.todos.count
    },
  },
})
