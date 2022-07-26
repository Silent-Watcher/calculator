const number_keys = Array.from(document.getElementsByClassName('number_key'));
const operator_keys = Array.from(
  document.getElementsByClassName('operator_key')
);
const action_keys = Array.from(document.getElementsByClassName('action_key'));
const operationInput = document.querySelector('#operation_log_input');
const result = document.getElementById('result_text');
const history = document.getElementById('history');
const openHistoryBtn = document.getElementById('open_history_btn');
const closeHistoryBtn = document.getElementById('close_history_btn');
const body = document.body;
const calculator = document.getElementById('calculator_wrapper');
const logTrashBtns = Array.from(document.getElementsByClassName('delete_log'));
const clearLogsBtn = document.getElementById('clear_logs');
const logs = document.getElementById('logs');
const projectWrapper = document.getElementById('project-wrapper');
// console.log([...logs.children].length);
console.log(history.clientWidth);
let validOperators = ['×', '÷', '+', '-', '%', '.'];

function parse(string) {
  return Function(`'use strict'; return(${string})`)();
}
function createNewLog(equation, result) {
  let newLog = document.createElement('div');
  let newTrashLogBtn = document.createElement('a');
  let newTrashIcon = document.createElement('i');
  let newEquation = document.createElement('div');
  let newResult = document.createElement('div');
  newEquation.innerHTML = equation;
  newResult.innerHTML = result;
  newEquation.classList.add('log_equation');
  newResult.classList.add('log_result', 'text-center');
  newLog.classList.add(
    'log',
    'border-bottom',
    'border-dark',
    'p-2',
    'position-relative'
  );
  newTrashLogBtn.classList.add(
    'text-decoration-none',
    'fs-6',
    'position-absolute',
    'end-0',
    'top-0',
    'me-2',
    'mt-2',
    'delete_log'
  );
  newTrashLogBtn.href.concat(`#${[...logs.children].length + 1}`);
  newTrashIcon.classList.add('fa-solid', 'fa-trash');
  newTrashLogBtn.appendChild(newTrashIcon);
  newLog.appendChild(newTrashLogBtn);
  newLog.appendChild(newEquation);
  newLog.appendChild(newResult);
  logs.appendChild(newLog);
}
// calc
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
      operationInput.classList.remove('fs-4', 'text-secondary');
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
        operationInput.classList.add('fs-4', 'text-secondary');
        result.hidden = false;
        result.innerHTML = parse(operationInput.value);
        result.style.order = 'last';
        createNewLog(operationInput.value, result.innerHTML);
      }
    }
  });
});
// end calc

// nav
if (logs.children.length === 0) {
  clearLogsBtn.hidden = true;
} else {
  clearLogsBtn.hidden = false;
}
openHistoryBtn.addEventListener('click', function () {
  this.hidden= true;
  closeHistoryBtn.hidden = false;
  history.style.transform = 'translateX(0)';
  projectWrapper.style.marginLeft = `${history.clientWidth}px`;
});
closeHistoryBtn.addEventListener('click', function () {
  this.hidden = true;
  openHistoryBtn.hidden= false;
  history.style.transform = 'translateX(-400px)';
  projectWrapper.style.marginLeft = '0';
});
logTrashBtns.forEach((logTrashBtn) => {
  logTrashBtn.addEventListener('click', function () {
    if (confirm('Are you sure?😐')) this.parentElement.remove();
  });
});
clearLogsBtn.addEventListener('click', function () {
  if (confirm('Are you sure?😐')) {
    this.hidden = true;
    logs.classList.add('text-center', 'bg-transparent');
    logs.innerHTML = 'no logs here ! 🤗';
  }
});
// end nav
