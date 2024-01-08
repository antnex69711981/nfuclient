Ext.define('antnex.view.src.inspection.Inspection', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.view.src.inspection.InspectionController'
    ],
    alias: 'widget.inspection',
    controller: 'inspection',
    border: false,
    // scrollable: true,

    title: '檢測項目主檔',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        afterrender: 'onInitialize',
        activate: 'onActivate',
    },

    dockedItems: [{
        xtype: 'antTransPanel',
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
                // margin: '0 0 0 5',
                padding: '0 0 0 5',
                items: [
                    {
                        xtype: 'funcbarButton',
                        text: '查詢列',
                        reference: 'btn-inspection-funcbar-search',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-search',
                        margin: 3,
                        handler: 'funcbar_search',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '新增',
                        reference: 'btn-inspection-funcbar-add',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-plus',
                        margin: 3,
                        handler: 'funcbar_add',
                    },
                    
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '修改',
                        reference: 'btn-inspection-funcbar-edit',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-edit',
                        margin: 3,
                        handler: 'funcbar_edit',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '儲存',
                        reference: 'btn-inspection-funcbar-save',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-save',
                        margin: 3,
                        handler: 'funcbar_save',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '取消',
                        reference: 'btn-inspection-funcbar-cancel',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-times',
                        margin: 3,
                        handler: 'funcbar_cancel',
                    },
                    
                ]
            },
            {   // 查詢列
                xtype: 'panel',
                reference: 'panel-inspection-searchbar',
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
                        xtype: 'antFieldset',
                        title: '查詢條件',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults: {
                            labelWidth: 34,
                            margin: '3 0 8 5',
                            width: 150,
                        },
                        items: [
                            {
                                xtype: 'antTextfield',
                                fieldLabel: '編碼',
                                reference: 'txt-inspection-searchbar-code',
                                emptyText: '請輸入編碼',
                                //width: 150,
                                enableKeyEvents: true,
                                listeners: {
                                    keypress: 'enterSearch'
                                },
                            }, {
                                xtype: 'antTextfield',
                                fieldLabel: '名稱',
                                reference: 'txt-inspection-searchbar-name',
                                emptyText: '請輸入名稱',
                                //width: 150,
                                enableKeyEvents: true,
                                listeners: {
                                    keypress: 'enterSearch'
                                },
                            }, {
                                xtype: 'antCombobox',
                                fieldLabel: '狀態',
                                reference: 'cmbx-inspection-searchbar-status',
                                width: 120,
                                // labelWidth: 37,
    
                                valueField: 'value', //store裡的value
                                displayField: 'text', //顯示store裡的text
                                queryMode: 'local', 
                                forceSelection: true, //強制選擇，只能選清單內的東西
                                anyMatch: true, 
                                editable: false, //使用者是否能輸入
                                store: { type: 'status' },
    
                                enableKeyEvents: true,
                                listeners: {
                                    keypress: 'enterSearch'
                                },
    
                            },
                        ]
                    },{
                        xtype: 'antButton',
                        text: '查詢',
                        scale: 'small',
                        cls: 'antBtn-blue',
                        iconCls: 'fa fa-search',
                        width: 60,
                        border: false,
                        handler: 'doSearch',
                        margin: '10 0 5 15', // 上 右 下 左
                    },
                    {
                        xtype: 'antButton',
                        text: '清除',
                        scale: 'small',
                        cls: 'antBtn-red',
                        iconCls: 'fa fa-times',
                        width: 60,
                        border: false,
                        handler: 'cleanSearch',
                        margin: '10 0 5 5',
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
        margin: '5 0 5 0',
        // minHeight: 500, //頁面最小高度
        flex: 1,
        scrollable: true,
        items: [
            {   // 檢測項目清單
                xtype: 'antGridpanel',
                title: '檢測項目清單',
                reference: 'grid-inspection-inspectionlist',
                // bufferedRenderer: false,
                // runInViewport: false,
                viewConfig: {
                    enableTextSelection: true,
                },
                selModel: false,
                // margin: 'left',
                store: {},
                minWidth: 200,
                flex: 4,
                scrollable: true,
                listeners: {
                    selectionchange: 'onSelect',
                },
                columns: [{
                    xtype: 'rownumberer',
                    align: 'center',
                    width: 30,
                }, {
                    dataIndex: 'code',
                    text: '檢測項目編碼',
                    width: 110,
                }, {
                    dataIndex: 'name',
                    text: '檢測項目名稱',
                    width: 110,
                },{
                    dataIndex: 'memo',
                    text: '備註',
                    minWidth: 120,
                    flex: 1,
                }, {
                    dataIndex: 'status',
                    text: '狀態',
                    width: 50,
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
                }, {
                    dataIndex: 'createtm',
                    text: '建立時間',
                    width: 140,
                }, {
                    dataIndex: 'modifyusercode',
                    text: '異動人員',
                    width: 110,
                }, {
                    dataIndex: 'modifytm',
                    text: '異動時間',
                    width: 140,
                }]
            },
            { xtype: 'splitter', margin: -1.5 },
            {   // 資料維護
                xtype: 'panel',
                title: '資料維護',
                reference: 'panel-inspection-manage',
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                },
                minWidth:200,
                flex: 1,
                defaults: {
                    margin: '5 5 5 0',
                },
                tools: [{
                    xtype: 'toolButton',
                    tooltip: '異動資訊',
                    iconCls: 'fas fa-user',
                    handler: 'showModifyinfo',
                }],
                // scrollable: true,
                //hidden: true,
                items: [
                    {   // 基本資料
                        xtype: 'panel',
                        layout: {
                            type: 'vbox',
                            align: 'stretch',
                        },
                        
                        defaults: {
                            margin: '0 0 5 5',
                            labelWidth: 65,
                            width: 135,
                            labelAlign: 'top',
                            labelStyle: '',
                            labelSeparator: '',
                            cls: 'antVerticalText',
                        },
                        items: [{
                            xtype: 'antTextfield',
                            fieldLabel: '檢測項目編碼',
                            reference: 'txt-inspection-code',
                            cls: 'antVerticalText fieldNotInput',
                        }, {
                            xtype: 'antTextfield',
                            fieldLabel: '檢測項目名稱',
                            reference: 'txt-inspection-name',
                            cls: 'antVerticalText fieldRequired',
                        }, {
                            xtype: 'antCombobox',
                            fieldLabel: '狀態',
                            reference: 'cmbx-inspection-status',
                            cls: 'antVerticalText fieldRequired',

                            valueField: 'value',
                            displayField: 'text',
                            queryMode: 'local',
                            forceSelection: true,
                            anyMatch: true,
                            editable: false, //可不可編輯
                            store: { type: 'status' },
                        }, {
                            xtype: 'antTextarea',
                            fieldLabel: '備註',
                            reference: 'txt-inspection-memo',
                        }
                        ]
                    }
                ]
            },            
        ]
    }]
});
