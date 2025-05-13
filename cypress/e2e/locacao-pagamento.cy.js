///<reference types="cypress" />
import { LocacaoForm } from '../support/locacaoForm'; // Importa a classe de apoio com os métodos para manipular o formulário

const locacaoForm = new LocacaoForm();

/*
Feature: Cadastro de Locação - Pagamento

Scenario: Preenchimento correto dos dados de pagamento
  Given o usuário está logado
  And acessa uma locação ativa
  When preenche os campos de pagamento: tipo carteira, conta, condição, vencimento e valor
  Then os dados são salvos e a locação é finalizada com sucesso
*/

describe('Locação - Adicionar Forma de Pagamento', () => {
  // Executa antes de cada teste: realiza login e acessa a tela de Nova Locação
  beforeEach(() => {
    cy.loginEIrParaNovaLocacao();
  });

  it('Deve preencher corretamente os dados de pagamento da locação', () => {
    // Visita diretamente a página de locação
    cy.visit('http://erp.adminfo.com.br/admerp/locacao/equipamento');

    // Clica no botão "Nova Locação"
    cy.get('.card > :nth-child(1) > .row > .col-md-12 > .btn').click();

    // Preenche os campos relacionados ao pagamento
    locacaoForm.preencherPagamento({
      tipoCarteira: 'Boleto',         // Tipo de carteira financeira usada
      conta: 'Geral',                 // Conta selecionada para o pagamento
      condicao: '2 - 30 DIAS',        // Condição de pagamento escolhida
      vencimento: '04/06/2025',       // Data de vencimento da parcela
      valor: '1250,00',               // Valor da parcela
    });

    // O método interno já lida com seleção dos campos e inserção de valores
  });
});
