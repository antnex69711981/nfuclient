Ext.define('antnex.ux.feature.AntGrouping', {
    extend: 'Ext.grid.feature.Grouping',
    alias: 'feature.antGrouping',

    groupHeaderTpl: '{name} ({[values.children.length]})',
    showSummaryRow: false,
    
    hideGroupedHeader: false,
    enableGroupingMenu: false,
    startCollapsed: false,

    expandTip: '點擊展開，按住CTRL以關閉其他群組',
    collapseTip: '點擊收折，按住CTRL以關閉其他群組',
});