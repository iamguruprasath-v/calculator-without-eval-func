const display = document.getElementById('display');
let operatorPrecedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    'u-': 2
}

// Common handler for operators (+, *, /)
function handleOperator(op) {
    if (display.value.length === 0) return;

    let last = getLastChar();

    // If last is '-', remove it and check again
    if (last === '-') {
        removeLastChar();
        last = getLastChar();

        if (last === ')' || isDigit(last)) {
            display.value += op;
        }
        return;
    }

    // If last is a digit or ')', just append the op
    if (isDigit(last) || last === ')') {
        display.value += op;
    }
    // If last is '(', do nothing
    else if (last === '(') {
        return;
    }
    // Otherwise, replace last with op
    else {
        replaceLastChar(op);
    }
}

// Utility: Get last character
function getLastChar() {
    return display.value.at(-1);
}

// Utility: Is digit (0–9)
function isDigit(char) {
    return char >= '0' && char <= '9';
}

// Utility: Remove last character
function removeLastChar() {
    display.value = display.value.slice(0, -1);
}

// Utility: Replace last character
function replaceLastChar(newChar) {
    display.value = display.value.slice(0, -1) + newChar;
}



// Minus Operator (has unique logic)
function makeLastAsMinusOperation(e) {
    if (display.value.length > 0) {
        const last = getLastChar();
        if (last === '-' || last === '+') {
            replaceLastChar('-');
        } else {
            display.value += '-';
        }
    } else {
        display.value = '-';
    }
}

// Plus Operator
function makeLastAsPlusOperation(e) {
    handleOperator('+');
}

// Multiply Operator
function makeLastAsMultiplyOperation(e) {
    handleOperator('*');
}

// Division Operator
function makeLastAsDivisionOperation(e) {
    handleOperator('/');
}


function append(e) {
    display.value += e.target.value;
}

function clearDisplay() {
    display.value = ''
}

function clearOne() {
    display.value = display.value.slice(0, -1);
}

// function displayError(message) {
//     display.value = message;
//     setTimeout(() => clearDisplay(), 1000);
//     return;
// }

// function openParanthesisUpdate(index) {
//     if (tokenization[tokenization.length - 1] == ')' || isDigit(tokenization[tokenization.length - 1])) return true;
//     paranthesisBalanceChekingValue += 1;
//     tokenization.push('(');
// }

// function closeParanthesisUpdate(index) {
//     --paranthesisBalanceChekingValue;
//     if (tokenization[tokenization.length - 1] == '(' || ['+', '-', '/', '*', '('].includes(tokenization[tokenization.length - 1]) || paranthesisBalanceChekingValue < 0) return true;
//     tokenization.push(')');
// }

// function multiplicationOperatorUpdate(index) {
//     if (tokenization[tokenization.length - 1] == '(') return true;
//     tokenization.push('*');
// }

// function divisionOperatorUpdate(index) {
//     if (tokenization[tokenization.length - 1] == '(') return true;
//     tokenization.push('*');
// }

// function plusOperatorUpdate(index) {
//     if (tokenization[tokenization.length - 1] == '(') return true;
//     tokenization.push('+');
// }

// function minusOperatorUpdate(index) {
//     if (['+', '-', '/', '*', '('].includes(tokenization[tokenization.length - 1])) tokenization.push('u-');
//     else tokenization.push('-');
// }

// function numberUpdate(value, index) {
//     // debugger;
//     if(tokenization[tokenization.length - 1] == ')') return true;
//     console.log(tokenization[tokenization.length - 1]);
//     console.log(!isNaN(Number.parseInt(tokenization[tokenization.length - 1])))
//     if (!isNaN(Number.parseInt(tokenization[tokenization.length - 1]))) tokenization[tokenization.length - 1] = tokenization[tokenization.length - 1] + value;
//     else if (tokenization[tokenization.length - 1] == 'u-') tokenization[tokenization.length - 1] = '-' + value;
//     else tokenization.push(value);
// }

// function checkForInvalidation(value) {
//     if (value.at(0) == ')') return true;
//     if (value.at(0) == '-') tokenization.push('u-');
//     else tokenization.push(value.at(0));
//     if(tokenization[0] == '(') paranthesisBalanceChekingValue++;


//     for (let index = 1; index <= value.length - 1; index++) {
//         let curr = value.at(index);

//         switch (curr) {
//             case '(':
//                 if(openParanthesisUpdate(index)) return true;
//                 break;
            
//             case ')':
//                 if(closeParanthesisUpdate(index)) return true;
//                 break;
            
//             case '*':
//                 if(multiplicationOperatorUpdate(index)) return true;
//                 break;

//             case '/':
//                 if(divisionOperatorUpdate(index)) return true;
//                 break;
            
//             case '+':
//                 if(plusOperatorUpdate(index)) return true;
//                 break;

//             case '-':
//                 if(minusOperatorUpdate(index)) return true;
//                 break;

//             default:
//                 if(numberUpdate(curr, index)) return true;
//         }
//     }
//     console.log(paranthesisBalanceChekingValue)
//     if(paranthesisBalanceChekingValue != 0) return true;
//     console.log(tokenization);
// }


// function calc() {
//     if(display.value.length <= 0) return displayError("Empty Input");

//     const lastChar = getLastChar()  ;
//     const lastInvalidLastChars = ['+', '-', '/', '*', '('];

//     if (lastInvalidLastChars.includes(lastChar)) {
//         return displayError("Invalid Operation");
//     }

//     if (checkForInvalidation(display.value)) return displayError("Invalid Format");
// }

function displayError(message) {
    display.value = message;
    setTimeout(clearDisplay, 1000);
}

