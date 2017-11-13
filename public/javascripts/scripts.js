
// **********
// Socket.io
// **********

const room = window.location.pathname.replace("/", "");
const socket = io.connect();

socket.on('connect', function() {
    socket.emit('room', room);
    console.log('Conectado na room:', room);
});

socket.on('message', function(message){
    renderTemplate(message);
});



// **********
// Templates
// **********

function renderTemplate(message) {

    let node = createNode();

    node.className = 'message';
    node.innerHTML = getMessageHtml(message);

    appendMessage(node);
    
}

function createNode() {
    return node = document.createElement('div');
}

function getMessageHtml(message) {

    let className = getClassName(message.status);

    return content = '<div class="' + className + '"> \
                          <div class="card-body">\
                              <p class="card-text"> '+ message.content +'</p> \
                          </div> \
                      </div>';

}

function getClassName(status) {

    let className;

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

    let message = renderMessage();

    let xhr = new XMLHttpRequest();
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
    
    const content = document.getElementById('message').value;

    let message = {
        content: content,
        status: "sent",
        room: room
    };

    return message;

}

function resetForm() {
    document.getElementById('message').value = "";
}