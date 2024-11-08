let boxes= document.querySelectorAll(".box");
let resbut= document.querySelector("#reset");
let turnO =true;
let newgame = document.querySelector("#newgame");
let msgbox= document.querySelector(".msg");
let msg = document.querySelector("#text"); 

const winpattern = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8] 
];

const r = ( )=>{
  let turnO =true;
  enebaleboxes();
  msgbox.classList.add("hide");
  
};

boxes.forEach((box)=>{
  box.addEventListener("click" , () =>{
    console.log("box was clicked");
    if(turnO){
      box.innerText = "O";
      turnO=false;
      }else{
        box.innerText = "X";
        turnO=true;
      }
      box.disabled=true;
      checkWinner();
  });
});

const disableboxes = () =>{
  for(let box of boxes ){
    box.disabled=true;
  }
};

const enebaleboxes = () =>{
  for(let box of boxes ){
    box.disabled=false;
    box.innerText="";
  }
};


const showWinner = (winner)=>{
  text.innerText=`CONGRATULATIONS WINNER IS  ${winner}` ;
  msgbox.classList.remove("hide"); 
  disableboxes();
};

const checkWinner =() =>{
  for(let p of winpattern){
   let pos1 = boxes[p[0]].innerText;
   let pos2 = boxes[p[1]].innerText;
   let pos3 = boxes[p[2]].innerText;

   if(pos1!="" && pos2!="" && pos3!=""){
    if(pos1 == pos2 && pos2 == pos3){
      showWinner(pos1  );
    }
   }
  }

};
 



newgame.addEventListener("click" , r);
resbut.addEventListener("click" , r);