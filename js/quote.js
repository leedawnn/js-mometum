const quote = document.querySelector(".js-quotes");

const text = [
  "Your limitation—it’s only your imagination.",
  "Sometimes later becomes never. Do it now.",
  "Great things never come from comfort zones.",
  "Little things make big days."
];

function paintText(num) {
  quote.innerText = `"${text[num]}"`;
}
function init() {
  const randomNum = Math.floor(Math.random() * text.length);
  paintText(randomNum);
}

init();