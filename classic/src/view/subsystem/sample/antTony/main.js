Ext.define('antnex.subsystem.sample.antTony.main', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.subsystem.sample.antTony.mainController',
    ],
    alias: 'widget.antTony-main',
    controller: 'antTony-main',

    title: 'Tony的首頁',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        html: 'Tony',
        flex: 1,
    }]
});
