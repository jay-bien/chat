// Import stylesheets
import './style.css';

import { LOADER_INTERVAL, TYPE_SPEED } from './constants';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
const titleDiv: HTMLElement = document.getElementById('title');
const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');
titleDiv.innerHTML = `<h1>Delphi</h1>`;

//
ellipseSpinner(chatContainer);

function ellipseSpinner(el) {
  el.textContent = '';
  const timer: ReturnType<typeof setInterval> = setInterval(() => {
    el.textContent += '.';
    if (el.textContent === '....') el.textContent = '';
  }, LOADER_INTERVAL);
}

function type(el, text) {
  let idx = 0;
  const interval = setInterval(() => {
    if (idx < text.length) {
      el.innerHtml += text.charAt(idx);
      idx++;
    } else {
      clearInterval(interval);
    }
  }, TYPE_SPEED);
}
