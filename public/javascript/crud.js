const dialog = document.querySelector('dialog');
const buttonOpen = document.querySelector('#open');
const body = document.querySelector('body');
const input = document.querySelector('input');

buttonOpen.addEventListener('click', () => {
    dialog.showModal();
});
