import { db } from "boot/firebase";
import { doc, setDoc } from "firebase/firestore";

async function initializeNewUser(user) {
  await setDoc(doc(db, "users", user.uid), {
    accountSettings: {
      test: "test",
    },
  });
}

export {initializeNewUser}
