Ext.define('antnex.view.src.restoreprice.Restoreprice', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.view.src.restoreprice.RestorepriceController'
    ],
    alias: 'widget.restoreprice',
    controller: 'restoreprice',
    border: false,
    scrollable: true,

    title: '維修報價主檔',

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
                        xtype: 'antButton',
                        text: '查詢列(F10)',
                        reference: 'btn-40941137-user-funcbar-search',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-search',
                        margin: 3,
                        handler: 'funcbar_search',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'antButton',
                        text: '新增(F2)',
                        reference: 'btn-40941137-user-funcbar-add',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-plus',
                        margin: 3,
                        handler: 'funcbar_add',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'antButton',
                        text: '修改(F4)',
                        reference: 'btn-40941137-user-funcbar-edit',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-edit',
                        margin: 3,
                        handler: 'funcbar_edit',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'antButton',
                        text: '儲存(F8)',
                        reference: 'btn-40941137-user-funcbar-save',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-save',
                        margin: 3,
                        handler: 'funcbar_save',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'antButton',
                        text: '取消(F9)',
                        reference: 'btn-40941137-user-funcbar-cancel',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-times',
                        margin: 3,
                        handler: 'funcbar_cancel',
                    },
                ]
            },
            {   // 查詢列
                xtype: 'panel',
                reference: 'panel-40941137-user-searchbar',
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
                            margin: '0 0 8 5',
                        },
                        items: [{
                            xtype: 'antTextfield',
                            fieldLabel: '維修報價編碼',
                            reference: 'txt-40941137-user-searchbar-code',
                            emptyText: '請輸入維修報價編碼',
                            labelWidth: 90,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            margin: '0 0 8 0',
                        }, {
                            xtype: 'antTextfield',
                            fieldLabel: '維修項目',
                            reference: 'txt-40941137-user-searchbar-name',
                            emptyText: '請輸入維修項目',
                            labelWidth: 62,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        },{
                            xtype: 'antTextfield',
                            fieldLabel: '維修商品',
                            reference: 'txt-40941137-user-searchbar-memo',
                            emptyText: '請輸入維修商品',
                            labelWidth: 62,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        },
                        // {
                        //     xtype: 'antCombobox',
                        //     fieldLabel: '狀態',
                        //     reference: 'cmbx-40941137-user-searchbar-status',

                        //     valueField: 'value',
                        //     displayField: 'text',
                        //     queryMode: 'local',
                        //     forceSelection: true,
                        //     anyMatch: true,
                        //     editable: true,
                        //     store: { type: 'status' },

                        //     enableKeyEvents: true,
                        //     listeners: {
                        //         keypress: 'enterSearch'
                        //     },
                        // }
                    ]
                    },
                    {
                        xtype: 'antButton',
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
                        xtype: 'antButton',
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
        minHeight: 500,
        flex: 1,
        scrollable: true,
        items: [
            {   // 使用者清單
                xtype: 'antGridpanel',
                title: '使用者清單',
                reference: 'grid-40941137-user-userlist',
                bufferedRenderer: false,
                runInViewport: false,
                viewConfig: {
                    enableTextSelection: true,
                },
                border: true,
                store: {},
                minWidth: 200,
                flex: 2, //比例
                listeners: {
                    selectionchange: 'onSelectUser',
                },
                columns: [{
                    dataIndex: 'id',
                    text: 'id',
                    minWidth: 35,  
                    width: 'auto',            
                },{
                    dataIndex: 'code',
                    text: '維修報價編碼',
                    minWidth: 110,
                    width: 'auto', 
                },{
                    dataIndex: 'restoreitemcode',
                    text: '維修項目',
                    minWidth: 80,
                    width: 'auto', 
                },{
                    dataIndex: 'materialcode',
                    text: '維修商品',
                    minWidth: 80,    
                    width: 'auto',                 
                },{
                    dataIndex: 'price',
                    text: '維修報價',
                    minWidth: 80,  
                    width: 'auto',                   
                },{
                    dataIndex: 'memberprice',
                    text: '會員價格',
                    minWidth: 80,     
                    width: 'auto',                
                },{
                    dataIndex: 'memo',
                    text: '備註',
                    minWidth: 80,
                    width: 'auto', 
                },{
                    dataIndex: 'createusercode',
                    text: '建立人員',
                    minWidth: 110,
                    width: 'auto', 
                },{
                    dataIndex: 'createtm',
                    text: '建立時間',
                    minWidth: 160,
                    width: 'auto', 
                },{
                    dataIndex: 'modifyusercode',
                    text: '異動人員',
                    minWidth: 110,
                    width: 'auto', 
                },{
                    dataIndex: 'modifytm',
                    text: '異動時間',
                    minWidth: 160,
                    width: 'auto', 
                },
                // {
                //     dataIndex: 'status',
                //     text: '狀態',
                //     width: 96,
                //     renderer: function (value) {
                //         let store = Ext.create('antnex.store.static.Status');
                //         let record = store.getRange().find(e => e.get('value') == value);
                //         return record ? record.get('text') : `無法辨識: ${value}`;
                //     },
                // },
                ]
            },
            { xtype: 'splitter', margin: -1.5 },
            {   // 資料維護
                xtype: 'panel',
                title: '資料維護',
                reference: 'panel-40941137-user-manage',
                // hidden:true,
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
                        xtype: 'antFieldset',
                        title: '基本資料',
                        layout: {
                            type: 'vbox',
                            align: 'stretch',
                        },
                        defaults: {
                            margin: '0 0 8 0',
                            labelAlign: 'top',
                            labelStyle: '',
                            labelSeparator: '', 
                        },
                        items: [{
                            xtype: 'antTextfield',
                            fieldLabel: '維修報價編碼',
                            reference: 'txt-40941137-user-code',                            
                        },{
                            xtype: 'antTextfield',
                            fieldLabel: '維修項目',
                            reference: 'txt-40941137-user-name',                            
                        },{
                            xtype: 'antTextfield',
                            fieldLabel: '維修商品',
                            reference: 'txt-40941137-user-mail',
                        },{
                            xtype: 'antTextfield',
                            fieldLabel: '維修報價',
                            reference: 'txt-40941137-user-password',
                        },{
                            xtype: 'antTextfield',
                            fieldLabel: '會員價格',
                            reference: 'txt-40941137-user-memo',
                        },{
                            xtype: 'antTextfield',
                            fieldLabel: '備註',
                            reference: 'txt-40941137-user-memo',
                        },{
                            layout: {
                                type: 'hbox',
                                align: 'stretch', //看不懂
                                pack: 'end', //start 靠左 , center 置中 , end 靠右
                            },
                            // defaults: {
                            //     margin: '0 0 8 0',
                            // },
                            items: [{
                                xtype: 'antButton',
                                text: '儲存(F8)',
                                reference: 'btn-40941137-user-funcbar-save',
                                //cls: 'funcbarBtn-black',
                                iconCls: 'fa fa-save',
                                margin: 3,
                                handler: 'funcbar_save',
                            },
                            {
                                xtype: 'antButton',
                                text: '取消(F9)',
                                reference: 'btn-40941137-user-funcbar-cancel',
                                //cls: 'funcbarBtn-black',
                                iconCls: 'fa fa-times',
                                margin: 3,
                                handler: 'funcbar_cancel',
                            }]
                        },
                        // {
                        //     xtype: 'antNumberfield',
                        //     fieldLabel: 'ids',
                        //     reference: 'num-40941137-user-ids',
                        //     labelWidth: 90,
                        //     cls: 'fieldNotInput',
                        // },
                        // {
                        //     xtype: 'antTextfield',
                        //     fieldLabel: '建立人員',
                        //     reference: 'txt-40941137-user-createusercode',
                        //     disabled: true,
                        //     labelWidth: 90,
                        // },{
                        //     xtype: 'antTextfield',
                        //     fieldLabel: '建立時間',
                        //     reference: 'txt-40941137-user-createtm',
                        //     disabled: true,
                        //     labelWidth: 90,
                        // },{
                        //     xtype: 'antTextfield',
                        //     fieldLabel: '異動人員',
                        //     reference: 'txt-40941137-user-modifyusercode',
                        //     labelWidth: 90,
                        // },{
                        //     xtype: 'antTextfield',
                        //     fieldLabel: '異動時間',
                        //     reference: 'txt-40941137-user-modifytm',
                        //     labelWidth: 90,
                        // },
                        // {
                        //     xtype: 'antCombobox',
                        //     fieldLabel: '狀態',
                        //     reference: 'cmbx-40941137-user-status',
                        //     labelWidth: 74,

                        //     valueField: 'value',
                        //     displayField: 'text',
                        //     queryMode: 'local',
                        //     forceSelection: true,
                        //     anyMatch: true,
                        //     editable: true,
                        //     store: { type: 'status' },

                        //     enableKeyEvents: true,
                        //     listeners: {
                        //         keypress: 'enterSearch'
                        //     },
                        // },
                    ]
                    }
                ]
            }
        ]
    }]
});
