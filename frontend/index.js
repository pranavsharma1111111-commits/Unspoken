

const playButton = document.getElementById("playButton");

const casesButton = document.getElementById("casesButton");

const casesOverlay = document.getElementById("casesOverlay");

const closeCasesButton = document.getElementById("closeCases");

const caseCards = document.querySelectorAll(".case-card");

const briefingOverlay = document.getElementById("briefingOverlay");

const closeBriefingButton = document.getElementById("closeBriefing");

const startMissionButton = document.getElementById("startMissionButton");

const settingsButton = document.getElementById("settingsButton");

const settingsOverlay = document.getElementById("settingsOverlay");

const closeSettingsButton = document.getElementById("closeSettings");

const saveSettingsButton = document.getElementById("saveSettings");

const clearSettingsButton = document.getElementById("clearSettings");

const apiKeyInput = document.getElementById("apiKeyInput");

function openCases(){

    casesOverlay.classList.add("show");

}



function closeCases(){

    casesOverlay.classList.remove("show");

}




function openBriefing(){

    casesOverlay.classList.remove("show");

    briefingOverlay.classList.add("show");

}



function closeBriefing(){

    briefingOverlay.classList.remove("show");

    casesOverlay.classList.add("show");

}




playButton.addEventListener("click", openCases);

casesButton.addEventListener("click", openCases);



closeCasesButton.addEventListener("click", closeCases);

closeBriefingButton.addEventListener("click", closeBriefing);




casesOverlay.addEventListener("click", function(event){

    if(event.target === casesOverlay){

        closeCases();

    }

});

briefingOverlay.addEventListener("click", function(event){

    if(event.target === briefingOverlay){

        closeBriefing();

    }

});




document.addEventListener("keydown", function(event){

    if(event.key !== "Escape"){

        return;

    }

    if(settingsOverlay.classList.contains("show")){

    closeSettings();

}

else if(briefingOverlay.classList.contains("show")){

    closeBriefing();

}

else if(casesOverlay.classList.contains("show")){

    closeCases();

}

});



caseCards.forEach(function(card){

    if(card.classList.contains("locked")){

        return;

    }

    card.addEventListener("click", function(){

        openBriefing();

    });

});


startMissionButton.addEventListener("click", function(){

    window.location.href = "game.html";

});

function openSettings(){

    settingsOverlay.classList.add("show");

}

function closeSettings(){

    settingsOverlay.classList.remove("show");

}

settingsButton.addEventListener(

    "click",

    openSettings

);

closeSettingsButton.addEventListener(

    "click",

    closeSettings

);

settingsOverlay.addEventListener(

    "click",

    function(event){

        if(event.target === settingsOverlay){

            closeSettings();

        }

    }

);
async function saveApiKey(){

    const apiKey = apiKeyInput.value.trim();

    if(apiKey === ""){

        alert("Please enter a Gemini API key.");

        return;

    }

    try{

        const response = await fetch(

            "http://127.0.0.1:8000/set-api-key",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    api_key:apiKey

                })

            }

        );

        if(!response.ok){

            throw new Error();

        }

        localStorage.setItem(

            "gemini_api_key",

            apiKey

        );

        alert("API key saved successfully.");

        closeSettings();

    }

    catch(error){

        alert("Unable to connect to the server.");

    }

}
function loadApiKey(){

    const savedKey = localStorage.getItem(

        "gemini_api_key"

    );

    if(savedKey){

        apiKeyInput.value = savedKey;

    }

}

function clearApiKey(){

    localStorage.removeItem(

        "gemini_api_key"

    );

    apiKeyInput.value = "";

    alert("API key removed.");

}

saveSettingsButton.addEventListener(

    "click",

    saveApiKey

);

clearSettingsButton.addEventListener(

    "click",

    clearApiKey

);

loadApiKey();