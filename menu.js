function lint(text) {
  if(!text) {
    console.log('no text');
    return;
  }

  var results = joblint(text);
  var countsArr = Object.keys(results.counts);

  if(!countsArr.length) {
    console.log('no errors')
    return;
  }

  var counts = countsArr.map(function(k) {
    return k + ": " + results.counts[k];
  });

  var countsString = counts.toString();
  console.log(countsString);
}

chrome.contextMenus.create({
    id: "joblint",
    title: "Test %s with joblint",
    contexts:["selection"],
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  lint(info.selectionText);
})
