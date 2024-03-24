import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD_193_UefV9W29Z2t3BSomwQ6bl5T36xo',
  authDomain: 'soundscape-city.firebaseapp.com',
  projectId: 'soundscape-city',
  storageBucket: 'soundscape-city.appspot.com',
  messagingSenderId: '43599070383',
  appId: '1:43599070383:web:8761958ae737e8722d005a',
  measurementId: 'G-4E5VHG7SYW',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// initialise firestore
const db = getFirestore(app)

// initialise authentication
const auth = getAuth(app)

// TODO: get functions for these exports
export { db, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword }
