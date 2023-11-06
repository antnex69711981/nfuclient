Ext.define('antnex.subsystem.40941139.user.user', {
    extend: 'Ext.panel.Panel',
    requires: [
        'antnex.subsystem.40941139.user.userController',
    ],
    alias: 'widget.page-40941139-user',
    controller: 'page-40941139-user',

    title: '40941139的使用者',

    layout: {
        type: 'hbox', // vbox 垂直 , hbox 水平
        align: 'stretch'
    },

    listeners: {
        afterrender: 'onInitialize',
        activate: 'onActivate',
    },

    dockedItems: [{
        xtype: 'panel',
        // layout: {
        //     type: 'vbox',
        //     align: 'stretch'
        // },
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
                        reference: 'btn-40941139-user-funcbar-search',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-search',
                        margin: 3,
                        handler: 'funcbar_search',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '新增',
                        reference: 'btn-40941139-user-funcbar-add',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-plus',
                        margin: 3,
                        handler: 'funcbar_add',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '修改',
                        reference: 'btn-40941139-user-funcbar-edit',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-edit',
                        margin: 3,
                        handler: 'funcbar_edit',
                    },
                    /*
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '儲存',
                        reference: 'btn-40941139-user-funcbar-save',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-save',
                        margin: 3,
                        handler: 'funcbar_save',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '取消',
                        reference: 'btn-40941139-user-funcbar-cancel',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-times',
                        margin: 3,
                        handler: 'funcbar_cancel',
                    },
                    */
                ]
            },
            {   // 查詢列
                xtype: 'panel',
                reference: 'panel-40941139-user-searchbar',
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
                        
                        items: [
                            {
                                defaults: {
                                    labelWidth: 37,
                                    margin: '0 0 8 5',
                                    width: 155,
                                },
                                layout: {
                                    type: 'hbox',
                                },
                                items: [{
                                    xtype: 'textfield',
                                    fieldLabel: '學號',
                                    reference: 'txt-40941139-user-searchbar-code',
                                    emptyText: '請輸入學號',
                                    //width: 150,
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'enterSearch'
                                    },
                                    //margin: '0 0 8 0',
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: '姓名',
                                    reference: 'txt-40941139-user-searchbar-name',
                                    emptyText: '請輸入姓名',
                                    //width: 150,
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'enterSearch'
                                    },
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: '信箱',
                                    reference: 'txt-40941139-user-searchbar-mail',
                                    emptyText: '請輸入信箱',
                                    width: 250,
                                    //vtype: 'email',  // 要求為有效的信箱
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'enterSearch'
                                    },
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: '手機',
                                    reference: 'txt-40941139-user-searchbar-phone',
                                    emptyText: '請輸入手機',
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'enterSearch'
                                    },
                                }, {
                                    xtype: 'datefield',
                                    fieldLabel: '生日',
                                    reference: 'date-40941139-user-searchbar-birth',
                                    format: 'Y/m/d',
                                    //width: 150,

                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'enterSearch'
                                    },
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: '備註',
                                    reference: 'txt-40941139-user-searchbar-memo',
                                    emptyText: '請輸入備註',
                                    //width: 150,
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'enterSearch'
                                    },
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: '狀態',
                                    reference: 'cmbx-40941139-user-searchbar-status',
                                    width: 120,

                                    valueField: 'value', //store裡的value
                                    displayField: 'text', //顯示store裡的text
                                    queryMode: 'local', //不懂
                                    forceSelection: true, //強制選擇，只能選清單內的東西
                                    anyMatch: true, //不懂
                                    editable: true, //使用者是否能輸入
                                    store: { type: 'status' },

                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'enterSearch'
                                    },
                                }, ]
                            }, {
                                defaults: {
                                    labelWidth: 65,
                                    margin: '0 0 8 5',
                                    width: 200,
                                },
                                layout: {
                                    type: 'hbox',
                                },
                                items: [{
                                    xtype: 'textfield',
                                    fieldLabel: '建立人員',
                                    reference: 'txt-40941139-user-searchbar-createusercode',
                                    emptyText: '請輸入建立人員',
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'enterSearch'
                                    },
                                    //disabled: true,
                                    //labelWidth: 65,
                                }, {
                                    xtype: 'datefield',
                                    fieldLabel: '建立時間',
                                    reference: 'date-40941139-user-searchbar-createtm',
                                    format: 'Y/m/d',
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'enterSearch'
                                    },
                                    //disabled: true,
                                    //labelWidth: 65,
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: '異動人員',
                                    reference: 'txt-40941139-user-searchbar-modifyusercode',
                                    emptyText: '請輸入異動人員',
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'enterSearch'
                                    },
                                    //disabled: true,
                                    //labelWidth: 65,
                                }, {
                                    xtype: 'datefield',
                                    fieldLabel: '異動時間',
                                    reference: 'date-40941139-user-searchbar-modifytm',
                                    format: 'Y/m/d',
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'enterSearch'
                                    },
                                    //disabled: true,
                                    //labelWidth: 65,
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
                                    margin: '0 0 5 20', // 上 右 下 左
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
                                    margin: '0 0 5 5',
                                }]
                            }
                        ]
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
        minHeight: 500, //頁面最小高度
        flex: 1,
        scrollable: true,
        items: [
            {   // 使用者清單
                xtype: 'gridpanel',
                title: '使用者清單',
                reference: 'grid-40941139-user-userlist',
                bufferedRenderer: false,
                runInViewport: false,
                viewConfig: {
                    enableTextSelection: true,
                },
                border: true,
                store: {},
                minWidth: 200,
                flex: 3,
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
                    minWidth: 190,
                    flex: 1,
                }, {
                    dataIndex: 'phone',
                    text: '手機',
                    Width: 110,
                }, {
                    dataIndex: 'birth',
                    text: '生日',
                    Width: 110,
                }, {
                    dataIndex: 'memo',
                    text: '備註',
                    Width: 110,
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
                    Width: 110,
                }, {
                    dataIndex: 'createtm',
                    text: '建立時間',
                    Width: 110,
                }, {
                    dataIndex: 'modifyusercode',
                    text: '異動人員',
                    Width: 110,
                }, {
                    dataIndex: 'modifytm',
                    text: '異動時間',
                    Width: 110,
                }]
            },
            { xtype: 'splitter', margin: -1.5 },
            {   // 資料維護
                xtype: 'panel',
                title: '資料維護',
                reference: 'panel-40941139-user-manage',
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                },
                flex: 1,
                defaults: {
                    margin: '0 5 5 5',
                },
                border: true,
                //hidden: true,
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
                            labelWidth: 37,
                            
                        },
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: '學號',
                            reference: 'txt-40941139-user-code',
                            // labelWidth: 37,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '姓名',
                            reference: 'txt-40941139-user-name',
                            // labelWidth: 37,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '信箱',
                            reference: 'txt-40941139-user-mail',
                            // labelWidth: 37,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '手機',
                            reference: 'txt-40941139-user-phone',
                            // labelWidth: 37,
                        }, {
                            xtype: 'datefield',
                            fieldLabel: '生日',
                            reference: 'date-40941139-user-birth',
                            format: 'Y/m/d',
                            //width: 150,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '備註',
                            reference: 'txt-40941139-user-memo',
                            // labelWidth: 37,
                        }, {
                            // xtype: 'textfield',
                            // fieldLabel: '狀態',
                            // reference: 'txt-40941139-user-status',
                            // labelWidth: 37,

                            xtype: 'combobox',
                            fieldLabel: '狀態',
                            reference: 'cmbx-40941139-user-status',
                            // labelWidth: 37,

                            valueField: 'value',
                            displayField: 'text',
                            queryMode: 'local',
                            forceSelection: true,
                            anyMatch: true,
                            editable: true, //可不可編輯
                            store: { type: 'status' },
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '建立人員',
                            reference: 'txt-40941139-user-createusercode',
                            disabled: true,
                            // labelAlign: 'top',
                            labelWidth: 65,
                        }, {
                            xtype: 'datefield',
                            fieldLabel: '建立時間',
                            reference: 'date-40941139-user-createtm',
                            format: 'Y/m/d',
                            disabled: true,
                            // labelAlign: 'top',
                            labelWidth: 65,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '異動人員',
                            reference: 'txt-40941139-user-modifyusercode',
                            disabled: true,
                            // labelAlign: 'top',
                            labelWidth: 65,
                        }, {
                            xtype: 'datefield',
                            fieldLabel: '異動時間',
                            reference: 'date-40941139-user-modifytm',
                            format: 'Y/m/d',
                            disabled: true,
                            // labelAlign: 'top',
                            labelWidth: 65,
                        }]
                    }, {
                        layout: {
                            type: 'hbox',
                            align: 'stretch',
                        },
                        defaults: {
                            height: 31,
                        },
                        items: [{
                                xtype: 'button',
                                text: '儲存',
                                scale: 'small',
                                cls: 'antBtn-blue',
                                iconCls: 'fa fa-save',
                                //width: 60,
                                flex: 1,
                                border: false,
                                handler: 'doSearch',
                                margin: '10 0 5 5',
                        }, {
                                xtype: 'button',
                                text: '取消',
                                scale: 'small',
                                cls: 'antBtn-red',
                                iconCls: 'fa fa-times',
                                //width: 60,
                                flex: 1,
                                border: false,
                                handler: 'cleanSearch',
                                margin: '10 0 5 5',
                        }]
                        
                    }
                    
                ]
            },
            /*
            { xtype: 'splitter', margin: -1.5 },
            {   // 資料新增
                xtype: 'panel',
                title: '資料新增',
                reference: 'panel-40941139-user-add',
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                },
                flex: 1,
                defaults: {
                    margin: '0 5 5 5',
                },
                border: true,
                hidden: true,
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
                            labelWidth: 37,
                        },
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: '學號',
                            reference: 'txt-40941139-user-code',
                            // labelWidth: 37,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '姓名',
                            reference: 'txt-40941139-user-name',
                            // labelWidth: 37,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '信箱',
                            reference: 'txt-40941139-user-mail',
                            // labelWidth: 37,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '手機',
                            reference: 'txt-40941139-user-phone',
                            // labelWidth: 37,
                        }, {
                            xtype: 'datefield',
                            fieldLabel: '生日',
                            reference: 'date-40941139-user-birth',
                            format: 'Y/m/d',
                            //width: 150,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '備註',
                            reference: 'txt-40941139-user-memo',
                            // labelWidth: 37,
                        }, {
                            // xtype: 'textfield',
                            // fieldLabel: '狀態',
                            // reference: 'txt-40941139-user-status',
                            // labelWidth: 37,

                            xtype: 'combobox',
                            fieldLabel: '狀態',
                            reference: 'cmbx-40941139-user-status',
                            // labelWidth: 37,

                            valueField: 'value',
                            displayField: 'text',
                            queryMode: 'local',
                            forceSelection: true,
                            anyMatch: true,
                            editable: true, //可不可編輯
                            store: { type: 'status' },
                        }]
                    }, {
                        layout: {
                            type: 'hbox',
                            align: 'stretch',
                        },
                        defaults: {
                            height: 31,
                        },
                        items: [{
                                xtype: 'button',
                                text: '新增',
                                scale: 'small',
                                cls: 'antBtn-blue',
                                iconCls: 'fa fa-plus',
                                //width: 60,
                                flex: 1,
                                border: false,
                                handler: 'funcbar_add',
                                margin: '10 0 5 5',
                        }, {
                                xtype: 'button',
                                text: '取消',
                                scale: 'small',
                                cls: 'antBtn-red',
                                iconCls: 'fa fa-times',
                                //width: 60,
                                flex: 1,
                                border: false,
                                handler: 'cleanSearch',
                                margin: '10 0 5 5',
                        }]
                        
                    }
                    
                ]
            }
            */
        ]
    }]
});
