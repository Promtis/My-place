
const protoToken = {
    value: 0,
    element: null,

    setValue(value) {
        this.value = `#${value.toString(16).padStart(6,"0")}`;
    },

    setMatched() {
        this.element.style.backgroundColor = this.value;
        this.element.style.borderColor = '#66ff33';
    },
    setNormal(){
        this.element.style.backgroundColor = '#000000';
        this.element.style.borderColor = '#000000';
    },
    setChosen(){
        this.element.style.backgroundColor = this.value;
        this.element.style.borderColor = '#000000';
    },
    setStarting(){
        this.element.style.backgroundColor = this.value;
        this.element.style.borderColor = this.value;
    }
    
};

export const createToken = (onclick) =>  {
    const token = Object.create(protoToken);
    const element = document.createElement('div');

    token.element = element;
    element.className = 'starting'
    element.onclick = () => {
        onclick(token);
    }
    return token;
}

