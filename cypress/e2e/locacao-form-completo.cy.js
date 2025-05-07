///<reference types="cypress" />
import { LocacaoForm } from '../support/locacaoForm';

const locacaoForm = new LocacaoForm();

/*
Feature: Cadastro de Locação Completo

Scenario: Preenchimento completo do formulário de locação de equipamento
  Given o usuário está logado
  And acessa a tela de Nova Locação
  When preenche os campos: dados principais, equipamentos e pagamento
  Then a locação é salva com sucesso
*/

describe('Locação - Cadastro completo de locação', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.get('input[name="username"]').type('rafaelbogo52@gmail.com');
    cy.get('input[name="password"]').type('51@2C@97a');
    cy.get('button[type="submit"]').click();
  });

  it('Deve preencher todos os campos e salvar a locação com sucesso', () => {
    cy.visit('http://erp.adminfo.com.br/admerp/locacao/equipamento');
    cy.get('.card > :nth-child(1) > .row > .col-md-12 > .btn').click();

    // Dados principais
    locacaoForm.preencherDescricao('Locação Automatizada - Completa');
    locacaoForm.preencherData('20-04-2025');
    locacaoForm.preencherDias('30');
    locacaoForm.preencherObservacoes('Teste completo de locação automatizada.');
    locacaoForm.selecionarCliente('Rafael Bogo');
    cy.get('#nomeCliente').should('contain.value', 'Bogo');

    // Equipamentos
    locacaoForm.adicionarEquipamento({
      termoBusca: '1',
      quantidade: '300',
      dias: '1000',
      complemento: 'Locação teste',
      dataInicial: '28042025',
      horaInicial: '22:00',
      dataFinal: '10052025',
      horaFinal: '20:00',
    });

    // Pagamento
    locacaoForm.preencherPagamento({
      tipoCarteira: 'Boleto',
      conta: 'Geral',
      condicao: '2 - 30 DIAS',
      vencimento: '04/06/2025',
      valor: '1250,00',
    });

    // Finaliza a locação
    cy.wait(1000)
    cy.get('#btnSalvaLocacao').click();

  });
});
