///<reference types="cypress" />
import { LocacaoForm } from '../support/locacaoForm'; // Importa classe com métodos reutilizáveis para interação com o formulário de locação

const locacaoForm = new LocacaoForm();

/*
Feature: Cadastro de Locação - Dados Locação Equipamento

Scenario: Preenchimento correto dos dados da locação
  Given o usuário está logado
  And acessa a tela de Nova Locação
  When preenche os campos: descrição, data, duração, cliente e observações
  Then os dados devem ser aceitos para prosseguir com a locação
*/

describe('Locação - Dados Locação Equipamentos', () => {
  // Executa antes de cada teste: faz login e acessa a tela "Nova Locação"
  beforeEach(() => {
    cy.loginEIrParaNovaLocacao();
  });

  it('Deve preencher corretamente os dados da locação', () => {
    // Visita diretamente a URL da tela de locação (reforço de navegação)
    cy.visit('http://erp.adminfo.com.br/admerp/locacao/equipamento');

    // Clica no botão "Nova Locação"
    cy.get('.card > :nth-child(1) > .row > .col-md-12 > .btn').click();

    // Preenche os campos principais do formulário de locação
    locacaoForm.preencherDescricao('Locação Automatizada - Módulo 1');
    locacaoForm.preencherData('2025-04-30');
    locacaoForm.preencherDias('30');
    locacaoForm.preencherObservacoes('Teste automatizado usando Cypress.');

    // Seleciona o cliente pelo nome (abre modal, busca e clica no resultado)
    locacaoForm.selecionarCliente('Rafael Bogo');

    // Verifica se o campo do cliente foi preenchido corretamente após a seleção
    cy.get('#nomeCliente').should('contain.value', 'Bogo');
  });
});
