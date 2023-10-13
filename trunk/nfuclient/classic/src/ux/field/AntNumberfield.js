Ext.define('antnex.ux.field.AntNumberfield', {
    extend: 'Ext.form.field.Number',
    alias: 'widget.antNumberfield',
    config: {
        toastObject: null,
    },

    cls: '',
    fieldLabel: '',
    labelWidth: 'auto',
    labelAlign: 'left',
    labelStyle: 'text-justify: distribute-all-lines;text-align-last: justify;',
    // labelStyle: 'text-align-last: right;',
    labelSeparator: ':',
    decimalPrecision: 0,
    hideTrigger: true,
    spinUpEnabled: false,
    spinDownEnabled: false,

    maxValue: null,
    minValue: null,
    tipMaxMin: true,

    listeners: {
        change: function (field, newValue, oldValue, eOpts) {
            let me = this;
            let doToast = function (msg) {
                if (me.tipMaxMin == false) return;
                let toastObject = me.getConfig('toastObject');
                if (toastObject) {
                    toastObject.setHidden(true);
                    toastObject.destroy();
                    me.setConfig('toastObject', null);
                }
                toastObject = Ext.toast({
                    html: msg,
                    align: 'b',
                    border: false,
                    style: 'border: 2px solid red; margin-top: -40px;',
                    autoCloseDelay: 1000
                });
                me.setConfig('toastObject', toastObject)
            }
            if (me.maxValue != null) {
                if (newValue > me.maxValue) {
                    me.setValue(me.maxValue);
                    let msg = `<span style="font-size:18px; vertical-align: middle;">最大值為: ${me.maxValue}</span>`;
                    doToast(msg)
                }
            }

            if (me.minValue != null) {
                if (newValue < me.minValue) {
                    me.setValue(me.minValue);
                    let msg = `<span style="font-size:24px; vertical-align: middle;">最小值為: ${me.minValue}</span>`;
                    doToast(msg)
                }
            }
        },
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
        me.updateClsByReadOnly(readOnlyCls);

        return enable;
    },
    // 取得格式化文字: undefined => emptyValue
    getFormatedValue: function (emptyValue) {
        let me = this;
        emptyValue = emptyValue ? emptyValue : 0;
        let value = me.getValue();
        return value ? value : emptyValue;
    },
    // enableField 專用
    updateClsByReadOnly: function (readOnly) {
        let me = this;

        let deleteCls = 'fieldNotInput fieldRequired'
        let disableCls = 'fieldNotInput';
        let enableCls = 'fieldRequired';

        let newCls = readOnly ? disableCls : enableCls;
        let setCls = me.cls.includes(newCls) ? newCls : '';

        me.removeCls(deleteCls);
        me.addCls(setCls)

        return readOnly;
    }

});