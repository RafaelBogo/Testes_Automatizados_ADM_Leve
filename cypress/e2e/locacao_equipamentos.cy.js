describe('Fluxo completo ADM Leve, login e locação', () => {

  beforeEach(() => {
    cy.visit('http://erp.adminfo.com.br/admerp/login')

    cy.get('input[name="username"]').type('rafaelbogo52@gmail.com')
    cy.get('input[name="password"]').type('51@2C@97a')
    cy.get('button[type="submit"]').click()
  })

  it('Deve realizar uma locação de equipamento com sucesso', () => {
    cy.visit('http://erp.adminfo.com.br/admerp/locacao/equipamento')
    cy.get('a.btn-info').contains('Nova Locação').click()

    cy.get('input#descricao').type('Teste')
    cy.get('input#diasDuracao').type(30)

    cy.get('input.equipamentoAutoComplete').type('1')
    cy.wait(500)
    cy.get("div.equipamento-autocomplete").click()

    cy.get('input#qtdDias').clear()
    cy.get('input#qtdDias').type('1000')

    cy.get('input#descrComplementar').type('Testando')
    cy.get('input#quantidade').clear()
    cy.get('input#quantidade').type('300')

    cy.get('input#descontoGeral').type('')
    cy.get("textarea#observacoes").type("Teste do campo observação")

    cy.get('#nomeCliente').click()
    cy.get('button[data-target="#pesquisaRapidaClientes"]').click()
    cy.get('input#nomeClienteModal').type('Rafael Bogo')
    cy.get('button.js-pesquisa-rapida-clientes-btn').click()
    cy.contains('td', 'Rafael Bogo').click()
  })
})