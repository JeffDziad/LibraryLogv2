<template>
  <div id="backgroundFilter"></div>
  <router-view />
</template>

<script setup>
import User from "./models/User";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthUser } from "src/store/authUser";
import { useUserData } from "src/store/userData";
import { where, query, collection, doc, onSnapshot, collectionGroup } from "firebase/firestore";
import { db } from "boot/firebase";
import {provide} from "vue";
import Library from "src/models/Library";
import {Notify} from "quasar";

function eid() {
  eid.count = eid.count ?? 1;
  return eid.count++;
}

function camelToReadable(str) {
  let words = [];
  let word = "";
  str+="X";
  for(let i = 0; i<str.length; i++) {
    if(str[i] === str[i].toUpperCase()) {
      words.push(word);
      word = "";
    }
    if(i === 0) {
      word += str[i].toUpperCase();
    } else word += str[i];
  }
  return words.join(' ');
}

function removeDuplicatesFromArray(arr) {
  return [...new Set(arr)];
}

function dupe(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function randInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function showNotif(color, textColor, message, icon=null, multiLine=false) {
  // const random = Math.random() * 100
  // const twoActions = random > 70
  // const buttonColor = color ? 'white' : void 0

  Notify.create({
    color,
    textColor,
    icon: icon,
    message,
    position: 'bottom-right',
    // avatar,
    multiLine,
    // actions: twoActions
    //   ? [
    //     { label: 'Reply', color: buttonColor, handler: () => { /* console.log('wooow') */ } },
    //     { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
    //   ]
    //   : (random > 40
    //       ? [{ label: 'Reply', color: buttonColor, handler: () => { /* console.log('wooow') */ } }]
    //       : null
    //   ),
    timeout: Math.random() * 5000 + 3000
  })
}

const auth = getAuth();
const authUser = useAuthUser();
const userData = useUserData();
onAuthStateChanged(auth, (user) => {
  if(user) {
    authUser.user = new User(user);
    // Setup Listeners/Snapshots of data. My Libraries/Shared Libraries.
    //? MY LIBRARIES LISTENER
    const librariesRef = collection(db, "libraries");
    const myLibrariesQuery = query(librariesRef, where("ownerUid", "==", authUser.user.uid));
    const myLibs = onSnapshot(myLibrariesQuery, (snapshot) => {
      const libs = [];
      snapshot.forEach((doc) => {
        libs.push(Library(doc.data(), doc.id));
      });
      userData.myLibraries = libs;
    });


    //? SHARED LIBRARIES LISTENER
    let q = query(collection(db, "libraries"), where('sharedWith', 'array-contains', user.email));
    let sharedLibs = onSnapshot(q, (snapshot) => {
      let libs = [];
      snapshot.forEach((doc) => {
        libs.push(Library(doc.data(), doc.id));
      });
      userData.sharedLibraries = libs;
    });
    userData.sharedLibraries = [];

    //? USER SETTINGS
    const usersRef = collection(db, "users");
    const u = onSnapshot(doc(db, "users", user.uid), (doc) => {
      userData.settings = doc.data();
    });
  } else {
    authUser.user = null;
    userData.myLibraries = [];
    userData.sharedLibraries = [];
    userData.settings = {};
  }
});

provide('eid', eid);
provide('camelToReadable', camelToReadable);
provide('removeDuplicatesFromArray', removeDuplicatesFromArray);
provide('dupe', dupe);
provide('randInRange', randInRange);
provide('showNotif', showNotif);
</script>

<style scoped>
#backgroundFilter {
  background: transparent;
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(5px);
}
</style>

