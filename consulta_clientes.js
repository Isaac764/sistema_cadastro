//consulta_dados.js//
const buscarBtn = document.getElementById("buscarCliente");
const salvarBtn = document.getElementById("salvarStatus");
const dadosDiv = document.getElementById("dadosCliente");
let clienteAtual = null;

buscarBtn.addEventListener("click", () => {
  const nomeBusca = document.getElementById("nomeBusca").value.trim().toLowerCase();
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

  clienteAtual = clientes.find(c => c.nome.toLowerCase() === nomeBusca);

  if (clienteAtual) {
    dadosDiv.style.display = "block";
    document.getElementById("nome").value = clienteAtual.nome;
    document.getElementById("bairro").value = clienteAtual.bairro;
    document.getElementById("cidade").value = clienteAtual.cidade;
    document.getElementById("endereco").value = clienteAtual.endereco;
    document.getElementById("contato").value = clienteAtual.contato;
    document.getElementById("tempo").value = clienteAtual.tempo;
    document.getElementById("atividade").value = clienteAtual.atividade;    
    document.getElementById("observacao").value = clienteAtual.observacao;
  } else {
    alert("Cliente não encontrado.");
    dadosDiv.style.display = "none";
  }
});

salvarBtn.addEventListener("click", () => {
  if (!clienteAtual) return;
  const statusSelecionado = document.querySelector("input[name='status']:checked");
  if (!statusSelecionado) {
    alert("Selecione um status.");
    return;
  }

  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const index = clientes.findIndex(c => c.nome === clienteAtual.nome);

  if (index !== -1) {
    clientes[index].status = statusSelecionado.value;
    localStorage.setItem("clientes", JSON.stringify(clientes));
    alert("Status atualizado com sucesso!");
  }
});