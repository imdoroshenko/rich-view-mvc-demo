rg.registerClass('UsersService', (function () {
    return function UsersService ($$UserProfileView, $$UsersCollection) {
        $$UserProfileView.render();
        this.getCollection = function () {
            return $$UsersCollection;
        };
        this.showProfile = function (model) {
            $$UserProfileView.setModel(model);
            RV.container.appendChild($$UserProfileView.getDOM());
        };
    };
})());