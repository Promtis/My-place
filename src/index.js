import { createTimer } from './timer';
import { createToken } from './token';

let elementTotal;
let moves = 0;
let elementTime;
let tokenSelected = null;
let pairCount = 10;
let elementStart;

const Tokens = [];
const container = document.getElementById('container');
const stepColor = Math.floor(16777164 / pairCount);

const init = () => {
    console.log('onload')
    elementTotal = document.getElementById(`moves`);
    elementTime = document.getElementById(`time`);
    document.getElementById('resButton').onclick = doReset;
    elementStart = document.getElementById("resButton");
};

const timer = createTimer(document.getElementById(`time`));

const done = [];

const showAlert = (token) => {
    const { value } = token;

    if (done.includes(value)) return;

    if (tokenSelected === null){
        console.log('You clicked', token);
        tokenSelected = token; 
        token.setChosen();
        return;
    }

    moves++;

    if (tokenSelected === token){
        tokenSelected = null;
        token.setNormal();
    }else{
        if (tokenSelected.value === value){
            console.log('Equal');
            tokenSelected.setMatched();
            token.setMatched();
            let newLength = done.push(value);
            tokenSelected = null;
        }else{
            console.log('Not equal');
            token.setChosen();
            setTimeout(() => {
                tokenSelected.setNormal();
                token.setNormal();
                tokenSelected = null;
            }, 2000);
        }
    }
    elementTotal.innerText = moves;

    if (done.length == pairCount) {
        alert(`You won in ${moves} moves and spent ${timer.getSeconds()} seconds`);
        timer.stop();
    }
}

const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;


    while (currentIndex != 0) {


        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

       
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}



const doReset = () => {
    timer.stop();
    elementTime.innerText = 0; 
    
    Tokens.length = 0;

    const pairCountInput = parseInt(document.getElementById("pairCount").value);
    
    if (pairCountInput >= 1 && pairCountInput <= 50){
        pairCount = pairCountInput;
    }else{
        pairCount = 10;
        alert('Your number to big, invalid or you just didn`t enter it. Let`s try 10)')
    }

    
    let i = 0;
    let child = container.lastElementChild;

    while (child) {
        container.removeChild(child);
        child = container.lastElementChild;
    }

    let colorCurrent = 51;

    for (i = 0; i < pairCount*2; i++){
        Tokens[i] = createToken(showAlert);
        container.insertAdjacentElement('beforeend', Tokens[i].element);
    }

    shuffle(Tokens);

    for (i = 0; i < pairCount; i ++) {
        Tokens[i].setValue(colorCurrent);
        Tokens[i + pairCount].setValue(colorCurrent);
        colorCurrent += stepColor;
        Tokens[i].setStarting();
        Tokens[i + pairCount].setStarting();
    }

    setTimeout(() => {
        for (const token of Tokens){ 
            token.setNormal(); 
        }
        timer.start();
    }, 3000);
    moves = 0;
    done.length = 0;
    elementTotal.innerText = moves;
    elementStart.innerText="Restart"; 
    
   
}

document.body.onload = init;
