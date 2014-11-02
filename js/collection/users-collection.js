rg.registerClass('UsersCollection', function UsersCollection($RV_Model, $UserModel) {
    RV.extend(this, $RV_Model);
    var i = 0;

    this.items = [];

    this.addItemFromMocks = function () {
        this.items.push(new $UserModel(usersMocks[i++]));
        this.em.trigger('change');
    };

    this.getAll = function () {
        this.addItemFromMocks();
        this.addItemFromMocks();
        this.addItemFromMocks();
        return this.items;
    };

    this.getById = function (id) {
        for (var ln = this.items.length; ln-- > 0;) {
            if ((id|0) === (this.items[ln].get('id')|0)) {
                return this.items[ln];
            }
        }
        return null;
    };
});