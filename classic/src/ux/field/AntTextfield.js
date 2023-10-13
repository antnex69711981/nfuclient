Ext.define('antnex.ux.field.AntTextfield', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.antTextfield',

    config: {
        maskLock: false, // 狀態暫存
        maskedValue: '', // 原始資料
    },

    cls: '',
    fieldLabel: '',
    labelWidth: 'auto',
    labelAlign: 'left',
    labelStyle: 'text-justify: distribute-all-lines;text-align-last: justify;',
    // labelStyle: 'text-align-last: right;',
    labelSeparator: ':',
    readOnly: false,

    renderer: null,

    listeners: {
        afterrender: function () {
            let me = this;

            // renderer處理
            let initRenderer = function () {
                let changeFn = function (field, newValue, oldValue, eOpts) {
                    me.setConfig('maskedValue', newValue)
                };

                let renderFn
                switch (typeof me.renderer) {
                    case 'string':
                        let controller = ConvertTK.findController(me);
                        if (controller && typeof controller[me.renderer] == 'function') {
                            renderFn = function (value) {
                                return controller[me.renderer](value)
                            };
                        }
                        break;
                    case 'function':
                        renderFn = function (value) {
                            return me.renderer(value)
                        };
                        break;
                }
                if (renderFn) {
                    changeFn = function (field, newValue, oldValue, eOpts) {
                        if (me.getConfig('maskLock') == false) {
                            me.setConfig('maskedValue', newValue)
                        }

                        if (me.readOnly) {
                            me.setConfig('maskLock', true);
                            let maskedValue = me.getConfig('maskedValue');
                            let value = renderFn(maskedValue);
                            me.setValue(value);
                            me.setConfig('maskLock', false);
                        }
                    };

                    me.addListener('onEnableField', (field, editable) => {
                        let maskedValue = me.getConfig('maskedValue');
                        me.setValue('');
                        me.setValue(maskedValue);
                    })
                }

                me.addListener('change', changeFn);
            }
            initRenderer();
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

        // 觸發事件: field, editable(true/fasle)
        me.fireEvent('onEnableField', me, readOnly == false);

        return enable;
    },
    // 取得格式化文字: undefined => emptyValue
    getFormatedValue: function (emptyValue) {
        let me = this;
        emptyValue = emptyValue ? emptyValue : '';
        let value = me.getConfig('maskedValue');

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
    },
});