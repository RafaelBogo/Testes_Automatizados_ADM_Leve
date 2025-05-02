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
    botaoAdicionarEquipamento: () => cy.get('button#adicionarEquipamento'),
    listaEquipamento: () => cy.get('table tbody tr'),
    totalItens: () => cy.get('span').contains('Itens:'),
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

    adicionarEquipamento({ termoBusca, quantidade, dias, complemento }) {
      this.elements.equipamentoInput().type(termoBusca);
      cy.wait(500);
      this.elements.equipamentoSelecionado().click();
      this.elements.quantidade().clear().type(quantidade);
      this.elements.diasEquipamento().clear().type(dias);
      this.elements.descricaoComplementar().clear().type(complemento);
      this.elements.botaoAdicionarEquipamento().click();
    }

    validarEquipamentoAdicionado() {
      this.elements.listaEquipamento().should('have.length.greaterThan', 0);
      this.elements.totalItens().should('contain.text', '1');
    }
}