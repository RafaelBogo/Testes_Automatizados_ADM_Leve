///<reference types="cypress" />
import { LocacaoForm } from '../support/locacaoForm';

const locacaoForm = new LocacaoForm();

/*
Feature: Cadastro de Locação - Dados Locação Equipamento

Scenario: Preenchimento correto dos dados da locação
  Given o usuario esta logado
  And acessa a tela de Nova Locação
  When preenche os campos: descrição, data, duração, cliente e observações
  Then os dados devem ser aceitos para prosseguir com a locação
*/

describe('Locação - Dados Locação Equipamentos', () => {
  beforeEach(() => {
    cy.loginEIrParaNovaLocacao();
  });

  it('Deve preencher corretamente os dados da locação', () => {
        cy.visit('http://erp.adminfo.com.br/admerp/locacao/equipamento');
        cy.get('.card > :nth-child(1) > .row > .col-md-12 > .btn').click()

        locacaoForm.preencherDescricao('Locação Automatizada - Módulo 1');
        locacaoForm.preencherData('2025-04-30');
        locacaoForm.preencherDias('30');
        locacaoForm.preencherObservacoes('Teste automatizado usando Cypress.');
        locacaoForm.selecionarCliente('Rafael Bogo');
        //Valida se campo cliente foi preenchido corrtamente
        cy.get('#nomeCliente').should('contain.value', 'Bogo');
    });

});
