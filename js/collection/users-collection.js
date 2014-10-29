rg.registerClass('UsersCollection', function UsersCollection($RV_Model, $UserModel) {
    RV.extend(this, $RV_Model);
    var i = 0;

    this.items = [];

    this.addItem = function () {
        this.items.push(new $UserModel(usersMocks[i++]));
        this.em.trigger('change');
    };

    this.get = function () {
        this.addItem();
        this.addItem();
        this.addItem();
        return this.items;
    };
});