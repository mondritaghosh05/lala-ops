import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBE14mHY15AftL31gNIaQdPlvVywNUfVQE",
  authDomain: "lala-ops.firebaseapp.com",
  projectId: "lala-ops",
  storageBucket: "lala-ops.firebasestorage.app",
  messagingSenderId: "475167236417",
  appId: "1:475167236417:web:dc5fff47144af123e5c1c0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);