import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.getElementById("formCadastro").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData= {
    nome: document.getElementById("nome").value,
    unidade: document.getElementById("unidade").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    endereco: document.getElementById("endereco").value,
    contato: document.getElementById("contato").value,
    atividade: document.getElementById("atividade").value,
    tempo: document.getElementById("tempo").value,
    observacao: document.getElementById("observacao").value,
    compartilhar: document.getElementById("compartilhar").checked,
  };

  try {
    await addDoc(collection(db, "clientes"), {
      nome,
      unidade,
      bairro,
      cidade,
      contato,
      atividade,
      tempo,
      observacao,
     status: "Pendente"

    });
    alert("Cliente cadastrado com sucesso!");
    e.target.reset();
  } catch (err) {
    console.error("Erro ao salvar:", err);
  }
  window.location.href = "dados.html";
});

