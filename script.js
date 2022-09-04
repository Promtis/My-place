let elementTotal;
let moves = 0;
let time = 0;
let elementTime;
let timer;

const Tokens = [];

const init = () => {
    console.log('onload')
    elementTotal = document.getElementById(`moves`);
    elementTime = document.getElementById(`time`);
};

let tokenSelected = null;
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
            var newLength = done.push(value);
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

    if (done.length == 40){
        if (time == 0){
            alert(`Maybe you should press "start"?`);  
        }else{
            alert(`You won in ${moves} moves and spent ${time} seconds`);
            doReset();}
        
    }
}

const shuffle = (array) => {
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

const container = document.getElementById('container');

for (i = 0; i < 40; i++){
    Tokens[i] = createToken(showAlert);
    container.insertAdjacentElement('beforeend', Tokens[i].element);
}

const doReset = () => {
    function incTimer() {
        time++;
        elementTime.innerText = time;
    }

    shuffle(Tokens);

    for (i = 0; i < 20; i ++) {
        Tokens[i].setValue(i + 1);
        Tokens[i + 20].setValue(i + 1);
    }

    for (const token of Tokens){
        token.setStarting(); 
        token.setNormal(); 
        token.element.innerText = token.value; 
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
