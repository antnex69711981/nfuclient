Ext.define('antnex.subsystem.sample.41041124.user.user', {
    extend: 'Ext.panel.Panel',
    requires: [
        'antnex.subsystem.sample.41041124.user.userController',
    ],
    alias: 'widget.page-41041124-user',
    controller: 'page-41041124-user',

    title: '41041124-管理',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    //監聽動作-初始化、切換頁面
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
            {   // 查詢列
                xtype: 'panel',
                reference: 'panel-41041124-user-searchbar',
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
                            width: 150,
                            margin: '0 0 8 5',
                        },
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: '學號',
                            reference: 'txt-41041124-user-searchbar-code',
                            emptyText: '請輸入學號',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            margin: '0 0 8 0',
                        } ,{
                            xtype: 'textfield',
                            fieldLabel: '姓名',
                            reference: 'txt-41041124-user-searchbar-name',
                            emptyText: '請輸入姓名',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '信箱',
                            reference: 'txt-41041124-user-searchbar-mail',
                            emptyText: '請輸入信箱',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            margin: '0 0 8 0',
                        },{
                            xtype: 'textfield',
                            fieldLabel: '備註',
                            reference: 'txt-41041124-user-searchbar-memo',
                            emptyText: '請輸入備註',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            margin: '0 0 8 0',
                        },{
                            xtype: 'combobox',
                            fieldLabel: '狀態',
                            reference: 'cmbx-41041124-user-searchbar-status',
                            width: 120,
                            valueField: 'value',
                            displayField: 'text',
                            queryMode: 'local',
                            forceSelection: true,
                            anyMatch: true,
                            editable: false,
                            store: { type: 'status' },
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        },{
                            xtype: 'textfield',
                            fieldLabel: '建立人員',
                            reference: 'txt-41041124-user-searchbar-createusercode',
                            emptyText: '請輸入建立人員',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            labelWidth: 65,
                            
                            margin: '0 0 8 0',
                        },{
                            xtype: 'datefield',
                            anchor: '100%',
                            fieldLabel: '建立時間',
                            name: 'date',
                            format: 'Y,m,d',
                            altFormats: 'm,d,Y|m.d.Y',
                            value: '選擇日期',
                            enableKeyEvents: true,
                            width: 200,
                            reference: 'txt-41041124-user-searchbar-createtm',
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            labelWidth: 65,
                            margin: '0 0 8 0',
                            
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
            },{   // 功能列
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
                        reference: 'btn-41041124-user-funcbar-search',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-search',
                        margin: 3,
                        handler: 'funcbar_search',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '新增(F2)',
                        reference: 'btn-41041124-user-funcbar-add',
                        iconCls: 'fa fa-plus',
                        handler: 'funcbar_add',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '修改',
                        reference: 'btn-41041124-user-funcbar-edit',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-edit',
                        margin: 3,
                        handler: 'funcbar_edit',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '儲存',
                        reference: 'btn-41041124-user-funcbar-save',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-save',
                        margin: 3,
                        handler: 'funcbar_save',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '取消',
                        reference: 'btn-41041124-user-funcbar-cancel',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-times',
                        margin: 3,
                        handler: 'funcbar_cancel',
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
        flex: 2,
        margin: 5,
        minHeight: 2000,
        scrollable: true,
        items: [
            {   // 使用者清單
                xtype: 'gridpanel',
                title: '使用者清單',
                reference: 'grid-41041124-user-userlist',
                bufferedRenderer: false,
                runInViewport: false,
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
                    Width: 96,
                }, {
                    dataIndex: 'memo',
                    text: '備註',
                    Width: 96,
                }, {
                    dataIndex: 'status',
                    text: '狀態',
                    width: 96, 
                    renderer: ConvertTK.format.storeRenderer('antnex.store.static.Status')
                }, {
                    dataIndex: 'createusercode',
                    text: '建立人員',
                    Width: 80,
                }, {
                    dataIndex: 'createtm',
                    text: '建立時間',
                    Width: 96,
                }, {
                    dataIndex: 'modifyusercode',
                    text: '異動人員',
                    Width: 80,
                }, {
                    dataIndex: 'modifytm',
                    text: '異動時間',
                    Width: 96,
                }]
            },
            { xtype: 'splitter', style :"left: 600px" },
            {   // 資料維護
                xtype: 'panel',
                title: '資料維護',
                reference: 'panel-41041124-user-manage',
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                },

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
                            reference: 'txt-41041124-user-code',
                            labelWidth: 37,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '姓名',
                            reference: 'txt-41041124-user-name',
                            labelWidth: 37,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '信箱',
                            reference: 'txt-41041124-user-mail',
                            labelWidth: 37,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '備註',
                            reference: 'txt-41041124-user-memo',
                            labelWidth: 37,
                        }, {
                            xtype: 'combo',
                            fieldLabel: '狀態',
                            allowBlank:false,
                            valueField: 'value',
                            displayField: 'text',
                            queryMode: 'local',
                            forceSelection: true,
                            anyMatch: true,
                            editable: false,
                            store: { type: 'status' },
                            reference: 'cmbx-41041124-user-status',
                            labelWidth: 37,
                            emptyText: '請選擇...',
                            allowBlank:false,
                            
                        }]
                    }
                ]
            }
        ]
    }]
});
