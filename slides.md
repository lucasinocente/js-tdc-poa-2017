
# Aplicações real time utilizando Javascript puro em 2017

---

## Lucas Inocente

- Sou desenvolvedor a: fiz site em flash e editei layout do my space. Uns 10 anos.
- Já fundei duas empresas - Santins / Fight Analytics
- Hoje em dia desenvolvedor na Zenvia

---

## O que é real time

Acho que é interessante a gente definir alguns termos. Por Javascript puro eu quero dizer sem frameworks ou tools conhecidas como falamos anteriormente, ou qualauer outra que seja. É escrever o javascript e ele rodar no browser sem nada *no front end*.

Porém, não quer dizer que não iremos utilizar coisas mais modernas no back end.

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

Então pra seguir a linha do caso de uso, iremos reproduzir um chat que servirá de interface para uma conversa de um usuário com um bot, no caso o bot será nós mesmos com o curl pelo terminal.

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
});.

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


## Cria models e controllers da aplicação

Tá começando a crescer os arquivos, vamos organizar melhor e colocar tudo dentro duma pasta /app.

`mkdir app`

`mv views/ app/`


`npm install mongoose --save`
`npm install body-parser --save`


```
// index.js

var express = require('express');
var app = express();
var mongoose   = require('mongoose');
var Message = require('./app/models/messageModel');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOURL);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('pages/chat');
});

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();

}
  
app.use(allowCrossDomain);

var routes = require('./app/routes/messageRoutes');
routes(app);
  
app.listen(app.get('port'), function() {
  console.log('Node app is running on http://localhost:' + app.get('port'));
});
```

Agora bora criar os arquivos do backend

`mkdir app/controllers`
`mkdir app/models`
`mkdir app/routes`

`cd app/controllers`
`touch messageController.js`

`cd ../`
`cd models`
`touch messageModel.js`

`cd ../`
`cd routes`
`touch messageRoutes.js`


Bora criar a estrutura das nossas mensagens

```
// app/models/messageModel.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MessageSchema = new Schema({
    send_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String
    },
    content: {
        type: String
    }
});


module.exports = mongoose.model('Messages', MessageSchema);

```

Agora vamos criar as rotas necessárias pra nossa aplicação

```
// app/routes/messageRoutes.js


module.exports = function(app) {
    
    var message = require('../controllers/messageController');

    app.route('/messages')
        .get(message.list)
        .post(message.create);

};

```

E agora vamos criar os controllers que serão chamados à partir das rotas. Pra demonstrar agora precisaremos somente de dois, um para listar todas as mensagens e um para salvar no banco uma mensagem recebida.


```
// app/controllers/messageController.js

var mongoose = require('mongoose');
var Message = mongoose.model('Messages');

exports.list = function(req, res) {

    Message.find({}, function(err, message) {
        if (err)
            res.send(err);
        res.json(message);
    });

}; 


exports.create = function(req, res) {

    var newMessage = new Message(req.body);

    newMessage.save(function(err, message) {
        if (err)
            res.send(err);
        res.json(message);
    });

};


```

### Exemplo de requisição pra teste do backend

Vamos aproveitar e mandar duas mensagens pro servidor pra ver se tá tudo funcionando:

Mensagem enviada pelo usuário:

```
curl -X POST -v \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
  "content":"Lorem Ipsum Usuário",
  "status": "sent"
}' \
'http://localhost:3000/messages'
```

Mensagem enviada pela plataforma:

```
curl -X POST -v \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
  "content":"Lorem Ipsum Plataforma",
  "status": "received"
}' \
'http://localhost:3000/messages'
```

E também vamos adicionar o comando `node index.js` dentro do `package.json` pra que possamos rodar com um comando padronizado `npm start`.

```
// package.json

  [...]
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  },
  [...]

```

---

### Fazendo o template ler as mensagens

Agora hora de fazer o template do ejs funcionar.

Pra isso vamos primeiro passar a rota index pra dentro do controller e enviar a resposta da busca por mensagens.

```
// app/routes/messageRoutes.js

[...]

app.route('/')
    .get(message.chat)

[...]

```

E criar o controller chat:

```
// app/controllers/messageController.js


[...]

exports.chat = function(req, res) {

    Message.find({}, function(err, messages) {
        if (err)
            res.send(err);
        res.render('pages/chat', {messages: messages});
    });

}; 

[...]

```

E claro, remover a rota `/` do `index.js`.

Depois disso precisamos editar o index.ejs:

```

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <title>Chat real time utilizando Javascript puro em 2017</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
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
        .chat {
            padding-bottom: 140px;
        }
    </style>
</head>
<body>

<div class="chat">
    <div class="container" id="container">

        <% messages.forEach(function(message,index) { %>
            
            <div class="message">

                <% if (message.status == "received") { %>
                
                    <div class="card w-55 float-left bg-light">
                        <div class="card-body">
                            <p class="card-text"><%= message.content %></p>
                        </div>
                    </div>

                <% } else { %>

                    <div class="card w-55 float-right bg-info text-white">
                        <div class="card-body">
                            <p class="card-text"><%= message.content %></p>
                        </div>
                    </div>

                <% } %>

            </div>

        <% }); %>

    </div>


    <div class="form">
        <div class="container">
            <form class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-9 col-sm-10">
                            <input type="text" class="form-control" placeholder="First name">
                        </div>
                        <div class="col-3 col-sm-2">
                            <button class="btn btn-info btn-block">></button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>


</body>
</html>


```

