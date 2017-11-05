
// **********
// Socket.io
// **********

var room = window.location.pathname;
var room = room.replace("/", "");

var socket = io.connect();

socket.on('connect', function() {
    socket.emit('room', room);
    console.log('room:', room);
});

socket.on('message', function(message){
    console.log('message', message);
    renderTemplate(message);
});



// **********
// Templates
// **********


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


// **********************
// View / Dom manipulate
// **********************


function appendMessage(node) {
    document.getElementById("container").appendChild(node);
    scrollToBottom();
}

function scrollToBottom() {
    console.log('scrollToBottom');
    console.log(document.body.scrollHeight);
    window.scrollTo( 0, document.body.scrollHeight );
}


// **********
// Formulário
// **********

function sendMessage() {

    event.preventDefault();

    var message = renderMessage();

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/messages", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(message));

    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            resetForm();
        }
    };

}

function renderMessage() {
    
    var content = document.getElementById('message').value;

    var message = {
        content: content,
        status: "sent",
        room: room
    };

    return message;

}

function resetForm() {
    document.getElementById('message').value = "";
}