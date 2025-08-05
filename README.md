# Formulários Dinâmicos

Uma aplicação web para criar formulários dinâmicos com condicionalidades, desenvolvida com Next.js, TypeScript, TailwindCSS e Shadcn/ui.

## 🚀 Funcionalidades

- ✅ Criação de formulários dinâmicos
- ✅ Diferentes tipos de perguntas (texto, número, e-mail, seleção, etc.)
- ✅ Lógica condicional (perguntas que aparecem baseadas em respostas anteriores)
- ✅ Validação de campos obrigatórios
- ✅ Visualização e resposta aos formulários
- ✅ Visualização das respostas coletadas
- ✅ Exportação de respostas para CSV
- ✅ Interface moderna e responsiva

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização
- **Shadcn/ui** - Componentes UI
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn

## 🐳 Rodando com Docker

### Pré-requisitos
- Docker Desktop instalado e rodando

### Passos

1. **Build e execução**

   Na raiz do projeto, execute:

   ```sh
   docker compose up --build
   ```

2. **Acesse a aplicação**

   Abra [http://localhost:3000](http://localhost:3000) no navegador.

3. **Parar o container**

   Pressione `Ctrl+C` ou rode:

   ```sh
   docker compose down
   ```

Pronto! O sistema estará disponível para uso e testes.

## 🔧 Instalação

1. **Clone o repositório**

   ```bash
   git clone git@github.com:Samuel-A-Santos/form.git
   cd form
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Execute o projeto em modo de desenvolvimento**

   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.


## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # Páginas Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   └── form/
│       └── [formId]/      # Rotas dinâmicas
│           ├── page.tsx   # Editor do formulário
│           ├── view/      # Visualização/responder
│           └── responses/ # Ver respostas
├── components/            # Componentes React
│   ├── FormEditor.tsx     # Editor principal
│   ├── QuestionEditor.tsx # Editor de perguntas
│   ├── OptionEditor.tsx   # Editor de opções
│   └── ui/               # Componentes Shadcn/ui
├── lib/                  # Utilitários
│   ├── storage.ts        # Persistência localStorage
│   └── utils.ts          # Funções utilitárias
├── types/                # Definições TypeScript
│   └── models.ts         # Interfaces e tipos
├── constants/            # Constantes
│   └── enums.ts          # Enums e labels
└── utils/                # Utilitários
    └── id.ts             # Geração de IDs
```

## Armazenamento

Os dados são persistidos no `localStorage` do navegador:


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

