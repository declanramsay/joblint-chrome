chrome.storage.onChanged.addListener(function(changes, areaName) {
  var results = chrome.storage.sync.get('results', function(items) {
    parseResults(items.results);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var results = chrome.storage.sync.get('results', function(items) {
    parseResults(items.results);
  });
});

function parseResults(results) {
  var counts = Object.keys(results.counts);

  var countNode = document.querySelector('.count');

  if(!counts.length) {
    countNode.innerHTML = '<h1>No warnings!</h1>'
    return;
  }

  var countsArr = counts.map(function(k) {
    return k + ': ' + results.counts[k];
  });

  var countsString = countsArr.join('<br>');
  countNode.innerHTML = '<h1>Count:</h1>' + countsString;
  return;
};
