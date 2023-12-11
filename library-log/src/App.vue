<template>
  <router-view />
</template>

<script setup>
import User from "./models/User";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthUser } from "src/store/authUser";
import { useUserData } from "src/store/userData";
import { where, query, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "boot/firebase";
import {provide} from "vue";
import Library from "src/models/Library";

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



  } else {
    authUser.user = null;
    userData.myLibraries = [];
  }
});

provide('eid', eid);
provide('camelToReadable', camelToReadable);
provide('removeDuplicatesFromArray', removeDuplicatesFromArray);
</script>

