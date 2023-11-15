Ext.define('antnex.subsystem.11261133.user.user', 
    {
        extend: 'Ext.panel.Panel',
        requires: [
            'antnex.subsystem.11261133.user.userController',
        ],
        alias: 'widget.page-11261133-user',
        controller: 'page-11261133-user',

        title: '11261133的首頁',

         layout: {
            type: 'vbox',
            align: 'stretch'
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
                            reference: 'btn-11261133-user-funcbar-search',
                            cls: 'funcbarBtn-black',
                            iconCls: 'fa fa-search',
                            margin: 3,
                            handler: 'funcbar_search',
                        },
                        { xtype: 'tbseparator', margin: '8 1' },
                        {
                            xtype: 'button',
                            text: '新增',
                            reference: 'btn-11261133-user-funcbar-add',
                            cls: 'funcbarBtn-black',
                            iconCls: 'fa fa-plus',
                            margin: 3,
                            handler: 'funcbar_add',
                        },
                        { xtype: 'tbseparator', margin: '8 1' },
                        {
                            xtype: 'button',
                            text: '修改',
                            reference: 'btn-11261133-user-funcbar-edit',
                            cls: 'funcbarBtn-black',
                            iconCls: 'fa fa-edit',
                            margin: 3,
                            handler: 'funcbar_edit',
                        },
                        { xtype: 'tbseparator', margin: '8 1' },
                        {
                            xtype: 'button',
                            text: '儲存',
                            reference: 'btn-11261133-user-funcbar-save',
                            cls: 'funcbarBtn-black',
                            iconCls: 'fa fa-save',
                            margin: 3,
                            handler: 'funcbar_save',
                        },
                        { xtype: 'tbseparator', margin: '8 1' },
                        {
                            xtype: 'button',
                            text: '取消',
                            reference: 'btn-11261133-user-funcbar-cancel',
                            cls: 'funcbarBtn-black',
                            iconCls: 'fa fa-times',
                            margin: 3,
                            handler: 'funcbar_cancel',
                        },
                    ]
                },
                {   // 查詢列
                    xtype: 'panel',
                    reference: 'panel-11261133-user-searchbar',
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
                                reference: 'txt-11261133-user-searchbar-code',
                                emptyText: '請輸入學號',
                                enableKeyEvents: true,
                                listeners: {
                                    keypress: 'enterSearch'
                                },
                                margin: '0 0 8 0',
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '姓名',
                                reference: 'txt-11261133-user-searchbar-name',
                                emptyText: '請輸入姓名',
                                enableKeyEvents: true,
                                listeners: {
                                    keypress: 'enterSearch'
                                },
                            }, {
                                xtype: 'combobox',
                                fieldLabel: '狀態',
                                reference: 'cmbx-11261133-user-searchbar-status',
    
                                valueField: 'value',
                                displayField: 'text',
                                queryMode: 'local',
                                forceSelection: true,
                                anyMatch: true,
                                editable: true,
                                store: { type: 'status' },
    
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
        items: [{
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            margin: 5,
            minHeight: 2000,
            flex: 1,
            scrollable: true,
            items: [
                {   // 使用者清單
                    xtype: 'gridpanel',
                    title: '使用者清單',
                    reference: 'grid-11261133-user-userlist',
                    viewConfig: {
                        enableTextSelection: true,
                    },
                    border: true,
                    store: {},
                    minWidth: 200,
                    flex: 1,
                    listeners: {
                        selectionchange: 'onSelectUser',
                    },
                    columns: [{
                        xtype: 'rownumberer',
                        align: 'center',
                        width: 50,
                    }, {
                        dataIndex: 'code',
                        text: '學號',
                        width: 110,
                    }, {
                        dataIndex: 'name',
                        text: '姓名',
                        width: 110,
                    }, {
                        dataIndex: 'mail',
                        text: '信箱',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'status',
                        text: '狀態',
                        width: 96,
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
                    reference: 'panel-11261133-user-manage',
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                    },
                    flex: 2,
                    defaults: {
                        margin: '0 5 5 5',
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
                                xtype: 'textfield',
                                fieldLabel: '學號',
                                reference: 'txt-11261133-user-code',
                                labelWidth: 37,
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '姓名',
                                reference: 'txt-11261133-user-name',
                                labelWidth: 37,
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '信箱',
                                reference: 'txt-11261133-user-mail',
                                labelWidth: 37,
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '備註',
                                reference: 'txt-11261133-user-memo',
                                labelWidth: 37,
                            }, {
                                xtype: 'combobox',
                                fieldLabel: '狀態',
                                reference: 'txt-11261133-user-status',
                                forceSelection: true,
                                anyMatch: true,
                                editable: true,
                                store: { type: 'status' },
                                labelWidth: 37,
                                
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '建立人員',
                                reference: 'txt-11261133-user-createusercode',
                                labelWidth: 37,
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '建立時間',
                                reference: 'txt-11261133-user-createtm',
                                labelWidth: 37,
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '異動人員',
                                reference: 'txt-11261133-user-modifyusercode',
                                labelWidth: 37,
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '異動時間',
                                reference: 'txt-11261133-user-modifytm',
                                labelWidth: 37,
                            }]
                        }
                    ]
                }
            ]
        }]
    });
    