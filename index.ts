// Import stylesheets
import './style.css';

import { LOADER_INTERVAL, TYPE_SPEED, BOT_NAME } from './constants';

const appDiv: HTMLElement = document.getElementById('app');
const titleDiv: HTMLElement = document.getElementById('title');
const form = document.querySelector('form');
const chatContainer: HTMLElement = document.querySelector('#chat_container');

/* sanity checks */
titleDiv.innerHTML = `<h1>Delphi</h1>`;
ellipseSpinner(chatContainer);
let div = document.createElement('div');
chatContainer.appendChild(div);
type(div, 'Let there be light.');
let id = generateUniqueId();
titleDiv.innerHTML += id;

let newResponse = chatBar(false, 'Hello human', generateUniqueId());
chatContainer.innerHTML += newResponse;
/* eo sanity checks */

//generate loading indicator and render to passed in el
function ellipseSpinner(el: HTMLElement): ReturnType<typeof setInterval> {
  el.textContent = '';
  const timer: ReturnType<typeof setInterval> = setInterval(() => {
    el.textContent += '.';
    if (el.textContent === '....') el.textContent = '';
  }, LOADER_INTERVAL);

  return timer;
}

// takes element, paragraph as args and adds para chars 1 by 1 to the el
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

// see name
function generateUniqueId(): string {
  const timestamp = Date.now();
  const randomNum = Math.random();
  const hexaString = randomNum.toString(16);
  const id = `${timestamp}-${hexaString.padStart(18, '0')}`;
  return id;
}

function chatBar(isUser: boolean, val: string, id: string): string {
  //todo add ability to choose name and avatar by user
  const bar = `
  <div class="bar_wrap ${isUser ? 'user' : BOT_NAME}">
    <div class="chat">
      <div className="profile">${isUser ? 'User' : BOT_NAME}</div>
      <div id="${id}" class="chat_message" >${val}</div>
    </div>
  </div>`;

  return bar;
}
