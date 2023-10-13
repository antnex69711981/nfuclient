Ext.define('antnex.ux.field.AntDatefield', {
    extend: 'Ext.field.Date',
    alias: 'widget.antDatefield',

    cls: '',
    fieldLabel: '',
    labelWidth: 'auto',
    labelStyle: 'text-justify: distribute-all-lines;text-align-last: justify;',
    readOnly: false,
    format: 'Y-m-d', // Y-m-d H:i:s

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

    getFormatedValue: function (format) {
        var me = this;
        if (format) {
            return Ext.Date.format(me.getValue(), format);
        } else {
            return Ext.Date.format(me.getValue(), me.format);
        }
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