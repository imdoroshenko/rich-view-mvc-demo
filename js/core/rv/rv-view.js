RV.View = function View($RV_modelEM, $RV_viewNS) {
    this._rv_component = true;
    this._DOM = null;
    this._rendered = false;

    this.modelEM = $RV_modelEM;
    this.em = $RV_viewNS.getEventManager(this);
    this.refs = {};
    this.onRenderBefore = function () {
    };
    this.onRenderAfter = function () {
    };
    this._render = function () {
    };
    this.getDOM = function () {
        return this._rendered
            ? this._DOM
            : this.render();
    };
    this.render = function () {
        this.onRenderBefore();
        this._DOM = this._render();
        this._rendered = true;
        this.onRenderAfter();
        return this.getDOM();
    };
};