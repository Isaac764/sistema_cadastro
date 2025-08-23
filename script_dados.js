// script_dados.js
import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

async function carregarClientes() {
  const tabela = document.getElementById("tabelaClientes").querySelector("tbody");
  tabela.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "clientes"));
  querySnapshot.forEach((doc) => {
    const cliente = doc.data();
    const row = `
      <tr>
        <td>${cliente.nome}</td>
        <td>${cliente.unidade}</td>
        <td>${cliente.bairro}</td>
        <td>${cliente.cidade}</td>
        <td>${cliente.endereco}</td>
        <td>${cliente.contato}</td>
        <td>${cliente.atividade}</td>
        <td>${cliente.tempo}</td>
        <td>${cliente.observacao}</td>
        <td>${cliente.compartilhar}</td>
      </tr>
    `;
    tabela.innerHTML += row;
  });
}

window.onload = carregarClientes;

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

