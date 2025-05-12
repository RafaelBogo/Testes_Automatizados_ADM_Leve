export class LocacaoForm {
  elements = {
    descricao: () => cy.get('input#descricao'),
    data: () => cy.get('input#data'),
    diasDuracao: () => cy.get('input#diasDuracao'),
    observacoes: () => cy.get('textarea#observacoes'),
    nomeCliente: () => cy.get('#nomeCliente'),
    lupaCliente: () => cy.get('button[data-target="#pesquisaRapidaClientes"]'),
    clienteModal: () => cy.get('input#nomeClienteModal'),
    botaoPesquisarCliente: () => cy.get('button.js-pesquisa-rapida-clientes-btn'),
    resultadoCliente: (nome) => cy.contains('td', nome),
  
    equipamentoInput: () => cy.get('input.form-control.equipamentoAutoComplete'),
    equipamentoSelecionado: () => cy.get('div.equipamento-autocomplete'),
    quantidade: () => cy.get('input#quantidade'),
    diasEquipamento: () => cy.get('input#qtdDias'),
    descricaoComplementar: () => cy.get('input#descrComplementar'),
    botaoAdicionarEquipamento: () => cy.get('button#adicionaEquipamento'),
    listaEquipamento: () => cy.get('table tbody tr'),
    totalItens: () => cy.get('span').contains('Itens:'),
  
    dataInicial: () => cy.get('input#dataInicial'),
    horaInicial: () => cy.get("input#horaInicial"),
    dataFinal: () => cy.get("input#dataDevolucao"),
    horaFinal: () => cy.get("input#horaDevolucao1"),
  
    tipoCarteira: () => cy.get('select#tipoCarteira'),
    tipoCarteiraSelect: () => cy.get('#select2-tipoCarteira-container'),
    conta: () => cy.get('select#conta'),
    contaSelect: () => cy.get('#select2-conta-container'),
    condicaoPagamentoSelect: () => cy.get('#select2-condicaoPagamento-container'),
    condicaoPagamento: () => cy.get('select#condicaoPagamento'),
    select2Option: (label) => cy.get('.select2-results__option').contains(label),
    
    vencimentoParcela: () => cy.get('input[name="parcelas[0].vencimento"]'),
    valorParcela: () => cy.get('input[name="parcelas[0].valor"]'),

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

    preencherDescricao(texto) {
      if (!texto) return;
      this.elements.descricao().type(texto);
    }
  
    preencherData(dataIso) {
      if (!dataIso) return;
      this.elements.data().clear().type(dataIso);
    }
  
    preencherDias(dias) {
      this.elements.diasDuracao().clear().type(dias);
    }
  
    preencherObservacoes(obs) {
      this.elements.observacoes().type(obs);
    }
  
    selecionarCliente(nome) {
      this.elements.nomeCliente().click();
      this.elements.lupaCliente().click();
      this.elements.clienteModal().type(nome);
      this.elements.botaoPesquisarCliente().click();
      this.elements.resultadoCliente(nome).click();
    }

    adicionarEquipamento({ termoBusca, quantidade, dias, complemento, dataInicial, horaInicial, dataFinal, horaFinal }) {
      this.elements.equipamentoInput().type(termoBusca);
      cy.wait(300);
      this.elements.equipamentoSelecionado().click();
      this.elements.quantidade().clear().type(quantidade);
      this.elements.diasEquipamento().clear().type(dias);
      this.elements.descricaoComplementar().clear().type(complemento);
      this.elements.dataInicial().clear().type(dataInicial);
      this.elements.horaInicial().clear().type(horaInicial);
      this.elements.dataFinal().clear().type(dataFinal);
      this.elements.horaFinal().clear().type(horaFinal);
    
      this.elements.quantidade().should('have.value', quantidade);
      this.elements.diasEquipamento().should('have.value', dias);
      this.elements.dataInicial().should('have.value', dataInicial);
      this.elements.dataFinal().should('have.value', dataFinal);
    
      this.elements.botaoAdicionarEquipamento().click();
    
      cy.get('.jq-toast-single').should('be.visible').and('contain.text', 'Equipamento adicionado.');
    }
    
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

    //Validações
    validarCamposObrigatorios({ descricao, data, dias, cliente }) {
      this.elements.descricao().should('have.value', descricao);
      this.elements.data().should('have.value', data);
      this.elements.diasDuracao().should('have.value', dias);
      this.elements.nomeCliente().should('contain.value', cliente);
    }
    
    validarCamposEquipamento({ quantidade, dias, dataInicial, dataFinal }) {
      this.elements.quantidade().should('have.value', quantidade);
      this.elements.diasEquipamento().should('have.value', dias);
      this.elements.dataInicial().should('have.value', dataInicial);
      this.elements.dataFinal().should('have.value', dataFinal);
    }
    
    validarCamposPagamento({ tipoCarteira, conta, condicao, vencimento, valor }) {
      this.elements.tipoCarteiraSelect().should('contain.text', tipoCarteira);
      this.elements.contaSelect().should('contain.text', conta);
      this.elements.condicaoPagamentoSelect().should('contain.text', condicao);
      this.elements.vencimentoParcela().should('have.value', vencimento);
      this.elements.valorParcela().should('have.value', valor);
    }

    finalizarLocacao() {
      cy.get('#btnSalvaLocacao').should('not.be.disabled').click();
      cy.get('.alert-success')
        .should('be.visible')
        .and('contain.text', 'Sucesso! Locação de Equipamento salvo com sucesso!');
    }
    
    acessarListaLocacoes() {
      cy.get('.btn-primary')
        .contains('Lista de Locações de Equipamento')
        .click();
    }
    
    abrirTelaDevolucao() {
      cy.get('.btn-devolucao-locacao').first().click();
    }
    
    validarClienteDevolucao(nomeEsperado) {
      cy.contains('Locação:').should('exist');
      cy.get('span.lead.w-100.font-14').should('contain.text', nomeEsperado);
    }
    
    preencherObservacaoDevolucao(observacao, totalEsperado) {
      cy.get('input.js-selecao').check({ force: true });
      cy.get('input.observacao').type(observacao);
      cy.contains('Total:').should('contain.text', totalEsperado);
    }
    
    confirmarDevolucao() {
      cy.get('#devolver-item').click();
      cy.get('.alert-success strong')
        .should('be.visible')
        .and('contain.text', 'Equipamento Equipamento Teste Devolvido');
    }
    
    excluirLocacao() {
      cy.get('.js-exclusao-btn').first().click();
      cy.get('.swal2-confirm').should('be.visible').click();
      cy.get('.swal2-popup').should('not.exist');
    }
    
    
}