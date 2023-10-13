Ext.define('antnex.view.system.mainmenu.Mainmenu', {
    extend: 'Ext.panel.Panel',
    requires: [ //import
        'antnex.view.system.mainmenu.MainmenuController',
    ],
    alias: 'widget.system-mainmenu',
    controller: 'system-mainmenu',

    // title: 'Menu',
    
    layout: 'fit',
    items: []
});
