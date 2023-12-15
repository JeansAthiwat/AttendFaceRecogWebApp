import firebase from 'firebase'
import 'firebase/firebase-firestore'
import firebaseConfig from './firebaseConfig'
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
db.settings({ timestampsInSnapshots: true })

export default db