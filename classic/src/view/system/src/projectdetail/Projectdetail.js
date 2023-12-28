Ext.define('antnex.view.system.src.projectdetail.Projectdetail', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.view.system.src.projectdetail.ProjectdetailController',
    ],
    alias: 'widget.projectdetail',
    controller: 'projectdetail',
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
