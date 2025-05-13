const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Função de configuração de eventos do Node (pode ser usada para plugins, logs, etc.)
    setupNodeEvents(on, config) {
      // Atualmente sem eventos definidos
    },

    // Define a URL base que será utilizada nos testes com cy.visit() e cy.request()
    baseUrl: 'http://erp.adminfo.com.br/admerp/login'
  },
});
