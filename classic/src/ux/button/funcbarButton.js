Ext.define('antnex.ux.button.funcbarButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.funcbarButton',

    text: '',
    scale: 'small',
    cls: 'funcbarBtn-black',
    iconCls: '',
    iconAlign: 'left',
    border: false,
    margin: 3,
    disabled: false,
    handler: Ext.emptyFn,

    setEnable: function (value) {
        this.setDisabled(value == false);
    },
});
