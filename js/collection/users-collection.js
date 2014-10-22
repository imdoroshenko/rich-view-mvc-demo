var UsersCollection = function () {
    RV.extend(this, RV.Model);
    var i = 0;

    this.items = [];

    this.addItem = function () {
        this.items.push(new UserModel(usersMocks[i++]));
        this.em.trigger('change');
    };

    this.get = function () {
        this.addItem();
        this.addItem();
        this.addItem();
        return this.items;
    };
};