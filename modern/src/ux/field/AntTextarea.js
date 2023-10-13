Ext.define('antnex.ux.field.AntTextarea', {
    extend: 'Ext.field.TextArea',
    alias: 'widget.antTextarea',

    cls: '',
    fieldLabel: '',
    labelWidth: 'auto',
    labelStyle: 'text-justify: distribute-all-lines;text-align-last: justify;',
    readOnly: false,

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