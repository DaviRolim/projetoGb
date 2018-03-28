export const ADD_ITEM = ({ state }, obj) => {
  console.log(state)
  state.carrinho.unshift(obj)
}

export const REMOVE_ITEM = ({ state }, obj) => {
  const index = state.carrinho.indexOf(obj)
  state.carrinho.splice(index, 1)
}

export const ESVAZIA_CARRINHO = ({ state }) => {
  state.carrinho = []
}
