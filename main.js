const wordEl = document.querySelector(".word");
const popupContainer = document.querySelector(".popup-container");
const popup = document.querySelector(".popup");
const messageEl = document.querySelector(".message");
const wrongLettersEl = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");
const msg = document.getElementById("msg");
const playAgainBtn = document.getElementById("play-again");

let correctLetters = [];
let wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord() {
  const words = ["python", "javascript", "html", "zeynep", "java", "css"];
  return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
  console.log(selectedWord);
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
        <div class="letter">
             ${correctLetters.includes(letter) ? letter : ""}
        </div>
    `
      )
      .join("")}
    `;

  const w = wordEl.innerText.replace(/\n/g, "");

  if (w === selectedWord) {
    popupContainer.style.display = "flex";
    messageEl.innerText = "Congratulations you won";
    popup.classList.remove("warn");
  }
}

function updateWrongLetters() {
  wrongLettersEl.innerHTML = `
    ${
      wrongLetters.length > 0 ? `<h3 style="color:red"> Wrong Letters <h3>` : ""
    }
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)} 
  `;

  items.forEach((item, index) => {
    if (index < wrongLetters.length) {
      item.style.display = "block";
    }
  });

  if (wrongLetters.length == items.length) {
    popupContainer.style.display = "flex";
    messageEl.innerText = "Unfortunately you lost.";
    popup.classList.add("warn");
  }
}

function displayMsg() {
  msg.classList.add("show");
  console.log(msg);
  setTimeout(function () {
    msg.classList.remove("show");
  }, 2000);
}

window.addEventListener("keydown", function (e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        displayMsg();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters();
      } else {
        displayMsg();
      }
    }
  }
});

playAgainBtn.addEventListener("click", function () {
  wrongLetters = [];
  correctLetters = [];

  selectedWord = getRandomWord();
  displayWord();
  updateWrongLetters();

  popupContainer.style.display = "none";

  items.forEach((item) => {
    item.style.display = "none";
  });
});

displayWord();
