import Firebase from 'firebase'

var config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
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
