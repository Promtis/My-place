let elementTotal;
let moves = 0;
let elementTime;
let tokenSelected = null;

const Tokens = [];
const container = document.getElementById('container');

const init = () => {
    console.log('onload')
    elementTotal = document.getElementById(`moves`);
    elementTime = document.getElementById(`time`);
};

const timer = timeRun(document.getElementById(`time`));

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

    if (done.length == 20) {
        if (timer.getSeconds() == 0) {
            alert(`Maybe you should click "start"?`);  
        } else {
            alert(`You won in ${moves} moves and spent ${timer.getSeconds()} seconds`);
            timer.stop();
        }
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
    timer.start();

    shuffle(Tokens);

    for (i = 0; i < 20; i ++) {
        Tokens[i].setValue(i + 1);
        Tokens[i + 20].setValue(i + 1);
    }

    for (const token of Tokens){
        token.setStarting(); 
        token.setNormal(); 
    }
    
    moves = 0;
    done.length = 0;
    elementTotal.innerText = moves;
    elementStart = document.getElementById("resButton");
    elementStart.innerText="Reset"; 
}

for (i = 0; i < 40; i++){
    Tokens[i] = createToken(showAlert);
    container.insertAdjacentElement('beforeend', Tokens[i].element);
}