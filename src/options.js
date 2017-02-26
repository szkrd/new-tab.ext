let $ = s => document.getElementById(s);

function saveOptions () {
  let status = $('status');
  let pageTitle = $('page-title').value;
  let url = $('url').value;
  let settings = { pageTitle, url };

  document.body.classList.add('loading');
  $('save').disabled = true;
  chrome.storage.sync.set(settings, () => {
    document.body.classList.remove('loading');
    $('save').removeAttribute('disabled');
    status.textContent = 'Options saved.';
    setTimeout(() => { status.textContent = ''; }, 1000);
  });
}

function restoreOptions () {
  document.body.classList.remove('loading');
  chrome.storage.sync.get({
    pageTitle: '',
    url: 'about:blank'
  }, settings => {
    document.body.classList.remove('loading');
    $('page-title').value = settings.pageTitle;
    $('url').value = settings.url;
  });
}

function onUrlInput (e) {
  let val = e.target.value.trim();
  if (val) {
    $('settings-row-page-title').classList.add('disabled');
    $('page-title').disabled = true;
  } else {
    $('settings-row-page-title').classList.remove('disabled');
    $('page-title').removeAttribute('disabled');
  }
}

// ---

document.addEventListener('DOMContentLoaded', restoreOptions);
$('url').addEventListener('input', onUrlInput);
$('save').addEventListener('click', saveOptions);
