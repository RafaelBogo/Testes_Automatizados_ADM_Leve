describe('Login no sistema ADM Leve', () => {
  it('Deve acessar a tela de login e logar com sucesso', () => {
    // Acessa o sistema web da ADM Leve
    cy.visit('http://erp.adminfo.com.br/admerp/login')

    // Verifica se a página foi carregada corretamente
    cy.contains('E-mail').should('be.visible')

    // Preenche os campos de nome de usuário e senha
    cy.get('input[name="username"]').type('rafaelbogo52@gmail.com')
    cy.get('input[name="password"]').type('51@2C@97a')

    // Clica no botão de login
    cy.get('button[type="submit"]').click()
  })
})