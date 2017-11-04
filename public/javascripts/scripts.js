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
    console.log('scrollToBottom');
    console.log(document.body.scrollHeight);
    window.scrollTo( 0, document.body.scrollHeight );
}