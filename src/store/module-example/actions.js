export const addItem = ({ commit }, obj) => {
  commit('ADD_ITEM', obj)
}

export const removeItem = ({ commit }, obj) => {
  commit('REMOVE_ITEM', obj)
}
