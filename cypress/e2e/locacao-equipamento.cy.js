/// <reference types="cypress" />
import { LocacaoForm } from '../support/locacaoForm'

const locacaoForm = new LocacaoForm()

/*
Feature: Cadastro de Locação - Modulo 2 (Equipamentos)

Scenario: Adicionar equipamento a locação com sucesso
  Given o usuário esta logado no sistema ADM Leve
  When preenche os campos de um novo equipamento
  Then o equipamento é adicionado  lista da locação
*/

describe('Locação - Adicionar equipamento', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('input[name="username"]').type('rafaelbogo52@gmail.com')
    cy.get('input[name="password"]').type('51@2C@97a')
    cy.get('button[type="submit"]').click()
    cy.visit('http://erp.adminfo.com.br/admerp/locacao/equipamento')
    cy.contains('Nova Locação').click()
  })

  it('Deve adicionar equipamento a locação com sucesso', () => {
    locacaoForm.adicionarEquipamento({
      termoBusca: '1',
      quantidade: '300',
      dias: '1000',
      complemento: 'Locação teste',
      dataInicial: "28-04-2025",
      horaInicial: "22:00",
      dataFinal: "10052025",
      horaFinal: "20:00",
    })
  })
})
