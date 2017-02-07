// Saves options to chrome.storage
function save_options() {
  var actionType = document.getElementById('actionType').value;
  var language = document.getElementById('language').value;
  var url0 = document.getElementById('url0').value;
  var url1 = document.getElementById('url1').value;
  var url2 = document.getElementById('url2').value;
  chrome.storage.sync.set({
	actionType: actionType,
    language: language,
	url0: url0,
    url1: url1,
	url2: url2
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value language = 'red' and likeslanguage = true.
  chrome.storage.sync.get({
	actionType: 'translate',
    language: 'spanish',
	url0: '',
    url1: '',
	url2: ''
  }, function(items) {
	document.getElementById('actionType').value = items.actionType;
    document.getElementById('language').value = items.language;
	document.getElementById('url0').value = items.url0;
    document.getElementById('url1').value = items.url1;
	document.getElementById('url2').value = items.url2;
  });
}



document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('save').addEventListener('click',
    addTab);