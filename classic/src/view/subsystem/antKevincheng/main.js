Ext.define('antnex.subsystem.antKevin.main', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.subsystem.antKevin.mainController',
    ],
    alias: 'widget.antKevin-main',
    controller: 'antKevin-main',

    title: 'Kevin的首頁',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        html: 'Kevin',
        flex: 1,
    }]
});
