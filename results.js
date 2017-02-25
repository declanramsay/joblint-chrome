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
  let issuesNode = document.querySelector('.issues');

  if(!countsKeys.length) {
    countNode.innerHTML = '<h1>No warnings!</h1>'
    return;
  }

  let countsArr = countsKeys.map((k) => {
    return `${k}: ${counts[k]}`;
  });
  let countsString = countsArr.join('<br>');

  let issuesArr = constructIssuesDOM(issues);
  let issuesStr = issuesArr.join('');

  countNode.innerHTML = `<h2>Count:</h2> ${countsString}`;
  issuesNode.innerHTML = `<h2>Issues:</h2> ${issuesStr}`;
  return;
};

function constructIssuesDOM(issues) {
  return issues.map((i) => {
    let context = i.context.replace(/{{occurance}}/, `<span class="occurance">${i.occurance}</span>`);

    return `
      <div class="issue issue-${i.level}">
        <h3>${i.name} (${i.level})</h3>
        <div class="example">
          <span>${context}</span>
        </div>
        <p><strong>${i.solution}</strong> <em>${i.reason}</em></p>
      </div>
    `;
  });
};