// Helper: Get last token safely
function lastToken() {
    return tokenization[tokenization.length - 1];
}

// Helper: Push a token
function pushToken(token) {
    tokenization.push(token);
}

// Helper: Check if last token is number
function isLastTokenNumber() {
    return !isNaN(Number(lastToken()));
}

// ---- TOKEN UPDATE FUNCTIONS ----

function openParenthesisUpdate() {
    if (lastToken() === ')' || isLastTokenNumber()) return true;
    paranthesisBalanceChekingValue++;
    pushToken('(');
}

function closeParenthesisUpdate() {
    if (
        lastToken() === '(' ||
        ['+', '-', '/', '*', '('].includes(lastToken()) ||
        paranthesisBalanceChekingValue <= 0
    ) return true;
    paranthesisBalanceChekingValue--;
    pushToken(')');
}

function operatorUpdate(op) {
    if (lastToken() === '(') return true;
    pushToken(op);
}

function plusOperatorUpdate() {
    return operatorUpdate('+');
}

function minusOperatorUpdate() {
    const last = lastToken();
    if (['+', '-', '/', '*', '('].includes(last)) {
        pushToken('u-');
    } else {
        pushToken('-');
    }
}

function multiplicationOperatorUpdate() {
    return operatorUpdate('*');
}

function divisionOperatorUpdate() {
    return operatorUpdate('/');
}

function numberUpdate(value) {
    if (lastToken() === ')') return true;

    const last = lastToken();

    if (isLastTokenNumber()) {
        tokenization[tokenization.length - 1] += value;
    } else if (last === 'u-') {
        tokenization[tokenization.length - 1] = '-' + value;
    } else {
        pushToken(value);
    }
}

// ---- CHECKING AND TOKENIZATION ----

function checkForInvalidation(value) {
    const first = value.at(0);

    if (first === ')') return true;

    if (first === '-') {
        pushToken('u-');
    } else {
        pushToken(first);
    }

    if (first === '(') paranthesisBalanceChekingValue++;

    for (let index = 1; index < value.length; index++) {
        const curr = value.at(index);

        switch (curr) {
            case '(':
                if (openParenthesisUpdate()) return true;
                break;

            case ')':
                if (closeParenthesisUpdate()) return true;
                break;

            case '*':
                if (multiplicationOperatorUpdate()) return true;
                break;

            case '/':
                if (divisionOperatorUpdate()) return true;
                break;

            case '+':
                if (plusOperatorUpdate()) return true;
                break;

            case '-':
                if (minusOperatorUpdate()) return true;
                break;

            default:
                if (numberUpdate(curr)) return true;
        }
    }

    return paranthesisBalanceChekingValue !== 0;
}

function operatorHandler(value, operatorStack, ouputList) {
    if (value == '(') {
        operatorStack.push(value);
        return;
    }

    let currOperatorPrecedence = operatorPrecedence[value];
    let currIndex = operatorStack.length - 1;
    
    while(currIndex >= 0 && operatorPrecedence[operatorStack[currIndex]] >= currOperatorPrecedence) {
        let currValue = operatorStack.pop();
        ouputList.push(currValue);
        currIndex--;
    }

    operatorStack.push(value);
}

function closeParanthesisHandler(operatorStack, ouputList) {
    let currIndex = operatorStack.length - 1;

    while(currIndex >= 0 && operatorStack[currIndex] != '('){
        ouputList.push(operatorStack.pop());
        currIndex--
    }

    if(operatorStack.length > 0) operatorStack.pop();
}

function convertInfixToPostfix(valueArr) {
    let operatorStack = [];
    let ouputList = []

    valueArr.forEach(value => {
        if(!isNaN(Number.parseInt(value))) ouputList.push(Number.parseInt(value));
        else if(['+', '-', '*', '/', 'u-', '('].includes(value)) operatorHandler(value, operatorStack, ouputList);
        else if(value == ')') closeParanthesisHandler(operatorStack, ouputList);
    });

    while(operatorStack.length > 0) ouputList.push(operatorStack.pop());

    return ouputList;
}

function getResult(firstOperand, secondOperand, currValue) {
    let result;

    switch (currValue) {
    case '+':
        result = secondOperand + firstOperand;
        break;
    case '-':
        result = secondOperand - firstOperand;
        break;
    case '*':
        result = secondOperand * firstOperand;
        break;
    case '/':
        result = secondOperand / firstOperand;
        break;
    }

    return result;
}

function calculateResult(expression) {
    let tempStack = [];
    let index = 0;

    while (index < expression.length) {
        let currValue = expression[index]
        if (!isNaN(currValue)) tempStack.push(Number(currValue));
        else if (currValue == 'u-') tempStack.push(-1 * tempStack.pop());
        else if (['+', '-', '*', '/'].includes(currValue)) {
            let firstOperand = tempStack.pop();
            let secondOperand = tempStack.pop();
            tempStack.push(getResult(firstOperand, secondOperand, currValue));
        }

        index++;
    }

    return tempStack[0]
}
// ---- MAIN CALCULATE FUNCTION ----

function calc() {
    let input = display.value;
    if (input.length <= 0) return displayError("Empty Input");

    const lastChar = getLastChar();
    const invalidEndChars = ['+', '-', '/', '*', '('];

    if (invalidEndChars.includes(lastChar)) {
        return displayError("Invalid Operation");
    }

    tokenization = [];
    paranthesisBalanceChekingValue = 0;

    if (checkForInvalidation(input)) {
        return displayError("Invalid Format");
    }

    // console.log("Final Tokens:", tokenization);

    let postFixNotation = convertInfixToPostfix(tokenization);
    // console.log(postFixNotation);

    let result = calculateResult(postFixNotation);
    display.value = result;

}
