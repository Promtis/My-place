const protoToken = {
    value: 0,
    element: null,

    setValue(value) {
        this.value = value;
    },

    setMatched() {
        this.element.className = 'correct';
    },
    setNormal(){
        this.element.className = 'normal';
    },
    setChosen(){
        this.element.className = 'chosen';
    },
    setStarting(){
        this.element.className = 'starting';
    }
    
};

const createToken = (onclick) =>  {
    const token = Object.create(protoToken);
    const element = document.createElement('div');

    token.element = element;
    element.className = 'starting'
    element.onclick = () => {
        onclick(token);
    }
    element.innerText = token.value;

    return token;
  }
