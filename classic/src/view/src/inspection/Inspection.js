Ext.define('antnex.view.src.inspection.Inspection', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.view.src.inspection.InspectionController'
    ],
    alias: 'widget.inspection',
    controller: 'inspection',
    border: false,
    scrollable: true,

    title: '檢測項目主檔',

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
