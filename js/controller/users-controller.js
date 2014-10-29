rg.registerClass('UsersController', function UsersController(
    $RV_Controller, $ListView, $UserProfileService, $UserItemView, $UsersCollection) {
    RV.extend(this, $RV_Controller);

    this.routerEM.on('users-page', function (e) {
        RV.setContent(new $ListView({
            collection:(window.collection = new $UsersCollection()),
            users: window.collection.get(),
            ItemView: $UserItemView,
            className: 'users-list'
        }));
    }.bind(this));

    this.viewEM.on('user-item-selected', function (e) {
        var userModel = e.params.model;
        new $UserProfileService().showProfile(userModel);
    }.bind(this));

    this.viewEM.on('user-profile-input', function (e) {
        var model = e.params.model,
            field = e.params.field,
            value = e.params.value;

        model.set(field, value);
    }.bind(this))
});