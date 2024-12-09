const buttons = document.querySelectorAll('.btn');
const output = document.querySelector('#calc-output');
const display = document.querySelector('.display'); // Add this line

function calculate(expression) {
    
    // split by addition and subtraction first
    const addSubTokens = expression.split(/([+-])/);
    
    // process multiplication and division first
    const processed = addSubTokens.map(token => {
        if (token.includes('*') || token.includes('/') || token.includes('%')) {
            const mulDivTokens = token.split(/([*/%])/);
            let result = parseFloat(mulDivTokens[0]);
            
            for (let i = 1; i < mulDivTokens.length; i += 2) {
                const operator = mulDivTokens[i];
                const number = parseFloat(mulDivTokens[i + 1]);
                
                switch (operator) {
                    case '*': result *= number; break;
                    case '/': result /= number; break;
                    case '%': result %= number; break;
                }
            }
            return result;
        }
        return token;
    });
    
    // Then process addition and subtraction
    let result = parseFloat(processed[0]);
    for (let i = 1; i < processed.length; i += 2) {
        const operator = processed[i];
        const number = parseFloat(processed[i + 1]);
        
        switch (operator) {
            case '+': result += number; break;
            case '-': result -= number; break;
        }
    }
    
    return isNaN(result) ? '' : result;
}

const input = document.createElement('input');
input.type = 'text';
input.disabled = true;
input.id = 'calc-input';

buttons.forEach(function(button) {
    button.addEventListener('click', () => {
        if (button.classList.contains('operator')) {
            output.value += ` ${button.value} `;
            input.value = output.value.replace(/ /g, '');
            console.log(input.value);
        } 
        else if (button.classList.contains('equal')) {
            display.insertBefore(input, display.firstChild);
            output.value = calculate(input.value);
        }
        else if (button.classList.contains('allclear')) {
            display.removeChild(input);
            input.value = '';
            output.value = '';
        }
        else if (button.classList.contains('clear')) {
            if (/[+\-*/%]\s*$/.test(output.value)) {
                // If last non-whitespace is operator, remove operator and spaces
                output.value = output.value.replace(/\s*[+\-*/%]\s*$/, '');
            } 
            else {
                output.value = output.value.slice(0, -1);
            }
            input.value = output.value.replace(/ /g, '');
        }
        else {
            output.value += button.value;
            input.value = output.value;
        }
    });
});
