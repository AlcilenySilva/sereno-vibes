import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOtUX8oE31zE6vSPtYRyIsyjv_0wgyt6o",
  authDomain: "sereno-vibes.firebaseapp.com",
  projectId: "sereno-vibes",
  storageBucket: "sereno-vibes.appspot.com", // <- corrigido aqui
  messagingSenderId: "963561678895",
  appId: "1:963561678895:web:dfdd36ff0e47d2c548feda"
};

// Só inicializa se ainda não tiver inicializado
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app); 
export const db = getFirestore(app);
