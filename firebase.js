
// Importa SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyCSqQqlMFsMNLdRUUH0jj7r00tl8GueIdg",
  authDomain: "tarefa-por-hora2.firebaseapp.com",
  projectId: "tarefa-por-hora2",
  storageBucket: "tarefa-por-hora2.firebasestorage.app",
  messagingSenderId: "187207930417",
  appId: "1:187207930417:web:ab50d2cccfeb43a457fb10",
  measurementId: "G-4TSW0SBZ79"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
window.auth = auth;
