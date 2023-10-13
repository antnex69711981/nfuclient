Ext.define('antnex.ux.field.AntTimefield', {
    extend: 'Ext.form.field.Time',
    alias: 'widget.antTimefield',

    cls: '',
    fieldLabel: '',
    labelWidth: 'auto',
    labelAlign: 'left',
    labelStyle: 'text-justify: distribute-all-lines;text-align-last: justify;',
    // labelStyle: 'text-align-last: right;',
    labelSeparator: ':',
    readOnly: false,

    editable: false,
    minValue: '00:00',
    maxValue: '23:30',
    increment: 30,

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
    // 取得格式化文字
    getFormatedValue: function (format) {
        // https://docs.sencha.com/extjs/7.0.0/classic/Ext.Date.html
        let me = this;
        format = format ? format : me.format;
        if (format) {
            return Ext.Date.format(me.getValue(), format);
        } else {
            return '';
        }
    },

});