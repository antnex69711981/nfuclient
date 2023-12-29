Ext.define('antnex.view.src.restoreprice.Restoreprice', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.view.src.restoreprice.RestorepriceController'
    ],
    alias: 'widget.restoreprice',
    controller: 'restoreprice',
    border: false,
    scrollable: true,

    title: '維修報價主檔',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        afterrender: 'onInitialize',
        activate: 'onActivate',
    },

    dockedItems: [],

    items: []
});
