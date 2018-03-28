<template>
  <div>
    <q-layout>
      <app-header></app-header>
      <q-page-container v-if="getCountCarrinho">
       <q-list highlight inset-separator>
      <q-list-header >Carrinho</q-list-header>
      <q-item multiline v-for="(item, index) in listaCarrinho" :key="index">
        <!-- <q-item-side avatar="statics/boy-avatar.png" /> -->
        <q-item-main
          :label=item.nmProduto
          label-lines="1"
          :sublabel=item.dsProduto
          sublabel-lines="2"
        />
      <!-- <q-btn @click="dialogCarrinho(item)"> <q-item-side text-color="red" tag right :stamp=valorProduto(item.vlProduto) /> </q-btn> -->
      <q-btn round size="sm" color="red" icon="close" @click="removeDoCarrinho(item)"/>
       </q-item>
    </q-list>
    <div class="text-center">
      TOTAL: R$ {{getTotal}}
    </div>
    </q-page-container>
    <q-layout-footer>
      <q-btn :class="{ disabled: getCountCarrinho == 0? true : false }" @click="fazerPedido" color="secondary" glossy rounded class="full-width">Fazer Pedido </q-btn>
    </q-layout-footer>
    </q-layout>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import header from '../components/header'
import moment from 'moment'
export default {
  components: {
    appHeader: header
  },
  data () {
    return {
      listaCarrinho: [],
      carrinhoZero: 0,
      pedido: {
        itens: [],
        userId: '',
        date: moment().format('DD/MM/YYYY HH:mm:ss'),
        email: this.$user ? this.$user.email : '',
        estado: 'Aguardando confirmação', // Aguardando Confirmação, Pedido Confirmado, Em preparo, Pedido concluído
        vlTotal: 0
      }
    }
  },
  mounted () {
    this.listaCarrinho = this.getCarrinho
    this.pedido.vlTotal = this.getTotal
    if (this.getCountCarrinho === 0) {
      this.$q.dialog({
        title: ';(',
        message: 'O carrinho está vazio.'
      })
    }
  },
  computed: {
    ...mapGetters('example', [
      'getCarrinho',
      'getCountCarrinho',
      'getTotal'
    ])
  },
  methods: {
    valorProduto (valor) {
      return 'R$ ' + valor
    },
    ...mapActions('example', [
      'addItem',
      'removeItem',
      'esvaziaCarrinho'
    ]),
    removeDoCarrinho (item) {
      this.$q.dialog({
        title: 'Confirmação',
        message: 'Deseja retirar esse item do carrinho?',
        ok: 'Sim',
        cancel: 'Não'})
        .then(() => {
          this.$q.notify({message: 'Item retirado do carrinho', type: 'positive'})
          this.removeItem(item)
        }).catch(() => {
          console.log('Não tirou')
        })
    },
    fazerPedido (pedido) {
      var uid = this.$user.uid
      this.pedido.userId = uid
      this.pedido.vlTotal = this.getTotal
      this.pedido.itens = this.listaCarrinho
      this.$db.ref('pedidos').push(this.pedido)
      this.esvaziaCarrinho(this.$state)
      // Limpar o carrinho depois de fazer o pedido e mostrar uma popUp ou outra coisa pra dizer q pedido foi realizado
    }
  }
}
</script>
<style>

</style>
