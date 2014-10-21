var UsersCollection = function () {
    RV.extend(this, RV.Model);

    this.get = function () {
        return usersMocks.map(function (user) {
            return new UserModel(user);
        });
    };
};