Ext.define('antnex.ux.field.AntCheckbox', {
    extend: 'Ext.form.field.Checkbox',
    alias: 'widget.antCheckbox',

    boxLabel: '',
    checked: false,

    // enable: true / false
    enableField: function (enable) {
        let me = this;
        let readOnly = enable === false;

        me.setReadOnly(readOnly);

        return enable;
    },
});