rg.registerClass('UsersController', function UsersController(
    $RV_Controller, $ListView, $$UsersService, $UserItemView
    ) {
    RV.extend(this, $RV_Controller);

    this.routerEM.on('/users/', function (e) {
        var collection = $$UsersService.getCollection();
        RV.setContent(new $ListView({
            collection: collection.getAll(),
            ItemView: $UserItemView,
            className: 'users-list'
        }));
        setTimeout(e.params.routerCallBack, 1000);
    }.bind(this));

    this.routerEM.on('/users/:id/', function (e) {
        $$UsersService.showProfile(
            $$UsersService
                .getCollection()
                .getById(e.params.match[1])
        );
        e.params.routerCallBack();
    }.bind(this));

    this.viewEM.on('user-profile-input', function (e) {
        var model = e.params.model,
            field = e.params.field,
            value = e.params.value;
        model.set(field, value);
    }.bind(this))
});