export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },
  {
    path: '/auth',
    component: () => import('../components/auth/login')
  },
  {
    path: '/cardapio',
    component: () => import('../pages/cardapio')
  },
  {
    path: '/carrinho',
    component: () => import('../pages/carrinho')
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
