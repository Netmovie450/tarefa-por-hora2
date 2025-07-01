
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

function solicitarSaque() {
  const auth = getAuth();
  const user = auth.currentUser;
  const metodo = document.getElementById("metodo").value;
  const dados = document.getElementById("dados").value;

  if (!user || !dados) {
    alert("Preencha os dados corretamente.");
    return;
  }

  const db = getDatabase();
  push(ref(db, 'saques/'), {
    email: user.email,
    metodo: metodo,
    dados: dados,
    valor: 0.50,
    status: "Pendente",
    data: new Date().toISOString()
  }).then(() => {
    alert("Solicitação enviada com sucesso!");
  }).catch(err => alert("Erro: " + err.message));
}
