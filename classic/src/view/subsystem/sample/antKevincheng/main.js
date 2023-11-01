Ext.define('antnex.subsystem.sample.antKevin.main', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.subsystem.sample.antKevin.mainController',
    ],
    alias: 'widget.antKevin-main',
    controller: 'antKevin-main',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        html: 'Kevin的首頁',
        flex: 1,
    }]
});
