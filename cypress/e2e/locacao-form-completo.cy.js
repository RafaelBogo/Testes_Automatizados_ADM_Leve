///<reference types="cypress" />
import { LocacaoForm } from '../support/locacaoForm'; // Importa a classe de suporte com os métodos encapsulados da locação

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
  // Executado antes de cada teste: autentica o usuário e acessa a tela de nova locação
  beforeEach(() => {
    cy.loginEIrParaNovaLocacao();
  });

  it('Deve preencher todos os campos e salvar a locação com sucesso', () => {
    // Visita novamente a URL da locação (pode ser redundante, mas útil caso precise testar diretamente)
    cy.visit('http://erp.adminfo.com.br/admerp/locacao/equipamento');
    
    // Clica no botão "Nova Locação"
    cy.get('.card > :nth-child(1) > .row > .col-md-12 > .btn').click();

    // Preenche os dados principais da locação
    locacaoForm.preencherDescricao('Locação Automatizada - Completa');
    locacaoForm.preencherData('20042025');
    locacaoForm.preencherDias('30');
    locacaoForm.preencherObservacoes('Teste completo de locação automatizada.');
    locacaoForm.selecionarCliente('Rafael Bogo');

    // Valida que o nome do cliente foi inserido corretamente no campo
    cy.get('#nomeCliente').should('contain.value', 'Bogo');

    // Adiciona um equipamento à locação
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

    // Preenche os dados do pagamento
    locacaoForm.preencherPagamento({
      tipoCarteira: 'Boleto',
      conta: 'Geral',
      condicao: '2 - 30 DIAS',
      vencimento: '04/06/2025',
      valor: '1.250,00',
    });

    // Valida os campos obrigatórios preenchidos
    locacaoForm.validarCamposObrigatorios({
        descricao: 'Locação Automatizada - Completa',
        data: '20/04/2025',
        dias: '30',
        cliente: 'Bogo',
    });

    // Valida se o pagamento foi preenchido corretamente
    locacaoForm.validarCamposPagamento({
      tipoCarteira: 'Boleto',
      conta: 'Geral',
      condicao: '2 - 30 DIAS',
      vencimento: '04/06/2025',
      valor: '1.250,00',
    });

    // Finaliza a locação e verifica mensagem de sucesso
    locacaoForm.finalizarLocacao();

    // Acessa a lista de locações para localizar a criada
    locacaoForm.acessarListaLocacoes();

    // Abre a tela de devolução do equipamento
    locacaoForm.abrirTelaDevolucao();

    // Valida que o cliente da locação é o esperado
    locacaoForm.validarClienteDevolucao('Bogo');

    // Preenche os dados da devolução e valida o total
    locacaoForm.preencherObservacaoDevolucao('Equipamento devolvido em perfeitas condições.', '1.250,00');

    // Confirma a devolução
    locacaoForm.confirmarDevolucao();

    // Exclui a locação criada, limpando os dados para novos testes
    locacaoForm.excluirLocacao();
  });
});
