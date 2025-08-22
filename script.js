// script.js

document.getElementById("cadastroForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    nome: document.getElementById("nome").value,
    unidade: document.getElementById("unidade").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    endereco: document.getElementById("endereco").value,
    contato: document.getElementById("contato").value,
    atividade: document.getElementById("atividade").value,
    tempo: document.getElementById("tempo").value,
    observacao: document.getElementById("observacao").value,
    compartilhar: document.getElementById("compartilhar").checked
  };

  let dados = JSON.parse(localStorage.getItem("clientes")) || [];
  dados.push(formData);
  localStorage.setItem("clientes", JSON.stringify(dados));

  alert("Informações salvas com sucesso!");
  window.location.href = "dados.html";
});
