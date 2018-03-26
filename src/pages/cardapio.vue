<template>
    <div>
        <div class="expense" v-for="(item, index) in listaCardapio" :key="index">
            <p :class="{ done: item.done }">{{ item.nmProduto }} - R$ {{ item.vlProduto }}</p>
            <p :class="{ done: item.done }">{{ item.dsProduto }}</p>
            <!-- <q-btn href="#" color="red" class="removeLink" @click.prevent="askRemove(item)">REMOVER</q-btn> -->
            <q-btn href="#" color="blue" class="removeLink" @click.prevent="mostra">REMOVER</q-btn>
        </div>
    </div>
</template>

<script>
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
  methods: {
    askRemove (expense) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Deseja realmente excluir?',
        ok: 'Sim',
        cancel: 'Não'})
        .then(() => {
          this.$q.notify({message: 'Item excluido com sucesso', type: 'positive'})
          this.remove(expense)
        }).catch(() => {
          this.$q.notify('Life goes on')
        })
    },
    mostra () {
      console.log(this.listaCardapio[0].nmProduto)
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
