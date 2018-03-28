<template>
  <div style="row justify-center width: 500px; max-width: 100vw;">
    <q-layout>
    <app-header></app-header>
    <q-page-container>
    <q-list highlight inset-separator>
      <q-list-header>Cardápio</q-list-header>
      <q-item multiline v-for="(item, index) in listaCardapio" :key="index">
        <!-- <q-item-side avatar="statics/boy-avatar.png" /> -->
        <q-item-main
          :label=item.nmProduto
          label-lines="1"
          :sublabel=item.dsProduto
          sublabel-lines="2"
        />
      <q-btn @click="dialogCarrinho(item)"> <q-item-side text-color="red" tag right :stamp=valorProduto(item.vlProduto) /> </q-btn>
       </q-item>
    </q-list>
    </q-page-container>
        <!-- <div class="expense" v-for="(item, index) in listaCardapio" :key="index">
            <p :class="{ done: item.done }">{{ item.nmProduto }} - R$ {{ item.vlProduto }}</p>
            <p :class="{ done: item.done }">{{ item.dsProduto }}</p>
            <q-btn href="#" color="blue" class="on-left" @click.prevent="adicionarItem(item)">Adicionar</q-btn>
            <q-btn href="#" color="red" class="removeLink" @click.prevent="mostra">Mostrar</q-btn>
        </div> -->

    </q-layout>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import header from '../components/header'
export default {
  components: {
    appHeader: header
  },
  data () {
    return {
      listaCardapio: []
    }
  },
  mounted () {
    this.$db.ref('cadastro').on('value', data => {
      const obj = data.val()
      this.listaCardapio = this.$_.map(obj, (cadastro, index) => {
        console.log('cadastro: ' + cadastro)
        return cadastro
      })
    })
  },
  computed: {
    ...mapGetters('example', [
      'getCarrinho',
      'getCountCarrinho'
    ])
  },
  methods: {
    ...mapActions('example', [
      'addItem'
    ]),
    retornaConcat (obj) {
      return obj.nmProduto + '- R$' + obj.vlProduto
    },
    valorProduto (valor) {
      return 'R$ ' + valor
    },
    dialogCarrinho (item) {
      this.$q.dialog({
        title: 'Confirmação',
        message: 'Deseja adicionar ao carrinho?',
        ok: 'Sim',
        cancel: 'Não'})
        .then(() => {
          this.$q.notify({message: 'Item adicionado ao carrinho', type: 'positive'})
          this.adicionarItem(item)
        }).catch(() => {
          console.log('nao comprou')
        })
    },
    adicionarItem (item) {
      const cloned = JSON.parse(JSON.stringify(item))
      console.log(cloned)
      this.addItem(cloned)
      // same as
      // this.$store.dispatch('example/addDespesa', this.expenses)
    },
    mostra () {
      // console.log(this.listaCardapio[0].nmProduto)
      console.log(this.getCarrinho)
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
