RV.Model = function () {
    this.em = RV.modelNS.getEventManager(this);

    this.fields = {};
    this._doNotNotify = false;
    this._changed = false;
    this._changeList = {};

    this.persist = function () {
        this._doNotNotify = true;
        return this;
    };

    this.flush = function () {
        if (this._changed) {
            this.em.trigger('change', {change: this._changeList});
            this._changeList = {};
            this._changed = false;
            this._doNotNotify = false;
        }
        return this;
    };

    this.set = function (name, value) {
        if (this.fields.hasOwnProperty(name)) {
            if ( this.fields[name] !== value ){
                this.fields[name] = value;
                if (this._doNotNotify) {
                    this._changed = true;
                    this._changeList[name] = value;
                } else {
                    this._changeList[name] = value;
                    this.em.trigger('change', {change: this._changeList});
                    this._changeList = {};
                }
            }
        } else {
            throw new Error('No such field');
        }
        return this;
    };

    this.get = function (name) {
        if (!this.fields.hasOwnProperty(name)) {
            throw new Error('No such field');
        }
        return this.fields[name];
    };
};
