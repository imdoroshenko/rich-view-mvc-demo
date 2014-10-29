window.addEventListener('load', function () {
    RV.main();
    RV.setContainer(document.body);
    rg.getInstance('UsersController');
    rg.getInjection('RV_routerEM').trigger('users-page');
    //new UsersController();
   // RV.routerNS.getEventManager().trigger('users-page');
    //new RV.Router().init();
});