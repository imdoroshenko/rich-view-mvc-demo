rg.registerClass('UserProfileService', (function () {
    var profileView = null;
    return function UserProfileService ($UserProfileView) {
        if (!profileView) {
            profileView = new $UserProfileView();
            profileView.render();
        }
        this.view = profileView;

        this.showProfile = function (model) {
            this.view.setModel(model);
            RV.container.appendChild(this.view.getDOM());
        };
    };
})());