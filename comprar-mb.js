
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const auth = getAuth();
const db = getDatabase();

onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Você precisa estar logado.");
    window.location.href = "index.html";
  }
});

window.comprar = function () {
  const pacote = document.getElementById("pacote").value;
  const numero = document.getElementById("numero").value;

  if (!numero || !pacote) {
    alert("Preencha todos os campos!");
    return;
  }

  push(ref(db, "comprasMB"), {
    email: auth.currentUser.email,
    numero,
    pacote,
    status: "Pendente",
    data: new Date().toISOString()
  }).then(() => {
    alert("Pedido enviado! Pague via M-Pesa para +258862592983.");
  });
};
