// Import stylesheets
import './style.css';

import { LOADER_INTERVAL, TYPE_SPEED } from './constants';

const appDiv: HTMLElement = document.getElementById('app');
const titleDiv: HTMLElement = document.getElementById('title');
const form = document.querySelector('form');
const chatContainer: HTMLElement = document.querySelector('#chat_container');
titleDiv.innerHTML = `<h1>Delphi</h1>`;

// sanity checks
ellipseSpinner(chatContainer);
let div = document.createElement('div');
chatContainer.appendChild(div);
type(div, 'Let there be light.');
//eo sanity checks

function ellipseSpinner(el: HTMLElement) {
  el.textContent = '';
  const timer: ReturnType<typeof setInterval> = setInterval(() => {
    el.textContent += '.';
    if (el.textContent === '....') el.textContent = '';
  }, LOADER_INTERVAL);
}

function type(el: HTMLElement, text: string) {
  let idx = 0;
  const interval = setInterval(() => {
    if (idx < text.length) {
      el.innerHTML += text.charAt(idx);
      idx++;
    } else {
      clearInterval(interval);
    }
  }, TYPE_SPEED);
}
