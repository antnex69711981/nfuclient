Ext.define('antnex.subsystem.41041127.user.user', {
    extend: 'Ext.panel.Panel',
    requires: [
        'antnex.subsystem.41041127.user.userController',
    ],
    alias: 'widget.page-41041127-user',
    controller: 'page-41041127-user',

    title: '徐韶毅的使用者管理',

    layout: {
        type: 'vbox', // vbox(垂直排列) , hbox(水平排列)
        align: 'stretch' // stretch(延展), center(置中)
    },

    listeners: {
        afterrender: 'onInitialize',
        activate: 'onActivate',
    },

    dockedItems: [{
        xtype: 'panel',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        dock: 'top',
        margin: 0,
        items: [
            {   // 功能列
                xtype: 'toolbar',
                layout: {
                    type: 'hbox',
                    align: 'stretch',
                },
                scrollable: true,
                border: false,
                padding: '0 0 0 5',
                items: [
                    {
                        xtype: 'button',
                        text: '查詢列',
                        reference: 'btn-page-41041127-user-funcbar-search',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-search',
                        margin: 3,
                        handler: 'funcbar_search',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '新增',
                        reference: 'btn-page-41041127-user-funcbar-add',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-plus',
                        margin: 3,
                        handler: 'funcbar_add',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '修改',
                        reference: 'btn-page-41041127-user-funcbar-edit',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-edit',
                        margin: 3,
                        handler: 'funcbar_edit',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '儲存',
                        reference: 'btn-page-41041127-user-funcbar-save',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-save',
                        margin: 3,
                        handler: 'funcbar_save',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '取消',
                        reference: 'btn-page-41041127-user-funcbar-cancel',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-times',
                        margin: 3,
                        handler: 'funcbar_cancel',
                    },
                ]
            },
            {   // 查詢列
                xtype: 'panel',
                reference: 'panel-page-41041127-user-searchbar',
                layout: {
                    type: 'hbox',
                    align: 'stretch',
                },
                defaults: {
                    margin: '0 0 5 5',
                },
                scrollable: true,
                items: [
                    {   // 查詢條件
                        xtype: 'fieldset',
                        title: '查詢條件',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults: {
                            labelWidth: 37,
                            margin: '0 0 8 5',
                        },
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: '學號',
                            reference: 'txt-page-41041127-user-searchbar-code',
                            emptyText: '請輸入學號',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            margin: '0 0 8 0',
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '姓名',
                            reference: 'txt-page-41041127-user-searchbar-name',
                            emptyText: '請輸入姓名',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '信箱',
                            reference: 'txt-page-41041127-user-searchbar-mail',
                            emptyText: '請輸入信箱',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        }, {
                            xtype: 'combobox',
                            fieldLabel: '狀態',
                            reference: 'cmbx-page-41041127-user-searchbar-status',

                            valueField: 'value',
                            displayField: 'text',
                            queryMode: 'local',
                            forceSelection: true,
                            anyMatch: true,
                            editable: false,
                            store: {},

                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        }]
                    },
                    {
                        xtype: 'button',
                        text: '查詢',
                        scale: 'small',
                        cls: 'antBtn-blue',
                        iconCls: 'fa fa-search',
                        width: 60,
                        border: false,
                        handler: 'doSearch',
                        margin: '10 0 5 5',
                    },
                    {
                        xtype: 'button',
                        text: '清除',
                        scale: 'small',
                        cls: 'antBtn-red',
                        iconCls: 'fa fa-times',
                        width: 60,
                        border: false,
                        handler: 'cleanSearch',
                        margin: '10 0 5 5',
                    },
                ]
            },
        ]
    }],

    scrollable: true,
    items: [
        {
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            margin: 5,
            minHeight: 200,
            flex: 1,
            scrollable: true,
            items: [
                {   // 使用者清單
                    xtype: 'gridpanel',
                    title: '使用者清單',
                    reference: 'grid-page-41041127-user-userlist',

                    viewConfig: {
                        enableTextSelection: true,
                    },
                    border: true,
                    store: {}, // 資料集
                    minWidth: 200,
                    flex: 1,
                    listeners: {
                        selectionchange: 'onSelectUser',
                    },
                    columns: [{
                        xtype: 'rownumberer',
                        align: 'center',
                        minwidth: 100,
                    }, {
                        dataIndex: 'code',
                        text: '學號',
                        minwidth: 100,
                    }, {
                        dataIndex: 'name',
                        text: '姓名',
                        minwidth: 100,
                    }, {
                        dataIndex: 'mail',
                        text: '信箱',
                        minwidth: 100,
                        flex: 1,
                    }, {
                        dataIndex: 'memo',
                        text: '備註',
                        minwidth: 100,
                    }, {
                        dataIndex: 'status',
                        text: '狀態',
                        minwidth: 100,
                        renderer: function (value) {
                            let store = Ext.create('antnex.store.static.Status');
                            let record = store.getRange().find(e => e.get('value') == value);
                            return record ? record.get('text') : `無法辨識: ${value}`;
                        },
                    }]
                },
                { xtype: 'splitter', margin: -1.5 },
                {   // 資料維護
                    xtype: 'panel',
                    title: '資料維護',
                    reference: 'panel-page-41041127-user-manage',
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                    },
                    
                    defaults: {
                        margin: '0 1 1 1', // '上 右 下 左'
                    },
                    border: true,
                    items: [
                        {   // 基本資料
                            xtype: 'fieldset',
                            title: '基本資料',
                            layout: {
                                type: 'vbox',
                                align: 'stretch',
                            },
                            defaults: {
                                margin: '0 0 8 0',
                            },
                            items: [{
                                xtype: 'numberfield',
                                fieldLabel: 'ids',
                                reference: 'num-page-41041127-user-ids',
                                labelWidth: 37,
                                width:300,
                                cls: 'fieldNotInput',
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '學號',
                                reference: 'txt-page-41041127-user-code',
                                labelWidth: 37,
                                width:300,
                                cls: 'fieldRequired',
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '姓名',
                                reference: 'txt-page-41041127-user-name',
                                labelWidth: 37,
                                width:300,
                                cls: 'fieldRequired',
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '信箱',
                                reference: 'txt-page-41041127-user-mail',
                                labelWidth: 37,
                                width:300,
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '密碼',
                                reference: 'txt-page-41041127-user-password',
                                labelWidth: 37,
                                width:300,
                                inputType: 'password',
                                cls: 'fieldRequired',
                            }, {
                                xtype: 'combobox',
                                fieldLabel: '狀態',
                                reference: 'cmbx-page-41041127-user-status',
                                labelWidth: 37,
                                width:300,
                                cls: 'fieldRequired',

                                valueField: 'value',
                                displayField: 'text',
                                queryMode: 'local',
                                forceSelection: true,
                                anyMatch: true,
                                editable: false,
                                store: { type: 'status' },
                            }, {
                                xtype: 'textarea',
                                fieldLabel: '備註',
                                reference: 'txt-page-41041127-user-memo',
                                labelWidth: 37,
                                width:300,
                            }]
                        },
                    ]
                }
            ]
        },
    ]
});
