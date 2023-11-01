Ext.define('antnex.subsystem.sample.antKevin.main', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.subsystem.sample.antKevin.mainController',
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
