let elementTotal;
let moves = 0;
let time = 0;
let elementTime;
let timer;

const init = () => {
    console.log('onload')
    elementTotal = document.getElementById(`moves`);
    elementTime = document.getElementById(`time`);
};

let numberSelected = -1;
const done = [];
function showAlert(n) {
    const element = document.getElementById(`e${n}`);
    

    if (done.includes(n)) return;

    if (numberSelected == -1){
        console.log('You clicked', Diver2[n]);
        numberSelected = n; 
        
        element.className = 'chosen';
    }else if(numberSelected == n){
        numberSelected = -1;
        element.className = 'normal';
        return;
    }else{
        const elementSelected = document.getElementById(`e${numberSelected}`);
        if (Diver2[numberSelected] == Diver2[n]){
            console.log('Equal');
            elementSelected.className = 'correct';
            element.className = 'correct';
            var newLength = done.push(n, numberSelected);
            numberSelected = -1;
            moves++
        }else{
            console.log('Not equal');
            element.className = 'chosen';
            setTimeout(() => {
                elementSelected.className = 'normal';
                element.className = 'normal';
                numberSelected = -1;
            }, 2000);
            moves++
        }
    
    }
    elementTotal.innerText = moves;

    if (done.length == 40){
        if (time == 0){
            alert(`Maybe you should press "start"?`);  
        }else{
            alert(`You won in ${moves} moves and spent ${time} seconds`);
            doReset();}
        
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

     // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}
let Diver2 = [40];
for (d = 0; d < 40; d ++){
        
    Diver2 [d] = 0;
    // document.write('<div onclick="showAlert(', Diver2[d], ')">', Diver2[d], '</div>');
    // document.write('<div onclick="showAlert(', Diver2[d+1], ')">', Diver2[d+1], '</div>');
}
for (e = 0; e < 40; e++){
    document.write(`<div id="e${e}" class="starting" onclick="showAlert(${e})">0</div>`); 
}
function doReset(){
    function incTimer() {
        time++;
        elementTime.innerText = time;
    }

    for (d = 0; d < 40; d ++){
        if (d <= 19){
            Diver2[d] = d+1;
        }else{
            Diver2[d] = d-19;
        }
    }

    shuffle(Diver2);

    for (e = 0; e < 40; e++){
        elementReset = document.getElementById(`e${e}`);
        elementReset.className="starting"; 
        elementReset.className="normal"; 
        elementReset.innerText=Diver2[e]; 
    }
    
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(incTimer, 1000);
    
    moves = 0;
    done.length = 0;
    time = 0;
    elementTime.innerText = time;
    elementTotal.innerText = moves;
    elementStart = document.getElementById("resButton");
    elementStart.innerText="Reset"; 
}
