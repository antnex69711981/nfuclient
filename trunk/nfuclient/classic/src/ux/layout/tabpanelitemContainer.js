/**
 * 可自由滑動的tabitem:
 * 
 * xtype: 'tabpanelitem' // 灰底
 * items:[{
 *      xtype: 'tabpanelitemContainer' // paddin: 5
 *      items:[{
 *          // 資料內容
 *      }]
 * }]
 */
Ext.define('antnex.ux.layout.tabpanelitemContainer', {
    extend: 'Ext.panel.Panel',
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
