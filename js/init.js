window.addEventListener('load', function () {
    RV.setContainer(document.body);
    new UsersController();
    RV.routerNS.getEventManager().trigger('users-page');
});