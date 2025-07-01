
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPhoneNumber, RecaptchaVerifier } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = window.auth;

window.register = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => location.href = "painel.html")
    .catch(alert);
};

window.login = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => location.href = "painel.html")
    .catch(alert);
};

window.loginPhone = () => {
  const phoneNumber = document.getElementById("phone").value;
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', { size: 'invisible' }, auth);
  signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
    .then(result => {
      const code = prompt("Digite o código recebido via SMS:");
      return result.confirm(code);
    })
    .then(() => location.href = "painel.html")
    .catch(alert);
};
