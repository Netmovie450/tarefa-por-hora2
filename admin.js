
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const auth = getAuth();
const db = getDatabase();

onAuthStateChanged(auth, (user) => {
  if (!user || user.email !== "netmovie450@gmail.com") {
    alert("Acesso restrito!");
    window.location.href = "index.html";
    return;
  }

  const lista = document.getElementById("saques");
  const ranking = document.getElementById("ranking");

  const saquesRef = ref(db, "saques");
  const comprasRef = ref(db, "comprasMB");

  onValue(saquesRef, (snapshot) => {
    lista.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      const saque = childSnapshot.val();
      const key = childSnapshot.key;

      const item = document.createElement("li");
      item.innerHTML = \`
        <strong>\${saque.email}</strong> — \${saque.metodo} • \${saque.dados} — \${saque.valor} MZN
        [<em>\${saque.status}</em>]
        <button onclick="aprovarSaque('\${key}')">Aprovar</button>
      \`;
      lista.appendChild(item);
    });
  });

  onValue(comprasRef, (snapshot) => {
    const contagem = {};
    snapshot.forEach(child => {
      const { email } = child.val();
      contagem[email] = (contagem[email] || 0) + 1;
    });

    const ordenado = Object.entries(contagem).sort((a, b) => b[1] - a[1]);
    ranking.innerHTML = "";
    ordenado.forEach(([email, total]) => {
      const li = document.createElement("li");
      li.textContent = \`\${email}: \${total} compra(s)\`;
      ranking.appendChild(li);
    });
  });
});

window.aprovarSaque = function(id) {
  const saqueRef = ref(db, "saques/" + id);
  update(saqueRef, { status: "Aprovado" }).then(() => {
    alert("Saque aprovado!");
  });
};
