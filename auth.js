
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const auth = getAuth();

window.entrar = function () {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const aceite = document.getElementById("aceite").checked;

  if (!aceite) {
    alert("Você deve aceitar os Termos e Condições.");
    return;
  }

  signInWithEmailAndPassword(auth, email, senha)
    .then(() => window.location.href = "painel.html")
    .catch(() => {
      createUserWithEmailAndPassword(auth, email, senha)
        .then(() => window.location.href = "painel.html")
        .catch((error) => alert("Erro: " + error.message));
    });
};
