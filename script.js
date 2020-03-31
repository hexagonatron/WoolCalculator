const buttonContainer = document.querySelector(".buttons");
const tallyContainer = document.querySelector(".tally-labels");
const countEl = document.querySelector(".count");
let recordArray = [];
let tallyCount = [];
let count = 0;

const elementMaker = () => {
  for(let i = 5; i <= 40; i++){
    buttonContainer.innerHTML += `<button class="m-1 btn btn-primary micron-button" data-measurement="${i}">${i}</button>`;
    tallyContainer.innerHTML += `<div class="m-1 mr-3">${i}: <span class="tally${i}">0</span></div>`;
    tallyCount[i] = 0;
    
  }
  
  Array.from(document.querySelectorAll(".micron-button")).forEach(button => {
    button.addEventListener("click", (event) => {
      count = count + 1;
      document.querySelector(".count").innerHTML = count;
      let micron = +event.currentTarget.dataset.measurement;
      console.log(micron);
      recordArray.push(micron);
      tallyCount[micron]++;
      document.querySelector(`.tally${micron}`).innerText = tallyCount[micron];
      calculateMicron();
    });
  });
  
}

document.querySelector(".undobtn").addEventListener("click", (event) => {
  if(count){
    let undoValue = recordArray.pop();
    tallyCount[undoValue]--;
    document.querySelector(`.tally${undoValue}`).innerText =               tallyCount[undoValue];
    count--;
    document.querySelector(".count").innerHTML = count;
    calculateMicron();
  }
});

document.querySelector(".clearbtn").addEventListener("click", (event) => {
  let sure = confirm("Are you sure you want to clear everything?");
  if(sure){
    location.reload();
  }
})

const calculateMicron = () => {
  console.log(recordArray);
  
  if(recordArray.length){
    let avg = recordArray.reduce((a,v) => a+v) / recordArray.length;
  console.log(avg);
  document.querySelector(".micron").innerText = (avg*2).toFixed(2);
  }
}

elementMaker();
