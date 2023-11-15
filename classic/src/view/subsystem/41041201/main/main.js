Ext.define('antnex.subsystem.41041201.main.main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'antnex.subsystem.41041201.main.mainController',
    ],
    alias: 'widget.page-41041201-main',
    controller: 'page-41041201-main',

    title: '41041201的首頁',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        html: '41041201的首頁',
        flex: 1,
    }]
});
