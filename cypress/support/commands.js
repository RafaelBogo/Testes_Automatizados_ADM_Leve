// Comando customizado do Cypress para login rápido e navegação até a tela de "Nova Locação"
Cypress.Commands.add('loginEIrParaNovaLocacao', () => {
  // Acessa a página inicial do sistema
  cy.visit('/');

  // Preenche o campo de usuário com o e-mail de login
  cy.get('input[name="username"]').type('rafaelbogo52@gmail.com');

  // Preenche o campo de senha com a credencial cadastrada
  cy.get('input[name="password"]').type('51@2C@97a');

  // Clica no botão de login
  cy.get('button[type="submit"]').click();

  // Acessa diretamente a URL do módulo de locação de equipamentos
  cy.visit('http://erp.adminfo.com.br/admerp/locacao/equipamento');

  // Clica no botão "Nova Locação" para iniciar um novo processo
  cy.contains('Nova Locação').click();
});
