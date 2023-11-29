Ext.define('antnex.subsystem.41041116.user.user', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.subsystem.41041116.user.userController',
    ],
    alias: 'widget.page-41041116-user',
    controller: 'page-41041116-user',

    title: '使用者管理2',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    dockedItems: [{
        xtype: 'funcbarContainer',
        dock: 'top',
        items: [
            {   // 功能列
                xtype: 'funcbarLayout',
                items: [
                    {
                        xtype: 'funcbarButton',
                        text: '查詢列(F10)',
                        reference: 'btn-41041116-funcbar-search',
                        iconCls: 'fa fa-search',
                        handler: 'funcbar_search',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '新增(F2)',
                        reference: 'btn-41041116-funcbar-add',
                        iconCls: 'fa fa-plus',
                        handler: 'funcbar_add',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '修改(F4)',
                        reference: 'btn-41041116-funcbar-edit',
                        iconCls: 'fa fa-edit',
                        handler: 'funcbar_edit',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '刪除(F6)',
                        reference: 'btn-41041116-funcbar-delete',
                        iconCls: 'fas fa-trash-alt fa-spin',
                        handler: 'funcbar_delete',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '儲存(F8)',
                        reference: 'btn-41041116-funcbar-save',
                        iconCls: 'fa fa-save',
                        handler: 'funcbar_save'
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '取消(F9)',
                        reference: 'btn-41041116-funcbar-cancel',
                        iconCls: 'fa fa-times',
                        handler: 'funcbar_cancel'
                    },
                ]
            },
            {   // 查詢列
                xtype: 'searchbarLayout',
                reference: 'panel-41041116-searchbar',
                items: [
                    {   // 查詢條件
                        xtype: 'antFieldset',
                        title: '查詢條件',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults: {
                            labelWidth: 37,
                            margin: '0 0 5 5',
                        },
                        items: [{
                            xtype: 'antTextfield',
                            fieldLabel: '學號',
                            reference: 'txt-41041116-searchbar-code',
                            emptyText: '請輸入學號',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            margin: '0 0 5 0',
                        }, {
                            xtype: 'antTextfield',
                            fieldLabel: '姓名',
                            reference: 'txt-41041116-searchbar-name',
                            emptyText: '請輸入姓名',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            }
                        },{
                            xtype: 'antTextfield',
                            fieldLabel: '信箱',
                            reference: 'txt-41041116-searchbar-mail',
                            emptyText: '請輸入信箱',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            }
                        }, {
                            xtype: 'antCombobox',
                            fieldLabel: '狀態',
                            reference: 'cmbx-41041116-searchbar-status',
                            editable: true,
                            store: { type: 'status' },
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            }
                        },]
                    },
                    { // 查詢按鈕
                        xtype: 'searchButton-search',
                        margin: '10 0 5 5',
                        handler: 'doSearch',
                    },
                    { // 清除按鈕
                        xtype: 'searchButton-clean',
                        margin: '10 0 5 5',
                        handler: 'cleanSearch',
                    }
                ]
            },
        ]
    }],

    items: [{
        xtype: 'antTransPanel',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        margin: '5 5 5 0',
        minHeight: 200,
        flex: 1,
        items: [
            {   // 使用者清單
                xtype: 'antGridpanel',
                title: '使用者清單',
                reference: 'grid-41041116-userlist',
                minWidth: 800,
                flex: 1,
                listeners: {
                    selectionchange: 'onSelectUser',
                },
                columns: [{
                    xtype: 'antColumn-rownumberer'
                }, {
                    xtype: 'antColumn',
                    dataIndex: 'code',
                    text: '學號',
                    width: 110,
                }, {
                    xtype: 'antColumn',
                    dataIndex: 'name',
                    text: '姓名',
                    width: 110,
                }, {
                    xtype: 'antColumn',
                    dataIndex: 'mail',
                    text: '信箱',
                    minWidth: 96,
                    flex: 1,
                }, {
                    xtype: 'antColumn',
                    dataIndex: 'status',
                    text: '狀態',
                    width: 96,
                    renderer: ConvertTK.format.storeRenderer('antnex.store.static.Status')
                },{
                    xtype: 'antColumn',
                    dataIndex: 'memo',
                    text: '備註',
                    minWidth: 96,
                    flex: 1,
                },]
            },
            { xtype: 'splitter', margin: -1.5 },
            {   // 資料維護
                xtype: 'antPanel',
                title: '資料維護',
                reference: 'panel-41041116-manage',
                flex: 2,
                width:100,
                defaults: {
                    margin: '0 5 5 5',
                },
                items: [
                    {   // 基本資料
                        xtype: 'antFieldset',
                        title: '基本資料',
                        defaults: {
                            margin: '0 0 5 0',
                        },
                        items: [{
                            xtype: 'antTextfield',
                            fieldLabel: '學號',
                            reference: 'txt-41041116-code',
                            labelWidth: 37,
                        }, {
                            xtype: 'antTextfield',
                            fieldLabel: '姓名',
                            reference: 'txt-41041116-name',
                            labelWidth: 37,
                        }],

                        items: [{
                            xtype: 'antNumberfield',
                            fieldLabel: 'ids',
                            reference: 'num-41041116-ids',
                            labelWidth: 37,
                            cls: 'fieldNotInput',
                        }, {
                            xtype: 'antTextfield',
                            fieldLabel: '學號',
                            reference: 'txt-41041116-code',
                            labelWidth: 37,
                            cls: 'fieldRequired',
                        }, {
                            xtype: 'antTextfield',
                            fieldLabel: '姓名',
                            reference: 'txt-41041116-name',
                            labelWidth: 37,
                            cls: 'fieldRequired',
                        }, {
                            xtype: 'antTextfield',
                            fieldLabel: '信箱',
                            reference: 'txt-41041116-mail',
                            labelWidth: 37,
                        }, {
                            xtype: 'antTextfield',
                            fieldLabel: '密碼',
                            reference: 'txt-41041116-password',
                            labelWidth: 37,
                            inputType: 'password',
                            cls: 'fieldRequired',
                        }, {
                            xtype: 'antCombobox',
                            fieldLabel: '狀態',
                            reference: 'cmbx-41041116-status',
                            labelWidth: 37,
                            store: { type: 'status' },
                            cls: 'fieldRequired',
                        }, {
                            xtype: 'antTextarea',
                            fieldLabel: '備註',
                            reference: 'txt-41041116-memo',
                            labelWidth: 37,
                        }]
                    }
                ]
            }
        ]
    }]
});