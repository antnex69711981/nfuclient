Ext.define('antnex.ux.gridpanel.AntMenuTreepanel', {
    extend: 'Ext.list.Tree',
    alias: 'widget.antMenuTreepanel',

    ui: 'nav',
    expanderFirst: false,
    highlightPath: false, // 主分支突出顯示動畫
    store: {
        root: {
            id: 'root',
            expanded: true,
            children: [],
        }
    },
});