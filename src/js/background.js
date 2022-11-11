const isFirefox = () =>
  navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;

const executeScript = (file, tab, callback) => {
  if (isFirefox()) {
    browser.tabs.executeScript({ file }, callback);
  } else {
    chrome.scripting.executeScript(
      {
        target: {
          tabId: tab.id,
        },
        files: [file],
      },
      callback
    );
  }
};

const copyToClipboard = (tab) => {
  executeScript("src/js/jquery.min.js", tab, () =>
    executeScript("src/js/cart.js", tab)
  );
};

if (isFirefox()) {
  chrome.browserAction.onClicked.addListener(copyToClipboard);
} else {
  chrome.action.onClicked.addListener(copyToClipboard);
}
