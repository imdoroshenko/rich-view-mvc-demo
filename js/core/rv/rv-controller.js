RV.Controller = (function () {
    var viewEventManager = RV.viewNS.getEventManager(window);
    var routerEventManager = RV.routerNS.getEventManager(window);

    return function Controller() {
        this.viewEM = viewEventManager;
        this.routerEM = routerEventManager;
    };
})();