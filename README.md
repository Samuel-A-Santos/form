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

## 🔧 Instalação

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
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

## 📖 Como Usar

### 1. Criar um Formulário

- Na página inicial, clique em "Novo Formulário"
- Digite o título e descrição do formulário
- Clique em "Criar"

### 2. Adicionar Perguntas

- Clique em "Editar" no formulário criado
- Clique em "Adicionar Pergunta"
- Configure:
  - **Texto da pergunta**
  - **Tipo de pergunta** (texto, número, e-mail, seleção, etc.)
  - **Opções** (para tipos que precisam)
  - **Se é obrigatória**
  - **Lógica condicional** (se deve aparecer baseada em outra resposta)

### 3. Configurar Condicionalidades

- Em "Configurações Avançadas", configure:
  - **Pergunta dependente**: qual pergunta deve ser respondida primeiro
  - **Condição**: igual a, diferente de, contém, maior que, menor que
  - **Valor**: o valor que deve ser atendido

### 4. Visualizar e Responder

- Clique em "Visualizar" para ver como o formulário ficará
- Teste as condicionalidades respondendo às perguntas

### 5. Ver Respostas

- Clique em "Ver Respostas" para ver todas as respostas coletadas
- Exporte as respostas para CSV se necessário

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

## 💾 Armazenamento

Os dados são persistidos no `localStorage` do navegador:

- **Formulários**: `dynamic_forms`
- **Respostas**: `form_respostas`

## 🎨 Personalização

### Cores e Tema

O projeto usa TailwindCSS com variáveis CSS personalizadas. Para modificar o tema, edite:

- `src/app/globals.css` - Variáveis CSS
- `tailwind.config.ts` - Configuração do Tailwind

### Componentes

Os componentes UI estão em `src/components/ui/` e seguem o padrão do Shadcn/ui.

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. O deploy será automático a cada push

### Outras Plataformas

```bash
npm run build
npm start
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se encontrar algum problema ou tiver dúvidas:

1. Verifique se todas as dependências estão instaladas
2. Certifique-se de que está usando Node.js 18+
3. Limpe o cache: `npm run dev -- --clear`
4. Abra uma issue no repositório

---

Desenvolvido com ❤️ para o desafio técnico de Frontend
