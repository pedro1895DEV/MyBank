# Documentação da API

Esta documentação descreve a API para um sistema de transferência de dinheiro entre usuários, com diferentes tipos de usuários e regras de negócio específicas.

## Endpoints

### Cadastro de Usuários (POST /users)
Cria um novo usuário no sistema.
#### Requisição
```json
{
  "fullName": "Nome Completo",
  "cpfCnpj": "CPF ou CNPJ único",
  "email": "email",
  "password": "Senha",
  "userType": "COMMON" // ou "SHOPKEEPER"
}
```

#### Resposta
```json
{
  "id": "ID do usuário criado",
  "fullName": "Nome Completo",
  "cpfCnpj": "CPF ou CNPJ único",
  "email": "email",
  "userType": "COMMON" // ou "SHOPKEEPER"
}
```
### Realização de Transferência (POST /transactions)
Realiza uma transferência de dinheiro entre usuários.
#### Requisição
```json
{
  "value": 100.00, // Valor da transferência
  "payer
": "ID do usuário que paga",
  "payee":
    "ID do usuário que recebe"
}
```
#### Resposta
```json
{
  "transactionId": "ID da transação",
  "status": "SUCCESS" // ou "FAILED"
}
```
### Notificação de Transferência (GET /notifications)
Notifica o usuário recebedor após a conclusão da transferência.
#### Requisição
```json
{
  "payeeId": "ID do usuário recebedor"
}
```
#### Resposta
```json
{
  "message": "Notificação enviada com sucesso"
}
```
## Regras de Negócio
### Validação de Saldo
O usuário pagador deve ter saldo suficiente em sua carteira para realizar a transferência.
### Validação de Tipo de Usuário
Usuários do tipo SHOPKEEPER não podem realizar transferências, apenas recebê-las.
### Atomacidade
A operação de transferência deve ser atômica. Se uma atualização falhar, a outra deve ser revertida.
### Serviço de Autorização Externo
Antes de efetivar a transferência, o sistema deve consultar um serviço autorizador externo. Utilize o seguinte mock:
- **URL**: https://mocki.io/
- **Método**: GET
- **Resposta de Sucesso**: `{ "message": "Authorized" }`
### Serviço de Notificação
Após a transferência ser concluída com sucesso, o sistema deve enviar uma notificação para o usuário
recebedor. Utilize o seguinte mock:
- **URL**: https://mocki.io/
- **Método**: GET
- **Resposta de Sucesso**: `{ "message": "Notification sented" }`