Ext.define('antnex.ux.layout.AntPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.antPanel',
    ui: 'antPanelUI',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    collapsible: false,

    collapseDirection: 'left',

    stateful: true,

    margin: 0,
    collapseToolText: '收合',
    expandToolText: '展開',

    // shadow: false,

    // listeners: {
    //     afterrender: function () {
    //         let me = this;
    //         if (me.shadow) {
    //             let cls = typeof me.shadow == 'string' ? me.shadow : '3px 3px 8px 2px rgba(0, 0, 0, 0.2)';
    //             me.getEl().applyStyles({
    //                 boxShadow: cls,
    //             });
    //         }

    //     }
    // },
});