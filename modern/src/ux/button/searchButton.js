Ext.define('antnex.ux.button.searchButton-search', {
    extend: 'Ext.Button',
    alias: 'widget.searchButton-search',

    text: '查詢',
    scale: 'small',
    cls: 'searchbarBtn searchbarBtn-blue',
    class: 'searchbarBtn searchbarBtn-blue',
    iconCls: 'fa fa-search',
    // width: 79,
    border: false,
    handler: Ext.emptyFn,

});

Ext.define('antnex.ux.button.searchButton-clean', {
    extend: 'Ext.Button',
    alias: 'widget.searchButton-clean',

    text: '清除',
    scale: 'small',
    cls: 'searchbarBtn searchbarBtn-red',
    iconCls: 'fa fa-times',
    // width: 79,
    border: false,
    handler: Ext.emptyFn,

});