Ext.define('antnex.ux.field.AntTagfield', {
    extend: 'Ext.form.field.Tag',
    alias: 'widget.antTagfield',

    cls: '',
    fieldLabel: '',
    labelWidth: 'auto',
    labelAlign: 'left',
    labelStyle: 'text-justify: distribute-all-lines;text-align-last: justify;',
    // labelStyle: 'text-align-last: right;',
    labelSeparator: ':',
    readOnly: false,

    multiSelect: true,
    filterPickList: true,

    valueField: 'value',
    displayField: 'text',
    queryMode: 'local',
    forceSelection: true,
    anyMatch: true,
    store: {},

    // 隱藏資料, 僅顯示用
    sensitiveKey: null,
    sensitiveData: [],
    setSensitiveKey: function (sensitiveKey = '') {
        let me = this;
        me.sensitiveKey = sensitiveKey;
        me.hideSensitiveData();
    },
    setSensitiveData: function (sensitiveData = []) {
        let me = this;
        me.sensitiveData = sensitiveData;
        me.hideSensitiveData();
    },
    hideSensitiveData: function () {
        let me = this;

        let readOnly = me.readOnly;
        me.getStore().clearFilter();
        me.getStore().filter(e => {
            // readOnly時, 全部顯示
            if (readOnly) return true;

            return me.isSensitive(e) ? false : true;
        })
    },
    isSensitive: function (record) {
        let me = this;
        if (record == null) return false;

        // 若資料內容包含 sensitive且為true時, 隱藏
        if (record.get('sensitive') === true) return true;

        // sensitiveData包含目前的資料值時, 隱藏
        let sensitiveKey = me.sensitiveKey;
        let sensitiveData = me.sensitiveData;
        return sensitiveData.includes(record.get(sensitiveKey)) ? true : false;
    },

    listeners: {
        afterrender: function () {
            let me = this;
            me.sensitiveKey = S(me.sensitiveKey).isEmpty() ? me.valueField : me.sensitiveKey;
            me.hideSensitiveData();
        },
    },

    // 在第一筆插入資料
    insertValueAtFirst: function (text = '全部', value = -1) {
        let data = this.getStore().getRange().map(e => e.getData());
        let obj = {}
        obj[this.valueField] = value;
        obj[this.displayField] = text;
        this.getStore().loadData([obj].concat(data));
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
        me.hideSensitiveData();

        return enable;
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