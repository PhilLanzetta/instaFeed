import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

console.log(process.env.REACT_APP_API_KEY)

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'instagram---ytt.firebaseapp.com',
  projectId: 'instagram---ytt',
  storageBucket: 'instagram---ytt.appspot.com',
  messagingSenderId: '634230039708',
  appId: '1:634230039708:web:0ca9c3f4572a1ed7d9b959',
  measurementId: 'G-8NVPBZXF1D',
}

const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore

export { firebase, FieldValue }
