rg.registerClass('UserModel', function UserModel($RV_Model, domain) {
    RV.extend(this, $RV_Model);
    this.fields = domain;
});