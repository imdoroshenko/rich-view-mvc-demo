var RV = {
        main: function () {
            var routerNS = new RV.EventNameSpace('Router'),
                viewNS = new RV.EventNameSpace('View'),
                modelNS = new RV.EventNameSpace('Model');

            rg.registerInjections(
                ['RV_routerNS', routerNS],
                ['RV_viewNS', viewNS],
                ['RV_modelNS', modelNS],
                ['RV_routerEM', routerNS.getEventManager(window)],
                ['RV_viewEM', viewNS.getEventManager(window)],
                ['RV_modelEM', modelNS.getEventManager(window)],
                ['RV_extend', this.extend]
            );

            rg.registerClasses(
                ['RV_Controller', this.Controller],
                ['RV_EventNameSpace', this.EventNameSpace],
                ['RV_Model', this.Model],
                ['RV_View', this.View]
            );


        },
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