function makebubbel(){
    var addb="";
for(var i=1;i<=128;i++){
    var rn = Math.floor(Math.random()*10);
    addb+= `<div id="bubbel">${rn}</div>`;
}

document.querySelector("#fotter").innerHTML = addb;

}

function timer(){
  var timer = 60;
   var timerinterval = setInterval(function(){
    if(timer>0){
        timer--;
        document.querySelector("#timervalue").textContent= timer;
    }else{

     clearInterval(timerinterval);
     document.querySelector("#fotter").innerHTML=`<h1>GAME OVER </h1>`;
    }
    
   },1000);
}
var hitrn=0;
function getnewhit(){
 hitrn = Math.floor(Math.random()*10);
  document.querySelector("#hitval").textContent = hitrn;
}

var score=0;
function increasescore(){
    score+=10;
    document.querySelector("#scoreval").textContent = score;
}

document.querySelector("#fotter")
.addEventListener("click",function(details){
 var clickednumber=Number(details.target.textContent);
 if(clickednumber === hitrn) {
    increasescore();
    makebubbel();
    getnewhit();
 }
});

timer();
makebubbel();
getnewhit();
