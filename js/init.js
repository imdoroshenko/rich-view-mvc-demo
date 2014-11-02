window.addEventListener('load', function () {
    RV.setContainer(document.body);
    RV.main();
    rg.getInjection('RV_routerEM')
        .trigger('users-page');
});