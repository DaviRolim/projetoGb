<template>
  <div style="row justify-center width: 500px; max-width: 100vw;">
    <q-layout v-touch-swipe.horizontal="changeSwipe">
    <app-header></app-header>
    <q-page-container>
    <q-list highlight inset-separator>
      <q-list-header>Historico</q-list-header>
      <q-collapsible multiline v-for="(item, index) in listaHistorico" :key="index"
       :label="labelCollapse(item)"
       :sublabel="item.date"
       :header-class="colorStatus(item)"
       >
        <!-- <q-item-side avatar="statics/boy-avatar.png" /> -->
        <q-item-main>
          <q-item-tile label>Produtos: </q-item-tile>
          <q-item-tile sublabel lines="2" v-for="(prod, index) in item.itens" :key="index">
            <span>{{prod.nmProduto}} - {{prod.vlProduto}}</span>
          </q-item-tile>
          <q-item-tile sublabel>Observação: {{item.observacao}}</q-item-tile>
        </q-item-main>
       </q-collapsible>
    </q-list>
    </q-page-container>
    <div v-if="listaHistorico.length === 0" class="fixed-center text-center">
      <p>
        <img
          src="~assets/sad.svg"
          style="width:30vw;max-width:150px;"
        >
      </p>
      <p class="text-faded">Você ainda não realizou nenhum pedido!</p>
      <q-btn
        color="orange-2"
        style="width:200px;"
        @click="$router.push('/cardapio')"
      >Cardápio</q-btn>
  </div>
    </q-layout>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import header from '../components/header'
export default {
  components: {
    appHeader: header
  },
  data () {
    return {
      listaHistorico: []
    }
  },
  mounted () {
    this.$db.ref('pedidos').orderByChild('userId').equalTo(this.$user.uid).on('value', data => {
      const obj = data.val()
      this.listaHistorico = this.$_.map(obj, (pedidos, index) => {
        return pedidos
      })
      this.listaHistorico.reverse()
    })
  },
  computed: {
    ...mapGetters('example', [
      'getCarrinho',
      'getCountCarrinho'
    ])
  },
  methods: {
    valorProduto (valor) {
      return 'R$ ' + valor
    },
    changeSwipe (obj) {
      if (obj.direction === 'right') {
        this.$router.push('/carrinho')
      }
    },
    labelCollapse (item) {
      return item.estado + ' - Total: R$ ' + item.vlTotal
    },
    colorStatus (item) {
      if (item.estado === 'Aguardando confirmação') {
        console.log(item.estado)
        return 'text-red'
      } else if (item.estado === 'Pedido em andamento') {
        return 'text-blue'
      } else if (item.estado === 'Finalizado') {
        return 'text-green'
      }
    }
  }
}
</script>

<style>
    .done {
      text-decoration: line-through;
      color: #ccc;
    }
    .expense {
        border-bottom: #999 1px solid;
        position: relative;
        cursor: pointer;
    }
    .removeLink {
      color: #c00000;
      position: absolute;
      right: 0;
      bottom: 10px;
      font-size: 0.8em;
    }
</style>
