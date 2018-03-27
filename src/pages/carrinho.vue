<template>
  <div>
    <q-layout>
        <q-layout-header>
 <!--     <q-toolbar
        color="orange"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-toolbar-title>Guarana Brasil</q-toolbar-title>
      </q-toolbar>   -->
          <q-tabs glossy inverted>
            <!-- Tabs - notice slot="title" -->
            <q-route-tab to="/cardapio" default slot="title" name="tab-1" label="Cardápio"/>
            <q-route-tab to="/carrinho" slot="title" :count="getCountCarrinho" name="tab-2" label="Carrinho"/>
            <q-route-tab to="/historico" slot="title" name="tab-3" label="Histórico" />

            <!-- Targets -->
          </q-tabs>

    </q-layout-header>

       <q-list highlight inset-separator>
      <q-list-header>Carrinho</q-list-header>
      <q-item multiline v-for="(item, index) in listaCarrinho" :key="index">
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

    </q-layout>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      listaCarrinho: []
    }
  },
  mounted () {
    this.listaCarrinho = this.getCarrinho
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
    }
  }
}
</script>
<style>

</style>
