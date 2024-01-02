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

    // title: 'defaultView@classic',
    layout: {
        type: 'vbox',
        align: 'stretch',
    },
    bodyStyle: { 'background': '#E3E5EE' },
    scrollable: true,
    listeners: {
        afterrender: 'onInitialize',
        activate: 'onInitializeActivate',
    },
    items: []
});
