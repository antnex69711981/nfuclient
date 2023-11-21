Ext.define('antnex.subsystem.41041116.main.main', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.subsystem.41041116.main.mainController',
    ],
    alias: 'widget.page-41041116-main',
    controller: 'page-41041116-main',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        html: ' 首頁',
        flex: 1,
    }]
});
