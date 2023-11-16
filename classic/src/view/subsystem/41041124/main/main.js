Ext.define('antnex.subsystem.41041124.main.main', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.subsystem.41041124.main.mainController',
    ],
    alias: 'widget.page-41041124-main',
    controller: 'page-41041124-main',

    title: '範例頁面',
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        html: '41041124 首頁',
        flex: 1,
    }]
});
