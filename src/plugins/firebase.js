import Firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyAp7nJZbk7JH79hKCPurXSaBsXmjeJxITg',
  authDomain: 'projetogb-16c2d.firebaseapp.com',
  databaseURL: 'https://projetogb-16c2d.firebaseio.com',
  projectId: 'projetogb-16c2d',
  storageBucket: 'projetogb-16c2d.appspot.com',
  messagingSenderId: '400373730750'
}
const connection = Firebase.initializeApp(config)
const db = connection.database()
const auth = connection.auth()

export default ({ Vue, router }) => {
  Firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      router.push({ path: 'auth' })
    } else {
      Vue.prototype.$user = user
    }
  })
  Vue.prototype.$db = db
  Vue.prototype.$auth = auth
}
