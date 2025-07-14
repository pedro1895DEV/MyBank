# Desafio de Programação - Sistema de Transferências

## Descrição
Este projeto implementa um sistema de transferências financeiras entre usuários, onde cada usuário pode ser do tipo "Comum" ou "Lojista". O sistema permite o cadastro de usuários, a realização de transferências e a notificação dos usuários após as transações.

## Tipos de Usuários
- **Comum (COMMON)**: Pode enviar e receber dinheiro.
- **Lojista (SHOPKEEPER)**: Pode apenas receber dinheiro.

- **Requisitos Gerais**
  - Toda transação precisa ser autorizada por um serviço externo.
  - Após a transação, um serviço de notificação deve ser comunicado.
## Requisitos Funcionais (Features)
### Cadastro de Usuários (POST /users)
- O endpoint deve receber no body da requisição:
  - `fullName` (string)
  - `cpfCnpj` (string, único)
  - `email` (string, único)
  - `password` (string)
  - `userType` (enum: COMMON ou SHOPKEEPER)
- Ao criar um usuário, uma carteira (Wallet) deve ser associada a ele com um saldo inicial de R$ 0,00.
- A senha deve ser armazenada de forma segura (hash).
### Realização de Transferência (POST /transactions)
- O endpoint deve receber no body da requisição:
  - `value` (decimal, o valor da transferência)
  - `payer` (ID do usuário que paga)
  - `payee` (ID do usuário que recebe)
- A transferência deve ser concluída com sucesso somente se todas as regras de negócio forem satisfeitas.
## Regras de Negócio
### Validação de Saldo
- O usuário pagador (payer) deve ter saldo suficiente em sua carteira para realizar a transferência.
### Validação de Tipo de Usuário
- Usuários do tipo SHOPKEEPER não podem realizar transferências, apenas recebê-las.
### Atomacidade
- A operação de transferência deve ser atômica. Ou seja, a atualização do saldo do pagador e do recebedor deve ocorrer com sucesso. Se uma falhar, a outra deve ser revertida (rollback).
### Serviço de Autorização Externo
- Antes de efetivar a transferência, o sistema deve consultar um serviço autorizador externo. Para
este desafio, utilize este mock que simula o serviço:
  - **URL**: https://https://mocki.io/
  - **Método**: GET
  - **Resposta de Sucesso**: `{ "message": "Authorized" }`
- A transação só pode ser concluída se a resposta do serviço for "Authorized".
### Serviço de Notificação
- Após a transferência ser concluída com sucesso, o sistema deve enviar uma notificação para o usuário recebedor (payee). Para este desafio, utilize este mock que simula o envio:
  - **URL**: https://mocki.io/
  - **Método**: GET
    - **Resposta de Sucesso**: `{ "message": "Notification sented" }`
- A notificação deve ser enviada com sucesso após a conclusão da transferência.
## Instalação e Execução
1. Clone o repositório:
   ```bash
   git clone
   ```

2. Navegue até o diretório do projeto:
   ```bash
    cd nome-do-repositorio
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Configure o banco de dados PostgreSQL com as credenciais corretas no arquivo `.env`.

5. Inicie o servidor:
   ```bash
   npm run dev
   ```
6. Acesse a API através do endereço `http://localhost:3000`.

## Testes
Para garantir a qualidade do código, foram implementados testes unitários e de integração utilizando o Jest. Para executar os testes, utilize o seguinte comando:

```bash
npm test
```

## Documentação da API
A documentação da API está disponível no arquivo `api-docs.md`, onde você encontrará detalhes sobre os endpoints, parâmetros e exemplos de requisições e respostas.
## Tecnologias Utilizadas
- Node.js
- Express
- PostgreSQL
- Prisma
- Jest
