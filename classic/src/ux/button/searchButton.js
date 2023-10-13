Ext.define('antnex.ux.button.searchButton-search', {
    extend: 'Ext.button.Button',
    alias: 'widget.searchButton-search',

    text: '查詢',
    scale: 'small',
    // cls: 'searchbarBtn searchbarBtn-blue',
    cls: 'antBtn-blue',
    iconCls: 'fa fa-search',
    width: 60,
    border: false,
    handler: Ext.emptyFn,

    setEnable: function (value) {
        this.setDisabled(value == false);
    },
});

Ext.define('antnex.ux.button.searchButton-clean', {
    extend: 'Ext.button.Button',
    alias: 'widget.searchButton-clean',

    text: '清除',
    scale: 'small',
    // cls: 'searchbarBtn searchbarBtn-red',
    cls: 'antBtn-red',
    iconCls: 'fa fa-times',
    width: 60,
    border: false,
    handler: Ext.emptyFn,

    setEnable: function (value) {
        this.setDisabled(value == false);
    },
});