import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAkYXC0c6z1prlExE2dtnQOsmWqJvSgP2g",
  authDomain: "speakerore-7f591.firebaseapp.com",
  projectId: "speakerore-7f591",
  storageBucket: "speakerore-7f591.appspot.com",
  messagingSenderId: "944422926893",
  appId: "1:944422926893:web:88cf422a8a871c5212d6a4",
  measurementId: "G-YPJNE2V4EV",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const provider = new GoogleAuthProvider();

export const auth = getAuth();
export function signInwithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      return user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      return "error";
      // ...
    });
}
