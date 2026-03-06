import './style.scss'
import 'bootstrap';

const feedbackBtn = document.querySelector('.feedbackBtn')
const popUp = document.querySelector('.pop-up')
const closeForm = document.querySelector('.close-btn')
const form = document.getElementById('form');
const result = document.getElementById('result');

function loadHcaptcha() {
  if (window.hcaptcha) return;
  const script = document.createElement('script');
  script.src = 'https://web3forms.com/client/script.js';
  script.defer = true;
  document.body.appendChild(script);
}

function showStatus(type, message) {
  const icons = {
    loading: `<span class="status-spinner"></span>`,
    success: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  };
  result.style.opacity = '1';
  result.innerHTML = `<div class="form-status form-status--${type}">${icons[type]}${message}</div>`;
}

function fadeOutStatus(delay = 3000) {
  setTimeout(() => {
    result.style.opacity = '0';
    setTimeout(() => {
      result.innerHTML = '';
      result.style.opacity = '1';
    }, 400);
  }, delay);
}

function resetPopup() {
  form.reset();
  result.innerHTML = '';
  result.style.opacity = '1';
  if (window.hcaptcha) hcaptcha.reset();
  popUp.style.display = 'none';
}

//START CLOSE
feedbackBtn.addEventListener('click', function () {
  loadHcaptcha();
  popUp.style.display = 'flex';
  popUp.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

closeForm.addEventListener('click', function () {
  resetPopup();
});
//END CLOSE

//START FORM FUNCTION
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  showStatus('loading', 'Sending your feedback...');

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    });

    if (response.status === 200) {
      showStatus('success', 'Feedback sent! Thank you.');
      form.reset();
      if (window.hcaptcha) hcaptcha.reset();
      // Close the modal after 3 seconds
      setTimeout(() => resetPopup(), 3000);
    } else {
      showStatus('error', 'Please complete the captcha and try again.');
      fadeOutStatus(3000);
    }
  } catch {
    showStatus('error', 'Something went wrong. Please try again.');
    fadeOutStatus(3000);
  }
});
//END FORM FUNCTION
