function lint(text) {
  var results = joblint(text);

  var width = 440;
  var height = 220;
  var left = (screen.width/2)-(width/2);
  var top = (screen.height/2)-(height/2);

  chrome.windows.create({
    'url': 'results.html',
    'type': 'popup',
    width,
    height,
    left,
    top,
  }, (window) => {
    chrome.storage.sync.set({ results }, () => {
      console.log('Results stored!');
    });
  });
}

chrome.contextMenus.create({
  id: "joblint",
  title: "Check %s with joblint",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  lint(info.selectionText);
})
