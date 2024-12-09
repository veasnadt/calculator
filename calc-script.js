const buttons = document.querySelectorAll('.btn');
const input = document.querySelector('#calc-input');
const output = document.querySelector('#calc-output');

function calculate(expression) {
    const tokens = expression.split(/([+\-*/])/);
    let result = parseFloat(tokens[0]);
    
    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const number = parseFloat(tokens[i + 1]);
        
        switch (operator) {
            case '+': result += number; break;
            case '-': result -= number; break;
            case '*': result *= number; break;
            case '/': result /= number; break;
        }
    }
    
    return isNaN(result) ? '' : result;
}

buttons.forEach(function(button) {
    button.addEventListener('click', () => {
        if (button.classList.contains('operator')) {
            input.value += `${button.value}`;
        } 
        else if (button.classList.contains('equal')) {
            output.value = calculate(input.value);
        }
        else if (button.classList.contains('allclear')) {
            input.value = '';
            output.value = '';
        }
        else if (button.classList.contains('clear')) {
            input.value = input.value.slice(0, -1);
        }
        else {
            input.value += button.value;
        }
    });
});
