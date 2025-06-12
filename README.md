# Romantic Anniversary

Um site para celebrar 12 meses de relacionamento com fotos, mensagens e momentos especiais.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## Funcionalidade de Mensagens e GitHub

Este projeto salva as mensagens como arquivos de texto na pasta `public/mensagens_do_futuro` e **automaticamente** adiciona cada nova mensagem ao repositório GitHub. Isso garante que:

1. Todas as mensagens sejam versionadas no Git
2. O histórico de mensagens seja preservado mesmo após redeploys
3. As mensagens possam ser acessadas de qualquer lugar via GitHub

## Como configurar

### 1. Crie um repositório no GitHub:
   - Faça login no [GitHub](https://github.com/)
   - Crie um novo repositório para o projeto
   - Clone o repositório para seu computador

### 2. Configure as credenciais do GitHub:
   - Crie um [Personal Access Token](https://github.com/settings/tokens) no GitHub:
     - Clique em Settings > Developer settings > Personal access tokens > Tokens (classic)
     - Gere um novo token com permissão `repo`
     - Copie o token gerado
   - Crie um arquivo `.env.local` na raiz do projeto com:
     ```
     GITHUB_TOKEN=seu_token_aqui
     GITHUB_REPO_URL=https://github.com/seu-usuario/seu-repositorio.git
     ADMIN_PASSWORD=sua_senha_admin
     ```

### 3. Deploy no Render:
   - Faça login no [Render](https://render.com/)
   - Clique em "New +" e selecione "Web Service"
   - Conecte seu repositório GitHub
   - Configure:
     - **Name**: romantic-anniversary (ou o nome que preferir)
     - **Environment**: Node
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
   - Em "Environment Variables", adicione as mesmas variáveis do `.env.local`

## Como funciona

1. Quando alguém envia uma mensagem pelo formulário, o arquivo é:
   - Salvo na pasta `public/mensagens_do_futuro`
   - Adicionado ao Git (`git add`)
   - Commitado (`git commit`)
   - Enviado para o GitHub (`git push`)

2. Você pode acessar todas as mensagens:
   - Pela interface administrativa em `/admin` (protegida por senha)
   - Diretamente no repositório GitHub na pasta `public/mensagens_do_futuro`

## Desenvolvimento local

1. Clone o repositório
2. Copie `.env.local.example` para `.env.local` e preencha as variáveis
3. Instale as dependências: `npm install` (ou `pnpm install`)
4. Execute o servidor de desenvolvimento: `npm run dev` (ou `pnpm dev`)

## Nota importante

Para que o commit e push automático funcionem no Render, é necessário:
1. Configurar corretamente as variáveis de ambiente
2. Usar um token de acesso pessoal com permissão para fazer push no repositório
3. A pasta `.git` deve estar presente no build (o Render preserva isso por padrão)

## Tecnologias

- Next.js 15
- React 19
- Tailwind CSS
- GitHub API 