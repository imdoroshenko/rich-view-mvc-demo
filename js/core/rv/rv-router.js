RV.Router = function () {
    this.rules = [];
    this.default = {};
    this.root = '/';
    this.historyMode = false;
    this.currentRoute = '';
    this._stack = [];
    this._currentStackPosition = 0;
};
RV.Router.prototype.init = function () {
    var handler = this.routeChangedHandler.bind(this);
    if (this.historyMode) {

    } else if ( 'onhashchange' in window.document.body ) {
        window.addEventListener('hashchange', handler);
    } else {
        (function (handler) {
            var location = window.location,
                oldURL = location.href,
                oldHash = location.hash;
            (function listener () {
                var newURL = location.href,
                    newHash = location.hash;
                if (newHash != oldHash) {
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
        })(handler);
    }
    return this;
};
RV.Router.prototype.check = function () {
    this.routeChangedHandler({newURL: window.location.href});
};
RV.Router.prototype.routeChangedHandler = function (e) {
    this.goTo(e.newURL.split('#')[1]||'');
};

RV.Router.prototype.goTo = function (route) {
    this._stack.length = 0;
    this._currentStackPosition = 0;
    for (var i = 0, ln = this.rules.length; i < ln; i++) {
        var matchNew = route.match(this.rules[i].re),
            matchOld = this.currentRoute.match(this.rules[i].re);
        if (matchNew && !this.isMatchesSame(matchNew, matchOld)) {
            this._stack.push({
                handler: this.rules[i].handler,
                match: matchNew
            });
        }
    }
    this.executeStack();
    this.currentRoute = route;
};
RV.Router.prototype.executeStack = function closure () {
    var handler = this._stack[this._currentStackPosition++];
    if (handler) {
        handler.handler({
            callback: closure.bind(this),
            match: handler.match
        });
    }
};
RV.Router.prototype.isMatchesSame = function (matchA, matchB) {
    if (!matchA && !matchB) {
        return true;
    } else if ((!matchA && matchB) || (matchA && !matchB)) {
        return false;
    }

    var aLn = matchA.length,
        bLn = matchB.length;

    if (aLn !== bLn) {
        return false;
    }
    for (var i = 0; i < aLn; i++) {
        if (matchA[i] !== matchB[i]) {
            return false;
        }
    }
    return true;
};
RV.Router.prototype.case = function (route, handler, opts) {
    this.rules.push(this.prepareRoute(route, handler, opts));
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

RV.Router.prototype.default = function (route, handler, opts) {
    this.default = this.prepareRoute(route, handler, opts);
    return this;
};
RV.Router.prototype.prepareRoute = function (route, handler, opts) {
    return {
        route: route,
        opts: opts,
        handler: handler,
        re: new RegExp(route.replace(/:[^\s/]+/g, '([\\w-]+)'))
    };
};