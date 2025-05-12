Cypress.Commands.add('loginEIrParaNovaLocacao', () => {
  cy.visit('/');
  cy.get('input[name="username"]').type('rafaelbogo52@gmail.com');
  cy.get('input[name="password"]').type('51@2C@97a');
  cy.get('button[type="submit"]').click();
  cy.visit('http://erp.adminfo.com.br/admerp/locacao/equipamento');
  cy.contains('Nova Locação').click();
});
