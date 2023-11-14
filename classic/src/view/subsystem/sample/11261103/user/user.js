Ext.define('antnex.subsystem.11261103.user.user', {
    extend: 'Ext.panel.Panel',
    requires: [
        'antnex.subsystem.11261103.user.userController',
    ],
    alias: 'widget.page-11261103-user',
    controller: 'page-11261103-user',

    title: '使用者管理1',

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
                        xtype: 'funcbarButton',
                        text: '查詢列',
                        reference: 'btn-11261103-user-funcbar-search',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-search',
                        margin: 3,
                        handler: 'funcbar_search',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '新增',
                        reference: 'btn-11261103-user-funcbar-add',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-plus',
                        margin: 3,
                        handler: 'funcbar_Add',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '修改',
                        reference: 'btn-11261103-user-funcbar-edit',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-edit',
                        margin: 3,
                        handler: 'funcbar_edit',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '儲存',
                        reference: 'btn-11261103-user-funcbar-save',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-save',
                        margin: 3,
                        handler: 'funcbar_save',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '取消',
                        reference: 'btn-11261103-user-funcbar-cancel',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-times',
                        margin: 3,
                        handler: 'funcbar_cancel',
                    },
                ]
            },
            {   // 查詢列
                xtype: 'panel',
                reference: 'panel-11261103-user-searchbar',
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
                            labelWidth: 65 ,
                            margin: '0 5 8 10',
                            // defaults:{
                            //     margin:'0 5 0 0'
                            // }
                        },
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: '學　　號',
                            reference: 'txt-11261103-user-searchbar-code',
                            emptyText: '請輸入學號',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            margin: '0 0 8 0',
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '姓　　名',
                            reference: 'txt-11261103-user-searchbar-name',
                            emptyText: '請輸入姓名',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        }, {
                            xtype: 'combobox',
                            fieldLabel: '狀　　態',
                            reference: 'cmbx-11261103-user-searchbar-status',

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
                            margin: '0 10 8 5',
                        }]
                    },
                    {//查詢button
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
                    {//清除button
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
            }, { // 新增
                xtype: 'panel',
                reference: 'panel-11261103-user-addbar',
                layout: {
                    type: 'hbox',
                    align: 'stretch',
                },
                defaults: {
                    margin: '0 0 5 5',
                },

                
                scrollable: true,
                items: [
                    {// 新增欄位
                        xtype: 'fieldset',
                        title: '新增資料',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            xtype:'panel',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            
                            
                            margin: '0 0 8 0',
                            defaults:{
                                labelWidth: 65,
                                margin: '0 10 0 0',
                            }
                            
                            
                        },
                        items:[{
                            items: [{//學號 姓名 狀態
                            xtype: 'textfield',
                            fieldLabel: '學　　號',
                            reference: 'txt-11261103-user-addbarcode',
                            emptyText: '請輸入學號',
                            enableKeyEvents: true,
                            // listeners: {
                            //     keypress: 'enterSearch'
                            // },
                            //margin: '0 0 8 0',
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '姓　　名',
                            reference: 'txt-11261103-user-addbarname',
                            emptyText: '請輸入姓名',
                            enableKeyEvents: true,
                            // listeners: {
                            //     keypress: 'enterSearch'
                            // },
                        }, {
                            xtype: 'combobox',
                            fieldLabel: '狀　　態',
                            reference: 'cmbx-11261103-user-addbarstatus',

                            valueField: 'value',
                            displayField: 'text',
                            queryMode: 'local',
                            forceSelection: true,
                            anyMatch: true,
                            editable: true,
                            store: { type: 'status' },

                            enableKeyEvents: true,
                            /*listeners: {
                                keypress: 'enterSearch'
                            },*/
                        },]
                            

                        },{
                            items:[{//信箱 備註
                                xtype: 'textfield',
                                fieldLabel: '信　　箱',
                                reference: 'txt-11261103-user-addbarmail',
                                //emptyText: '請輸入姓名',
                                enableKeyEvents: true,
                                width:490,
                                // listeners: {
                                //     keypress: 'enterSearch'
                                // },
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '備　　註',
                                reference: 'txt-11261103-user-addbarmemo',
                                //emptyText: '請輸入姓名',
                                enableKeyEvents: true,
                                flex:1,
                                // listeners: {
                                //     keypress: 'enterSearch'
                                // },
                            },

                        ]
                        },{
                            items:[{//建立人員 建立時間
                                xtype: 'textfield',
                                fieldLabel: '建立人員',
                                reference: 'txt-11261103-user-addbarcreateusercode',
                                //emptyText: '請輸入姓名',
                                enableKeyEvents: true,
                                width:490,
                                // listeners: {
                                //     keypress: 'enterSearch'
                                // },
                            }, {
                                xtype: 'datefield',
                                fieldLabel: '建立時間',
                                reference: 'date-11261103-user-addbarcreatetm',
                                //emptyText: '請輸入姓名',
                                enableKeyEvents: true,
                                flex:1,
                                value: new Date()
                                // listeners: {
                                //     keypress: 'enterSearch'
                                // },
                            },

                        ]
                        },{
                            items:[{//異動人員 異動時間
                                xtype: 'textfield',
                                fieldLabel: '異動人員',
                                reference: 'txt-11261103-user-addbarmodifyusercode',
                                //emptyText: '請輸入姓名',
                                enableKeyEvents: true,
                                width:490,
                                // listeners: {
                                //     keypress: 'enterSearch'
                                // },
                            }, {
                                xtype: 'datefield',
                                fieldLabel: '異動時間',
                                reference: 'date-11261103-user-addbarmodiftm',
                                //emptyText: '請輸入姓名',
                                enableKeyEvents: true,
                                flex:1,
                                value: new Date()
                                // listeners: {
                                //     keypress: 'enterSearch'
                                // },
                            },

                        ]
                        }
                            
                        ],
                        
                    },
                    {//新增button
                        xtype: 'button',
                        text: '新增',
                        scale: 'small',
                        cls: 'antBtn-blue',
                        width: 60,
                        border: false,
                        handler: 'doAdd',
                        margin: '10 0 5 5',
                    },
                    {//清除button
                        xtype: 'button',
                        text: '清除',
                        scale: 'small',
                        cls: 'antBtn-red',
                        iconCls: 'fa fa-times',
                        width: 60,
                        border: false,
                        handler: 'cleanAdd',
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
                reference: 'grid-11261103-user-userlist',
                bufferedRenderer: false,
                runInViewport: false,
                viewConfig: {
                    enableTextSelection: true,
                },
                border: true,
                store: {},
                minWidth: 1250,
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
                    minWidth: 150,
                    flex: 1,
                }, {
                    dataIndex: 'memo',
                    text: '備註',
                    minWidth: 150,
                    flex: 1,
                },{
                    dataIndex: 'status',
                    text: '狀態',
                    width: 96,
                    renderer: function (value) {
                        let store = Ext.create('antnex.store.static.Status');
                        let record = store.getRange().find(e => e.get('value') == value);
                        return record ? record.get('text') : `無法辨識: ${value}`;
                    },
                    renderer: ConvertTK.format.storeRenderer('antnex.store.static.Status')
                }, {
                    dataIndex: 'createusercode',
                    text: '建立人員',
                    width: 110,
                    flex: 1,
                }, {
                    dataIndex: 'createtm',
                    text: '建立時間',
                    width: 110,
                    flex: 1,
                }, {
                    dataIndex: 'modifyusercode',
                    text: '異動人員',
                    width: 110,
                    flex: 1,
                }, {
                    dataIndex: 'modiftm',
                    text: '異動時間',
                    width: 110,
                    flex: 1,
                }]
            },
            { xtype: 'splitter', margin: -1.5 },
            {   // 資料維護
                xtype: 'panel',
                title: '資料維護',
                reference: 'panel-11261103-user-manage',
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
                            fieldLabel: '學　　號',
                            reference: 'txt-11261103-user-code',
                            labelWidth: 65,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '姓　　名',
                            reference: 'txt-11261103-user-name',
                            labelWidth: 65,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '信　　箱',
                            reference: 'txt-11261103-user-mail',
                            labelWidth: 65,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '備　　註',
                            reference: 'txt-11261103-user-memo',
                            labelWidth: 65,
                        }, {
                            xtype: 'combobox',
                            fieldLabel: '狀　　態',
                            reference: 'cmbx-11261103-user-status',
                            valueField: 'value',
                            displayField: 'text',
                            queryMode: 'local',
                            labelWidth: 65,
                            forceSelection: true,
                            anyMatch: true,
                            editable: true,
                            store: { type: 'status' },

                            enableKeyEvents: true,
                            // listeners: {
                            //     keypress: 'enterSearch'
                            // },
                        },{
                            xtype: 'textfield',
                            fieldLabel: '建立人員',
                            reference: 'txt-11261103-user-createusercode',
                            labelWidth: 65,
                        },{
                            xtype: 'datefield',
                            fieldLabel: '建立時間',
                            labelWidth: 65,
                            reference: 'date-11261103-user-createtm',
                            value: new Date()                           
                        },{
                            xtype: 'textfield',
                            fieldLabel: '異動人員',
                            reference: 'txt-11261103-user-modifyusercode',
                            labelWidth: 65,
                        },{
                            xtype: 'datefield',
                            fieldLabel: '異動時間',
                            labelWidth: 65,
                            reference: 'date-11261103-user-modiftm',
                            value: new Date()                           
                        }]
                    }
                ]
            }
        ]
    }]
});