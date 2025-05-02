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
      this.elements.descricaoComplementar().clear().type(complemento);
      this.elements.dataInicial().clear().type(dataInicial);
      this.elements.horaInicial().clear().type(horaInicial);
      this.elements.dataFinal().clear().type(dataFinal);
      this.elements.horaFinal().clear().type(horaFinal);
      this.elements.botaoAdicionarEquipamento().click();

      cy.get('.jq-toast-single').should('be.visible').and('contain.text', 'Equipamento adicionado.')
    }

}