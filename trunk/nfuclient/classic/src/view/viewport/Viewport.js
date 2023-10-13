Ext.define('antnex.view.viewport.Viewport', {
    extend: 'antnex.default.defaultView',
    requires: [
        'Ext.*',
        'antnex.*',

        'antnex.view.viewport.ViewportController',

        // 系統模組
        'antnex.view.system.login.Login', // 登入模組
        'antnex.view.system.mainmenu.Mainmenu', // 主系統模組
    ],
    alias: 'widget.viewport-viewport',
    controller: 'viewport-viewport',

    layout: 'fit',

    items: [{
        xtype: 'panel',
        reference: 'view_viewport_body',
        layout: 'card',
    }]
});
