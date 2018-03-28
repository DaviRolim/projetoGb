<template>
   <q-layout-header>
     <q-toolbar
        color="orange"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-toolbar-title>Guarana Brasil
          <span slot="subtitle" v-if="getUser">
            Logado com: {{ getUser }}
          </span>
        </q-toolbar-title>
               <q-btn
          flat
          dense
          round
          @click="logout"
          aria-label="Menu"
        >
          <q-icon name="fas fa-sign-out-alt" />
        </q-btn>
      </q-toolbar>
          <q-tabs glossy inverted>
            <!-- Tabs - notice slot="title" -->
            <q-route-tab to="/cardapio" default slot="title" name="tab-1" label="Cardápio"/>
            <q-route-tab to="/carrinho" slot="title" :count="getCountCarrinho" name="tab-2" label="Carrinho"/>
            <q-route-tab to="/historico" slot="title" name="tab-3" label="Histórico" />

            <!-- Targets -->
          </q-tabs>

    </q-layout-header>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  methods: {
    logout () {
      this.esvaziaCarrinho(this.$state)
      this.$auth.signOut()
    },
    ...mapActions('example', [
      'esvaziaCarrinho'
    ])
  },
  computed: {
    ...mapGetters('example', [
      'getCarrinho',
      'getCountCarrinho'
    ]),
    getUser () {
      console.log(this.$user.email.split('@')[0])
      return this.$user.email.split('@')[0]
    }
  }
}
</script>
<style>

</style>
