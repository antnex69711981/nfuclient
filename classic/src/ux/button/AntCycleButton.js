Ext.define('antnex.ux.button.AntCycleButton', {
    extend: 'Ext.button.Cycle',
    alias: 'widget.antCycleButton',

    showText: true,
    cls: 'antBtn-blue',
    menu: {
        items: [{
            text: 'antCycleButton',
            type: 'antCycleButton',
            checked: true
        }]
    },

    valueKey: 'value',

    getFormatedValue: function (emptyValue, valueKey) {
        let me = this;
        valueKey = valueKey ? valueKey : me.valueKey;
        emptyValue = S(emptyValue).isEmpty() == false ? emptyValue : '';

        let item = me.getActiveItem();
        if (item) {
            let value = item[valueKey];
            return S(value).isEmpty() == false ? value : emptyValue;
        } else {
            return emptyValue;
        }
    },

    setEnable: function (value) {
        this.setDisabled(value == false);
    },
});
