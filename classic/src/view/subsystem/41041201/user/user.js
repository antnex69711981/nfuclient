Ext.define('antnex.subsystem.41041201.user.user', {
    extend: 'Ext.panel.Panel',
    requires: [
        'antnex.subsystem.41041201.user.userController',
    ],
    alias: 'widget.page-41041201-user',
    controller: 'page-41041201-user',

    title: '使用者管理',

    layout: {
        type: 'vbox', //由上而下垂直排列, hbox水平
        align: 'stretch' //延展
    },

    listeners: {
        afterrender: 'onInitialize',
        activate: 'onActivate',
    },

    //靠上，靠左，靠右，置中
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
                        reference: 'btn-antStanley-user-funcbar-search',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-search',
                        margin: 3,
                        handler: 'funcbar_search',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '新增',
                        reference: 'btn-antStanley-user-funcbar-add',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-plus',
                        margin: 3,
                        handler: 'funcbar_add',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '修改',
                        reference: 'btn-antStanley-user-funcbar-edit',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-edit',
                        margin: 3,
                        handler: 'funcbar_edit',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '儲存',
                        reference: 'btn-antStanley-user-funcbar-save',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-save',
                        margin: 3,
                        handler: 'funcbar_save',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '取消',
                        reference: 'btn-antStanley-user-funcbar-cancel',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-times',
                        margin: 3,
                        handler: 'funcbar_cancel',
                    },
                ]
            },
            {   // 查詢列
                xtype: 'panel',
                reference: 'panel-antStanley-user-searchbar',
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
                            reference: 'txt-antStanley-user-searchbar-code',
                            emptyText: '請輸入學號',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            margin: '0 0 8 0',
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '姓名',
                            reference: 'txt-antStanley-user-searchbar-name',
                            emptyText: '請輸入姓名',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        },{
                            xtype: 'textfield',
                            fieldLabel: '信箱',
                            reference: 'txt-antStanley-user-searchbar-mail',
                            emptyText: '請輸入信箱',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        }, {
                            xtype: 'combobox',
                            fieldLabel: '狀態',
                            reference: 'cmbx-antStanley-user-searchbar-status',

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
    scrollable: true, //讓layout可做滾動
    items: [{
        xtype: 'panel',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        margin: 5,
        minHeight: 500, //最小高度
        flex: 1, //物件比例
        scrollable: true,
        items: [
            {   // 使用者清單
                xtype: 'gridpanel',
                title: '使用者清單',
                reference: 'grid-antStanley-user-userlist', //物件別名
                bufferedRenderer: false,
                runInViewport: false,
                viewConfig: {
                    enableTextSelection: true,
                }, //可做反白選取
                border: true, //邊框
                store: {}, //資料集
                minWidth: 600, //最小寬度
                flex: 1,
                listeners: {
                    selectionchange: 'onSelectUser',
                },
                columns: [{ //欄位
                    xtype: 'rownumberer',
                    align: 'center',
                    width: 50,
                }, {
                    dataIndex: 'code', //對應
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
                },{
                    dataIndex: 'memo',
                    text: '備註',
                    minWidth: 96,
                    flex: 1,
                }, {
                    dataIndex: 'status',
                    text: '狀態',
                    width: 96,
                    renderer: function (value) { //用來替換文字(1、9)
                        let store = Ext.create('antnex.store.static.Status');
                        let record = store.getRange().find(e => e.get('value') == value); //value對應 
                        return record ? record.get('text') : `無法辨識: ${value}`; //text解釋
                    },
                },{
                    dataIndex: 'createusercode',
                    text: '建立人員',
                    minWidth: 96,
                    flex: 1,
                },{
                    dataIndex: 'createtm',
                    text: '建立時間',
                    minWidth: 96,
                    flex: 1,
                },{
                    dataIndex: '(modifyusercode',
                    text: '異動人員',
                    minWidth: 96,
                    flex: 1,
                },{
                    dataIndex: 'modifytm',
                    text: '異動時間',
                    minWidth: 96,
                    flex: 1,
                }]
            },
            { xtype: 'splitter', margin: -1 }, //中間邊界可隨意移動
            {   // 資料維護
                xtype: 'panel',
                title: '資料維護',
                reference: 'panel-antStanley-user-manage', //物件別名
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                },
                flex: 0.5,
                defaults: {
                    margin: '0 5 5 5', //預設下方格式 (上右下左)
                },
                border: true, //邊框
                //minWidth: 400,
                items: [
                    {   // 基本資料
                        xtype: 'fieldset',
                        title: '基本資料',
                        layout: {
                            type: 'vbox',
                            align: 'stretch',
                        },
                        defaults: {
                            margin: '0 0 8 8', //上右下左, 預設下方格式
                        },
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: '學　　號',
                            reference: 'txt-antStanley-user-code',
                            labelWidth: 64, //fieldLabel 的寬度
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '姓　　名',
                            reference: 'txt-antStanley-user-name',
                            labelWidth: 64,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '信　　箱',
                            reference: 'txt-antStanley-user-mail',
                            labelWidth: 64,
                        },{
                            xtype: 'textfield',
                            fieldLabel: '備　　註',
                            reference: 'txt-antStanley-user-memo',
                            labelWidth: 64,
                        },{
                            xtype: 'combobox',
                            fieldLabel: '狀　　態',
                            reference: 'cmbx-antStanley-user-status',
                            labelWidth: 64,

                            valueField: 'value',
                            displayField: 'text',
                            queryMode: 'local',
                            forceSelection: true,
                            anyMatch: true,
                            editable: true,
                            store: { type: 'status' },
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '建立人員',
                            reference: 'txt-antStanley-user-createusercode',
                            labelWidth: 64,
                        }, {
                            xtype: 'datefield',
                            fieldLabel: '建立時間',
                            reference: 'txt-antStanley-user-createtm',
                            labelWidth: 64,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '異動人員',
                            reference: 'txt-antStanley-user-modifyusercode',
                            labelWidth: 64,
                        }, {
                            xtype: 'datefield',
                            fieldLabel: '異動時間',
                            reference: 'txt-antStanley-user-modifytm',
                            labelWidth: 64,
                        }]
                    }
                ]
            }
        ]
    }]
});
