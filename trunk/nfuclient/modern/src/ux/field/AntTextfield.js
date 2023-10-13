Ext.define('antnex.ux.field.AntTextfield', {
    extend: 'Ext.field.Text',
    alias: 'widget.antTextfield',

    cls: '',
    label: '',
    placeholder: '',
    readOnly: false,


    // 自訂功能
    inputRight: false,
    // numberFormat: null,

    listeners: {
        // change: function (field, newValue, oldValue, eOpts) {
        //     if (this.numberFormat) {
        //         let num = numeral(newValue).value();
        //         let value = Ext.util.Format.number(num, this.numberFormat);
        //         this.setValue(value);
        //     }
        // }
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
        let me = this;
        let readOnly = enable === false;
        let readOnlyCls = enable === false;

        if (enable === 'apply') {
            readOnly = true;
            readOnlyCls = false;
        }

        me.setReadOnly(readOnly);
        // me.updateClsByReadOnly(readOnlyCls);

        return enable;
    },
    // // 取得格式化文字: undefined => emptyValue
    // getFormatedValue: function (emptyValue) {
    //     let me = this;
    //     emptyValue = emptyValue ? emptyValue : '';
    //     let value = me.getValue();
    //     if (me.numberFormat) {
    //         value = numeral(value).value();
    //         emptyValue = 0;
    //     }

    //     return value ? value : emptyValue;
    // },
    // // enableField 專用
    // updateClsByReadOnly: function (readOnly) {
    //     let me = this;

    //     let deleteCls = 'fieldNotInput fieldRequired'
    //     let disableCls = 'fieldNotInput';
    //     let enableCls = 'fieldRequired';

    //     let newCls = readOnly ? disableCls : enableCls;
    //     let setCls = me.cls.includes(newCls) ? newCls : '';

    //     me.removeCls(deleteCls);
    //     me.addCls(setCls)

    //     return readOnly;
    // }
});