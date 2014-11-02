rg.registerClass('UserItemView', function UserItemView (props, $RV_View) {
    RV.extend(this, $RV_View);

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

    this._render = function () {
        return <RV>
            <a class="list-group-item" href="{'#/users/' + props.model.get('id') + '/'}" ref="item">
                {this.formatContent(props.model)}
            </a>
        </RV>;
    };
});