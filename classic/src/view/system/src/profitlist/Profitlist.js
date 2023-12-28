Ext.define('antnex.view.system.src.profitlist.Profitlist', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.view.system.src.profitlist.ProfitlistController',
    ],
    alias: 'widget.profitlist',
    controller: 'profitlist',
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
