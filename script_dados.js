// script_dados.js
const dados = JSON.parse(localStorage.getItem("clientes")) || [];
const tbody = document.querySelector("tbody");
const filtro = document.getElementById("filtro");

function mostrarDados(lista) {
  tbody.innerHTML = "";
  lista.forEach(cliente => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${cliente.nome}</td>
      <td>${cliente.unidade}</td>
      <td>${cliente.bairro}</td>
      <td>${cliente.cidade}</td>
      <td>${cliente.endereco}</td>
      <td>${cliente.contato}</td>
      <td>${cliente.atividade}</td>
      <td>${cliente.tempo}</td>
      <td>${cliente.observacao}</td>
    `;
    tbody.appendChild(tr);
  });
}

filtro.addEventListener("input", () => {
  const termo = filtro.value.toLowerCase();
  const filtrado = dados.filter(d => d.bairro.toLowerCase().includes(termo));
  mostrarDados(filtrado);
});

  //Extrair planilha
  document.getElementById("exportar").addEventListener("click", () => {
  const tabela = document.getElementById("tabela");
  const wb = XLSX.utils.book_new(); // Cria um novo workbook

  // Captura os dados da tabela HTML (apenas o que está na tela)
  const ws = XLSX.utils.table_to_sheet(tabela);

  XLSX.utils.book_append_sheet(wb, ws, "Clientes");

  // Gera e baixa o arquivo .xlsx
  XLSX.writeFile(wb, "clientes_filtrados.xlsx");
});

//Botão para limpar  informações
document.getElementById("limpar").addEventListener("click", () => {
  if (confirm("Tem certeza que deseja apagar todos os dados salvos?")) {
    localStorage.removeItem("clientes");
    tbody.innerHTML = "";
    alert("Todos os dados foram apagados com sucesso.");
  }
});

voltar.addEventListener("click", () =>{
  window.location.href = "index.html";
});

mostrarDados(dados);