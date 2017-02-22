document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('link');
    link.addEventListener('click', function() {
        lint();
    });
});

function lint() {
  chrome.tabs.query({active:true, currentWindow: true},
  function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"},
    function(response){
      var results = joblint(response.data);
      var counts = Object.keys(results.counts).map(function(k) {
        return k + ": " + results.counts[k];
      });

      var countsString = counts.toString();
      var text = document.getElementById('text');
      text.innerHTML = countsString;
    });
  });
}
