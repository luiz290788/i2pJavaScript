/* @flow */

type Token = number | string;

const tokenize = (infix: string): Array<Token> => {
  let i = 0;
  const tokens = [];
  while (i < infix.length) {
    const numberMatch = infix.substr(i).match(/^[0-9]+/)
    if (numberMatch) {
      tokens.push(parseInt(numberMatch[0], 10));
      i += numberMatch[0].length;
    } else if (/[*+-/]/.test(infix.charAt(i))) {
      tokens.push(infix.charAt(i));
      i++;
    } else {
      i++;
    }
  }
  return tokens;
}

const toPrefix = (tokens: Array<Token>): Array<Token> => {
  const numbers = [];
  const operators = [];
  const prefix = [];
  tokens.forEach(token => {
    if (typeof token === 'number') {
      numbers.push(token);
    } else if (token.match(/[+-]/)) {
      operators.push(token);
      while (operators.length > 0) {
        prefix.push(operators.pop());
      }
      while (numbers.length > 0) {
        prefix.push(numbers.shift());
      }
    } else if (token.match(/[*/]/)) {
      operators.push(token);
    }
  });
  while (operators.length > 0) {
    prefix.push(operators.pop());
  }
  while (numbers.length > 0) {
    prefix.push(numbers.shift());
  }
  return prefix;
}

const execute = (tokens: Array<Token>): number => {
  const numbers: Array<number> = [];
  while (tokens.length > 1 || numbers.length > 0) {
    const token = tokens.pop();
    if (typeof token === 'number') {
      numbers.push(token);
    } else if (numbers.length > 1) {
      if (token === '+') {
        tokens.push(numbers.pop() + numbers.pop());
      } else if (token === '-') {
        tokens.push(numbers.pop() - numbers.pop());
      } else if (token === '*') {
        tokens.push(numbers.pop() * numbers.pop());
      } else if (token === '/') {
        tokens.push(numbers.pop() / numbers.pop());
      }
    }
  }
  return (tokens.pop(): number);
}

export default (infix: string): number => execute(toPrefix(tokenize(infix)));
