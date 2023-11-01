Ext.define('antnex.subsystem.sample.antStanley.user.user', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.subsystem.sample.antStanley.user.userController',
    ],
    alias: 'widget.antStanley-user',
    controller: 'antStanley-user',

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
