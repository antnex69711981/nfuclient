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
                        xtype: 'button',
                        text: '查詢列(F10)',
                        reference: 'btn-40941137-user-funcbar-search',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-search',
                        margin: 3,
                        handler: 'funcbar_search',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '新增(F2)',
                        reference: 'btn-40941137-user-funcbar-add',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-plus',
                        margin: 3,
                        handler: 'funcbar_add',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '修改(F4)',
                        reference: 'btn-40941137-user-funcbar-edit',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-edit',
                        margin: 3,
                        handler: 'funcbar_edit',
                    },
                    // { xtype: 'tbseparator', margin: '8 1' },
                    // {
                    //     xtype: 'button',
                    //     text: '儲存(F8)',
                    //     reference: 'btn-40941137-user-funcbar-save',
                    //     hidden: true,
                    //     cls: 'funcbarBtn-black',
                    //     iconCls: 'fa fa-save',
                    //     margin: 3,
                    //     handler: 'funcbar_save',
                    // },
                    // { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'button',
                        text: '取消(F9)',
                        reference: 'btn-40941137-user-funcbar-cancel',
                        hidden: true,
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
                            reference: 'txt-40941137-user-searchbar-code',
                            emptyText: '請輸入學號',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            margin: '0 0 8 0',
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '姓名',
                            reference: 'txt-40941137-user-searchbar-name',
                            emptyText: '請輸入姓名',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        },{
                            xtype: 'textfield',
                            fieldLabel: '信箱',
                            reference: 'txt-40941137-user-searchbar-mail',
                            emptyText: '請輸入信箱',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        },{
                            xtype: 'textfield',
                            fieldLabel: '備註',
                            reference: 'txt-40941137-user-searchbar-memo',
                            emptyText: '請輸入備註',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        }, {
                            xtype: 'combobox',
                            fieldLabel: '狀態',
                            reference: 'cmbx-40941137-user-searchbar-status',

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
        minHeight: 500,
        flex: 1,
        scrollable: true,
        items: [
            {   // 使用者清單
                xtype: 'gridpanel',
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
                    xtype: 'rownumberer',
                    align: 'center',
                    width: 50,
                },{
                    dataIndex: 'id',
                    text: 'id',
                    width: 110,
                },{
                    dataIndex: 'code',
                    text: '維修報價編碼',
                    width: 110,
                },{
                    dataIndex: 'restoreitemcode',
                    text: '維修項目',
                    width: 110,
                },{
                    dataIndex: 'materialcode',
                    text: '維修商品',
                    width: 110,
                    flex: 1,
                },{
                    dataIndex: 'price',
                    text: '維修報價',
                    width: 110,
                    flex: 1,
                },{
                    dataIndex: 'memberprice',
                    text: '會員價格',
                    width: 110,
                    flex: 1,
                },{
                    dataIndex: 'memo',
                    text: '備註',
                    width: 110,
                    flex: 1,
                },{
                    dataIndex: 'createusercode',
                    text: '建立人員',
                    width: 110,
                },{
                    dataIndex: 'createtm',
                    text: '建立時間',
                    width: 160,
                },{
                    dataIndex: 'modifyusercode',
                    text: '異動人員',
                    width: 110,
                },{
                    dataIndex: 'modifytm',
                    text: '異動時間',
                    width: 160,
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
            // { xtype: 'splitter', margin: -1.5 },
            // {   // 資料維護
            //     xtype: 'panel',
            //     title: '資料維護',
            //     reference: 'panel-40941137-user-manage',
            //     // hidden:true,
            //     layout: {
            //         type: 'vbox',
            //         align: 'stretch',
            //     },
            //     flex: 1,
            //     defaults: {
            //         margin: '0 5 5 5',
            //     },
            //     border: true,
            //     items: [
            //         {   // 基本資料
            //             xtype: 'fieldset',
            //             title: '基本資料',
            //             layout: {
            //                 type: 'vbox',
            //                 align: 'stretch',
            //             },
            //             defaults: {
            //                 margin: '0 0 8 0',
            //             },
            //             items: [{
            //                 xtype: 'numberfield',
            //                 fieldLabel: 'ids',
            //                 reference: 'num-40941137-user-ids',
            //                 labelWidth: 74,
            //                 cls: 'fieldNotInput',
            //             }, {
            //                 xtype: 'textfield',
            //                 fieldLabel: '學號',
            //                 reference: 'txt-40941137-user-code',
            //                 labelWidth: 74,
            //             }, {
            //                 xtype: 'textfield',
            //                 fieldLabel: '姓名',
            //                 reference: 'txt-40941137-user-name',
            //                 labelWidth: 74,
            //             }, {
            //                 xtype: 'textfield',
            //                 fieldLabel: '信箱',
            //                 reference: 'txt-40941137-user-mail',
            //                 labelWidth: 74,
            //             },{
            //                 xtype: 'textfield',
            //                 fieldLabel: '密碼',
            //                 reference: 'txt-40941137-user-password',
            //                 labelWidth: 74,
            //             },{
            //                 xtype: 'textfield',
            //                 fieldLabel: '備註',
            //                 reference: 'txt-40941137-user-memo',
            //                 labelWidth: 74,
            //             },{
            //                 xtype: 'combobox',
            //                 fieldLabel: '狀態',
            //                 reference: 'cmbx-40941137-user-status',
            //                 labelWidth: 74,

            //                 valueField: 'value',
            //                 displayField: 'text',
            //                 queryMode: 'local',
            //                 forceSelection: true,
            //                 anyMatch: true,
            //                 editable: true,
            //                 store: { type: 'status' },

            //                 enableKeyEvents: true,
            //                 listeners: {
            //                     keypress: 'enterSearch'
            //                 },
            //             },{
            //                 xtype: 'textfield',
            //                 fieldLabel: '建立人員',
            //                 reference: 'txt-40941137-user-createusercode',
            //                 disabled: true,
            //                 labelWidth: 74,
            //             },{
            //                 xtype: 'textfield',
            //                 fieldLabel: '建立時間',
            //                 reference: 'txt-40941137-user-createtm',
            //                 disabled: true,
            //                 labelWidth: 74,
            //             },{
            //                 xtype: 'textfield',
            //                 fieldLabel: '異動人員',
            //                 reference: 'txt-40941137-user-modifyusercode',
            //                 labelWidth: 74,
            //             },{
            //                 xtype: 'textfield',
            //                 fieldLabel: '異動時間',
            //                 reference: 'txt-40941137-user-modifytm',
            //                 labelWidth: 74,
            //             },{
            //                 layout: {
            //                     type: 'hbox',
            //                     align: 'stretch', //看不懂
            //                     pack: 'end', //start 靠左 , center 置中 , end 靠右
            //                 },
            //                 // defaults: {
            //                 //     margin: '0 0 8 0',
            //                 // },
            //                 items: [{
            //                     xtype: 'button',
            //                     text: '儲存(F8)',
            //                     reference: 'btn-40941137-user-funcbar-save',
            //                     //cls: 'funcbarBtn-black',
            //                     iconCls: 'fa fa-save',
            //                     margin: 3,
            //                     handler: 'funcbar_save',
            //                 },
            //                 {
            //                     xtype: 'button',
            //                     text: '取消(F9)',
            //                     reference: 'btn-40941137-user-funcbar-cancel',
            //                     //cls: 'funcbarBtn-black',
            //                     iconCls: 'fa fa-times',
            //                     margin: 3,
            //                     handler: 'funcbar_cancel',
            //                 }]
            //             }]
            //         }
            //     ]
            // }
        ]
    }]
});
