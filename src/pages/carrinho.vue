<template>
  <div>
    <q-layout v-touch-swipe.horizontal="changeSwipe">
      <app-header></app-header>
      <q-page-container>
      <div v-if="getCountCarrinho">
       <q-list highlight inset-separator style="margin-bottom: 40px">
      <q-list-header >Carrinho</q-list-header>
      <q-item multiline v-for="(item, index) in listaCarrinho" :key="index">
        <q-item-main
          :label=item.nmProduto
          label-lines="1"
          :sublabel=item.dsProduto
          sublabel-lines="2"
        />
      <q-btn round size="sm" color="red" icon="close" @click="removeDoCarrinho(item)"/>
       </q-item>
    </q-list>
    <q-input v-model="pedido.observacao" type="textarea" color="orange" :clearable=true float-label="Observação: "/>
    <div class="text-center">
      <p round-borders class="text-weight-light">TOTAL: R$ {{getTotal}}</p>
    </div>
    <q-btn @click="fazerPedido" color="secondary" glossy rounded class="full-width">Fazer Pedido </q-btn>
      </div>
     <div v-if="!getCountCarrinho" class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">O Carrinho está vazio</p>
    <q-btn
      color="orange-4"
      style="width:200px;"
      @click="$router.push('/cardapio')"
    >Cardápio</q-btn>
  </div>
    </q-page-container>
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
        vlTotal: 0,
        observacao: '',
        id: ''
      }
    }
  },
  mounted () {
    this.listaCarrinho = this.getCarrinho
    this.pedido.vlTotal = this.getTotal
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
    changeSwipe (obj) {
      if (obj.direction === 'right') {
        this.$router.push('/cardapio')
      } else if (obj.direction === 'left') {
        this.$router.push('/historico')
      }
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
          this.$q.notify({message: 'Item retirado do carrinho', type: 'positive', timeout: 500})
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
      this.$q.notify({message: 'Pedido Realizado com Sucesso', color: 'tertiary', timeout: 500, position: 'center'})
      this.$router.push('/historico')
      this.esvaziaCarrinho(this.$state)

      // Limpar o carrinho depois de fazer o pedido e mostrar uma popUp ou outra coisa pra dizer q pedido foi realizado
    }
  }
}
</script>
<style>

</style>
