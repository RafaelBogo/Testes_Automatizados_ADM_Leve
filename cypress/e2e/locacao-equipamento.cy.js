/// <reference types="cypress" />
import { LocacaoForm } from '../support/locacaoForm'; // Importa a classe utilitária para interação com os formulários

const locacaoForm = new LocacaoForm();

/*
Feature: Cadastro de Locação - Módulo 2 (Equipamentos)

Scenario: Adicionar equipamento à locação com sucesso
  Given o usuário está logado no sistema ADM Leve
  When preenche os campos de um novo equipamento
  Then o equipamento é adicionado à lista da locação
*/

describe('Locação - Adicionar equipamento', () => {
  // Autentica o usuário e abre a tela de nova locação antes de cada teste
  beforeEach(() => {
    cy.loginEIrParaNovaLocacao();
  });

  it('Deve adicionar equipamento à locação com sucesso', () => {
    // Usa método utilitário para preencher o formulário de equipamento
   locacaoForm.adicionarEquipamento({
      termoBusca: '1',
      quantidade: '3,00',
      dias: '10,00',
      complemento: 'Locação teste',
      dataInicial: '28/04/2025',
      horaInicial: '22:00',
      dataFinal: '10/05/2025',
      horaFinal: '20:00',
    });

    // O método interno já realiza as validações e clique no botão "Adicionar Equipamento"
    // Também valida se o toast de sucesso foi exibido
  });
});
