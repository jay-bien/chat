// Import stylesheets
import './style.css';

import { LOADER_INTERVAL, TYPE_SPEED, BOT_NAME } from './constants';

const appDiv: HTMLElement = document.getElementById('app');
const titleDiv: HTMLElement = document.getElementById('title');
const form: HTMLFormElement = document.querySelector('form');
const chatContainer: HTMLElement = document.querySelector('#chat_container');

/* sanity checks */
titleDiv.innerHTML = `<h1>Delphi</h1>`;

let div = document.createElement('div');
chatContainer.innerHTML += chatBar(false, 'hello there', '' + 12);
let newResponse = chatBar(false, 'Hello human', generateUniqueId());
chatContainer.innerHTML += newResponse;
/* eo sanity checks */

//listen for user input submission
form.addEventListener(
  'submit',
  (e) => {
    onFormSubmit(e);
  },
  false
);
form.addEventListener(
  'keyup',
  (e) => {
    if (e.key !== 'Enter') return;
    onFormSubmit(e);
    alert('Pressed enter');
  },
  false
);
//eo listen for user input submission

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

//generate chat block for user or bot
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

//handle user query submission
async function onFormSubmit(e: SubmitEvent | KeyboardEvent) {
  e.preventDefault();

  const data = new FormData(form);
  const prompt = data.get('chat_input').toString();

  if (!prompt || !prompt.length) return;
  chatContainer.innerHTML += chatBar(true, prompt, generateUniqueId());
  form.reset();

  // bot response
  const id = generateUniqueId();
  chatContainer.innerHTML += chatBar(false, '.', id);
  const responseDiv: HTMLDivElement = document.querySelector(`#${id}`);
  ellipseSpinner(responseDiv);

  console.log(data.get('chat_input'));
  console.log({ e });
  console.log(e.target);
  console.log({ data });
}
