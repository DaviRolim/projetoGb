<template>
  <div style="row justify-center width: 500px; max-width: 100vw;">
    <q-layout>
    <app-header></app-header>
    <q-page-container>
      <q-select
      stack-label="Filtre por tipo"
      inverted-light
      color="deep-purple-1"
      separator
      v-model="select"
      :options="options"
      />
    <q-list highlight inset-separator>
      <q-item multiline v-for="(item, index) in listaFiltro" :key="index">
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
      listaCardapio: [],
      listaFiltro: [],
      select: 'todos',
      options: [
        {
          label: 'Todos',
          value: 'todos'
        },
        {
          label: 'Sanduiches',
          value: 'sanduiche'
        },
        {
          label: 'Baguetes',
          value: 'baguete'
        },
        {
          label: 'Sugestões',
          value: 'sugestao'
        },
        {
          label: 'Vitaminas',
          value: 'vitamina'
        },
        {
          label: 'Maltados',
          value: 'maltado'
        },
        {
          label: 'Energéticos',
          value: 'energetico'
        },
        {
          label: 'Saladas',
          value: 'salada'
        },
        {
          label: 'Sucos',
          value: 'suco'
        }
      ]
    }
  },
  mounted () {
    this.$db.ref('cadastro').on('value', data => {
      const obj = data.val()
      this.listaCardapio = this.$_.map(obj, (cadastro, index) => {
        return cadastro
      })
      const cardapioClone = this.$_.clone(this.listaCardapio)
      this.listaFiltro = cardapioClone
    })
  },
  watch: {
    select (value) {
      const cardapioClone = this.$_.clone(this.listaCardapio)
      if (value === 'todos') {
        this.listaFiltro = cardapioClone
      } else {
        this.listaFiltro = cardapioClone.filter((item) => item.gpProduto === value)
      }
    }
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
          this.$q.notify({message: 'Item adicionado ao carrinho', type: 'positive', timeout: 500})
          this.adicionarItem(item)
        }).catch(() => {
          console.log('nao comprou')
        })
    },
    adicionarItem (item) {
      const cloned = JSON.parse(JSON.stringify(item))
      this.addItem(cloned)
      // console.log(this.listaCardapio.filter((algo) => algo.gpProduto === 'sanduiche'))
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
