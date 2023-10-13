Ext.define('antnex.ux.button.switchButton', {
    extend: 'Ext.button.Segmented',
    alias: 'widget.switchButton',

    vertical: true,
    allowMultiple: false,

    pressedCls: 'antBtn-selected',
    unpressCls: 'antBtn-unselect',
    items: [],
    listeners: {
        toggle: function (container, button, pressed) {

            let pressedStyle = this.pressedCls;
            let unpressStyle = this.unpressCls;
            container.items.items.forEach(btn => {
                btn.removeCls(btn.cls);
                btn.cls = btn.pressed ? pressedStyle : unpressStyle;
                btn.addCls(btn.cls)
            });
        }
    },
    // 點選指定按鈕
    acitveButton: function (value) {
        let btn = this.items.items.find(e => e.value == value);
        if (btn) btn.click();
    },

    setEnable: function (value) {
        this.setDisabled(value == false);
    },
});
