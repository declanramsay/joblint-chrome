chrome.storage.onChanged.addListener(function(changes, areaName) {
  var results = chrome.storage.sync.get('results', function(items) {
    console.log('onChanged found the results');
    console.log(items);

    parseResults(items);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var results = chrome.storage.sync.get('results', function(items) {
    console.log('document Add event Listener found the results');
    console.log(items);

    parseResults(items);
  });
});

function parseResults(results) {

};
