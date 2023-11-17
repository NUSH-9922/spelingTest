let inputText = document.getElementById("inputText");
let randomWord = "";


// ************************************* call api **************************************
async function getRandomWord() {
    const response = await fetch('https://random-word-api.herokuapp.com/word?length=5');
    const data = await response.json();
    randomWord = data[0];
}
getRandomWord();



// ********************************** text to spech **************************************
document.getElementById("play-btn").addEventListener("click", click);

function click() {
    var utterance = new SpeechSynthesisUtterance(randomWord);
    utterance.lang = 'en-IN';
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
    // ********************************************** animated Png *******************************************[]
    document.getElementById("play-btn").style.width = "200px"
    document.getElementById("play-btn").innerHTML = `<img src="icons8-dots-loading.gif" alt="" id="AnimatedPng">`
    setTimeout(function () {
        document.getElementById("play-btn").style.width = "100px"
        document.getElementById("play-btn").innerHTML = `<p>Play</p>`;
    }, 500);


}

// *********************************** showAnswer part *************************************

let showAnswer = document.getElementById("show-answer");
let showAnswerToggelValue = 0;


showAnswer.onclick = function () {
    let  finalData =randomWord.charAt(0).toUpperCase() + randomWord.slice(1);
    if (showAnswerToggelValue === 0) {
        showAnswer.innerText = finalData;
        showAnswerToggelValue = 1;
      
    } else if (showAnswerToggelValue === 1) {
        showAnswer.innerText = "Show Answer";
        showAnswerToggelValue = 0;
    }
 
}

// *********************************************** defaust values ************************************************
let TotalAttempted = 0;
let totalWrongAnswer = 0;
let totalCurrectedAnswer = 0;

// *************************************** check or value with random word ************************************

const overlay = document.getElementById("overlay-box");
document.getElementById('check-btn').addEventListener("click", checkSpelling);

function checkSpelling() {
    let a;
    let  finalData =randomWord.charAt(0).toUpperCase() + randomWord.slice(1);
    TotalAttempted += 1;
    document.getElementById('check-btn').style.display = "none";
    if (inputText.value === finalData) {
        overlay.innerText = ` You are absolutely right`;
        totalCurrectedAnswer++;
    } else {
        overlay.innerText = `you are wrong`;
        totalWrongAnswer++;
    }
    overlay.style.animationName = "down";
    showAnswer.innerText = "Show Answer";
    inputText.value = ""
    showOverlay()
    setValue();
}


// ********************************* set value of table data ***********************************
function setValue() {
    document.getElementById("totalAttempted").innerText = TotalAttempted;
    document.getElementById("totalAnswer").innerText = totalWrongAnswer;
    document.getElementById("totalCurrectedAnswer").innerText = totalCurrectedAnswer;
}

// ********************************* next btn or call api again *****************************************
document.getElementById("next-btn").addEventListener("click", async function () {
    await getRandomWord(); // Wait for getRandomWord to complete
    showAnswer.innerText = "Show Answer";
    document.getElementById('check-btn').style.display = "flex";
    document.getElementById("overlay-box").style.display = "flex"
    inputText.value = ""
});

// ********************************** overlay ********************************************************
function showOverlay() {
    gsap.to("#overlay-box", {
        top: "40px",
        duration: 1,
        onComplete: function () {
          setTimeout(function(){
            document.getElementById("overlay-box").style.display = "none"
            document.getElementById("overlay-box").style.top = "-40px"
          },1000)
        }
    })
}