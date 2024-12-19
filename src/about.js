import './style.scss'
import 'bootstrap';

// // START BACKGROUND
document.addEventListener('DOMContentLoaded', () => {
  const interBubble = document.querySelector('.interactive');
  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;

  function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(() => {
          move();
      });
  }

  window.addEventListener('mousemove', (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
  });

  move();
});
// END BACKGROUND

const feedbackBtn = document.querySelector('.feedbackBtn')
const popUp = document.querySelector('.pop-up')
const closeForm = document.querySelector('.close')
const form = document.getElementById('form');
const result = document.getElementById('result');

//START CLOSE
feedbackBtn.addEventListener("click", function() {
    popUp.style.display = "flex";
})
closeForm.addEventListener("click", function() {
    form.reset();
    result.innerHTML = "";
    hcaptcha.reset();
    popUp.style.display = "none";
  });
//END CLOSE

//START FORM FUNCTION
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  result.style.display = "block";
  result.innerHTML = `<div class="alert alert-info">Submitting...</div>`;

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
          result.innerHTML = `<div class="alert alert-success">Form successfully submitted!</div>`;
      } else {
          result.innerHTML = `<div class="alert alert-danger">Please verify that you are not a robot.</div>`;
      }
      } finally {
        form.reset();

        if (window.hcaptcha) {
        hcaptcha.reset();
        }
      }     
});
//END FORM FUNCTION

//START SCROLL INTO FORM
feedbackBtn.addEventListener("click", function () {
  popUp.style.display = "flex";
  popUp.scrollIntoView({ behavior: "smooth", block: "center" }); 
});
//END SCROLL INTO FORM