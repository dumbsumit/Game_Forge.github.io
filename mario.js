let currmoletile;

let currplanttile;
let score=0;
let gameover = false;

window.onload = function(){
    setgame();
}

function setgame(){
    //set grid
    for(let i=0;i<9;i++){
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click",selecttile);
        document.getElementById("board").appendChild(tile); 
    }
    setInterval(setmole,1000);
    setInterval(setplant,1500);
}
function getRandomtile(){
    let num = Math.floor(Math.random()*9);
    return num.toString();
}

function setmole(){
    if(gameover){
        return;
    }
  if(currmoletile){
    currmoletile.innerHTML = "";
  }

 let mole= document.createElement("img");
  mole.src = "monty-mole.png";

  let num= getRandomtile();
  if(currplanttile && currplanttile.id == num ){
    return;
  }
  currmoletile = document.getElementById(num);
  currmoletile.appendChild(mole);
}

function setplant(){

    if(gameover){
        return;
    }

    if(currplanttile){
        currplanttile.innerHTML="";
    }

    let plant = document.createElement("img");
    plant.src="piranha-plant.png";

    let num= getRandomtile();
    if(currmoletile && currmoletile.id == num ){
        return;
      }
    currplanttile = document.getElementById(num);
    currplanttile.appendChild(plant);
}

function selecttile(){

    if(gameover){
        return;
    }
    
    if(this == currmoletile){
        score += 10;
        document.getElementById("score").innerText = score.toString();
    }
    else if(this == currplanttile){
 document.getElementById("score").innerText="GAME OVER "   + score.toString();
 gameover= true;
    }
}