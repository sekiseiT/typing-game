const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const dypeDisplay = document.getElementById("typeDisplay");
const typeInout = document.getElementById("tyoeInput");
const timer = document.getElementById("timer");

const typeSound = new Audio(" ./audio/audio_typing-sound.mp3");
const wrongSound = new Audio(" ./audio/audio_wrong.mp3");
const correctSound = new Audio(" ./audio/audio_correct.mp3");
// inputテキスト入力し、合っていいるか判定
typeInput.addEventListener("input", () => {

  // タイプ音をつける
  typeSound.play();
  typeSound.currentTime = 0;
  // typeDisplay内のすべてのspanを代入
  const sentenceArray = typeDisplay.querySelectorAll("span");
  // console.log(sentenceArray);
  const arrayValue = typeInput.value.split("");
  console.log(arrayValue);
  let correct = true;
  sentenceArray.forEach((characterSpan, index) => {
    if((arrayValue[index] == null)){
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    }  else if(characterSpan.innerText == arrayValue[index]) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    }  else {
      characterSpan.classList.add("incorrect");
      characterSpan.classList.remove("correct");

      wrongSound.volume = 0.3;
      wrongSound.play();
      wrongSound.currentTime = 0;

      correct = false;
    }
  });

  if (correct == true) {
    correctSound.play();
    correctSound.currentTime = 0;
    RenderNextSentence();
  }

});

function GetRandomSentence() {
  return fetch(RANDOM_SENTENCE_URL_API)
  .then((response) => response.json())
  .then((data) => data.content);
}

// 非同期処理を使う async await
// ランダムな文章を取得して、表示する
async function RenderNextSentence() {
  // apiから値を取ってくるにはawaitで待つ必要がある
  const sentence = await GetRandomSentence();
  // console.log(sentence);

  typeDisplay.innerText = "";
  // 文章を１文字ずつ分解してspanタグを生成
  let oneText = sentence.split("");
  oneText.forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    // console.log(characterSpan);
    typeDisplay.appendChild(characterSpan)
    // characterSpan.classList.add("correct");
  });

  // テキストボックスの中身を消す
  typeInput.value = "";
  StartTimer();
}

let startTime;
let originTime = 30;
function StartTimer() {
  timer.innerText = originTime;
  startTime = new Date();
  // console.log(startTime);
  setInterval(() => {
    timer.innerText = originTime - getTimerTime();
    if (timer.innerText <= 0) TimeUp();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

function TimeUp() {
  RenderNextSentence();
}

RenderNextSentence();