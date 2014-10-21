var UserProfileService = (function () {
    var profileView = null;
    return function UserProfileService () {
        if (!profileView) {
            profileView = new UserProfileView();
            profileView.render();
        }
        this.view = profileView;

        this.showProfile = function (model) {
            this.view.setModel(model);
            RV.container.appendChild(this.view.getDOM());
        };
    };
})();