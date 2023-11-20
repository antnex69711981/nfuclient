Ext.define('antnex.subsystem.41141136.user.user', {
    extend: 'Ext.panel.Panel',
    requires: [
        'antnex.subsystem.41141136.user.userController',
    ],
    alias: 'widget.page-41141136-user',
    controller: 'page-41141136-user',

    title: '41141136首頁',
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
                        reference: 'btn-41141136-user-funcbar-search',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-search',
                        margin: 3,
                        handler: 'funcbar_search',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '新增',
                        reference: 'btn-41141136-user-funcbar-add',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-plus',
                        margin: 3,
                        handler: 'funcbar_add',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '修改',
                        reference: 'btn-41141136-user-funcbar-edit',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-edit',
                        margin: 3,
                        handler: 'funcbar_edit',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '儲存',
                        reference: 'btn-41141136-user-funcbar-save',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-save',
                        margin: 3,
                        handler: 'funcbar_save',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '取消',
                        reference: 'btn-41141136-user-funcbar-cancel',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-times',
                        margin: 3,
                        handler: 'funcbar_cancel',
                    },
                ]
            },
            {   // 查詢列
                xtype: 'panel',
                reference: 'panel-41141136-user-searchbar',
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
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            labelWidth: 37,
                            margin: '0 0 8 5',
                        },
                        items: [ //雙列查詢
                            {
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                defaults: {
                                    labelWidth: 37,
                                    margin: '0 0 8 5',
                                },
                                items:[ //第一列查詢列
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: '學號',
                                        reference: 'txt-41141136-user-searchbar-code',
                                        emptyText: '請輸入學號',
                                        enableKeyEvents: true,
                                        listeners: {
                                            keypress: 'enterSearch'
                                        },
                                        margin: '0 0 8 0',
                                    }, {
                                        xtype: 'textfield',
                                        fieldLabel: '姓名',
                                        reference: 'txt-41141136-user-searchbar-name',
                                        emptyText: '請輸入姓名',
                                        enableKeyEvents: true,
                                        listeners: {
                                            keypress: 'enterSearch'
                                        },
                                    }, {
                                        xtype: 'textfield',
                                        fieldLabel: '信箱',
                                        reference: 'txt-41141136-user-searchbar-mail',
                                        emptyText: '請輸入信箱',
                                        enableKeyEvents: true,
                                        listeners: {
                                            keypress: 'enterSearch'
                                        },
                                    }, {
                                        xtype: 'textfield',
                                        fieldLabel: '備註',
                                        reference: 'txt-41141136-user-searchbar-Memo',
                                        emptyText: '請輸入備註',
                                        enableKeyEvents: true,
                                        listeners: {
                                            keypress: 'enterSearch'
                                        },
                                    }, {
                                        xtype: 'combobox',
                                        fieldLabel: '狀態',
                                        reference: 'cmbx-41141136-user-searchbar-status',
            
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
                                    },
                                ]
                        }, {
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                defaults: {
                                    labelWidth: 74,
                                    margin: '0 0 8 0',
                                },
                                items:[ //第二列查詢列
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: '建立人員',
                                        reference: 'txt-41141136-user-searchbar-createusercode',
                                        emptyText: '請輸入建立人員',
                                        enableKeyEvents: true,
                                        listeners: {
                                            keypress: 'enterSearch'
                                        },
                                    }, {
                                        xtype: 'textfield',
                                        fieldLabel: '建立時間',
                                        reference: 'txt-41141136-user-searchbar-createtm',
                                        emptyText: '請輸入建立時間',
                                        enableKeyEvents: true,
                                        listeners: {
                                            keypress: 'enterSearch'
                                        },
                                    }, {
                                        xtype: 'textfield',
                                        fieldLabel: '異動人員',
                                        reference: 'txt-41141136-user-searchbar-modifyusercode',
                                        emptyText: '請輸入異動人員',
                                        enableKeyEvents: true,
                                        listeners: {
                                            keypress: 'enterSearch'
                                        },
                                    }, {
                                        xtype: 'textfield',
                                        fieldLabel: '異動時間',
                                        reference: 'txt-41141136-user-searchbar-modifytm',
                                        emptyText: '請輸入異動時間',
                                        enableKeyEvents: true,
                                        listeners: {
                                            keypress: 'enterSearch'
                                        },
                                    }
                                ]
                        }]
                    },
                    {   // 查詢
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
                    {   // 刪除
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
                reference: 'grid-41141136-user-userlist',
                bufferedRenderer: false,
                runInViewport: false,
                viewConfig: {
                    enableTextSelection: true,
                },
                border: true,
                store: {},
                minWidth: 200,
                flex: 2,
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
                    flex: 2, //視窗比例
                }, {
                    dataIndex: 'Memo',
                    text: '備註',
                    minWidth: 96,
                    flex: 1, //視窗比例
                }, {
                    dataIndex: 'status',
                    text: '狀態',
                    width: 96,
                    renderer: function (value) {
                        let store = Ext.create('antnex.store.static.Status');
                        let record = store.getRange().find(e => e.get('value') == value);
                        return record ? record.get('text') : `無法辨識: ${value}`;
                    },
                }, {
                    dataIndex: 'createusercode',
                    text: '建立人員',
                    minWidth: 110,
                }, {
                    dataIndex: 'createtm',
                    text: '建立時間',
                    minWidth: 100,
                    flex: 1, //視窗比例
                }, {
                    dataIndex: 'modifyusercode',
                    text: '異動人員',
                    minWidth: 110,
                }, {
                    dataIndex: 'modifytm',
                    text: '異動時間',
                    minWidth: 100,
                    flex: 1, //視窗比例
                }]
            },
            { xtype: 'splitter', margin: -1.5 },
            {   // 資料維護
                xtype: 'panel',
                title: '資料維護',
                reference: 'panel-41141136-user-manage',
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                },
                flex: 1,
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
                            reference: 'txt-41141136-user-code',
                            labelWidth: 74,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '姓名',
                            reference: 'txt-41141136-user-name',
                            labelWidth: 74,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '信箱',
                            reference: 'txt-41141136-user-mail',
                            labelWidth: 74,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '備註',
                            reference: 'txt-41141136-user-Memo',
                            labelWidth: 74,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '狀態',
                            reference: 'txt-41141136-user-status',
                            labelWidth: 74,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '建立人員',
                            reference: 'txt-41141136-user-createusercode',
                            labelWidth: 74,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '建立時間',
                            reference: 'txt-41141136-user-createtm',
                            labelWidth: 74,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '異動人員',
                            reference: 'txt-41141136-user-modifyusercode',
                            labelWidth: 74,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '異動時間',
                            reference: 'txt-41141136-user-modifytm',
                            labelWidth: 74,
                        }]
                    },{   // 保存列
                        xtype: 'panel',
                        reference: 'panel-41141136-user-searchbar',
                        layout: {
                            type: 'hbox',
                            align: 'stretch',
                        },
                        defaults: {
                            margin: '0 5 5 0',
                        },
                        scrollable: true,
                        items:[
                            {
                                xtype: 'button',
                                text: '保存',
                                scale: 'small',
                                cls: 'antBtn-blue',
                                iconCls: 'fa fa-save',
                                width: 60,
                                border: false,
                                handler: 'funcbar_save',
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
                                handler: 'funcbar_cancel',
                                margin: '10 0 5 5',
                            },
                        ]
                    },
                ]
            }
        ]
    }]
    
});
