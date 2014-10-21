var ListView = function (props) {
    RV.extend(this, RV.View);
    // TODO: create JSX compiler
    this._render = function () {
        return RV.Node('div', {
                class: 'list-group' + props.className,
                style: 'width:400px; float:left;'},
            props.collection.map(function (model) {
                return new props.ItemView({model: model});
            })
        );
    };
};