Ext.define('antnex.subsystem.41141132.main.main', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.subsystem.41141132.main.mainController',
    ],
    alias: 'widget.page-41141132-main',
    controller: 'page-41141132-main',

    title: '41141132的首頁',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        html: '41141132',
        flex: 1,
    }]
});
