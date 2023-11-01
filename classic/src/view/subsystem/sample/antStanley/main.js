Ext.define('antnex.subsystem.sample.antStanley.main', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.subsystem.sample.antStanley.mainController',
    ],
    alias: 'widget.antStanley-main',
    controller: 'antStanley-main',

    title: 'Stanley的首頁',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        html: 'Stanley',
        flex: 1,
    }]
});
