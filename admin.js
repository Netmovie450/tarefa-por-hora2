
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const db = getDatabase();
const lista = document.getElementById("lista-saques");
const saquesRef = ref(db, 'saques/');

onValue(saquesRef, (snapshot) => {
  lista.innerHTML = '';
  snapshot.forEach(child => {
    const dado = child.val();
    const div = document.createElement("div");
    div.innerHTML = `<b>${dado.email}</b> - ${dado.metodo} (${dado.dados}) - ${dado.valor} MZN - ${dado.status}
    <button onclick="aprovarSaque('${child.key}')">Aprovar</button><hr>`;
    lista.appendChild(div);
  });
});

function aprovarSaque(id) {
  const saqueRef = ref(db, 'saques/' + id);
  update(saqueRef, { status: "Pago" });
  alert("Saque marcado como Pago.");
}
