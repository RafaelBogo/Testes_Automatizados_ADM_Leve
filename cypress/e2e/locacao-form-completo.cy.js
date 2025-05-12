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

describe('Locação - Formulário Completo', () => {
  beforeEach(() => {
    cy.loginEIrParaNovaLocacao();
  });

  it('Deve preencher todos os campos e salvar a locação com sucesso', () => {
    cy.visit('http://erp.adminfo.com.br/admerp/locacao/equipamento');
    cy.get('.card > :nth-child(1) > .row > .col-md-12 > .btn').click();

    // Dados principais
    locacaoForm.preencherDescricao('Locação Automatizada - Completa');
    locacaoForm.preencherData('20042025');
    locacaoForm.preencherDias('30');
    locacaoForm.preencherObservacoes('Teste completo de locação automatizada.');
    locacaoForm.selecionarCliente('Rafael Bogo');
    cy.get('#nomeCliente').should('contain.value', 'Bogo');

    // Equipamentos
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

    // Pagamento
    locacaoForm.preencherPagamento({
      tipoCarteira: 'Boleto',
      conta: 'Geral',
      condicao: '2 - 30 DIAS',
      vencimento: '04/06/2025',
      valor: '1.250,00',
    });

    // Validações
    locacaoForm.validarCamposObrigatorios({
        descricao: 'Locação Automatizada - Completa',
        data: '20/04/2025',
        dias: '30',
        cliente: 'Bogo',
      });

    locacaoForm.validarCamposPagamento({
      tipoCarteira: 'Boleto',
      conta: 'Geral',
      condicao: '2 - 30 DIAS',
      vencimento: '04/06/2025',
      valor: '1.250,00',
    });

    // Finaliza devolve e exclui a locação
    locacaoForm.finalizarLocacao();
    locacaoForm.acessarListaLocacoes();
    locacaoForm.abrirTelaDevolucao();
    locacaoForm.validarClienteDevolucao('Bogo');
    locacaoForm.preencherObservacaoDevolucao('Equipamento devolvido em perfeitas condições.', '1.250,00');
    locacaoForm.confirmarDevolucao();
    locacaoForm.excluirLocacao();
    });

  });