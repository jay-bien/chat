// Import stylesheets
import './style.css';

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
  }, 250);
}
