<template>
  <q-layout>
    <div class="layout-view" >
      <div class="text-center container">
      <img src="../../assets/oie_transparent.png" alt="login" >
      </div>
      <br>
      <br>
      <div class="text-center">
     <q-btn-group push>
        <q-btn color="blue-3" push label="Log In" @click="signUp = false"/>
        <q-btn color="indigo-7" push label="Criar Conta" @click="signUp = true"/>
      </q-btn-group>
      </div>
       <form class="container" @submit.prevent="submit">
          <q-field
              icon="email"
              label="Email"
              error-label="We need a valid email"
            >
            <q-input type="email" v-model="email" color="indigo-7" placeholder="E-mail" />
          </q-field>
          <br>
          <q-field
          label="Senha"
          icon="lock outline"
          >
            <q-input type="password" color="indigo-7" v-model="password" placeholder="Password" />
          </q-field>
          <br>
          <br>
          <br>
          <q-btn v-if="!signUp" color="green-9" icon-right="send" class="full-width" label="Entrar" />
          <q-btn v-else color="black" icon-right="send" class="full-width" label="Cadastrar" @click="cadastrar" />
      </form>
    </div>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      signUp: false
    }
  },
  methods: {
    submit () {
      const { email, password } = this
      if (email !== '' && password !== '') {
        this.$auth.signInWithEmailAndPassword(
          email, password
        )
      }
    },
    cadastrar () {
      this.$auth.createUserWithEmailAndPassword(this.email, this.password).catch((error) => {
        var errorMessage = error.message
        this.$q.notify(errorMessage)
      })
    }
  },
  mounted () {
    this.$auth.onAuthStateChanged(user => {
      if (user) {
        this.$router.push({ path: '/' })
      }
    })
  }
}
</script>

<style scoped>
  form {
    padding: 20px;
  }
  .container div {
    margin-bottom: 25px;
  }
  .container div:last-of-type {
    margin-bottom: -10px;
  }
  .container {
    margin-top: 5%;
  }
  #tela {
    background-image: url('data:image/jpeg;base64,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');
  }
</style>
