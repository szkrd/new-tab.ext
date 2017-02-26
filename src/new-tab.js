chrome.storage.sync.get({
  pageTitle: '',
  url: ''
}, settings => {
  if (settings.url) {
    window.location.replace(settings.url);
  } else {
    document.title = settings.pageTitle;
  }
});
