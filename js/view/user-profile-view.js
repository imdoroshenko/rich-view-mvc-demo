var UserProfileView = function (props) {
    RV.extend(this, RV.View);

    var model = props
        ? props.model
        : null;

    this.setDataFromModel = function () {
        if ( model ) {
            this.refs.fname.value = model.get('fname');
            this.refs.lname.value = model.get('lname');
            this.refs.position.value = model.get('position');
            this.refs.img.setSRC(model.get('avatar'));
        }
    };

    this.setModel = function (val) {
        model = val;
        this.setDataFromModel();
        return this;
    };

    this.onRenderAfter = function () {
        this.setDataFromModel();
        this.refs.item.addEventListener('input', this._changeHandler);
    };

    this._changeHandler = function (e) {
        this.em.trigger('user-profile-input', {
            model: model,
            field: e.target.getAttribute('name'),
            value: e.target.value
        })
    }.bind(this);




    // TODO: create JSX compiler
    this._render = function () {
        return this.refs.item = RV.Node('div', {
                class: 'panel panel-primary',
                style: 'width:600px;float:left; margin-left:50px;'
            },
            RV.Node('div', {class: 'panel-heading'}, 'Edit Profile'),
            RV.Node('div', {class: 'panel-body'},
                RV.Node('div', {style: 'float:left;'},
                    RV.Node('div', {class: 'input-group'},
                        RV.Node('label', {for: 'fname', class: 'input-group-addon', style: 'width:100px'}, 'First Name:'),
                        this.refs.fname = RV.Node('input', {type: 'text', class: 'form-control', name: 'fname', id: 'fname', value: ''})
                    ),
                    RV.Node('div', {class: 'input-group'},
                        RV.Node('label', {for: 'lname', class: 'input-group-addon', style: 'width:100px'}, 'Last Name:'),
                        this.refs.lname = RV.Node('input', {type: 'text', class: 'form-control', name: 'lname', id: 'lname', value: ''})
                    ),
                    RV.Node('div', {class: 'input-group'},
                        RV.Node('label', {for: 'position', class: 'input-group-addon', style: 'width:100px'}, 'Position:'),
                        this.refs.position = RV.Node('input', {type: 'text', class: 'form-control', name: 'position', id: 'position', value: ''})
                    )
                ),
                RV.Node('div', {style: 'float:right;'},
                    this.refs.img = new ImageView({width: '200px', height: '200px'})
                )
            )
        );
    };
};