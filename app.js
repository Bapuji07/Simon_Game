let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "grey", "purple", "red"];

let started = false;
let level = 0;
let highscore = 1;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let startBtn= document.querySelector(".btn-enter")
let endBtn = document.querySelector("#btn-end");
const instructionDiv = document.querySelector('.instruction');

startBtn.addEventListener("click", function(){
    if (started == false) {
        console.log("Game Started");
        started = true; 
        startBtn.style.display='none'
        endBtn.style.display='block'
        levelUp(); 
        toggleInstructions();
        
    }
});
endBtn.addEventListener("click",function(){
   
});



function btnFlash(btn){
    btn.classList.add("flashBtn");
    setTimeout(function() {
        btn.classList.remove("flashBtn");
    }, 500);
}
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 500);
}

function levelUp() {
    userSeq = [];
    level++;
    toggleInstructions();
    if(level >= highscore){
        highscore = level;
    }
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press start game for new game.`;
        h3.innerHTML =`Highest Score =  ${highscore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 1000)
        instructionDiv.style.display = 'none'
        startBtn.style.display='block'
        endBtn.style.display='none'
        reset();
    }
}

function btnPress() {
    let btn = this;     
    userFlash(btn);
    
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btnn of allBtns) {
    btnn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
function toggleInstructions() {
    if (level === 1 || level === 2) {
        instructionDiv.style.display = 'block'; // Show instructions for levels 1 and 2
    } else {
        instructionDiv.style.display = 'none'; // Hide instructions for other levels
    }
}

toggleInstructions();

