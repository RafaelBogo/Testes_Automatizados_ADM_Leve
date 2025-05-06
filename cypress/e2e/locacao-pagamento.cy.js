///<reference types="cypress" />
import { LocacaoForm } from '../support/locacaoForm';

const locacaoForm = new LocacaoForm();

/*
Feature: Cadastro de Locação - Pagamento

Scenario: Preenchimento correto dos dados de pagamento
  Given o usuário está logado
  And acessa uma locação ativa
  When preenche os campos de pagamento: tipo carteira, conta, condição, vencimento e valor
  Then os dados são salvos e a locação é finalizada com sucesso
*/

describe('Locação - Preenchimento de Pagamento', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.get('input[name="username"]').type('rafaelbogo52@gmail.com');
    cy.get('input[name="password"]').type('51@2C@97a');
    cy.get('button[type="submit"]').click();
  });

  it('Deve preencher corretamente os dados de pagamento da locação', () => {
    cy.visit('http://erp.adminfo.com.br/admerp/locacao/equipamento');
    cy.get('.card > :nth-child(1) > .row > .col-md-12 > .btn').click();

    locacaoForm.preencherPagamento({
      tipoCarteira: 'Boleto',
      conta: 'Geral',
      condicao: '2 - 30 DIAS',
      vencimento: '04/06/2025',
      valor: '1250,00'
    });
  });
});
