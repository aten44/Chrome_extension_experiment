Element.prototype.removeAll = function () {
  while (this.firstChild) { this.removeChild(this.firstChild); }
  return this;
};

//recursively searches for text in the page and wraps each word in a custom element tag. 
//a click handeler is attatched to each of these elements to allow the user to see information on that word.
var replaceTextInNode = function(parentNode){
    for(var i = parentNode.childNodes.length-1; i >= 0; i--){
        var node = parentNode.childNodes[i];

        //  Make sure this is a text node
        if(node.nodeType == Element.TEXT_NODE){
			
			var bigDivx = document.createElement("bigDivx");
			var splitWords = node.textContent.split(' ');
			for(k = 0; k<splitWords.length; k++)
			{
				
				//for debugging
				if(parentNode.tagName == 'SPAN')
				{
					console.log("holdup");
				}
				
				//custom element type
				var divx = document.createElement("divx");
				var word = document.createTextNode(splitWords[k]+" ");
				divx.appendChild(word);
				divx.addEventListener("click",function(event){
						console.log(""+this.innerHTML);
						
						//code run on their web page (this code) is prevented from interacting with the chrome window. 
						//This is a message sent to a location from which you can interact with the chrom window (eventPage.js)
						chrome.runtime.sendMessage({word: this.innerHTML.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"']/g,""), xCoord: event.screenX, yCoord: event.screenY}, function (response) {
							console.log(response.farewell);
						});
						
						
						//the following comment is a failed attempt at displaying information by adding iframes to the page, this, however, is disallowed by most server security settings. we used a popup window instead
						//it was left in for reference and documentation of the attempt
						
						/*
						var iframe = document.createElement("iframe");
						var att = document.createAttribute("class");
						att.value = "demo";
						iframe.setAttributeNode(att);
						att= document.createAttribute("src");
						att.value="http://www.google.com/trends/fetchComponent?hl=en-US&q=html5,jquery&cid=TIMESERIES_GRAPH_0&export=5&w=500&h=100";
						iframe.setAttributeNode(att);
						att= document.createAttribute("allowtransparency");
						att.value="false";
						iframe.setAttributeNode(att);
						att= document.createAttribute("style");
						att.value="position: absolute; top: "+event.pageY+"px; left: "+event.pageX+"px; z-index: 1000; background-color: white; height: 300px; width: 500px;";
						iframe.setAttributeNode(att);						
						
						
						
						var menu = document.getElementsByClassName("demo")[0];//
						//menu.src = "https://www.google.com/trends/fetchComponent?hl=en-US&q=html5,jquery&cid=TIMESERIES_GRAPH_0&export=5&w=500&h=100";
						menu.style.position = "absolute"
						menu.style.top = event.pageY+"px";
						menu.style.left = event.pageX+"px";
						menu.style.zIndex=1000;
						menu.style.backgroundColor = "white";
						menu.style.height = "300px";
						menu.style.width = "500px";
						*/
                        
						console.log(""+menu.style.top);
					});
				bigDivx.appendChild(divx);
			}

			parentNode.replaceChild(bigDivx, node);

			
			
            //node.textContent = '<xdiv>'+node.textContent+'0</xdiv>'/* modify text here */
        } else if(node.nodeType == Element.ELEMENT_NODE){
            //  Check this node's child nodes for text nodes to act on

            replaceTextInNode(node);
			
        }
    }
};

replaceTextInNode(document.body);

