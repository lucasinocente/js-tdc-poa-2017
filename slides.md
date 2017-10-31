
# Aplicações real time utilizando Javascript puro em 2017

---

## Lucas Inocente

- Sou desenvolvedor a: fiz site em flash e editei layout do my space. Uns 10 anos.
- Já fundei duas empresas - Santins / Fight Analytics
- Hoje em dia desenvolvedor na Zenvia

---

## O que é real time

Acho que é interessante a gente definir alguns termos. Por Javascript puro eu quero dizer sem frameworks ou tools conhecidas como falamos anteriormente, ou qualauer outra que seja. É escrever o javascript e ele rodar no browser sem nada *no front end*.

Porém, não quer dizer que não iremos utilizar coisas mais modernas

---

## Possibilidades / Alternativas em 2017

Temos tantas opções hoje em dia, porque não utilizar uma das várias ferramentas que temos hoje em dia?

Refs:

- https://medium.com/this-dot-labs/building-modern-web-applications-in-2017-791d2ef2e341
- /images/js-frameworks-2017.png

---

## Vantagens

Existem algumas vantagens como por exemplo:

- Peso
- Setup mínimo
- Livre arbítrio
- (Pesquisar vantagens)

Eu poderia ficar citando várias vantagens aqui e debatendo diversas outras com diversas teorias acadêmicas e etc, mas quis compartilhar uma lance mais real, não que não seja importante, mas porque a gente sabe que no dia a dia que o bicho pega. Bora lá. 

---

## Caso de uso real

Um dos produtos da nova plataforma conversacional da Zenvia será uma integração entre sms + chat web + bot + 0800 de dados. Alguns clientes, como bancos por exemplo, utilizarão isso para automatizar parte da tentativa de cobrança de crédito. É enviado então um SMS para o cliente a ser cobrado com uma mensagem + um link para o chat web com um atendente automatizado (web chat + bot). Para facilitar a conversão, a Zenvia também oferece o 0800 de dados, que é uma navegação gratuíta para o cliente naquele domínio, basicamente a Zenvia paga o 3G pro cliente usar o chat e converter. 

Então, cada kb conta.

---

## Comparação de peso de frameworks na build inicial

Dando só um `npm install`, `npm build` a ideia é listar aqui o peso de 3 top frameworks do mercado.

---

Entendo que é um caso de uso bem específico mas enfim, vamos pra parte divertida :)

---

## Arquitetura da nossa aplicação - MEJNS

Então pra seguir a linha do caso de uso, iremos reproduzir um chat.

A ideia de utilizar "só javascript puro" é que vamos usar nossos conhecimentos de Javascript no servidor também. Então usaremos:

- Mongo
- Express
- Javascript
- Node
- Socket.io

Além disso usaremos também `EJS` para nossos templates e `Mongoose` pra usar o mongo.

---

## Startando a aplicação

Entendo que tu já tenha o `node`, o `mongo` e o `npm` instalado, caso contrário por favor.

Pra começar uma aplicação:

`npm init`

---

## Express Hello World

Primeiro vamos instalar o express:

`npm install express --save`

Depois criar um arquivo index.js:

`touch index.js`

Vamos adicionar o código abaixo:

```
// index.js

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.send('Hello TDC');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on http://localhost:' + app.get('port'));
});

```

Pra startar a aplicação:

`node index.js`

Pra acessar:

`http://localhost:3000`

---

## EJS Install

Beleza mas isso não faz muita coisa, bora instalar o EJS.

O EJS servirá pra gente cuidar dos nossos templates. Pra isso setamos três coisas, a nossa pasta pública, onde iremos colocar nossos assets, a pasta views, onde iremos colocar nossos templates e, claro, avisar o sistema que é pra usar o ejs de engine.

`npm install ejs --save`

```
// index.js

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

```
---

## EJS Hello World

`mkdir views`
`mkdir views/pages`
`cd views/pages`
`touch view/pages/chat.ejs`

```
// view/pages/chat.ejs

<h1> Hello TDC </h1>
```

```
// index.js

app.get('/', function(req, res) {
  res.render('pages/chat');
});
```
---

## Deixar mais parecido com um chat


```
// view/pages/chat.ejs

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <title>Chat real time utilizando Javascript puro em 2017</title>
    <meta name="description" content="Aplicação desenvolvida para a palestra Aplicações real time utilizando Javascript puro em 2017 no The Developers Conference Porto Alegre 2017"> 
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    <style>
        .message {
            margin-top: 20px;
            overflow: hidden;
        }
        .form {
            position: fixed;
            bottom: 20px;
            left: 0px;
            width: 100%;
        }
    </style>
</head>
<body>
  <div class="container">
        
        <div class="message">
            <div class="card w-55 float-left bg-light">
                <div class="card-body">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </div>


        <div class="message">
            <div class="card w-55 float-right bg-info text-white">
                <div class="card-body">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </div>

  </div>



  <div class="form">
      <div class="container">
        <form class="card">
                <div class="card-body">
            <div class="row">
                <div class="col-11">
                    <input type="text" class="form-control" placeholder="First name">
                </div>
                <div class="col">
                    <button class="btn btn-info btn-block">></button>
                </div>
            </div>
            </div>
        </form>
    </div>
</div>


</body>
</html>


```