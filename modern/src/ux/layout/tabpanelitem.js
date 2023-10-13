Ext.define('antnex.ux.layout.tabpanelitem', {
    extend: 'Ext.Panel',
    alias: 'widget.tabpanelitem',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    scrollable: false,
    border: false,
    bodyStyle: 'background-color: #FAFAFA;'
});

Ext.define('antnex.ux.layout.tabpanelitemContainer', {
    extend: 'Ext.Panel',
    alias: 'widget.tabpanelitemContainer',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    flex: 1,
    scrollable: false,
    border: false,
    bodyStyle: 'background-color: transparent',
    padding: 5,
});
