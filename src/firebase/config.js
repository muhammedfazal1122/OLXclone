import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBYo75kviDyfsoQhBrlQ5l-OdNU74yL2CQ",
  authDomain: "my-project-be76b.firebaseapp.com",
  projectId: "my-project-be76b",
  storageBucket: "my-project-be76b.appspot.com",
  messagingSenderId: "1059878279425",
  appId: "1:1059878279425:web:f0570b40c8a246d7daa300",
  measurementId: "G-XF8E14520E"
  
};


 export default firebase.initializeApp(firebaseConfig)