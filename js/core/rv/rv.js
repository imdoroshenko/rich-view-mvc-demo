var RV = {
        container: null,
        setContent: function (el) {
            this.clearContent(this.container);
            if (el._rv_component) {
                this.container.appendChild(el._rendered
                    ? el.getDOM()
                    : el.render());
            } else {
                this.container.appendChild(el);
            }
        },
        setContainer: function (container) {
            this.container = container;
            return this;
        },
        clearContent: function (node) {
            while(node.childNodes.length != 0){
                node.removeChild(node.firstChild);
            }
            return node;
        }
    },
    RichView = RV;