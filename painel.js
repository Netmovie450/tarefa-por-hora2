
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
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
      return;
    }

    document.getElementById("saldo").textContent = "5.00"; // Simulação

    // Mostrar histórico de compras de MB
    const histRef = ref(db, "comprasMB");
    const ul = document.getElementById("historico");

    onValue(histRef, (snapshot) => {
      ul.innerHTML = "";
      snapshot.forEach((child) => {
        const item = child.val();
        if (item.email === user.email) {
          const li = document.createElement("li");
          li.textContent = `${item.pacote} para ${item.numero} [${item.status}]`;
          ul.appendChild(li);
        }
      });
    });
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
};
