chrome.storage.onChanged.addListener((changes, areaName) => {
  let results = chrome.storage.sync.get('results', (items) => {
    parseResults(items.results);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  let results = chrome.storage.sync.get('results', (items) => {
    parseResults(items.results);
  });
});

function parseResults(results) {
  let { counts, issues } = results;
  let countsKeys = Object.keys(counts);
  let countNode = document.querySelector('.count');

  if(!countsKeys.length) {
    countNode.innerHTML = '<h1>No warnings!</h1>'
    return;
  }

  let countsArr = countsKeys.map((k) => {
    return `${k}: ${counts[k]}`;
  });

  let countsString = countsArr.join('<br>');
  countNode.innerHTML = `<h1>Count:</h1> ${countsString}`;
  return;
};
