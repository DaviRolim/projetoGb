<template>
   <q-layout-header style="position: fixed">
     <q-toolbar
        color="orange"
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
          <q-tabs inverted color="orange-4">
            <!-- Tabs - notice slot="title" -->
            <q-route-tab to="/cardapio" default slot="title" name="tab-1" label="Cardápio"/>
            <q-route-tab to="/carrinho"  slot="title" :count="getCountCarrinho" name="tab-2" label="Carrinho"/>
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
    ]),
    show (event) {
      console.log(event)
    }
  },
  computed: {
    ...mapGetters('example', [
      'getCarrinho',
      'getCountCarrinho'
    ]),
    getUser () {
      if (this.$user) {
        return this.$user.email.split('@')[0]
      } else {
        return ''
      }
    }
  }
}
</script>
<style>

</style>
