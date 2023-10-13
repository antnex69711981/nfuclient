// 透明底
Ext.define('Ext.ux.layout.AntTransPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.antTransPanel',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    collapsible: false,

    collapseDirection: 'left',

    margin: 0,
    bodyStyle: 'background:transparent;',
});
