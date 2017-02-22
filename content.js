var selection = window.getSelection();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var data;
  if(request.method == "getSelection") {
    data = {data: selection.toString()};
  }

  sendResponse(data || {});
});
