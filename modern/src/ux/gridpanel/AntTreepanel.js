Ext.define('antnex.ux.gridpanel.AntTreepanel', {
    extend: 'Ext.grid.Tree',
    alias: 'widget.antTreepanel',

    cls: 'antTreepanel',

    border: true,

    collapsible: false,

    collapseDirection: null,

    rootVisible: false, // 是否顯示root
    
    // liquidLayout: true, //卡控特殊事件 (Ex:false/resize)
    
    lines: false, //是否樹線 useArrows:false
    
    useArrows: true, //是否使用箭頭風格 (原+號)
    
    border: true,

    store: {},
});