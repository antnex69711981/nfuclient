Ext.define('antnex.ux.field.AntCombobox', {
    extend: 'Ext.field.ComboBox',
    alias: 'widget.antCombobox',

    cls: '',
    fieldLabel: '',
    labelWidth: 'auto',
    labelStyle: 'text-justify: distribute-all-lines;text-align-last: justify;',

    valueField: 'value',
    displayField: 'text',
    queryMode: 'local',
    forceSelection: true,
    anyMatch: true,
    editable: false,
    store: {},

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
        me.updateClsByReadOnly(readOnlyCls);

        return enable;
    },

    getFormatedValue: function (emptyValue) {
        var me = this;
        emptyValue = S(emptyValue).isEmpty() ? '' : emptyValue;
        var value = me.getValue();
        return S(value).isEmpty() ? emptyValue : value;
    },

    getFormatedDisplayValue: function (emptyValue) {
        var me = this;
        emptyValue = S(emptyValue).isEmpty() ? '' : emptyValue;
        var value = me.getDisplayValue();
        return S(value).isEmpty() ? emptyValue : value;
    },

    updateClsByReadOnly: function (readOnly) {
        var me = this;

        var deleteCls = 'fieldNotInput fieldRequired'
        var disableCls = 'fieldNotInput';
        var enableCls = 'fieldRequired';

        var newCls = readOnly ? disableCls : enableCls;
        var setCls = me.cls.includes(newCls) ? newCls : '';

        me.removeCls(deleteCls);
        me.addCls(setCls)

        return readOnly;
    }

});