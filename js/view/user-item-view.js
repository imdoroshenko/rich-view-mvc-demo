var UserItemView = function (props) {
    RV.extend(this, RV.View);

    this.modelEM.onTarget(props.model, 'change', function () {
        if (this._rendered) {
            this.refs.item.textContent = this.formatContent(props.model);
        }
    }.bind(this));

    this.onRenderAfter = function () {
        this.refs.item.addEventListener('click', function (e) {
            this.em.trigger('user-item-selected', {model: props.model});
        }.bind(this));
    };

    this.formatContent = function (model) {
        return model.get('fname')
            + ' ' + model.get('lname')
            + ' (' + model.get('position')  + ')'
    };

    // TODO: create JSX compiler
    this._render = function () {
        return this.refs.item = RV.Node('a', {href: '#', class: 'list-group-item'}, this.formatContent(props.model));
    };
};