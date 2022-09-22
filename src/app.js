
// Hamburger
const hamburgerButton = document.getElementById('hamburger')
const navList = document.getElementById('nav-list')

function toggleButton() {
  navList.classList.toggle('show')
}

hamburgerButton.addEventListener('click', toggleButton)

// hand wave
// .wave {
//   animation-name: wave-animation;
//   animation-duration: 2.5s;
//   animation-iteration-count: infinite;
//   transform-origin: 70% 70%;
//   display: inline-block;
// }

// @keyframes wave-animation {
//   0% { transform: rotate( 0.0deg) }
//  10% { transform: rotate(14.0deg) }
//  20% { transform: rotate(-8.0deg) }
//  30% { transform: rotate(14.0deg) }
//  40% { transform: rotate(-4.0deg) }
//  50% { transform: rotate(10.0deg) }
//  60% { transform: rotate( 0.0deg) }

// contact form

const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});
