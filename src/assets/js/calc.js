const number_keys = Array.from(document.getElementsByClassName('number_key'));
const operator_keys = Array.from(
  document.getElementsByClassName('operator_key')
);
const action_keys = Array.from(document.getElementsByClassName('action_key'));
const operationInput = document.querySelector('#operation_log_input');
const result = document.getElementById('result_text');

let validOperators = ['×', '÷', '+', '-', '%', '.'];

function parse(string) {
  return Function(`'use strict'; return(${string})`)();
}

number_keys.forEach((number_key) => {
  number_key.addEventListener('click', function () {
    operationInput.value += number_key.textContent;
  });
});

operator_keys.forEach((operator_key) => {
  operator_key.addEventListener('click', function () {
    if (validOperators.includes(operationInput.value.substr(-1))) {
      operationInput.value = operationInput.value.substr(
        0,
        +operationInput.value.length - 1
      );
      operationInput.value = `${operationInput.value}${this.textContent}`;
    } else operationInput.value += this.textContent;
  });
});
action_keys.forEach((action_key) => {
  action_key.addEventListener('click', function () {
    if (this.textContent === 'C') {
      operationInput.value = '';
      operationInput.classList.remove('fs-4','text-secondary');
      result.hidden = true;
    }
    if (this.textContent === 'del') {
      operationInput.value = operationInput.value.substr(
        0,
        operationInput.value.length - 1
      );
    }
    if (this.textContent === '=') {
      if (operationInput.value.length === 0) result.innerHTML = parse('0');
      else {
        operationInput.value = operationInput.value.replace('×', '*');
        operationInput.value = operationInput.value.replace('÷', '/');
        operationInput.classList.add('fs-4','text-secondary');
        result.hidden = false;
        result.innerHTML = parse(operationInput.value);
        result.style.order = 'last';
      }
    }
  });
});
