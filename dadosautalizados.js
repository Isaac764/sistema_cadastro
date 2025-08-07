// dados_atualizado.js

document.addEventListener('DOMContentLoaded', () => {
  const tabela = document.getElementById('tabelaDados');
  const btnExportar = document.getElementById('btnExportar');

  function carregarDados() {
    const dados = JSON.parse(localStorage.getItem('clientes')) || [];

    dados.forEach((cliente, index) => {
      const linha = tabela.insertRow();

      const colunas = [
        cliente.nome,
        cliente.bairro,
        cliente.cidade,
        cliente.endereco,
        cliente.contato,
        cliente.atividade,
        cliente.tempo,
        cliente.observacao,
        cliente.statusCliente || 'Não atualizado'
      ];

      colunas.forEach(texto => {
        const celula = linha.insertCell();
        celula.textContent = texto;
      });
    });
  }

  function exportarParaXLSX() {
    const dados = [];
    const linhas = tabela.rows;

    const cabecalho = [
      'Nome', 'Bairro', 'Cidade', 'Endereço', 'Contato',
      'Atividade Comercial', 'Tempo de Atividade',
      'Observação', 'Status Cliente'
    ];
    dados.push(cabecalho);

    for (let i = 0; i < linhas.length; i++) {
      const linha = [];
      const celulas = linhas[i].cells;

      for (let j = 0; j < celulas.length; j++) {
        linha.push(celulas[j].textContent);
      }

      dados.push(linha);
    }

    const worksheet = XLSX.utils.aoa_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');

    XLSX.writeFile(workbook, 'dados_atualizados.xlsx');
  }

  btnExportar.addEventListener('click', exportarParaXLSX);
  carregarDados();
});