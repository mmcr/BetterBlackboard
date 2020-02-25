var head = document.getElementsByTagName("head")[0];

if (!document.getElementById('FontAwesome')) {
	var link = document.createElement("link");
	Object.entries({
		"rel": 		"stylesheet",
		"id": 		"FontAwesome",
		"href": 		"https://pro.fontawesome.com/releases/v5.12.0/css/all.css",
		"integrity":	"sha384-ekOryaXPbeCpWQNxMwSWVvQ0+1VrStoPJq54shlYhR8HzQgig1v5fas6YgOqLoKz",
		"crossorigin":	"anonymous"
	}).forEach( function([key,val]) { link.setAttribute(key, val) })
	head.appendChild(link);
}


if (!document.getElementById('BBB-CustomStyles')) {
    var style = document.createElement("style");
    Object.entries({
	    "type": 		"text/css",
	    "id": 		"BBB-CustomStyles"
    }).forEach( function([key,val]) { style.setAttribute(key, val) })
    style.appendChild(document.createTextNode(`
ul#content_listContainer.contentList.cards li.liItem.read {	   
}
mark.action-tag {
	background: black;
	color: white;
	padding: 0.35rem 0.5rem;
	border-radius: 0.35rem;	
	margin-right:0.5rem;
}

i.bbb {
	margin-right:0.5rem;
}

.d-none {
	display:none !important;
}

li.liItem.read.no-icon img.item_icon {
	display:none;
}

li.liItem.read.no-icon div.item {
	padding-left:0 !important;
}

li.liItem.read.no-icon div.details {
	padding-left:0 !important;
}

    `))
    head.appendChild(style);
}
let editingStatusElement = document.getElementById('statusText')
if ((editingStatusElement == null) || (editingStatusElement.innerText == "OFF")) {
    Array.from(document.getElementsByClassName('liItem read')).forEach(function(x) {
	    if (x.querySelector('h3 span[style]').innerText == "BBB") {
		    x.setAttribute('style', 'display:none;')
		    return
	    }
	    let vtbe = x.querySelector('.vtbegenerated')
	    try {
			let actionTagElement
			if (actionTagElement = vtbe.childElements().find(function(y) { return y.innerText.match(/^Action Tag:/) })) {
				let actionTagMatches = actionTagElement.innerText.match(/:\s+(.+)/)
								
				let actionTag = document.createElement("mark")
				actionTag.addClassName('action-tag')
				actionTag.appendChild(document.createTextNode(actionTagMatches[1]))
				x.querySelector('h3').prepend(actionTag)
				actionTagElement.remove()
			}

			let iconElement
			if (iconElement = vtbe.childElements().find(function(y) { return y.innerText.match(/^Icon:/) })) {
				let iconMatches = iconElement.innerText.match(/:\s+(.+)/)
				let iconText = iconMatches[1]
				
				if (iconText == "none") {
					x.addClassName('no-icon')
				} else {
	
					if (!(['fas', 'far', 'fal', 'fad'].some(z => iconText.match(`\b${z}\b`)))) {
						iconText += ' fas'
					}
					
					if (!(['fa-lg', 'fa-2x', 'fa-3x', 'fa-4x', 'fa-5x', 'fa-6x'].some(z => iconText.match(`\b${z}\b`)))) {
						iconText += ' fa-4x'
					}
	
					let icon = document.createElement("i")
					Object.entries({
						"class": 		`bbb item_icon ${iconText}`
					}).forEach( function([key,val]) { icon.setAttribute(key, val) })
					
					x.querySelector('img.item_icon').replace(icon)
				}
				iconElement.remove()
			}

			let hideCourseLinkElement
			if (hideCourseLinkElement = vtbe.childElements().find(function(y) { return y.innerText.match(/^Hide Course Link:/) })) {
				x.querySelector("h3 img[alt='linked item']").addClassName('d-none')
				hideCourseLinkElement.remove()
			}
			
	    } catch (e) {
			console.log(`error: ${e}`)    
	    }
    })
    
    
    // document.getElementById('containerdiv').addClassName(`edge-to-edge ${wrapperClass}`)
    // document.getElementById('content_listContainer').addClassName('cards')
    
}
