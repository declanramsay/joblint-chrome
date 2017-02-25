function lint(text) {
  let results = joblint(text);

  let width = 440;
  let height = 440;
  let left = (screen.width/2)-(width/2);
  let top = (screen.height/2)-(height/2);

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
