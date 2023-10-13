Ext.define('antnex.ux.field.AntNumberfield', {
    extend: 'Ext.field.Number',
    alias: 'widget.antNumberfield',

    cls: '',
    label: '',
    decimalPrecision: 0,
    hideTrigger: true,
    spinUpEnabled: false,
    spinDownEnabled: false,

    // 自訂功能
    inputRight: false,
    negativeNumber: false,

    listeners: {
        change: function (field, newValue, oldValue, eOpts) {
            if (this.negativeNumber) {  // 負數
                let value = numeral(newValue).value();
                if (value > 0) {
                    this.setValue(-1 * value);
                }
            }
        },
        focus: function (field, newValue, oldValue, eOpts) {
            let me = this;
            // inputbar 置右
            if (this.inputRight) {
                let value = me.getValue();
                me.setValue('');
                setTimeout(function () {
                    me.setValue(value)
                }, 10);
            }
        }
    },

    // enable: true / false / 'apply'
    enableField: function (enable) {
        var me = this;
        var readOnly = enable === false;
        var readOnlyCls = enable === false;

        if (enable === 'apply') {
            readOnly = true;
            readOnlyCls = false;
        }

        me.setReadOnly(readOnly);
        // me.updateClsByReadOnly(readOnlyCls);

        return enable;
    },

    getFormatedValue: function (emptyValue) {
        var me = this;
        emptyValue = S(emptyValue).isEmpty() ? 0 : emptyValue;
        var value = me.getValue();
        return S(value).isEmpty() ? emptyValue : value;
    },

    // updateClsByReadOnly: function (readOnly) {
    //     var me = this;

    //     var deleteCls = 'fieldNotInput fieldRequired'
    //     var disableCls = 'fieldNotInput';
    //     var enableCls = 'fieldRequired';

    //     var newCls = readOnly ? disableCls : enableCls;
    //     var setCls = me.cls.includes(newCls) ? newCls : '';

    //     me.removeCls(deleteCls);
    //     me.addCls(setCls)

    //     return readOnly;
    // }

});