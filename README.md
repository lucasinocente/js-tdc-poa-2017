# Hello TDC!

Essa é a aplicação de exemplo utilizada nas minhas duas talks no The Developers Conference Porto Alegre 2017:

1 - Node.js básico para front end developers - (Slides da palestra)
2 - Aplicações real time utilizando Javascript puro em 2017 - (Slides da palestra)

### Para instalar a aplicação

`npm install`

### Para rodar a aplicação

`npm start`

### Para acessar uma sala
http://localhost:3000/123

### Para enviar uma mensagem para a sala simulando um bot

Só abrir o terminal e:

```
curl -X POST -v \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
  "content":"Lorem Ipsum Plataforma sala 123",
  "status": "received",
  "room": "123"
}' \
'http://localhost:3000/messages'
```

## Estrutura esperada para enviar uma mensagem como cliente

A única diferente é no `status` da mensagem, onde espera-se um `sent` em vez de `received`. Isso ira fazer os templates da aplicação renderizar a mensagem utilizando as classes `card w-55 float-right bg-info text-white` do Bootstrap.

```
{
  "content":"Lorem Ipsum Plataforma sala 123",
  "status": "sent",
  "room": "123"
}
```

