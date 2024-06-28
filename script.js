document.addEventListener("DOMContentLoaded", function(event){
    let gameBoard=document.getElementById("gameBoard");
let squares = [];
let turns = 0;
let timer = null;
let num;

function startFunc(event){
    for(let i=0;i<25;i++){
        const square =document.createElement('div');
        square.className = "square";
        square.onclick = changeSquares;
        gameBoard.appendChild(square);
        squares.push(square);
    }
    fillArr();
    startTimer();
    document.getElementById("startButton").disabled = true;
}

function restartFunc(event){

}

function fillArr(){
    //let rand = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    let arr;
    $ajaxUtils.sendGetRequest("data/data1.json",
        function(request){
            arr=request.array;
    //             for(let i=0;i<5;i++){
    //               for(let j=0;j<5;j++){
    //                  if(arr[i,j]===1){
    //               changeArr(i,j);
    //           }
    //     }
    // }
    for(let i=0;i<25;i++){
        if(arr[i]===1){
            changeArr(i,j);
        }
    }
        },
        true)

}

function changeSquares(event){
    const square = event.target;
    const index = squares.indexOf(square);
    const i = Math.floor(index / 5);
    const j = index % 5;
    turns++;

    changeArr(i,j);
    if(i>0){
        changeArr(i-1,j);
    }
    if(i<4){
        changeArr(i+1,j);
    }
    if(j>0){
        changeArr(i,j-1);
    }
    if(j<4){
        changeArr(i,j+1);
    }
   // checkArr();
}

function changeArr(i,j){
    const index = i * 5 + j;
    squares[index].classList.toggle('on');
}

function startTimer(){
    let hours=0;
    let minutes=0;
    let seconds = 0;
    timer = setInterval(() => {
    seconds += 1;
    if(seconds<10)document.getElementById("seconds").textContent = "0" + seconds;else document.getElementById("seconds").textContent = seconds;
    if(seconds===60){
        seconds=0;
        minutes++;
        if(minutes<10)document.getElementById("minutes").textContent = "0" + minutes + ":";else document.getElementById("minutes").textContent = minutes + ":";
        if(minutes===60){
            minutes=0;
            hours++;
            if(hours<10)document.getElementById("hours").textContent = "Timer: 0" + hours + ":";else document.getElementById("hours").textContent = "Timer: " + hours + ":";
        }
    }
  }, 1000);
}

function checkArr(){
    for(let i=0; i<5;i++){
        for(let j=0;j<5;j++){
            if(boolArr[i,j]===true){
                return "";
            }
        }
    }
    WinGame();
}

function WinGame(){
    clearInterval(timer);
    showModal();
}

function showModal() {
    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];

    modal.style.display = "flex";

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

document.getElementById("startButton").addEventListener("click", startFunc);
document.getElementById("restartButton").addEventListener("click", restartFunc);
})