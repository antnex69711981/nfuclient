Ext.define('antnex.ux.field.AntFieldsList', {
    extend: 'antnex.ux.layout.AntTransPanel',
    alias: 'widget.antFieldsList',
    config: {
        privateValue: null,
        fieldsConfig: null,
        enabled: null,
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    fieldsConfig: {},

    listeners: {
        afterrender: function () {
            let me = this;
            let fieldsConfig = me.fieldsConfig;
            if (fieldsConfig) me.setConfig('fieldsConfig', fieldsConfig);
        }
    },

    // event: config('fieldsConfig')變更時
    updateFieldsConfig: function (newValue, oldValue) {
        if (newValue) {
            let me = this

            newValue.fieldLabel = me.fieldLabel;
            me.fieldsConfig = newValue;
            me.setConfig('fieldsConfig', newValue);
            me.buildFields();
        }
    },

    // function: 產生輸入欄位
    buildFields: function () {
        let me = this;

        let fieldsConfig = {
            fieldCount: 0, // 欄位數量
            xtype: 'antTextfield', // 欄位類型
            fieldLabel: '',
            margin: '0 0 5 0',
            labelAlign: 'top',
            labelStyle: '',
            labelSeparator: '',
            cls: 'antVerticalText',
        };

        // 將 fieldsConfig 帶入設定值
        let obj = me.getConfig('fieldsConfig');
        if (obj) {
            for (let key in obj) {
                switch (key) {
                    case 'fieldCount': // 需為有效數值
                        if (parseInt(obj[key]) > 0) {
                            fieldsConfig[key] = obj[key]
                        }
                        break;
                    case 'xtype': // 需為有效物件
                        if (Ext.ClassManager.getByAlias(`widget.${obj[key]}`)) {
                            fieldsConfig[key] = obj[key]
                        }
                        break;
                    default:
                        fieldsConfig[key] = obj[key];
                        break;
                }
            }
        }

        // 製作物件
        let makeField = function (idx) {
            let obj = {};
            for (let key in fieldsConfig) obj[key] = fieldsConfig[key];

            let xtype = fieldsConfig.xtype;
            let fieldLabel = idx == 0 ? fieldsConfig.fieldLabel : null
            let emptyText = obj.emptyText ? obj.emptyText : fieldsConfig.fieldLabel;

            obj.xtype = xtype;
            obj.fieldLabel = fieldLabel;
            obj.emptyText = `${emptyText} (${idx + 1})`;
            if (fieldsConfig.fieldCount == 1) obj.emptyText = me.emptyText;
            return obj;
        }

        // 暫存資料值
        let value = me.getValue();
        me.setValue('');

        // 移除舊物件
        me.removeAll();

        // 產生物件
        for (let i = 0; i < fieldsConfig.fieldCount; i++) {
            let obj = makeField(i);
            me.add(obj);
        }

        // 套用資料值
        me.setValue(value);
        me.enableField(me.getConfig('enabled'));

    },

    // function: 設定value
    updatePrivateValue: function (newValue, oldValue) {
        let me = this;
        let valuelist = `${newValue}`.split(',');
        let items = me.items.items;
        items.forEach((field, idx) => {
            let value = valuelist[idx];
            if (typeof field.setValue == 'function') field.setValue(value ? value : '');
        });
    },

    // function: 取得value
    setValue: function (value) {
        let me = this;
        me.setConfig('privateValue', value);
        return me;
    },

    // function: 取得value
    getValue: function () {
        let me = this;
        let valuelist = [];
        let items = me.items.items;
        items.forEach(field => {
            let value = field.getValue();
            valuelist.push(value);
        });
        return valuelist.toString();
    },

    // function: 取得格式化資料
    getFormatedValue: function (emptyValue) {
        let me = this;
        emptyValue = S(emptyValue).isEmpty() == false ? emptyValue : '';

        let valuelist = [];
        let items = me.items.items;
        items.forEach(field => {
            let value = '';
            if (typeof field.getFormatedValue == 'function') value = field.getFormatedValue(emptyValue);
            else if (typeof field.getValue == 'function') value = field.getValue();
            valuelist.push(S(value).isEmpty() ? emptyValue : value);
        });
        return valuelist.toString();
    },

    // enable: true / false
    enableField: function (enable) {
        let me = this;
        me.setConfig('enabled', enable);

        let items = me.items.items;
        items.forEach(field => {
            if (typeof field.enableField == 'function') field.enableField(enable);
            else if (typeof field.setReadOnly == 'function') field.setReadOnly(!enable);
            else if (typeof field.setDisabled == 'function') field.setDisabled(!enable);
            else if (typeof field.setHidden == 'function') field.setHidden(!enable);
        });

        return enable;
    }

});