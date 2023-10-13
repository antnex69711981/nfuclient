Ext.define('antnex.ux.layout.AntFieldset', {
    extend: 'Ext.form.FieldSet',
    alias: 'widget.antFieldset',

    title: '',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    style: 'background: white',
    padding: '0 9 3 9', // 配合目前TextField上下間距為5而將底給3 Fieldset內底總和8

    checkboxToggle: false,
    collapsed: false,
});