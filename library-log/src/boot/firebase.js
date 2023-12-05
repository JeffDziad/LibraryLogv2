import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app';
import {createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do

});

const firebaseConfig = {
  apiKey: "AIzaSyCPlmrZOifK27CAwPsG48TyezwdyOMWGWg",
  authDomain: "librarylog-c2ebb.firebaseapp.com",
  projectId: "librarylog-c2ebb",
  storageBucket: "librarylog-c2ebb.appspot.com",
  messagingSenderId: "466601831909",
  appId: "1:466601831909:web:f9407815ad7eabddced30c"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, firebaseAuth, db };
