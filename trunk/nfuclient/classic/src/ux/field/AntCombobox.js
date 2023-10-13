Ext.define('antnex.ux.field.AntCombobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.antCombobox',

    cls: '',
    fieldLabel: '',
    labelWidth: 'auto',
    labelAlign: 'left',
    labelStyle: 'text-justify: distribute-all-lines;text-align-last: justify;',
    // labelStyle: 'text-align-last: right;',
    labelSeparator: ':',
    readOnly: false,

    valueField: 'value',
    displayField: 'text',
    queryMode: 'local',
    forceSelection: true,
    anyMatch: true,
    editable: false,
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

            me.doChangeFieldStyle();
            me.hideSensitiveData();
        },
        change: function () {
            this.doChangeFieldStyle();
        },
        focus: function () {
            let me = this;
            let readOnly = me.readOnly ? true : false;
            if (readOnly == false) {
                let isCell = me.up('celleditor') ? true : false;
                let editable = me.editable;
                if (isCell || editable) {
                    setTimeout(() => {
                        if (me.isExpanded == false) me.expand();
                    }, isCell ? 0 : 200);
                }
            }
        }
    },

    // function: 修正gridCell第一次展開資料值為空的處理方法
    setCellValue: function (gridType = 'antGridpanel') {
        let me = this;
        let isCell = me.up('celleditor') ? true : false;
        if (isCell) {
            let grid = me.up(gridType);
            if (grid) {
                let record = grid.getSelection()[0];
                if (record) {
                    let dataIndex = me.dataIndex;
                    let value = record.get(dataIndex);
                    me.setValue(value);
                }
            }
        }
    },

    // 套用record中的color到選項上
    doChangeFieldStyle: function () {
        let record = this.getSelection();
        if (record) {
            let color = record.get('color');
            if (color) {
                this.setFieldStyle({ color: color });
            } else {
                this.setFieldStyle({ color: 'black' });
            }
        }
    },

    // 在第一筆插入資料
    insertValueAtFirst: function (text = '全部', value = - 1) {
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

        if (enable == true) {
            let selection = me.getSelection();
            let isSensitive = me.isSensitive(selection);
            if (isSensitive) {
                me.enableField(false);
                console.log(`Data '${me.getFormatedValue()}' is sensitive.`)
            }
        }

        me.hideSensitiveData();

        return enable;
    },
    // 取得格式化文字: undefined => emptyValue
    getFormatedValue: function (emptyValue) {
        let me = this;
        emptyValue = S(emptyValue).isEmpty() == false ? emptyValue : '';
        let value = me.getValue();
        return S(value).isEmpty() == false ? value : emptyValue;
    },
    // 取得格式化顯示文字: undefined => emptyValue
    getFormatedDisplayValue: function (emptyValue) {
        let me = this;
        emptyValue = S(emptyValue).isEmpty() == false ? emptyValue : '';
        let value = me.getDisplayValue();
        return S(value).isEmpty() == false ? value : emptyValue;
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