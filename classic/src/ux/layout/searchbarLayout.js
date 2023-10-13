Ext.define('antnex.ux.layout.searchbarLayout', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.searchbarLayout',

    layout: {
        type: 'hbox',
        align: 'stretch',
    },
    bodyStyle: 'border-radius:0px 0px 1.5px 1.5px;',
    defaults: {
        margin: '0 0 5 5',
    },
    scrollable: true,
});
