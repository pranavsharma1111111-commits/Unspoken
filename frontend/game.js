// =====================================================
// DOM ELEMENTS
// =====================================================

const chat = document.getElementById("chat");

const messageInput = document.getElementById("messageInput");

const sendButton = document.getElementById("sendButton");

const attachmentButton = document.getElementById("attachmentButton");

const trustBar = document.getElementById("trustBar");

const frustrationBar = document.getElementById("frustrationBar");

const turnCounter = document.getElementById("turnCounter");

const exitButton = document.getElementById("exitButton");

const caseFileButton = document.getElementById("caseFileButton");


// =====================================================
// GAME STATE
// =====================================================

let trust = 50;

let frustration = 0;

let currentTurn = 0;

const maxTurns = 25;

let gameEnded = false;

// =====================================================
// START GAME
// =====================================================

window.addEventListener("load", initializeGame);

async function initializeGame(){

    try{

        await fetch(

            "http://127.0.0.1:8000/start-game",

            {

                method:"POST"

            }

        );

        addSystemMessage(

            "Mission Started! Convince Alex to willingly begin his homework."

        );

        updateUI();

        messageInput.focus();

    }

    catch(error){

        addSystemMessage(

            "Unable to connect to the server."

        );

    }

}

// =====================================================
// EVENTS
// =====================================================

sendButton.addEventListener(

    "click",

    sendMessage

);

messageInput.addEventListener(

    "keydown",

    function(event){

        if(event.key === "Enter"){

            sendMessage();

        }

    }

);

// =====================================================
// SEND MESSAGE
// =====================================================

async function sendMessage(){

    if(gameEnded){

        return;

    }

    const message = messageInput.value.trim();

    if(message === ""){

        return;

    }

    addPlayerMessage(message);

    messageInput.value = "";

    sendButton.disabled = true;

    showTyping();

    try{

        const response = await fetch(

            "http://127.0.0.1:8000/send-message",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    message:message

                })

            }

        );

        const data = await response.json();

        console.log(data);

        hideTyping();

        addAIMessage(data.reply);

        trust = data.state.trust;

        frustration = data.state.frustration;

        currentTurn = data.state.current_turn;

        updateUI();

        if(data.conversation_ended){

            gameEnded = true;

            messageInput.disabled = true;

            sendButton.disabled = true;

            addSystemMessage(

                "Conversation Ended."

            );

        }

        if(data.mission_complete){

            addSystemMessage(

                "Mission Complete!"

            );

        }

    }

    catch(error){

        hideTyping();

        addSystemMessage(

            "Alex is unavailable right now."

        );

    }

    finally{

        sendButton.disabled = false;

        messageInput.focus();

    }

}

// =====================================================
// MESSAGE FUNCTIONS
// =====================================================

function addPlayerMessage(message){

    createMessage(

        "You",

        message,

        "player"

    );

}

function addAIMessage(message){

    createMessage(

        "Alex",

        message,

        "ai"

    );

}

function addSystemMessage(message){

    createMessage(

        "System",

        message,

        "system"

    );

}

function createMessage(sender,message,type){

    const row = document.createElement("div");

    row.className = "message " + type;

    const bubble = document.createElement("div");

    bubble.className = "bubble";

    if(type === "system"){

        bubble.textContent = message;

    }

    else{

        bubble.innerHTML = `

            <div class="message-name">

                ${sender}

            </div>

            <div>

                ${message}

            </div>

        `;

    }

    row.appendChild(bubble);

    chat.appendChild(row);

    scrollChat();

}

function showTyping(){

    const typing = document.createElement("div");

    typing.className = "message ai";

    typing.id = "typing";

    typing.innerHTML = `

        <div class="typing">

            <span></span>

            <span></span>

            <span></span>

        </div>

    `;

    chat.appendChild(typing);

    scrollChat();

}

function hideTyping(){

    const typing = document.getElementById("typing");

    if(typing){

        typing.remove();

    }

}

// =====================================================
// UI
// =====================================================

function updateUI(){

    trustBar.value = trust;

    frustrationBar.value = frustration;

    turnCounter.textContent = `${currentTurn} / ${maxTurns}`;

}

function scrollChat(){

    chat.scrollTop = chat.scrollHeight;

}