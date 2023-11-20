Ext.define('antnex.subsystem.41041118.main.main', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.subsystem.41041118.main.mainController',
    ],
    alias: 'widget.page-41041118-main',
    controller: 'page-41041118-main',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        html: '41041118首頁',
        flex: 1,
    }]
});
