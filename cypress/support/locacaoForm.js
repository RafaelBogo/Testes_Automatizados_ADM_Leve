export class LocacaoForm {
  // Elementos da interface mapeados como funções que retornam seletores Cypress
  elements = {
    // Campos do formulário de dados principais da locação
    descricao: () => cy.get('input#descricao'),
    data: () => cy.get('input#data'),
    diasDuracao: () => cy.get('input#diasDuracao'),
    observacoes: () => cy.get('textarea#observacoes'),

    // Seleção de cliente
    nomeCliente: () => cy.get('#nomeCliente'),
    lupaCliente: () => cy.get('button[data-target="#pesquisaRapidaClientes"]'),
    clienteModal: () => cy.get('input#nomeClienteModal'),
    botaoPesquisarCliente: () => cy.get('button.js-pesquisa-rapida-clientes-btn'),
    resultadoCliente: (nome) => cy.contains('td', nome),

    // Campos de equipamento
    equipamentoInput: () => cy.get('input.form-control.equipamentoAutoComplete'),
    equipamentoSelecionado: () => cy.get('div.equipamento-autocomplete'),
    quantidade: () => cy.get('input#quantidade'),
    diasEquipamento: () => cy.get('input#qtdDias'),
    descricaoComplementar: () => cy.get('input#descrComplementar'),
    botaoAdicionarEquipamento: () => cy.get('button#adicionaEquipamento'),
    listaEquipamento: () => cy.get('table tbody tr'),
    totalItens: () => cy.get('span').contains('Itens:'),

    // Datas e horários da locação
    dataInicial: () => cy.get('input#dataInicial'),
    horaInicial: () => cy.get("input#horaInicial"),
    dataFinal: () => cy.get("input#dataDevolucao"),
    horaFinal: () => cy.get("input#horaDevolucao1"),

    // Campos de pagamento
    tipoCarteira: () => cy.get('select#tipoCarteira'),
    tipoCarteiraSelect: () => cy.get('#select2-tipoCarteira-container'),
    conta: () => cy.get('select#conta'),
    contaSelect: () => cy.get('#select2-conta-container'),
    condicaoPagamentoSelect: () => cy.get('#select2-condicaoPagamento-container'),
    condicaoPagamento: () => cy.get('select#condicaoPagamento'),
    select2Option: (label) => cy.get('.select2-results__option').contains(label),

    // Parcelas
    vencimentoParcela: () => cy.get('input[name="parcelas[0].vencimento"]'),
    valorParcela: () => cy.get('input[name="parcelas[0].valor"]'),

    // Botões e alertas
    btnSalvarLocacao: () => cy.get('#btnSalvaLocacao'),
    alertaSucesso: () => cy.get('.alert-success'),
    btnListaLocacoes: () => cy.get('.btn-primary').contains('Lista de Locações de Equipamento'),
    btnDevolucao: () => cy.get('.btn-devolucao-locacao').first(),
    textoCliente: () => cy.get('span.lead.w-100.font-14'),
    checkboxSelecao: () => cy.get('input.js-selecao'),
    inputObservacaoDevolucao: () => cy.get('input.observacao'),
    textoTotal: () => cy.contains('Total:'),
    btnDevolverItem: () => cy.get('#devolver-item'),
    alertaSucessoDevolucao: () => cy.get('.alert-success strong'),
    btnExclusao: () => cy.get('.js-exclusao-btn').first(),
    confirmarExclusao: () => cy.get('.swal2-confirm'),
    popupExclusao: () => cy.get('.swal2-popup'),
  }

  // Preenche o campo de descrição da locação
  preencherDescricao(texto) {
    if (!texto) return;
    this.elements.descricao().type(texto);
  }

  // Preenche a data da locação
  preencherData(dataIso) {
    if (!dataIso) return;
    this.elements.data().clear().type(dataIso);
  }

  // Preenche o campo de quantidade de dias da locação
  preencherDias(dias) {
    this.elements.diasDuracao().clear().type(dias);
  }

  // Preenche o campo de observações
  preencherObservacoes(obs) {
    this.elements.observacoes().type(obs);
  }

  // Realiza a seleção de cliente utilizando a busca no modal
  selecionarCliente(nome) {
    this.elements.nomeCliente().click();
    this.elements.lupaCliente().click();
    this.elements.clienteModal().type(nome);
    this.elements.botaoPesquisarCliente().click();
    this.elements.resultadoCliente(nome).click();
  }

  // Adiciona um equipamento à locação preenchendo todos os campos necessários
  adicionarEquipamento({ termoBusca, quantidade, dias, complemento, dataInicial, horaInicial, dataFinal, horaFinal }) {
    this.elements.equipamentoInput().type(termoBusca);
    cy.wait(300); // aguarda carregamento do autocomplete
    this.elements.equipamentoSelecionado().click();
    this.elements.quantidade().clear().type(quantidade);
    this.elements.diasEquipamento().clear().type(dias);
    this.elements.descricaoComplementar().clear().type(complemento);
    this.elements.dataInicial().clear().type(dataInicial);
    this.elements.horaInicial().clear().type(horaInicial);
    this.elements.dataFinal().clear().type(dataFinal);
    this.elements.horaFinal().clear().type(horaFinal);

    // Valida os valores inseridos
    this.elements.quantidade().should('have.value', quantidade);
    this.elements.diasEquipamento().should('have.value', dias);
    this.elements.dataInicial().should('have.value', dataInicial);
    this.elements.dataFinal().should('have.value', dataFinal);

    // Clica no botão de adicionar equipamento
    this.elements.botaoAdicionarEquipamento().click();

    // Verifica se a notificação de sucesso apareceu
    cy.get('.jq-toast-single').should('be.visible').and('contain.text', 'Equipamento adicionado.');
  }

  // Preenche os dados da forma de pagamento
  preencherPagamento({ tipoCarteira, conta, condicao, vencimento, valor }) {
    this.elements.tipoCarteiraSelect().click();
    this.elements.select2Option(tipoCarteira).click();

    this.elements.contaSelect().click();
    this.elements.select2Option(conta).click();

    this.elements.condicaoPagamentoSelect().click();
    this.elements.select2Option(condicao).click();

    this.elements.vencimentoParcela().clear().type(vencimento);
    this.elements.valorParcela().clear().type(valor);
  }

  // Valida se os campos principais da locação foram preenchidos corretamente
  validarCamposObrigatorios({ descricao, data, dias, cliente }) {
    this.elements.descricao().should('have.value', descricao);
    this.elements.data().should('have.value', data);
    this.elements.diasDuracao().should('have.value', dias);
    this.elements.nomeCliente().should('contain.value', cliente);
  }

  // Valida os dados do equipamento inserido
  validarCamposEquipamento({ quantidade, dias, dataInicial, dataFinal }) {
    this.elements.quantidade().should('have.value', quantidade);
    this.elements.diasEquipamento().should('have.value', dias);
    this.elements.dataInicial().should('have.value', dataInicial);
    this.elements.dataFinal().should('have.value', dataFinal);
  }

  // Valida os dados do pagamento preenchido
  validarCamposPagamento({ tipoCarteira, conta, condicao, vencimento, valor }) {
    this.elements.tipoCarteiraSelect().should('contain.text', tipoCarteira);
    this.elements.contaSelect().should('contain.text', conta);
    this.elements.condicaoPagamentoSelect().should('contain.text', condicao);
    this.elements.vencimentoParcela().should('have.value', vencimento);
    this.elements.valorParcela().should('have.value', valor);
  }

  // Finaliza o processo de locação clicando em "Salvar" e validando mensagem de sucesso
  finalizarLocacao() {
    cy.get('#btnSalvaLocacao').should('not.be.disabled').click();
    cy.get('.alert-success')
      .should('be.visible')
      .and('contain.text', 'Sucesso! Locação de Equipamento salvo com sucesso!');
  }

  // Acessa a lista de locações registradas
  acessarListaLocacoes() {
    cy.get('.btn-primary')
      .contains('Lista de Locações de Equipamento')
      .click();
  }

  // Abre a tela de devolução da locação
  abrirTelaDevolucao() {
    cy.get('.btn-devolucao-locacao').first().click();
  }

  // Valida o nome do cliente na tela de devolução
  validarClienteDevolucao(nomeEsperado) {
    cy.contains('Locação:').should('exist');
    cy.get('span.lead.w-100.font-14').should('contain.text', nomeEsperado);
  }

  // Preenche observação da devolução e valida o total da locação
  preencherObservacaoDevolucao(observacao, totalEsperado) {
    cy.get('input.js-selecao').check({ force: true });
    cy.get('input.observacao').type(observacao);
    cy.contains('Total:').should('contain.text', totalEsperado);
  }

  // Confirma a devolução e valida se a mensagem de sucesso foi exibida
  confirmarDevolucao() {
    cy.get('#devolver-item').click();
    cy.get('.alert-success strong')
      .should('be.visible')
      .and('contain.text', 'Equipamento Equipamento Teste Devolvido');
  }

  // Exclui a locação registrada e aguarda o fechamento do popup
  excluirLocacao() {
    cy.get('.js-exclusao-btn').first().click();
    cy.get('button.swal2-confirm').should('be.visible').click();
    cy.get('.swal2-popup').should('not.exist');
  }
}
