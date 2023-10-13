Ext.define('antnex.ux.gridpanel.AntTreepanel', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.antTreepanel',

    ui: 'antPanelUI',
    // cls: 'antTreepanel',
    cls: 'antTree',

    border: false,

    collapsible: false,

    collapseDirection: null,

    rootVisible: false, // 是否顯示root

    // liquidLayout: true, //卡控特殊事件 (Ex:false/resize)

    lines: false, //是否樹線 useArrows:false

    useArrows: true, //是否使用箭頭風格 (原+號)

    border: true,

    collapseToolText: '收合',
    
    expandToolText: '展開',

    store: {},
});