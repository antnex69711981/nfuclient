Ext.define('antnex.default.defaultView', {
    extend: 'Ext.Panel',
    requires: [
        'antnex.default.defaultController',
        'antnex.default.defaultModel',
    ],

    alias: 'widget.defaultView',
    controller: 'defaultController',
    viewModel: {
        type: 'defaultModel'
    },
    
    // title: 'defaultView@modern',
    layout: 'vbox',
    listeners: {
        activate: 'onInitialize',
    },
    items: []
});
