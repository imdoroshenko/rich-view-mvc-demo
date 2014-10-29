rg.registerClass('ListView', function ListView(props, $RV_View) {
    RV.extend(this, $RV_View);
    props.collection.em.on('change', function () {
        this.updateUsers();

    }.bind(this));

    this.updateUsers = function () {
       // var parent = this.getDOM().parentNode;
        var currentDom = this.getDOM();
        currentDom.parentNode.replaceChild(this.render(), currentDom);
    };

    this._render = function () {
        var items = props.users.length
            ? props.users.map(function (model) {
               return new props.ItemView({model: model});
              })
            : <RV><div style="font-size:16px">No items</div></RV>;

        return <RV>
            <div class="list-group" style="width:400px; float:left;" ref="container">
               {items}
            </div>
        </RV>;
    };
});