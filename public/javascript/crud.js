const dialog = document.querySelector('dialog');
const buttonOpen = document.querySelector('#open');
const body = document.querySelector('body');
const input = document.querySelector('input');

buttonOpen.addEventListener('click', () => {
    dialog.showModal();
});

// body.addEventListener('click', (event) => {
//     if (event.target === input) {
//         dialog.close();
//     }
// });

import { namesList } from '../../list';
import { teste } from './list';

// namesList.forEach(e => {
//     const p = document.createElement('p');
//     body.appendChild(p);
//     p.innerText += e;
//     console.log(na);
// });

console.log(teste());