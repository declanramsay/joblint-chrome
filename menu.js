function lint(text) {
  var results = joblint(text);

  var w = 440;
  var h = 220;
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  chrome.windows.create({'url': 'results.html', 'type': 'popup', 'width': w, 'height': h, 'left': left, 'top': top}, function(window) {
    chrome.storage.sync.set({'results': results}, function() {
      console.log('Results stored!');
    });
  });
}

chrome.contextMenus.create({
    id: "joblint",
    title: "Check %s with joblint",
    contexts:["selection"],
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  lint(info.selectionText);
})
