const socket = io()

let name;
let textarea = document.querySelector('#messageInp')
let messageArea = document.querySelector('.container')
do{


name = prompt('please enter your name:')
}while(!name)


textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})



function sendMessage(message){

    let msg = {
        user:name,
        message:message.trim()
    }



    appendMessage(msg,'outgoing')
    textarea.value=''
    scrollToBottom()



    socket.emit('message',msg)



}


function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let classname = type
    mainDiv.classList.add(classname,'message')



    let markup =`
    
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    
    
    `


    mainDiv.innerHTML=markup

    messageArea.appendChild(mainDiv)
}



socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})


function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}