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
let id = generateUniqueId();
titleDiv.innerHTML += id;
//eo sanity checks

function ellipseSpinner(el: HTMLElement): ReturnType<typeof setInterval> {
  el.textContent = '';
  const timer: ReturnType<typeof setInterval> = setInterval(() => {
    el.textContent += '.';
    if (el.textContent === '....') el.textContent = '';
  }, LOADER_INTERVAL);

  return timer;
}

function type(el: HTMLElement, text: string) {
  let idx = 0;
  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    if (idx < text.length) {
      el.innerHTML += text.charAt(idx);
      idx++;
    } else {
      clearInterval(interval);
    }
  }, TYPE_SPEED);
}

function generateUniqueId(): string {
  const timestamp = Date.now();
  const randomNum = Math.random();
  const hexaString = randomNum.toString(16);
  const id = `${timestamp}-${hexaString.padStart(18, '0')}`;
  return id;
}
