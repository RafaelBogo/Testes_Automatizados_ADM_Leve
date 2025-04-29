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
  }
  