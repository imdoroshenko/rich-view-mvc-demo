RV.Router = function () {
    this.rules = [];
    this.default = {};
    this.root = '/';
    this.historyMode = false;
};
RV.Router.prototype.init = function () {
    if (this.historyMode) {

    } else if ( 'onhashchange' in window.document.body ) {
        window.addEventListener('hashchange', this.routeChangedHandler);
    } else {
        (function (handler) {
            var location = window.location,
                oldURL = location.href,
                oldHash = location.hash;
            (function listener () {
                var newURL = location.href,
                    newHash = location.hash;
                if (newHash != oldHash) {
                    // execute the handler
                    handler({
                        type: 'hashchange',
                        oldURL: oldURL,
                        newURL: newURL
                    });

                    oldURL = newURL;
                    oldHash = newHash;
                }
                window.setTimeout(listener, 100);
            })();
        })(this.routeChangedHandler);
    }
};
RV.Router.prototype.routeChangedHandler = function (e) {
    console.log(e);
};
RV.Router.prototype.case = function (route, opts) {
    this.rules.push(this.prepareRoute(route, opts));
    return this;
};

RV.Router.prototype.setHistoryMode = function (flag) {
    this.historyMode = flag;
    return true;
};

RV.Router.prototype.setRoot = function (root) {
    this.root = root;
    return this;
};

RV.Router.prototype.default = function (route, opts) {
    this.default = this.prepareRoute(route, opts);
    return this;
};
RV.Router.prototype.prepareRoute = function (route, opts) {
    return {
        route: route,
        opts: opts,
        re: new RegExp(route.replace(/:[^\s/]+/g, '([\\w-]+)'))
    };
};