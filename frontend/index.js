// =====================================
// ELEMENTS
// =====================================

const playButton = document.getElementById("playButton");

const casesButton = document.getElementById("casesButton");

const casesOverlay = document.getElementById("casesOverlay");

const closeCasesButton = document.getElementById("closeCases");

const caseCards = document.querySelectorAll(".case-card");

const briefingOverlay = document.getElementById("briefingOverlay");

const closeBriefingButton = document.getElementById("closeBriefing");

const startMissionButton = document.getElementById("startMissionButton");


// =====================================
// OPEN CASES
// =====================================

function openCases(){

    casesOverlay.classList.add("show");

}


// =====================================
// CLOSE CASES
// =====================================

function closeCases(){

    casesOverlay.classList.remove("show");

}


// =====================================
// OPEN BRIEFING
// =====================================

function openBriefing(){

    casesOverlay.classList.remove("show");

    briefingOverlay.classList.add("show");

}


// =====================================
// CLOSE BRIEFING
// =====================================

function closeBriefing(){

    briefingOverlay.classList.remove("show");

    casesOverlay.classList.add("show");

}


// =====================================
// MENU BUTTONS
// =====================================

playButton.addEventListener("click", openCases);

casesButton.addEventListener("click", openCases);


// =====================================
// CLOSE BUTTONS
// =====================================

closeCasesButton.addEventListener("click", closeCases);

closeBriefingButton.addEventListener("click", closeBriefing);


// =====================================
// CLICK OUTSIDE
// =====================================

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


// =====================================
// ESC KEY
// =====================================

document.addEventListener("keydown", function(event){

    if(event.key !== "Escape"){

        return;

    }

    if(briefingOverlay.classList.contains("show")){

        closeBriefing();

    }

    else if(casesOverlay.classList.contains("show")){

        closeCases();

    }

});


// =====================================
// CASE CLICK
// =====================================

caseCards.forEach(function(card){

    if(card.classList.contains("locked")){

        return;

    }

    card.addEventListener("click", function(){

        openBriefing();

    });

});


// =====================================
// START MISSION
// =====================================

startMissionButton.addEventListener("click", function(){

    window.location.href = "game.html";

});