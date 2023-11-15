Ext.define('antnex.subsystem.40141123.main.main', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.subsystem.40141123.main.mainController',
    ],
    alias: 'widget.page-40141123-main',
    controller: 'page-40141123-main',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        html: '40141123 首頁',
        flex: 1,
    }]
});
