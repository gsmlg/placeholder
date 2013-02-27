/**
 * @Author Shiming
 * @email gaoshiming@live.com
 * @time 2012-12-21 10:45:49
 */
(function(){

function getCssEffect(domObj) {
    if (domObj.currentStyle) {
        return domObj.currentStyle;
    } else if (window.getComputedStyle) {
        return document.defaultView.getComputedStyle( domObj );
    } else {
        return null
    }
}

var EventUtil = {
	addHandler: function(element, type, handler){
		if (element.addEventListener){
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent){
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	getCharCode: function(event){
		if (typeof event.charCode === "number"){
			return event.charCode;
		} else {
			return event.keyCode;
		}
	},
	getEvent: function(event){
		return event ? event : window.event;
	},
	getTarget: function(event){
		return event.target || event.srcElement;
	}
};
EventUtil.addHandler(document, 'readystatechange', function(){
	if (!('placeholder' in document.createElement('input'))) {
		var inputdoc = document.getElementsByTagName('input');
		var hasPlaceholder = new Array();
		for (var i in inputdoc) {
			if (typeof(inputdoc[i]) === 'object' && inputdoc[i].getAttribute('placeholder') != null) {
				hasPlaceholder.push(inputdoc[i]);
			}
		}
		if (hasPlaceholder.length > 0) {
			var holders = new Array;
			for (var i = 0; i < hasPlaceholder.length; i++) {
				var span = document.createElement('span');
				// span.className = 'ui-placeholder';
				var input = hasPlaceholder[i];
				span.height = input.clientHeight + 'px';
				span.width = input.clientWidth + 'px';
				span.innerHTML = input.getAttribute('placeholder');
				if (input === input.parentNode.lastChild) {
					input.parentNode.appendChild(span);
				} else {
					input.parentNode.insertBefore(span, input.nextSibling);
				}
				var cssStyle = getCssEffect(input);
				span.style.color = "#999";
				span.style.fontSize = cssStyle.fontSize;
				span.style.textIndent = cssStyle.textIndent;
				span.style.lineHeight = input.clientHeight + 'px';
				span.style.textAlign = cssStyle.textAlign;
				span.style.paddingLeft = cssStyle.borderLeftWidth;
				span.style.paddingTop = cssStyle.borderTopWidth;
				span.style.paddingRight = cssStyle.borderRightWidth;
				span.style.paddingBottom = cssStyle.borderBottomWidth;
				span.style.position = "absolute";
				span.style.top = input.offsetTop;
				span.style.left = input.offsetLeft;
				span.style.float = 'left';
				holders[i] = span;
			}
			var togglePlaceholder = function(event) {
				event = EventUtil.getEvent(event);
				var target = EventUtil.getTarget(event);
				
				for( var i in hasPlaceholder) {
					if (target === hasPlaceholder[i]) {
						if (hasPlaceholder[i].value != '') {
							holders[i].style.display = 'none';
						} else if ( /[a-zA-Z0-9`~!@#\$%\^&\*\(\)_+-=\[\]\{\};:'"\|\\,.\/\?<>]/.test(String.fromCharCode(EventUtil.getCharCode(event))) ) {
							
							holders[i].style.display = 'none';
						} else {
							holders[i].style.display = 'block';
						}
					}
				}
			}
			
			EventUtil.addHandler(document, 'keydown', togglePlaceholder)

			EventUtil.addHandler(document, 'keyup', function(event) {
				event = EventUtil.getEvent(event);
				var target = EventUtil.getTarget(event);
				
				for( var i in hasPlaceholder) {
					if (target === hasPlaceholder[i]) {
						if (hasPlaceholder[i].value != '') {
							holders[i].style.display = 'none';
						} else {
							holders[i].style.display = 'block';
						}
					}
				}
			})
		}
	}
})
}).call()