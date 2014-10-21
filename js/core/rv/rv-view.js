RV.View = (function () {
    var modelEventManager = RV.modelNS.getEventManager(window);

    return function View() {
        this._rv_component = true;
        this._DOM = null;
        this._rendered = false;

        this.modelEM = modelEventManager;
        this.em = RV.viewNS.getEventManager(this);
        this.refs = {};
        this.onRenderBefore = function () {
        };
        this.onRenderAfter = function () {
        };
        this._render = function () {
        };
        this.getDOM = function () {
            return this._DOM;
        };
        this.render = function () {
            this.onRenderBefore();
            this._DOM = this._render();
            this._rendered = true;
            this.onRenderAfter();
            return this.getDOM();
        };
    };
})();