export const getCarrinho = ({ state }) => {
  console.log(state.carrinho)
  return state.carrinho
}

export const getCountCarrinho = ({ state }) => {
  return state.carrinho.length
}
