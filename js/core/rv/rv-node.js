RV.Node = (function () {
    var handleParams = function (el, params) {
        for(var prop in params){
            if(prop == 'style'){
                el.style.cssText = params[prop];
            }else if(prop == 'class'){
                el.className = params[prop];
            }else if(prop == 'innerHTML'){
                el.innerHTML = params[prop];
            }else{
                el.setAttribute(prop, params[prop]);
            }
        }
    };

    var handleChildElements = function (el, child) {
        if (typeof child === 'string' || typeof child === 'number') {
            el.appendChild(document.createTextNode(child));
        } else if (child._rv_component) {
            el.appendChild(child._rendered
                ? child.getDOM()
                : child.render());
        } else {
            el.appendChild(child);
        }
    };

    return function () {
        var args = arguments,
            el = document.createElement(args[0]);
        for(var ln = args.length, i = 1; i < ln; i++)	{
            if(i === 1 && args[i].constructor === Object){
                handleParams(el, args[i]);
            } else {
                if (Array.isArray(args[i])) {
                    args[i].forEach(function (child) {
                        handleChildElements(el, child);
                    })
                } else {
                    handleChildElements(el, args[i]);
                }
            }
        }
        return el;
    };

})();