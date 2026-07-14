const chat = document.getElementById("chat");

const messageInput = document.getElementById("messageInput");

const sendButton = document.getElementById("sendButton");

const attachmentButton = document.getElementById("attachmentButton");

const trustBar = document.getElementById("trustBar");

const frustrationBar = document.getElementById("frustrationBar");

const turnCounter = document.getElementById("turnCounter");

const exitButton = document.getElementById("exitButton");

const caseFileButton = document.getElementById("caseFileButton");

const exitOverlay = document.getElementById("exitOverlay");

const cancelExit = document.getElementById("cancelExit");

const confirmExit = document.getElementById("confirmExit");

const missionCompleteOverlay = document.getElementById("missionCompleteOverlay");

const missionTitle = document.getElementById("missionTitle");

const missionEnding = document.getElementById("missionEnding");

const missionTrust = document.getElementById("missionTrust");

const missionFrustration = document.getElementById("missionFrustration");

const missionTurns = document.getElementById("missionTurns");

const missionQuote = document.getElementById("missionQuote");

const returnMenuButton = document.getElementById("returnMenuButton");

let trust = 50;

let frustration = 0;

let currentTurn = 0;

const maxTurns = 25;

let gameEnded = false;

const DEV_MODE = false;

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

if(data.error){

    hideTyping();

    addSystemMessage(data.error);

    return;

}

        console.log(data);

        hideTyping();

        addAIMessage(data.reply);

        trust = data.state.trust;

        frustration = data.state.frustration;

        currentTurn = data.state.current_turn;

        updateUI();

        if(data.conversation_ended && !data.mission_complete){

    setTimeout(

        function(){

            showMissionResult(false);

        },

        1000

    );

}

if(data.mission_complete){

    setTimeout(

        function(){

            showMissionResult(true);

        },

        1000

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

    if(!gameEnded){

        sendButton.disabled = false;

        messageInput.focus();

    }

}

}

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

function createMessage(sender, message, type){

    const row = document.createElement("div");

    row.className = "message " + type;

    const bubble = document.createElement("div");

    bubble.className = "bubble";

    if(type === "system"){

        bubble.textContent = message;

    }

    else{

        const name = document.createElement("div");

        name.className = "message-name";

        name.textContent = sender;

        const text = document.createElement("div");

        text.textContent = message;

        bubble.appendChild(name);

        bubble.appendChild(text);

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

function updateUI(){

    trustBar.value = trust;

    frustrationBar.value = frustration;

    turnCounter.textContent = `${currentTurn} / ${maxTurns}`;

}

function scrollChat(){

    chat.scrollTop = chat.scrollHeight;

}

exitButton.addEventListener(

    "click",

    function(){

        exitOverlay.classList.add("show");

    }

);

cancelExit.onclick = function(){

    exitOverlay.classList.remove("show");

};

confirmExit.onclick = function(){

    window.location.href = "index.html";

};

function showMissionResult(success){

    messageInput.disabled = true;

    sendButton.disabled = true;

    attachmentButton.disabled = true;

    gameEnded = true;

    if(success){

        missionTitle.textContent = "MISSION COMPLETE";

        missionEnding.textContent =
            "Alex quietly opens his notebook and begins the first question.";

        missionQuote.textContent =
            "\"Sometimes people don't need more pressure. They need someone who listens.\"";

    }

    else{

        missionTitle.textContent = "MISSION FAILED";

        missionEnding.textContent =
            "Alex walks away without starting his homework.";

        missionQuote.textContent =
            "\"Understanding someone is harder than winning an argument.\"";

    }

    missionTrust.textContent =
        trust + "%";

    missionFrustration.textContent =
        frustration + "%";

    missionTurns.textContent =
        `${currentTurn} / ${maxTurns}`;

    missionCompleteOverlay.classList.add("show");

}

returnMenuButton.addEventListener(

    "click",

    function(){

        window.location.href = "index.html";

    }

);

if(DEV_MODE){

    document.addEventListener(

        "keydown",

        function(event){

            if(!event.altKey){

                return;

            }

            switch(event.key){

                case "1":

                    trust = 100;

                    frustration = 0;

                    currentTurn = 15;

                    updateUI();

                    showMissionResult(true);

                    break;

                case "2":

                    trust = 10;

                    frustration = 100;

                    currentTurn = 25;

                    updateUI();

                    showMissionResult(false);

                    break;

                case "3":

                    trust = 100;

                    updateUI();

                    console.log("Trust set to 100");

                    break;

                case "4":

                    frustration = 100;

                    updateUI();

                    console.log("Frustration set to 100");

                    break;

                case "5":

                    currentTurn = 24;

                    updateUI();

                    console.log("Jumped to Turn 24");

                    break;

                case "6":

                    console.log({

                        trust,

                        frustration,

                        currentTurn,

                        gameEnded

                    });

                    break;

            }

        }

    );

}