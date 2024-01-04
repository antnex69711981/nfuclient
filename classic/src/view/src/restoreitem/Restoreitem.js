Ext.define('antnex.view.src.restoreitem.Restoreitem', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.view.src.restoreitem.RestoreitemController'
    ],
    alias: 'widget.restoreitem',
    controller: 'restoreitem',
    border: false,
    scrollable: true,

    title: '維修項目主檔',

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
                        reference: 'btn-restoreitem-funcbar-search',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-search',
                        margin: 3,
                        handler: 'funcbar_search',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '新增',
                        reference: 'btn-restoreitem-funcbar-add',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-plus',
                        margin: 3,
                        handler: 'funcbar_Add',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '修改',
                        reference: 'btn-restoreitem-funcbar-edit',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-edit',
                        margin: 3,
                        handler: 'funcbar_edit',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '儲存',
                        reference: 'btn-restoreitem-funcbar-save',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-save',
                        margin: 3,
                        handler: 'funcbar_save',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '取消',
                        reference: 'btn-restoreitem-funcbar-cancel',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-times',
                        margin: 3,
                        handler: 'funcbar_cancel',
                    },
                ]
            },
            {   // 查詢列
                xtype: 'panel',
                reference: 'panel-restoreitem-searchbar',
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
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            xtype:'panel',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            
                            
                           // margin: '0 0 8 0',
                            defaults:{
                                labelWidth: 37,
                                margin: '0 10 8 5',
                            }
                            
                            
                        },
                        items: [
                            {//項目編碼 項目名稱 保固月份 狀態
                                items:[
                                {
                                    xtype: 'antTextfield',
                                    fieldLabel: '編碼',
                                    reference: 'txt-restoreitem-searchbar-code',
                                    emptyText: '請輸入編碼',
                                    width: 130,
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'enterSearch'
                                    },
                                   
                                }, {
                                    xtype: 'antTextfield',
                                    fieldLabel: '名稱',
                                    reference: 'txt-restoreitem-searchbar-name',
                                    emptyText: '請輸入名稱',
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'enterSearch'
                                    },
                                    
                                },/*{
                                    xtype: 'antNumberfield',
                                    fieldLabel: '保固月份',
                                    reference: 'num-restoreitem-searchbar-warrantymonth',
                                    emptyText: '請輸入保固月份',    
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'enterSearch'
                                    },
                                    
                                },*/
                                {
                                    xtype: 'antCombobox',
                                    fieldLabel: '狀態',
                                    reference: 'cmbx-restoreitem-searchbar-status',
        
                                    valueField: 'value',
                                    displayField: 'text',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    anyMatch: true,
                                    editable: false,
                                    width: 130,
                                    store: {type: 'status'},
        
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'enterSearch'
                                    },
                                    //margin: '0 10 8 5',
                                    
                                },]
                            },/*{//建立人員 建立時間
                                items:[ {//建立人員 建立時間
                                    xtype: 'antTextfield',
                                    fieldLabel: '建立人員',
                                    reference: 'txt-restoreitem-addbarcreateusercode',
                                    enableKeyEvents: true,                                    
                                    // listeners: {
                                    //     keypress: 'enterSearch'
                                    // },
                                }, {
                                    xtype: 'antDatefield',
                                    fieldLabel: '建立時間',
                                    reference: 'date-restoreitem-addbarcreatetm',
                                    enableKeyEvents: true,
                                    flex:1,
                                    value: new Date()
                                    // listeners: {
                                    //     keypress: 'enterSearch'
                                    // },
                                },{//異動人員 異動時間
                                    xtype: 'antTextfield',
                                    fieldLabel: '異動人員',
                                    reference: 'txt-restoreitem-addbarmodifyusercode',
                                    enableKeyEvents: true,
                                    // listeners: {
                                    //     keypress: 'enterSearch'
                                    // },
                                }, {
                                    xtype: 'antDatefield',
                                    fieldLabel: '異動時間',
                                    reference: 'date-restoreitem-addbarmodiftm',
                                    enableKeyEvents: true,
                                    flex:1,
                                    value: new Date()
                                    // listeners: {
                                    //     keypress: 'enterSearch'
                                    // },
                                },
    
                            ]
                            } */                           
                        ],

                    },
                    {//查詢button
                        xtype: 'searchButton-search',                       
                        handler: 'doSearch',
                        margin: '10 0 5 5',
                    },
                    {//清除button
                        xtype: 'searchButton-clean',
                        handler: 'cleanSearch',
                        margin: '10 0 5 5',
                    },
                ]
            },
            
        ]
    }],
    scrollable: true,
    items: [{
        xtype: 'antTransPanel',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        margin: '5 5 5 0',
        //minHeight: 1000,
        flex: 1,
        scrollable: true,
        items: [
            {   // 維修項目清單
                xtype: 'antGridpanel',
                title: '維修項目清單',
                reference: 'grid-restoreitem-list',
                //bufferedRenderer: false,
                //runInViewport: false,
                viewConfig: {
                    enableTextSelection: true,
                },
                selModel: false,
                //border: true,
                store: {},                
                flex: 1,
                listeners: {
                    selectionchange: 'onSelect',
                },
                columns: [{
                    xtype: 'rownumberer',
                    align: 'center',
                    width: 50,
                }, {
                    dataIndex: 'code',
                    text: '編碼',
                    width: 110,
                }, {
                    dataIndex: 'name',
                    text: '名稱',
                    minWidth: 200,
                    flex: 1,
                }, {
                    dataIndex: 'warrantymonth',
                    text: '保固月份',
                    width: 96,
                    //flex: 1,
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
                    //flex: 1,
                }, {
                    dataIndex: 'createtm',
                    text: '建立時間',
                    width: 160,
                   // flex: 1,
                }, {
                    dataIndex: 'modifyusercode',
                    text: '異動人員',
                    width: 110,
                    //flex: 1,
                }, {
                    dataIndex: 'modifytm',
                    text: '異動時間',
                    width: 160,
                    //flex: 1,
                }]
            },
            { xtype: 'splitter', margin: -1.5 },
            {   // 資料維護
                xtype: 'panel',
                title: '資料維護',
                reference: 'panel-restoreitem-manage',
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                },
                minWidth:300,
                //flex: 1,
                defaults: {
                    margin: '0 5 5 5',
                },
                tools: [{
                    xtype: 'toolButton',
                    tooltip: '異動資訊',
                    iconCls: 'fas fa-user',
                    handler: 'showModifyinfo',
                }],
                //border: true,
                items: [
                    {   // 維修項目資料
                        xtype: 'panel',
                        //title: '維修項目資料',
                        layout: {
                            type: 'vbox',
                            align: 'stretch',
                        },
                        defaults: {
                            margin: '0 0 5 5',
                            labelWidth: 65,
                            labelAlign: 'top',
                            labelStyle: '',
                            labelSeparator: '',
                            cls: 'antVerticalText',
                            
                            //disabled: true,
                        },
                        items: [{
                            xtype: 'antTextfield',
                            fieldLabel: '編碼',
                            reference: 'txt-restoreitem-code',                        
                            cls: 'antVerticalText fieldNotInput',
                        }, {
                            xtype: 'antTextfield',
                            fieldLabel: '名稱',
                            reference: 'txt-restoreitem-name',
                            cls: 'antVerticalText fieldRequired',
                        }, {
                            xtype: 'antNumberfield',
                            fieldLabel: '保固月份',
                            reference: 'num-restoreitem-warrantymonth',
                            cls: 'antVerticalText fieldRequired',
                        },{
                            xtype: 'antCombobox',
                            fieldLabel: '狀態',
                            reference: 'cmbx-restoreitem-status',
                            cls: 'antVerticalText fieldRequired',
                            valueField: 'value',
                            displayField: 'text',
                            queryMode: 'local',
                            forceSelection: true,
                            anyMatch: true,
                            editable: false,
                            store: {type: 'status'},

                            enableKeyEvents: true,
                            // listeners: {
                            //     keypress: 'enterSearch'
                            // },
                        },{
                            xtype: 'antTextarea',
                            fieldLabel: '備註',
                            reference: 'txt-restoreitem-memo',
                        },/*{
                            xtype: 'antTextfield',
                            fieldLabel: '建立人員',
                            reference: 'txt-restoreitem-createusercode',
                        },{
                            xtype: 'datefield',
                            fieldLabel: '建立時間',
                            reference: 'date-restoreitem-createtm',
                            //value: new Date()                           
                        },{
                            xtype: 'antTextfield',
                            fieldLabel: '異動人員',
                            reference: 'txt-restoreitem-modifyusercode',
                        },{
                            xtype: 'datefield',
                            fieldLabel: '異動時間',
                            reference: 'date-restoreitem-modiftm',
                            //value: new Date()                           
                        }*/]
                    }
                ]
            }
        ]
    }]

});
