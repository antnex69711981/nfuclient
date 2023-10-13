Ext.define('antnex.view.system.mainmenu.Mainmenu', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.view.system.mainmenu.MainmenuController',

        'antnex.view.system.mainmenu.opmanage.OPManage',
    ],
    alias: 'widget.system-mainmenu',
    controller: 'system-mainmenu',
    border: false,

    // title: '主系統',
    reference: 'view_system_mainmenu',
    items: [
        {   // body
            xtype: 'panel',
            reference: 'view_mainmenu_body',
            layout: 'card',
            border: false,
            flex: 1,
            items: []
        }
    ]
});
