Ext.define('antnex.ux.field.AntFilefield', {
    extend: 'Ext.form.field.File',
    alias: 'widget.antFilefield',

    cls: '',
    fieldLabel: '',
    labelWidth: 'auto',
    labelAlign: 'left',
    labelStyle: 'text-justify: distribute-all-lines;text-align-last: justify;',
    // labelStyle: 'text-align-last: right;',
    labelSeparator: ':',
    readOnly: false,
    buttonText: '上傳',
    buttonConfig: {
        iconCls: 'fas fa-file-upload',
        cls: 'antBtn-add',
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

    // function:取得檔案
    getFile: function () {
        let me = this;
        let file = me.getEl().down('input[type=file]').dom.files[0];
        return file
    },

});