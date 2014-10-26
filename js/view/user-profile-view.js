var UserProfileView = function (props) {
    RV.extend(this, RV.View);

    var CustomComponent = function(params) {
        var h3 = <RV><h3>{'Hello, ' + params.title}</h3></RV>;
        return h3;
    };

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

    this._render = function () {

        var heading = <RV><div class="panel-heading">Edit Profile</div></RV>;

        return <RV>
            <div ref="item" class="panel panel-primary" style="width: 600px; float: left; margin-left: 50px;">
                {heading}
                <CustomComponent title="this is text from test custom component!" />
                <div class="panel-body">
                    <div style="float: left;">
                        <div class="input-group">
                            <label for="fname" class="input-group-addon" style="width: 100px;">First Name:</label>
                            <input ref="fname" type="text" class="form-control" name="fname" id="fname" value=""/>
                        </div>
                        <div class="input-group">
                           <label for="lname" class="input-group-addon" style="width: 100px;">Last Name:</label>
                           <input ref="lname" type="text" class="form-control" name="lname" id="lname" value=""/>
                       </div>
                       <div class="input-group">
                           <label for="position" class="input-group-addon" style="width: 100px;">Position:</label>
                           <input ref="position" type="text" class="form-control" name="position" id="position" value=""/>
                       </div>
                   </div>
                   <div style="float: right;">
                       <ImageView ref="img" width="200px" height="200px"/>
                    </div>
               </div>
            </div>
        </RV>;
    };
};