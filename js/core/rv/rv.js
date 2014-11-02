var RV = {
        controllers: [
            'UsersController'
        ],
        main: function () {
            var routerNS = new RV.EventNameSpace('Router'),
                viewNS = new RV.EventNameSpace('View'),
                modelNS = new RV.EventNameSpace('Model'),
                router = null,
                my = this;

            rg.registerClasses(
                ['RV_Controller', this.Controller],
                ['RV_EventNameSpace', this.EventNameSpace],
                ['RV_Model', this.Model],
                ['RV_View', this.View],
                ['RV_Router', this.Router]
            );

            rg.registerInjections(
                ['RV_routerNS', routerNS],
                ['RV_viewNS', viewNS],
                ['RV_modelNS', modelNS],
                ['RV_routerEM', routerNS.getEventManager(window)],
                ['RV_viewEM', viewNS.getEventManager(window)],
                ['RV_modelEM', modelNS.getEventManager(window)],
                ['RV_extend', this.extend],
                ['RV_router', router = rg.getInstance('RV_Router')]
            );

            for (var i = 0, ln = this.controllers.length; i < ln; i++) {
                rg.getInstance(this.controllers[i]);
            }

            router
                .case('/users/', function (e) {
                    var routerEM = rg.get('RV_routerEM');
                    routerEM.trigger('/users/',{
                        routerCallBack: my._after(routerEM.count('/users/'), e.callback),
                        match: e.match
                    });
                })
                .case('/users/:id/', function (e) {
                    var routerEM = rg.get('RV_routerEM');
                    routerEM.trigger('/users/:id/',{
                        routerCallBack: my._after(routerEM.count('/users/:id/'), e.callback),
                        match: e.match
                    });
                })
                .init()
                .check();

        },
        _after: function after(n, func) {
            return function() {
                if (--n < 1) {
                    return func.apply(this, arguments);
                }
            };
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