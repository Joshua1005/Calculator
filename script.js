class Calculator {
  constructor(previousOperand, currentOperand) {
    this.previousOperandElement = previousOperand;
    this.currentOperandElement = currentOperand;
    this.clear();
  }

  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
    this.updateDisplay();
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    this.updateDisplay();
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) {
      return;
    }

    if (this.currentOperand.length < 10) {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.calculate();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    this.updateDisplay();
  }

  calculate() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case 'x':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
    this.updateDisplay();
  }

  updateDisplay() {
    this.currentOperandElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandElement.innerText = '';
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperand, currentOperand);

clearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

numberButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    calculator.chooseOperation(btn.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  calculator.calculate();
  calculator.updateDisplay();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace'){
    calculator.delete();
    calculator.updateDisplay();
  }

  if (event.key === 'Enter'){
    calculator.calculate();
    calculator.updateDisplay();
  }

  if (!isNaN(event.key) || event.key === '.') {
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  }

  if (event.key === '+' || event.key === '-' || event.key === '/'){
    calculator.chooseOperation(event.key);
    calculator.updateDisplay();
  } else if (event.key === '*'){
    const eventKey = 'x';
    calculator.chooseOperation(eventKey);
    calculator.updateDisplay();
  }
});