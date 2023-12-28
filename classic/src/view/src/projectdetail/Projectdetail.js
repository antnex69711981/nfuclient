Ext.define('antnex.view.src.projectdetail.Projectdetail', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.view.src.projectdetail.ProjectdetailController',
    ],
    alias: 'widget.projectdetail',
    controller: 'projectdetail',
    border: false,

    title: '專案銷售明細表',

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
                        reference: 'btn-projectdetail-funcbar-search',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-search',
                        margin: 3,
                        handler: 'funcbar_search',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '匯出',
                        reference: 'btn-projectdetail-funcbar-export',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-share-square',
                        margin: 3,
                        //handler: 'funcbar_Add',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '儲存',
                        reference: 'btn-projectdetail-funcbar-save',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-save',
                        margin: 3,
                        //handler: 'funcbar_save',
                    },
                    {
                        xtype: 'funcbarButton',
                        text: '取消',
                        reference: 'btn-projectdetail-funcbar-cancel',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-times',
                        margin: 3,
                        handler: 'funcbar_cancel',
                    },
                    /* { xtype: 'tbseparator', margin: '8 1' },
                     {
                         xtype: 'funcbarButton',
                         text: '批次修改',
                         reference: 'btn-projectdetail-funcbar-save',
                         cls: 'funcbarBtn-black',
                         iconCls: 'fa fa-edit',
                         margin: 3,
                         handler: 'funcbar_save',
                     },*/
                    /*{ xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '檢視單據明細',
                        reference: 'btn-projectdetail-funcbar-cancel',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-file',
                        margin: 3,
                        handler: 'funcbar_cancel',
                    },*/
                ]
            },
            {   // 查詢列
                xtype: 'panel',
                reference: 'panel-projectdetail-searchbar',
                layout: {
                    type: 'hbox',
                    align: 'stretch',
                },
                defaults: {
                    margin: '0 0 5 5',
                    height: 260,
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
                            labelWidth: 65,
                            margin: '0 5 8 10',
                            // defaults:{
                            //     margin:'0 5 0 0'
                            // }

                        },

                        items: [
                            {//日期類型
                                xtype: 'antCombobox',
                                fieldLabel: '日期類型',
                                reference: 'cmbx-projectdetail-searchbar-datetype',
                                valueField: 'value',
                                displayField: 'text',
                                queryMode: 'local',
                                forceSelection: true,
                                anyMatch: true,
                                editable: false,
                                store: {},

                                margin: '0 10 8 5',
                                margin: '0 0 8 0',

                                enableKeyEvents: true,
                                listeners: {
                                    keypress: 'enterSearch'
                                },

                            }, {//開始日期
                                xtype: 'antDatefield',
                                fieldLabel: '開始日期',
                                reference: 'date-projectdetail-searchbar-startdate',
                                //emptyText: '請輸入姓名',
                                margin: '0 10 8 5',
                                margin: '0 0 8 0',
                                enableKeyEvents: true,
                                //flex:1,
                                value: new Date()
                                // listeners: {
                                //     keypress: 'enterSearch'
                                // },
                            }, {//結束日期
                                xtype: 'antDatefield',
                                fieldLabel: '結束日期',
                                reference: 'date-projectdetail-searchbar-enddate',
                                //emptyText: '請輸入姓名',
                                margin: '0 10 8 5',
                                margin: '0 0 8 0',
                                enableKeyEvents: true,
                                // flex:1,
                                value: new Date()
                                // listeners: {
                                //     keypress: 'enterSearch'
                                // },
                            }, {//電信商
                                xtype: 'antTagfield',
                                fieldLabel: '電信商',
                                reference: 'tag-projectdetail-searchbar-tele',
                                store: {
                                    data: [
                                        { id: 0, show: 'A' },
                                        { id: 1, show: 'B' },
                                        { id: 2, show: 'C' },
                                        { id: 3, show: 'D' },
                                        { id: 4, show: 'E' },
                                        { id: 5, show: 'F' }
                                    ]
                                },
                                displayField: 'show',
                                valueField: 'id',
                                queryMode: 'local',
                                filterPickList: true,
                                margin: '0 10 8 5',
                                margin: '0 0 8 0',
                                height: 95,
                                width: 250,
                                enableKeyEvents: true,
                                listeners: {
                                    keypress: 'enterSearch'
                                },
                                //margin: '0 10 8 5',

                            }, {//盤商
                                xtype: 'antTagfield',
                                fieldLabel: '盤商',
                                reference: 'tag-projectdetail-searchbar-dealer',

                                store: {
                                    data: [
                                        { id: 0, show: 'A' },
                                        { id: 1, show: 'B' },
                                        { id: 2, show: 'C' },
                                        { id: 3, show: 'D' },
                                        { id: 4, show: 'E' },
                                        { id: 5, show: 'F' }
                                    ]
                                },
                                displayField: 'show',
                                valueField: 'id',
                                queryMode: 'local',
                                filterPickList: true,
                                margin: '0 10 8 5',
                                margin: '0 0 8 0',
                                height: 30,
                                width: 250,
                                enableKeyEvents: true,
                                listeners: {
                                    keypress: 'enterSearch'
                                },
                                //margin: '0 10 8 5',

                            }
                        /*{
                            xtype: 'combobox',
                            fieldLabel: '狀　　態',
                            reference: 'cmbx-projectdetail-searchbar-status',

                            valueField: 'value',
                            displayField: 'text',
                            queryMode: 'local',
                            forceSelection: true,
                            anyMatch: true,
                            editable: false,
                            store: { },

                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            margin: '0 10 8 5',
                            
                        }*/]
                    },
                    {   //門市、銷售員查詢、出貨客戶查詢
                        xtype: 'panel',
                        //reference: 'panel-projectdetail-searchbar',
                        layout: {
                            type: 'vbox',
                            align: 'stretch',
                        },

                        items: [
                            {//門市、銷售員查詢
                                xtype: 'antFieldset',
                                title: '門市、銷售人員查詢',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch',
                                },
                                // defaults: {
                                //     labelWidth: 65 ,
                                //     margin: '0 5 8 10',
                                //     // defaults:{
                                //     //     margin:'0 5 0 0'
                                //     // }
                                // },
                                items: [
                                    { // 門市查詢
                                        xtype: 'panel',
                                        //reference: 'panel-projectdetail-addbar',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch',
                                        },
                                        // defaults: {
                                        //     margin: '0 0 5 5',
                                        // },
                                        items: [{
                                            xtype: 'antTagfield',

                                            reference: 'tag-projectdetail-searchbar-store',
                                            store: {},
                                            // displayField: 'show',
                                            // valueField: 'id',
                                            // queryMode: 'local',
                                            filterPickList: true,
                                            readOnly: true,
                                            margin: '0 10 8 5',
                                            //margin: '0 0 8 0',
                                            height: 60,
                                            width: 200,



                                        }, {//查詢button
                                            xtype: 'antButton',
                                            text: '門市查詢',
                                            //scale: 'small',
                                            //cls: 'antBtn-blue',
                                            //iconCls: 'fa fa-search',
                                            //height: 45,

                                            flex: 1,
                                            border: false,
                                            //handler: 'doSearch',
                                            margin: '0 5 8 0',
                                            //margin: '0 0 8 0',
                                        },

                                        ]


                                    }, { // 員工查詢
                                        xtype: 'panel',
                                        //reference: 'panel-projectdetail-addbar',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch',
                                        },
                                        // defaults: {
                                        //     margin: '0 0 5 5',
                                        // },
                                        items: [{
                                            xtype: 'antTagfield',
                                            //fieldLabel: '電信商',
                                            reference: 'tag-projectdetail-searchbar-employee',
                                            store: {},
                                            // displayField: 'show',
                                            // valueField: 'id',
                                            // queryMode: 'local',
                                            filterPickList: true,
                                            readOnly: true,
                                            margin: '0 10 8 5',
                                            height: 60,
                                            width: 200,
                                            //margin: '0 0 8 0',


                                            // enableKeyEvents: true,
                                            // listeners: {
                                            //     keypress: 'enterSearch'
                                            // },
                                            //margin: '0 10 8 5',

                                        }, {//查詢button
                                            xtype: 'antButton',
                                            text: '員工查詢',
                                            //scale: 'small',
                                            //cls: 'antBtn-blue',
                                            //iconCls: 'fa fa-search',
                                            //height: 60,

                                            flex: 1,
                                            border: false,
                                            //handler: 'doSearch',
                                            margin: '0 5 8 0',
                                            //margin: '0 0 8 0',
                                        },

                                        ]


                                    }

                                ]

                            }, {//出貨客戶查詢
                                xtype: 'antFieldset',
                                title: '出貨客戶查詢',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                defaults: {
                                    labelWidth: 65,
                                    margin: '0 5 8 10',
                                    // defaults:{
                                    //     margin:'0 5 0 0'
                                    // }
                                },

                                items: [
                                    {
                                        xtype: 'antTagfield',

                                        reference: 'tag-projectdetail-searchbar-ship',
                                        store: {},
                                        // displayField: 'show',
                                        // valueField: 'id',
                                        // queryMode: 'local',
                                        filterPickList: true,
                                        readOnly: true,
                                        margin: '0 10 8 5',
                                        //margin: '0 0 8 0',
                                        height: 60,
                                        width: 200,

                                    }, {//查詢button
                                        xtype: 'antButton',
                                        text: '客戶查詢',
                                        //scale: 'small',
                                        //cls: 'antBtn-blue',
                                        //iconCls: 'fa fa-search',
                                        //height: 45,

                                        flex: 1,
                                        border: false,
                                        //handler: 'doSearch',
                                        margin: '0 5 8 0',
                                        //margin: '0 0 8 0',
                                    },]

                            }
                        ]

                    },
                    {   //門號、SIM、退佣狀態查詢
                        xtype: 'panel',
                        //reference: 'panel-projectdetail-searchbar',
                        layout: {
                            type: 'vbox',
                            align: 'stretch',
                        },
                        items: [
                            {//門號、SIM
                                xtype: 'antFieldset',
                                title: '門號、SIM',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch',
                                },
                                defaults: {
                                    labelWidth: 65,
                                    margin: '0 5 0 10',
                                    // defaults:{
                                    //     margin:'0 5 0 0'
                                    // }
                                },
                                items: [
                                    {
                                        xtype: 'antTextfield',
                                        fieldLabel: '門號',
                                        reference: 'txt-11261103-user-searchbar-phone',

                                        enableKeyEvents: true,
                                        listeners: {
                                            keypress: 'enterSearch'
                                        },
                                        margin: '0 0 8 0',
                                    }, {
                                        xtype: 'antTextfield',
                                        fieldLabel: 'SIM',
                                        reference: 'txt-11261103-user-searchbar-SIM',

                                        enableKeyEvents: true,
                                        listeners: {
                                            keypress: 'enterSearch'
                                        },
                                        margin: '0 0 8 0',
                                    },

                                ]

                            }, {//退佣狀態查詢
                                xtype: 'antFieldset',
                                title: '退佣狀態查詢',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                defaults: {
                                    labelWidth: 65,
                                    margin: '0 5 8 10',
                                    // defaults:{
                                    //     margin:'0 5 0 0'
                                    // }
                                },
                                items: [
                                    {
                                        xtype: 'antCombobox',
                                        fieldLabel: '退佣狀態',
                                        reference: 'cmbx-projectdetail-searchbar-status',

                                        valueField: 'value',
                                        displayField: 'text',
                                        queryMode: 'local',
                                        forceSelection: true,
                                        anyMatch: true,
                                        editable: false,
                                        store: {
                                            fild: ['value', 'text'],
                                            data: [
                                                { value: 1, text: '未核佣' },
                                                { value: 2, text: '已核佣' },
                                                { value: 3, text: '不核佣' },
                                            ]
                                        },

                                        enableKeyEvents: true,
                                        listeners: {
                                            keypress: 'enterSearch'
                                        },
                                        margin: '7 10 8 5',

                                    }
                                ]

                            }, {
                                xtype: 'panel',
                                //reference: 'panel-projectdetail-addbar',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch',
                                },
                                //height:,
                                flex: 1,
                                items: [
                                    {//查詢button
                                        xtype: 'searchButton-search',
                                        text: '查詢',
                                        scale: 'small',
                                        cls: 'antBtn-blue',
                                        iconCls: 'fa fa-search',
                                        //width: 60,
                                        flex: 1,
                                        border: false,
                                        handler: 'doSearch',
                                        margin: '20 0 5 0',
                                    },
                                    {//清除button
                                        xtype: 'searchButton-search',
                                        text: '清除',
                                        scale: 'small',
                                        cls: 'antBtn-red',
                                        iconCls: 'fa fa-times',
                                        //width: 60,
                                        flex: 1,
                                        border: false,
                                        handler: 'cleanSearch',
                                        margin: '20 0 5 5',
                                    },

                                ]
                            }
                        ]

                    },

                ]
            },

        ]
    }],
    scrollable: true,
    items: [{//專案銷售明細表
        xtype: 'panel',
        title: '專案銷售明細表',
        layout: {
            type: 'vbox',
            align: 'stretch',

        },
        border: true,
        margin: 5,
        //minHeight: 800,
        flex: 1,
        //maxWidth:1200,
        minWidth: 1000,
        crollable: true,
        items: [
            {
                xtype: 'panel',
                layout: {
                    type: 'hbox',
                    align: 'stretch',
                },
                defaults: {
                    labelWidth: 65,
                    margin: '8 5 8 5',
                    // defaults:{
                    //     margin:'0 5 0 0'
                    // }

                },
                items: [
                    {
                        xtype: 'antCombobox',
                        fieldLabel: '專案類型:',
                        reference: 'cmbx-projectdetail-panel-type',

                        valueField: 'value',
                        displayField: 'text',
                        queryMode: 'local',
                        forceSelection: true,
                        anyMatch: true,
                        editable: false,
                        store: {},

                        enableKeyEvents: true,
                        listeners: {
                            keypress: 'enterSearch'
                        },
                        // margin: '8 5 8 5',

                    }, {
                        xtype: 'antTextfield',
                        fieldLabel: '關鍵字:',
                        reference: 'txt-projectdetail-panel-keyword',
                        enableKeyEvents: true,
                        listeners: {
                            keypress: 'enterSearch'
                        },
                    },
                    {//進階過濾button
                        xtype: 'antButton',
                        text: '進階過濾',
                        scale: 'small',
                        cls: 'antBtn-blue',
                        iconCls: 'fa fa-filter',
                        width: 80,
                        //flex:1,
                        border: false,
                        // handler: 'cleanSearch',
                        // margin: '20 0 5 5',
                    },
                    {//清除button
                        xtype: 'antButton',
                        text: '清除',
                        scale: 'small',
                        cls: 'antBtn-red',
                        iconCls: 'fa fa-times',
                        width: 80,
                        //flex:1,
                        border: false,
                        handler: 'cleanSearch',
                        // margin: '20 0 5 5',
                    },
                    {//CycleButton'
                        xtype: 'antCycleButton',
                        scale: 'small',

                        width: 100,
                        //flex:1,
                        border: false,
                        margin: '8 0 8 5',
                        menu: {
                            items: [
                                {
                                    text: '原資費金額',
                                    value: '',
                                    checked: true
                                },
                                {
                                    text: '門號點數 ',
                                    value: '',

                                },

                            ]
                        }

                    },
                    {
                        xtype: 'antTextfield',
                        //fieldLabel: '關鍵字:',
                        reference: 'txt-projectdetail-panel-textfield',
                        enableKeyEvents: true,
                        listeners: {
                            keypress: 'enterSearch'
                        },
                        margin: '8 5 8 0',

                    },
                    {
                        xtype: 'antButton',
                        text: '批次修改',
                        reference: 'btn-projectdetail-btn-edit',
                        scale: 'small',
                        cls: 'antBtn-blue',
                        //margin: 3,
                        //handler: 'funcbar_save',
                    },

                ]

            },
            {   // 使用者清單
                xtype: 'antGridpanel',
                //title: '使用者清單',
                reference: 'grid-projectdetail-projectdetaillist',
                //bufferedRenderer: false,
                //runInViewport: false,
                selModel: {
                    selType: '',
                    // grid.selModel.setSelectionMode('SINGLE'); // 單選(SINGLE), 複選(MULTI)
                },
                viewConfig: {
                    enableTextSelection: true,
                },
                border: false,
                store: {},
                flex: 1,
                //minWidth:1200,
                scrollable: true,
                listeners: {
                    selectionchange: 'onSelectprojectdetail',
                },
                columns: [
                    {
                        xtype: 'rownumberer',
                        align: 'center',
                        width: 50,
                    }, {
                        dataIndex: '',
                        text: '檢視單據明細',
                        align: 'center',
                        width: 100,
                        items: [{
                            iconCls: 'fa fa-file fa-2x x-action-col-icon-green',
                            // tooltip: '下載檔案',
                            align: 'center',
                            /*handler: function(obj, rowIndex, colIndex, item, e, record) {
                                var src = `${antnex.AppDefaults.getFrsurl()}/s/v1/frs2003?hashid=${record.get('minorfilename')}.${record.get('minoruploadname').split('.').pop()}&m=d`;
                                window.open(src);
                            },
                            isActionDisabled: function(view, rowIndex, colIndex, Item, record) {
                                if (record.data.minorfilename != "") {
                                    Item.iconCls = 'fa fa-download fa-2x x-action-col-icon-green';
                                    return false;
                                } else {
                                    Item.iconCls = 'fa fa-download fa-2';
                                    return true;
                                }
                            }*/
                        }],
                    }, {
                        dataIndex: 'ordercode',
                        text: '銷售單號',
                        //width: 110,
                    }, {
                        dataIndex: 'contractcode',
                        text: '正本編號',
                        // width: 110,
                    }, {
                        dataIndex: 'tradedate',
                        text: '銷售日期',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'branchcode',
                        text: '銷售門市編號',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'branchname',
                        text: '銷售門市',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'usercode',
                        text: '銷售人員編號',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'username',
                        text: '銷售人員',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'ordervendorname',
                        text: '出貨客戶',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'customername',
                        text: '客戶姓名',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'sim',
                        text: '上線SIM',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'phone',
                        text: '上線門號',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'telecode',
                        text: '電信商',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'telecode',
                        text: '盤商',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'tradetype',
                        text: '交易類型',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'prjname',
                        text: '專案類型',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'originprjprice',
                        text: '原專案價',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'prjpricediscount',
                        text: '專案折價',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'sysprjprice',
                        text: '報價系統專案價',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'specialdiscount',
                        text: '專案特殊折價',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'internalcontentprjprice',
                        text: '加值調整專案價',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'netprjprice',
                        text: '專案價淨額',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'attributes',
                        text: '主專案屬性',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'attributes',
                        text: '門號資格',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'prjcaption',
                        text: '專案名稱',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'qty',
                        text: '銷量',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'profit2',
                        text: '銷售毛利',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'branchcommission',
                        text: '門市抽佣',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'profit',
                        text: '還原後毛利',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'materialcode',
                        text: '實銷商品品號',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'goodname',
                        text: '實銷商品',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'imei',
                        text: '實銷商品IMEI',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'cost',
                        text: '實銷商品成本',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'prjgoodname',
                        text: '專案機',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'onlinematerialcode',
                        text: '上線專案機品號',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'onlinegoodname',
                        text: '上線專案機名稱',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'onlineimei',
                        text: '上線專案機IMEI',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'onlinegoodcost',
                        text: '上線商品成本',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'prjpurchaseprice',
                        text: '專案進貨價格',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'subonlinematerialcode',
                        text: '上線專案機(二)品號',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'subonlinegoodname',
                        text: '上線專案機(二)名稱',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'subonlineimei',
                        text: '上線專案機(二)IMEI',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'subonline3materialcode',
                        text: '上線專案機(三)品號',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'subonline3goodname',
                        text: '上線專案機(三)名稱',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'subonlineimei3',
                        text: '上線專案機(三)IMEI',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'subonline4materialcode',
                        text: '上線專案機(四)品號',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'subonline4goodname',
                        text: '上線專案機(四)名稱',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'subonlineimei4',
                        text: '上線專案機(四)IMEI',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'plugincost',
                        text: '加掛商品成本',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'dataname',
                        text: '資費名稱',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'feeprice',
                        text: '資費金額',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'originfeeprice',
                        text: '原資費金額',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'feedifference',
                        text: '資費差異',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'projectpoint',
                        text: '門號點數',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'datareward',
                        text: '上網佣金',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'contentreward',
                        text: '加值佣金',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'orginaladding1',
                        text: '原廠加碼1',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'orginaladding2',
                        text: '原廠加碼2',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'orginaladding3',
                        text: '原廠加碼3',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'orginaladding4',
                        text: '原廠加碼4',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'orginaladding5',
                        text: '原廠加碼5',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'orginaladding6',
                        text: '原廠加碼6',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'basereward',
                        text: '基本佣金',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'addingbonus1',
                        text: '調整項1',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'addingbonus2',
                        text: '調整項2',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'addingbonus3',
                        text: '調整項3',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'addingbonus4',
                        text: '調整項4',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'addingbonus5',
                        text: '調整項5',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'addingbonus6',
                        text: '調整項6',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        //dataIndex: 'basereward',
                        text: '佣金抵銷',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'commissiontotal',
                        text: '佣金總計',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'commissiontotal1',
                        text: '原始佣金總計',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'packagereward',
                        text: '非專佣金',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'keepcommission',
                        text: '保留佣金',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'prepaytype',
                        text: '預繳類型',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'prepay',
                        text: '預繳金額',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'promotioncode',
                        text: '促銷代碼',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'agentcode',
                        text: '上線店點',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'onlineusercode',
                        text: '上線人員編碼',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'onlineusername',
                        text: '上線人員',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'ivrcode',
                        text: 'IVR CODE',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'expectonlinedate',
                        text: '預計開通日期',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'onlinedate',
                        text: '上線日期',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'delivertm',
                        text: '送系統商日期',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'teleapplydate',
                        text: '系統申辦日期',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'teleactivedate',
                        text: '系統開通日期',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'approvedstatusStr',
                        text: '退佣狀態',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'telerebatedate',
                        text: '退佣日期',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        //dataIndex: 'telerebatedate',
                        text: '退佣人員',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'memo',
                        text: '品項備註',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'projectmemo',
                        text: '專案銷售備註',
                        minWidth: 150,
                        flex: 1,
                    }, {
                        dataIndex: 'createtm',
                        text: '建立時間',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'modifytm',
                        text: '異動時間',
                        minWidth: 96,
                        flex: 1,
                    },]
            },

        ]
    }]
});
