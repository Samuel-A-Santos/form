# Exemplo de Uso - Formulários Dinâmicos

Este documento demonstra como usar o sistema de formulários dinâmicos com um exemplo prático.

## 📋 Exemplo: Formulário de Pesquisa de Satisfação

Vamos criar um formulário de pesquisa de satisfação com condicionalidades para demonstrar as funcionalidades.

### Passo 1: Criar o Formulário

1. Acesse a aplicação em `http://localhost:3000`
2. Clique em "Novo Formulário"
3. Digite o título: "Pesquisa de Satisfação"
4. Digite a descrição: "Ajude-nos a melhorar nossos serviços"
5. Clique em "Criar"

### Passo 2: Adicionar Perguntas

Clique em "Editar" e adicione as seguintes perguntas:

#### Pergunta 1: Nome

- **Texto**: "Qual é o seu nome?"
- **Tipo**: Texto
- **Obrigatória**: ✅ Sim

#### Pergunta 2: E-mail

- **Texto**: "Qual é o seu e-mail?"
- **Tipo**: E-mail
- **Obrigatória**: ✅ Sim

#### Pergunta 3: Idade

- **Texto**: "Qual é a sua idade?"
- **Tipo**: Número
- **Obrigatória**: ✅ Sim

#### Pergunta 4: Produto Utilizado

- **Texto**: "Qual produto você utiliza?"
- **Tipo**: Seleção única
- **Opções**:
  - Texto: "Produto A", Valor: "produto_a"
  - Texto: "Produto B", Valor: "produto_b"
  - Texto: "Produto C", Valor: "produto_c"
- **Obrigatória**: ✅ Sim

#### Pergunta 5: Satisfação Geral

- **Texto**: "Em uma escala de 1 a 10, como você avalia sua satisfação geral?"
- **Tipo**: Seleção única
- **Opções**:
  - Texto: "1 - Muito insatisfeito", Valor: "1"
  - Texto: "2", Valor: "2"
  - Texto: "3", Valor: "3"
  - Texto: "4", Valor: "4"
  - Texto: "5 - Neutro", Valor: "5"
  - Texto: "6", Valor: "6"
  - Texto: "7", Valor: "7"
  - Texto: "8", Valor: "8"
  - Texto: "9", Valor: "9"
  - Texto: "10 - Muito satisfeito", Valor: "10"
- **Obrigatória**: ✅ Sim

### Passo 3: Configurar Condicionalidades

#### Pergunta 6: Detalhes sobre Produto A (Condicional)

- **Texto**: "O que você mais gosta no Produto A?"
- **Tipo**: Área de texto
- **Obrigatória**: ❌ Não
- **Lógica Condicional**:
  - Pergunta dependente: "Qual produto você utiliza?"
  - Condição: Igual a
  - Valor: "produto_a"

#### Pergunta 7: Detalhes sobre Produto B (Condicional)

- **Texto**: "O que você mais gosta no Produto B?"
- **Tipo**: Área de texto
- **Obrigatória**: ❌ Não
- **Lógica Condicional**:
  - Pergunta dependente: "Qual produto você utiliza?"
  - Condição: Igual a
  - Valor: "produto_b"

#### Pergunta 8: Detalhes sobre Produto C (Condicional)

- **Texto**: "O que você mais gosta no Produto C?"
- **Tipo**: Área de texto
- **Obrigatória**: ❌ Não
- **Lógica Condicional**:
  - Pergunta dependente: "Qual produto você utiliza?"
  - Condição: Igual a
  - Valor: "produto_c"

#### Pergunta 9: Sugestões de Melhoria (Condicional)

- **Texto**: "Que sugestões você tem para melhorarmos nossos produtos?"
- **Tipo**: Área de texto
- **Obrigatória**: ❌ Não
- **Lógica Condicional**:
  - Pergunta dependente: "Em uma escala de 1 a 10, como você avalia sua satisfação geral?"
  - Condição: Menor que
  - Valor: "7"

#### Pergunta 10: Recomendação (Condicional)

- **Texto**: "Você recomendaria nossos produtos para amigos e familiares?"
- **Tipo**: Botões de rádio
- **Opções**:
  - Texto: "Sim, definitivamente", Valor: "sim_definitivamente"
  - Texto: "Sim, provavelmente", Valor: "sim_provavelmente"
  - Texto: "Não tenho certeza", Valor: "nao_tenho_certeza"
  - Texto: "Provavelmente não", Valor: "provavelmente_nao"
  - Texto: "Definitivamente não", Valor: "definitivamente_nao"
- **Obrigatória**: ❌ Não
- **Lógica Condicional**:
  - Pergunta dependente: "Em uma escala de 1 a 10, como você avalia sua satisfação geral?"
  - Condição: Maior que
  - Valor: "6"

### Passo 4: Testar o Formulário

1. Clique em "Visualizar" para testar o formulário
2. Preencha as perguntas e observe como as condicionalidades funcionam:
   - A pergunta sobre detalhes do produto só aparece se você selecionar o produto correspondente
   - A pergunta sobre sugestões só aparece se a satisfação for menor que 7
   - A pergunta sobre recomendação só aparece se a satisfação for maior que 6

### Passo 5: Ver Respostas

1. Responda o formulário algumas vezes com diferentes respostas
2. Clique em "Ver Respostas" para ver todas as respostas coletadas
3. Use o botão "Exportar CSV" para baixar as respostas

## 🎯 Funcionalidades Demonstradas

### ✅ Tipos de Perguntas

- **Texto**: Nome
- **E-mail**: E-mail
- **Número**: Idade
- **Seleção única**: Produto, Satisfação
- **Área de texto**: Detalhes, Sugestões
- **Botões de rádio**: Recomendação

### ✅ Lógica Condicional

- **Igual a**: Perguntas específicas por produto
- **Menor que**: Sugestões para satisfação baixa
- **Maior que**: Recomendação para satisfação alta

### ✅ Validação

- Campos obrigatórios são validados
- E-mail é validado automaticamente
- Números são validados

### ✅ Interface

- Design responsivo
- Navegação intuitiva
- Feedback visual claro

## 🔄 Fluxo de Dados

1. **Criação**: Formulário é criado e salvo no localStorage
2. **Edição**: Perguntas são adicionadas e configuradas
3. **Visualização**: Formulário é renderizado com condicionalidades
4. **Resposta**: Dados são coletados e validados
5. **Armazenamento**: Respostas são salvas no localStorage
6. **Visualização**: Respostas podem ser vistas e exportadas

Este exemplo demonstra todas as funcionalidades principais do sistema de formulários dinâmicos!
