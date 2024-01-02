Ext.define('antnex.view.system.window.modifyinfo.ModifyInfo', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.view.system.window.modifyinfo.ModifyInfoController',
    ],
    alias: 'widget.modifyinfo',
    controller: 'modifyinfo',

    title: '異動資訊',
    reference: 'view_antnex_window_modifyinfo',
    header: false,

    items: [
        {   // 異動資訊
            xtype: 'antFieldset',
            title: '異動資訊',
            reference: 'fs_modifyinfo_info',
            layout: {
                type: 'vbox',
                align: 'stretch',
            },
            flex: 1,
            margin: 5,
            defaults: {
                labelWidth: 65,
                margin: '0 0 5 0',
                readOnly: true,
                hidden: true,
                cls: 'fieldNotInput',
            },
            items: [{
                xtype: 'antCombobox',
                fieldLabel: '建立人員',
                reference: 'cmbx_modifyinfo_createusercode',
                valueField: 'code',
                displayField: 'name',
            }, {
                xtype: 'antCombobox',
                fieldLabel: '建立門市',
                reference: 'cmbx_modifyinfo_createbranchcode',
                valueField: 'code',
                displayField: 'name',
            }, {
                xtype: 'antTextfield',
                fieldLabel: '建立時間',
                reference: 'txt_modifyinfo_createtm',
            }, {
                xtype: 'antCombobox',
                fieldLabel: '異動人員',
                reference: 'cmbx_modifyinfo_modifyusercode',
                valueField: 'code',
                displayField: 'name',
            }, {
                xtype: 'antCombobox',
                fieldLabel: '異動門市',
                reference: 'cmbx_modifyinfo_modifybranchcode',
                valueField: 'code',
                displayField: 'name',
            }, {
                xtype: 'antTextfield',
                fieldLabel: '異動時間',
                reference: 'txt_modifyinfo_modifytm',
            }, {
                xtype: 'antCombobox',
                fieldLabel: '核准人員',
                reference: 'cmbx_modifyinfo_approvedusercode',
                valueField: 'code',
                displayField: 'name',
            }, {
                xtype: 'antCombobox',
                fieldLabel: '核准門市',
                reference: 'cmbx_modifyinfo_approvedbranchcode',
                valueField: 'code',
                displayField: 'name',
            }, {
                xtype: 'antTextfield',
                fieldLabel: '核准時間',
                reference: 'txt_modifyinfo_approvedtm',
            }, {
                xtype: 'antCombobox',
                fieldLabel: '作廢人員',
                reference: 'cmbx_modifyinfo_dropusercode',
                valueField: 'code',
                displayField: 'name',
            }, {
                xtype: 'antCombobox',
                fieldLabel: '作廢門市',
                reference: 'cmbx_modifyinfo_dropbranchcode',
                valueField: 'code',
                displayField: 'name',
            }, {
                xtype: 'antTextfield',
                fieldLabel: '作廢時間',
                reference: 'txt_modifyinfo_droptm',
            }]
        },
    ]
});
