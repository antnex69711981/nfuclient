Ext.define('antnex.view.src.restoreitem.Restoreitem', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.view.src.restoreitem.RestoreitemController'
    ],
    alias: 'widget.restoreitem',
    controller: 'restoreitem',
    border: false,
    scrollable: true,

    title: '維修項目主檔',

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
