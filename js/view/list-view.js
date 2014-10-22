var ListView = function (props) {
    var el = document.createElement('div');

    RV.extend(this, RV.View);

    props.collection.em.on('change', function () {
        this.updateUsers();

    }.bind(this));

    this.updateUsers = function () {
       // var parent = this.getDOM().parentNode;
        var currentDom = this.getDOM();
        currentDom.parentNode.replaceChild(this.render(), currentDom);
    };

    // TODO: create JSX compiler

    this._render = function () {
        var items = props.users.length
            ? props.users.map(function (model) {
               return new props.ItemView({model: model});
              })
            : eval(RV.DOM2RV.parseString('<div style="font-size:16px">No items</div>'));

        return eval(RV.DOM2RV.parseString(
            '<div class="list-group" style="width:400px; float:left;" ref="container">' +
               '{items}' +
            '</div>'
        ));
    };
};