export const state = () => ({
  users:[]
})

export const getters = {
  users (state) {
    return state.users
  }
}

export const actions = {
  async loadUsers({commit}) {
    const users = await this.$axios.$get('/users')
    commit('setUsers', users)
  },
  async deleteUser({commit}, id){
    await this.$axios.$delete(`/users/${id}`)
    commit('deleteUser', id)
  },
  async sortUsers ({commit}, field){
    const sortField = field.split('+')
    const users = await this.$axios.$get(`/users?_sort=${sortField[0]}&_order=${sortField[1]}`)
    commit('setUsers', users)
  }
}

export const mutations = {
  setUsers(state, users) {
    state.users = users
  },
  deleteUser(state, id) {
    const index = state.users.findIndex(u => u.id === id)
    state.users.splice(index, 1)
  }

}


