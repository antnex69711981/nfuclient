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
Ext.define('antnex.ux.layout.tabpanelitem', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.tabpanelitem',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    scrollable: false,
    border: false,
    bodyStyle: 'background-color: #FAFAFA;'
});