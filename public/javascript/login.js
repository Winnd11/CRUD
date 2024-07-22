const line = document.querySelector('.teste ul li:nth-child(1)');
const lineTwo = document.querySelector('.teste ul li:nth-child(2)');
const lineThree = document.querySelector('.teste ul li:nth-child(3)');
const body = document.querySelector('body');

body.style.fontFamily = 'Aeonik-Regular';

function setLine(inputType, lineNumber) {
    inputType.length >= 1 ? lineNumber.style.width = '173px' : lineNumber.style.width = '0px';
}

setInterval(function checkAllLine() {
    const usernameInputValue = document.getElementById('username').value;
    const emailInputValue = document.getElementById('email').value;
    const pwdInputValue = document.getElementById('pwd').value;

    setLine(usernameInputValue, line);
    setLine(emailInputValue, lineTwo);
    setLine(pwdInputValue, lineThree);
}, 10 * 10);

let startX = 0;
const maxWidth = 440;
const minWidth = 0;

const card = document.querySelector('.card');

card.addEventListener('mousedown', mouseDown);

function mouseDown(e){
    startX = e.clientX;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
}

function mouseMove(e){
    newX = startX - e.clientX;
    startX = e.clientX;

    let newLeft = card.offsetLeft - newX;

    if (newLeft >= minWidth && newLeft <= maxWidth) {
        card.style.left = newLeft + 'px';
    }
}

function mouseUp(e){
    document.removeEventListener('mousemove', mouseMove);
}

// just for UI purpose
function handleCredentialResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential);
  }
  window.onload = function () {
    google.accounts.id.initialize({
    //   client_id: 'YOUR_GOOGLE_CLIENT_ID',
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { locale: 'en',
        theme: 'outline',
        size: 'small',
        shape: 'retangular',
        text: 'signup_with',
        width: '170',
        type: 'stardard'
      }
    );
      google.accounts.id.renderButton(
      document.getElementById('sign-in-button'),
      { locale: 'en',
        theme: 'outline',
        size: 'small',
        shape: 'retangular',
        text: 'signin_with',
        width: '170',
        type: 'stardard'
      }
    );
    google.accounts.id.prompt();
  };
  
