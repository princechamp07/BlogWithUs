import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANXG0OYP1eSRlgD57PDn9wATgrPkXgVfw",
  authDomain: "blogwithus-21b04.firebaseapp.com",
  projectId: "blogwithus-21b04",
  storageBucket: "blogwithus-21b04.appspot.com",
  messagingSenderId: "91539673753",
  appId: "1:91539673753:web:76847e2bcc6a13a4609e08",
  measurementId: "G-PEMK1EKRSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =getFirestore(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const storage = getStorage(app, "gs://my-custom-bucket"); 


export {storage,db,auth,provider}

export default app;