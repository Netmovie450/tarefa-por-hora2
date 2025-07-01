
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const auth = getAuth();
const db = getDatabase();

onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Você precisa estar logado.");
    window.location.href = "index.html";
  } else {
    if (user.email === "netmovie450@gmail.com") {
      window.location.href = "admin.html";
    } else {
      document.getElementById("saldo").textContent = "5.00"; // Simulação para usuário normal
    }
  }
});

window.solicitarSaque = function () {
  const metodo = document.getElementById("metodo").value;
  const dados = document.getElementById("dados").value;
  const valor = 5;

  if (valor < 10) {
    alert("Valor mínimo para saque é 10 MZN");
    return;
  }

  push(ref(db, 'saques/'), {
    email: auth.currentUser.email,
    metodo: metodo,
    dados: dados,
    valor: valor,
    status: "Pendente",
    data: new Date().toISOString()
  }).then(() => {
    alert("Solicitação enviada!");
  }).catch(err => alert("Erro: " + err.message));
}
