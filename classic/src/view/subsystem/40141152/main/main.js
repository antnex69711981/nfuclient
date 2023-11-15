Ext.define('antnex.subsystem.40141152.main.main', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.subsystem.40141152.main.mainController',
    ],
    alias: 'widget.page-40141152-main',
    controller: 'page-40141152-main',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        html: '40141152 首頁',
        flex: 1,
    }]
});
