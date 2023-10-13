Ext.define('antnex.ux.button.AntToggleButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.antToggleButton',

    // panel右上圓形按鈕
    text: '',
    scale: 'small',
    tooltip: null,
    pressedCls: 'antBtn-system',
    unpressCls: 'antBtn-gray',
    pressed: true,
    enableToggle: true,
    toggleHandler: Ext.emptyFn,
    style: 'border-width: 0px !important',

    listeners: {
        afterrender: function () {
            let me = this;
            me.addCls(me.pressed ? me.pressedCls : me.unpressCls);
        },
        toggle: function (btn, pressed, eOpts) {
            if (pressed) {
                btn.removeCls(btn.unpressCls);
                btn.addCls(btn.pressedCls);
            } else {
                btn.removeCls(btn.pressedCls);
                btn.addCls(btn.unpressCls);
            }
        }
    },

    setEnable: function (value) {
        this.setDisabled(value == false);
    },
});
