Ext.define('antnex.ux.button.AntButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.antButton',

    text: '',
    scale: 'small',
    cls: '',
    iconCls: '',
    arrowVisible: false,
    handler: Ext.emptyFn,

    setEnable: function (value) {
        this.setDisabled(value == false);
    },
});
