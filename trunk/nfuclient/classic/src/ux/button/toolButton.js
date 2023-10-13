Ext.define('antnex.ux.button.toolButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.toolButton',

    // panel右上圓形按鈕
    text: '',
    scale: 'small',
    tooltip: null,
    cls: 'toolBtn',
    iconCls: '',
    margin: '0 0 0 8',
    handler: Ext.emptyFn,
    padding: '1.2px',

    setEnable: function (value) {
        this.setDisabled(value == false);
    },
});
