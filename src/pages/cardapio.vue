<template>
  <div style="row justify-center width: 500px; max-width: 96vw;">
    <q-layout>
    <q-layout-header>
      <q-toolbar
        color="orange"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-toolbar-title>Guarana Brasil</q-toolbar-title>
      </q-toolbar>
          <q-tabs>
            <!-- Tabs - notice slot="title" -->
            <q-tab default count="5" slot="title" name="tab-1" icon="message" />
            <q-tab disable slot="title" name="tab-2" icon="fingerprint" />
            <q-tab alert slot="title" name="tab-3" icon="account_box" />
            <q-tab slot="title" name="tab-4" icon="accessibility" />
            <q-tab slot="title" name="tab-5" icon="build" />

            <!-- Targets -->
            <q-tab-pane name="tab-1">Tab One</q-tab-pane>
            <q-tab-pane name="tab-2">Tab Two</q-tab-pane>
            <q-tab-pane name="tab-3">Tab Three</q-tab-pane>
            <q-tab-pane name="tab-4">Tab Four</q-tab-pane>
            <q-tab-pane name="tab-5">Tab Five</q-tab-pane>
          </q-tabs>

    </q-layout-header>
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
export default {
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
      'getCarrinho'
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
