const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
      button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'AC') {
                  currentInput = '';
                  previousInput = '';
                  operator = '';
                  display.textContent = '0';
            } else if (value === '+/-') {
                  currentInput = currentInput ? String(-parseFloat(currentInput)) : '';
                  display.textContent = currentInput || '0';
            } else if (value === '%') {
                  currentInput = currentInput ? String(parseFloat(currentInput) / 100) : '';
                  display.textContent = currentInput || '0';
            } else if (['+', '-', 'x', '/'].includes(value)) {
                  if (currentInput) {
                        previousInput = currentInput;
                        currentInput = '';
                        operator = value;
                  }
            } else if (value === '=') {
                  if (previousInput && currentInput && operator) {
                        const num1 = parseFloat(previousInput);
                        const num2 = parseFloat(currentInput);
                        let result;

                        switch (operator) {
                              case '+':
                                    result = num1 + num2;
                                    break;
                              case '-':
                                    result = num1 - num2;
                                    break;
                              case 'x':
                                    result = num1 * num2;
                                    break;
                              case '/':
                                    result = num2 !== 0 ? num1 / num2 : 'Error';
                                    break;
                        }

                        display.textContent = result;
                        currentInput = String(result);
                        previousInput = '';
                        operator = '';
                  }
            } else {
                  currentInput += value;
                  display.textContent = currentInput;
            }
      });
});