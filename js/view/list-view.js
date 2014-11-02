rg.registerClass('ListView', function ListView(props, $RV_View) {
    RV.extend(this, $RV_View);


    this._render = function () {
        var items = props.collection.length
            ? props.collection.map(function (model) {
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