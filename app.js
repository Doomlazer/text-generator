const generator = new Worker("./generator.js", { type: "module" });
const form = document.getElementById("form");

function updateOutput(content) {
  const output = document.getElementById("result");
  output.innerText = content;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(e.target);
  const reader = new FileReader();

  const wordsCount = Number(data.get("wordsCount"));
  const sampleSize = Number(data.get("sampleSize"));
  const source = data.get("source");


var client = new XMLHttpRequest();
client.open('GET', './pCatCorpus.txt');
client.onreadystatechange = function() {
  generator.postMessage({
    source: client.responseText,
    wordsCount,
    sampleSize,
  });
}
client.send();
  generator.postMessage({
    source: "",
    wordsCount,
    sampleSize,
  });
});

generator.onmessage = ({ data: { result } }) => {
  updateOutput(result);
};
