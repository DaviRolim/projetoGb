export const getCarrinho = ({ state }) => {
  return state.carrinho
}

export const getCountCarrinho = ({ state }) => {
  return state.carrinho.length
}

export const getTotal = ({ state }) => {
  var vlTotal = 0
  state.carrinho.forEach((carrinho) => {
    vlTotal += +carrinho.vlProduto
  })
  return vlTotal.toFixed(2)
}
