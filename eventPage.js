


chrome.windows.onCreated.addListener(function() {
    chrome.windows.getAll(function(windows) {
        if (true/*windows.length == 1*/) {
            // Do stuff here


			// Use default value color = 'red' and likesColor = true.
			chrome.storage.sync.get({
					favoriteColor: 'red',
					url0: '',
					url1: '',
					url2: ''
			}, function(items) {
				if(items.url0 != ''){
					chrome.tabs.create({ url: items.url0 });
				}
			
				if(items.url1 != ''){
					chrome.tabs.create({ url: items.url1 });
				}
				
				if(items.url2 != ''){
					chrome.tabs.create({ url: items.url2 });	
				}
			});
			
				

        
			
			
			
			
//			var newURL = "chrome://extensions/";
//			chrome.tabs.create({ url: newURL });
//			var newURL = "https://mail.google.com";
//			chrome.tabs.create({ url: newURL });				
//			var newURL = "https://developer.chrome.com/extensions/devguide";
//			chrome.tabs.create({ url: newURL });				
				
        }
    });
});



chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            chrome.extension.getBackgroundPage().console.log('resp.type');
            console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
					
			chrome.storage.sync.get({
				actionType: 'translate',
				language: 'spanish'

			}, function(items) {
				if(items.actionType=='define')
				{
					//opens a small popup window at the location clicked, and displays the definition of the clicked word
					
					chrome.windows.create({url: 'https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=define+'+request.word, type: "popup", height:500,width:800,left:request.xCoord,top:request.yCoord});
				}
				else
				{
					//opens a small popup window at the location clicked, and displays a translation of the selected word in the language chosen in the options page.
					if(items.language=='spanish')
					{
						chrome.windows.create({url: 'https://translate.google.com/#auto/es/'+request.word, type: "popup", height:500,width:800,left:request.xCoord,top:request.yCoord});
					}
					else if(items.language=='french')
					{
						chrome.windows.create({url: 'https://translate.google.com/#auto/fr/'+request.word, type: "popup", height:500,width:800,left:request.xCoord,top:request.yCoord});
					}
					else if(items.language=='german')
					{
						chrome.windows.create({url: 'https://translate.google.com/#auto/de/'+request.word, type: "popup", height:500,width:800,left:request.xCoord,top:request.yCoord});
					}
					else if(items.language=='japanese')
					{
						chrome.windows.create({url: 'https://translate.google.com/#auto/ja/'+request.word, type: "popup", height:500,width:800,left:request.xCoord,top:request.yCoord});
					}
				}

			});					
				
                
                sendResponse({farewell: "goodbye"});
            
        });

		
		
		
var inFocus = true;  // global boolean to keep track of state
//closes the popup window once the main page is selected.
chrome.windows.onFocusChanged.addListener(function(window) {
	
	chrome.windows.getAll(function(windows){
		for(z=0;z<windows.length;z++)
		{
			if(!windows[z].focused)
			{
				if(windows[z].type=='popup')
				{
					chrome.windows.remove(windows[z].id);
				}
			}
		}
	});
	
});