---

### Fazer mensagem que vem do servidor aparecer em tempo real no console.

### Hello World Socket.io

Instala socket.io

`npm install socket.io --save`

Emit mensagem de teste

```
// index.js

--
var app = express();

++

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


--
app.listen(app.get('port'), function() {
  console.log('Node app is running on http://localhost:' + app.get('port'));
});

++
io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(app.get('port'), function() {
  console.log('Node app is running on http://localhost:' + app.get('port'));
});

```

Faz mensagem aparecer no console

`mkdir public/javascripts`

`touch public/javascripts/scripts.js`

```
// /public/javascripts/scripts.js

var socket = io();

```



```
// /app/views/pages/chat.js

<script src="/socket.io/socket.io.js"></script>
<script src="/javascripts/scripts.js"></script>

```

---

### Faz mensagem do servidor aparecer na view

Pra fazer o socket enviar a partir dos controllers tb precisamos deixar a io global.

Só trocar `var io = require('socket.io')(http);` por `io = require('socket.io')(http);`

Depois, precisamos enviar a mensagem que é salva pra view, pra isso editaremos o controller de create e emitir utilizar o `io.emit`.

```
// /app/controllers/messageController.js

exports.create = function(req, res) {

    var newMessage = new Message(req.body);

    newMessage.save(function(err, message) {
        if (err) {
            res.send(err);
        } else {
            io.emit('message', message);
            res.json(message);
        }
    });

};

```
Se adicionarmos um console log enxergaremos algo tipo:

```
// public/javascripts.js

var socket = io();

socket.on('message', function(message){

    console.log('message', message);

});

```

`message {__v: 0, content: "Lorem Ipsum Plataforma", status: "received", _id: "59fe38471faa5e441c22a940", send_at: "2017-11-04T21:59:35.551Z"}`

---

### Faz mensagem aparecer na view

Agora é a parte legal, com o conteúdo sendo enviado pelo socket pra view, precisamos somente criar os elementos e joga-los no DOM.

Bora lá:

(Explicar código)

```
// public/javascripts/scripts.js

var socket = io();

socket.on('message', function(message){
    renderTemplate(message);
});

function renderTemplate(message) {

    var node = createNode();

    node.className = 'message';
    node.innerHTML = getMessageHtml(message);

    appendMessage(node);

}


function createNode() {
    return node = document.createElement('div');
}

function getMessageHtml(message) {

    var className = getClassName(message.status);

    return content = '<div class="' + className + '"> \
                          <div class="card-body">\
                              <p class="card-text"> '+ message.content +'</p> \
                          </div> \
                      </div>';

}

function getClassName(status) {

    var className;

    if (status == "received") {
        className = "card w-55 float-left bg-light";
    } else {
        className = "card w-55 float-right bg-info text-white";
    }

    return className;
}

function appendMessage(node) {
    document.getElementById("container").appendChild(node);
    scrollToBottom();
}

function scrollToBottom() {
    window.scrollTo( 0, document.body.scrollHeight );
}

```

---

### Separar por sala

Pra separar por sala, precisamos criar um novo value no Schema de mensagem:

```
// /app/models/messageModel.js

    room: {
        type: String
    }

```

Adicionar uma nova rota no nosso routes:

```
// /app/routes/messageRoutes.js

app.route('/:room')
        .get(message.chat)

```

E no nosso controller, ler essa informação:

```
// /app/controllers/messageController.js

exports.chat = function(req, res) {

    var room = req.params.room

    Message.find({ 'room': room }, function(err, messages) {
        if (err)
            res.send(err);
        res.render('pages/chat', {messages: messages});
    });

}; 

```

Mensagem de teste:

```
curl -X POST -v \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
  "content":"Lorem Ipsum Plataforma sala 1",
  "status": "received",
  "room": "1"
}' \
'http://localhost:3000/messages'
```

E podemos acessar em http://localhost:3000/1


Porém, isso não faz o socket enviar pra sala certa, ele envia pra todas.

---

### Fazer socket enviar pra sala certa

Usaremos o pathname `/1` para ser a nossa sala. 

Precisamos conectar nosso client à sala `/:id`:

```
// public/javascripts/scripts.js

var room = window.location.pathname;

var socket = io.connect();

socket.on('connect', function() {
    socket.emit('room', room);
});

[...]

```

Precisamos conectar nosso server à sala `/:id`:

```
// index.js

io.sockets.on('connection', function(socket) {
  socket.on('room', function(room) {
      socket.join(room);
  });
});

```

E enviar à partir do nosso controller quando uma mensagem é salva:

```
// /app/controllers/messageController.js

exports.create = function(req, res) {

    var newMessage = new Message(req.body);
    var room = '/' + req.body.room;

    newMessage.save(function(err, message) {
        if (err) {
            res.send(err);
        } else {
            io.in(room).emit('message', message);
            res.json(message);
        }
    });

};

```
