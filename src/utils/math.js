
const OP_PLUS = '+';
const OP_MINUS = '-';
const OP_MULTI = '×';
const OP_DIV = '÷';

export function calc(num1, num2, op) {
    switch(op) {
        case OP_PLUS:
        return num1 + num2;
        case OP_MINUS:
        return num1 - num2;
        case OP_MULTI:
        return num1 * num2;
        case OP_DIV:
        return num1 / num2;
        default:
        return num1 + num2;
    }
}

export function rand(range) {
    return Math.floor(Math.random() * range);
}