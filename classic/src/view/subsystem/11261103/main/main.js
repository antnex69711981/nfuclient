Ext.define('antnex.subsystem.11261103.main.main', 
{
    extend: 'Ext.panel.Panel',
    requires: [
        'antnex.subsystem.11261103.main.mainController',
    ],
    alias: 'widget.page-11261103-main',
    controller: 'page-11261103-main',

    title: '11261103的首頁',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        html: '11261103的首頁',
        flex: 1,
    }]
});
