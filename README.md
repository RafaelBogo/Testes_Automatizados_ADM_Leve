# Documentação Técnica dos Testes Automatizados – Módulo de Locação (ADM Leve)

Este documento descreve os testes automatizados desenvolvidos com **Cypress** para o módulo de **Locação de Equipamentos** do sistema **ADM Leve**. Os testes garantem a integridade dos fluxos principais: preenchimento dos dados da locação, inclusão de equipamentos, definição da forma de pagamento, finalização, devolução e exclusão.

## Objetivos

- Validar automaticamente os fluxos principais de locação do sistema.
- Garantir confiabilidade e rastreabilidade.
- Reduzir erros durante o processo de homologação.

## Ferramentas Utilizadas

- **Cypress** (Framework para testes E2E)
- **Node.js**
- **JavaScript**
- **GitHub** (Controle de versão)

## Estrutura dos Arquivos

```
cypress/
├── e2e/
│   ├── dados-locacao.cy.js
│   ├── equipamentos.cy.js
│   ├── pagamento.cy.js
│   └── locacao-completa.cy.js
├── support/
│   ├── locacaoForm.js
│   └── commands.js
└── cypress.config.js
```

## Descrição dos Testes

### 1. Preenchimento dos Dados da Locação (`dados-locacao.cy.js`)
- **Objetivo:** Validar preenchimento dos campos principais.
- **Campos:** Descrição, data, dias, observações e cliente.
- **Resultado Esperado:** Os dados são preenchidos corretamente e aceitos pelo sistema.

### 2. Adição de Equipamento (`equipamentos.cy.js`)
- **Objetivo:** Validar inclusão de equipamentos no formulário.
- **Campos:** Nome do equipamento, quantidade, período, descrição complementar, datas e horários.
- **Resultado Esperado:** Equipamento adicionado à locação com sucesso.

### 3. Preenchimento da Forma de Pagamento (`pagamento.cy.js`)
- **Objetivo:** Validar preenchimento dos dados financeiros.
- **Campos:** Carteira, conta, condição de pagamento, vencimento e valor.
- **Resultado Esperado:** Dados financeiros aceitos corretamente.

### 4. Fluxo Completo com Devolução e Exclusão (`locacao-completa.cy.js`)
- **Objetivo:** Executar processo completo desde cadastro até exclusão.
- **Etapas:** Cadastro completo, devolução do equipamento e exclusão da locação.
- **Resultado Esperado:** Todos os passos concluídos com sucesso.

## Executando os Testes

### Pré-requisitos
- Instale [Node.js](https://nodejs.org/).
- Instale Cypress via npm:
  ```bash
  npm install cypress
  ```

### Executar os testes
```bash
npx cypress open
```
