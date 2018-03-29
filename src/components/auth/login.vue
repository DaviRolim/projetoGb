<template>
  <q-layout>
    <div class="container" id="tela"  >
      <div class="text-center" id="logo">
      <img src="../../assets/logo.png" alt="login" class="logo">
      </div>
      <p v-if="!signUp" class="text-center" style="font-style: italic; font-size: 150%;">Log In</p>
      <p v-else class="text-center" style="font-style: italic; font-size: 150%;">Cadastre-se</p>
      <div class="row justify-center" id="botoes" style="padding-left: 20px">
        <div class="col-4 self-center" style="padding-right: 5px">
          <q-btn color="amber-3" text-color="black" push label="Log In" @click="signUp = false" style="width: 100%"/>
        </div>
        <div class="col-4">
            <q-btn color="amber-3" text-color="black" push label="Criar Conta" @click="signUp = true" style="width: 100%"/>
        </div>
      </div>
       <form @submit.prevent="submit">
          <q-field
              icon="email"
              float-label="Email"
              error-label="We need a valid email"
              class="field"
              icon-color="deep-purple-1"
            >
            <q-input type="email" v-model="email"  color="deep-purple-1" placeholder="E-mail" />
          </q-field>
          <q-field
          float-label="Senha"
          icon="lock outline"
          class="field"
          icon-color="deep-purple-1"
          >
            <q-input type="password" color="deep-purple-1" v-model="password" placeholder="Password" />
          </q-field>
          <br>
          <q-btn v-if="!signUp" color="brown-3" icon-right="send" class="full-width" label="Entrar" />
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
        this.$router.push({ path: '/cardapio' })
      }
    })
  }
}
</script>

<style scoped>
  form {
    padding: 0px 25px;
  }
  #tela {
    background-image: url('http://www.emruzonline.com/wp-content/uploads/hamburger-emruzonline.jpg');
  }
  .logo {
    padding-top: 3%;
    width: 170px;
    height: 170px;
    margin-bottom: 8%;
  }
  .container {
    width: 100%;
  }
  #botoes {
    margin-bottom: 10%;
  }
  .field {
    margin-bottom: 5%;
  }
</style>
