<template>
  <div>
    <q-layout>
        <q-layout-header>
          <q-tabs glossy inverted>
            <q-route-tab to="/cardapio" default slot="title" name="tab-1" label="Cardápio"/>
            <q-route-tab to="/carrinho" slot="title" :count="getCountCarrinho" name="tab-2" label="Carrinho"/>
            <q-route-tab to="/historico" slot="title" name="tab-3" label="Histórico" />
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
      <!-- <q-btn @click="dialogCarrinho(item)"> <q-item-side text-color="red" tag right :stamp=valorProduto(item.vlProduto) /> </q-btn> -->
      <q-btn round size="sm" color="red" icon="close" @click="removeDoCarrinho(item)"/>
       </q-item>
    </q-list>

    </q-layout>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
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
    },
    ...mapActions('example', [
      'addItem',
      'removeItem'
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
    }
  }
}
</script>
<style>

</style>
