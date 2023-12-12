Ext.define('antnex.subsystem.40941137.dailyreport.dailyreport', {
    extend:'Ext.panel.Panel',
    requires:[
        'antnex.subsystem.40941137.dailyreport.dailyreportController',
    ],
    alias:'widget.dailyreport',
    controller:'dailyreport',

    title:'工作日報表',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        // afterrender: 'onInitialize',
        // activate: 'onActivate',
    },

    dockedItems: [{
        xtype: 'antPanel',
        // layout: {
        //     type: 'vbox',
        //     align: 'stretch'
        // },
        dock: 'top',
        margin: 0,
        items: [
            {   // 查詢列
                xtype: 'antPanel',
                reference: 'panel-40941137-user-searchbar',
                layout: {
                    type: 'hbox',
                    align: 'stretch',
                },
                defaults: {
                    margin: '0 0 5 5',
                },
                scrollable: true,
                items: [// 查詢條件
                    {   
                        xtype: 'antFieldset',
                        title: '查詢條件',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults: {
                            labelWidth: 37,
                            margin: '0 0 8 0',
                        },
                        items: [{
                            xtype: 'antDatefield',
                            fieldLabel: '日期',
                            reference: 'date-40941137-user-searchbar-date',
                            emptyText: '請輸入日期',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            margin: '0 10 8 0',
                        }, {
                            xtype: 'antCombobox',
                            fieldLabel: '門市',
                            reference: 'cmbx-40941137-user-searchbar-store',
                            emptyText: '請輸入門市',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        },]
                    },{ 
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
                    },{
                        xtype: 'antButton',
                        text: '列印',
                        scale: 'small',
                        cls: 'antBtn-gray',
                        iconCls: 'fa fa-print',
                        width: 60,
                        border: false,
                        handler: 'cleanSearch',
                        margin: '10 0 5 5',
                    },
                    
                ],
            },
        ]
    }],
    scrollable: true,
    items: [{
        xtype: 'antPanel',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        margin: 5,
        minHeight: 500,
        flex: 1,
        scrollable: true,
        items: [
            {   // 工作日報表
                xtype: 'panel',
                title: '工作日報表',
                reference: 'panel-40941137-dailyreport-manage',
                // hidden:true,
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                },
                flex: 3,
                defaults: {
                    margin: '0 5 5 5',
                },
                border: true,
                items: [
                    {   // 第一排
                            xtype: 'antPanel',
                            layout: {
                                type: 'hbox',
                                // align: 'stretch',
                            },
                            defaults: {
                                margin: '10 0 0 8',
                            },
                            items: [{
                                xtype: 'antTextfield',
                                fieldLabel: '交易時間',
                                reference: 'txt-40941137-dailyreport-tradetime',
                                labelWidth: 62,
                                cls: 'fieldNotInput',
                            }, {
                                xtype: 'antTextfield',
                                fieldLabel: '門市名稱',
                                reference: 'txt-40941137-dailyreport-branchname',
                                labelWidth: 62,
                                cls: 'fieldNotInput',
                            },{
                                xtype: 'antTextfield',
                                fieldLabel: '日結人員',
                                reference: 'txt-40941137-dailyreport-username',
                                labelWidth: 62,
                                cls: 'fieldNotInput',
                            },{
                                xtype: 'antTextfield',
                                fieldLabel: '狀態',
                                reference: 'txt-40941137-dailyreport-status',
                                labelWidth: 34,
                                cls: 'fieldNotInput',
                            },]
                    },{ // 第二排
                        xtype: 'antPanel',
                        layout: {
                            type: 'hbox',
                            align: 'stretch',
                        },
                        defaults: {
                            margin: '0 5 5 5',
                        },
                        items:[
                            {   // 銷售
                                xtype: 'antFieldset',
                                title: '銷售',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch',
                                },
                                defaults: {
                                    margin: '0 0 8 0',
                                },
                                items: [{
                                    xtype: 'antTextfield',
                                    fieldLabel: '總額',
                                    reference: 'txt-40941137-dailyreport-saletotal',
                                    labelWidth: 34,
                                }, {
                                    xtype: 'antTextfield',
                                    fieldLabel: '筆數',
                                    reference: 'txt-40941137-dailyreport-salerows',
                                    labelWidth: 34,
                                }, {
                                    xtype: 'antTextfield',
                                    fieldLabel: '現金',
                                    reference: 'txt-40941137-dailyreport-salecash',
                                    labelWidth: 34,
                                },{
                                    xtype: 'antTextfield',
                                    fieldLabel: '刷卡',
                                    reference: 'txt-40941137-dailyreport-salecredit',
                                    labelWidth: 34,
                                },{
                                    xtype: 'antTextfield',
                                    fieldLabel: '電付',
                                    reference: 'txt-40941137-dailyreport-salepayonline',
                                    labelWidth: 34,
                                },
                                ]
                            },{   // 銷退
                                xtype: 'antFieldset',
                                title: '銷退',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch',
                                },
                                defaults: {
                                    margin: '0 0 8 0',
                                },
                                items: [{
                                    xtype: 'antTextfield',
                                    fieldLabel: '總額',
                                    reference: 'txt-40941137-dailyreport-btobrefundtotal',
                                    labelWidth: 34,
                                }, {
                                    xtype: 'antTextfield',
                                    fieldLabel: '筆數',
                                    reference: 'txt-40941137-dailyreport-btobrefundrows',
                                    labelWidth: 34,
                                }, {
                                    xtype: 'antTextfield',
                                    fieldLabel: '現金',
                                    reference: 'txt-40941137-dailyreport-btobrefundcash',
                                    labelWidth: 34,
                                },{
                                    xtype: 'antTextfield',
                                    fieldLabel: '刷卡',
                                    reference: 'txt-40941137-dailyreport-btobrefundcredit',
                                    labelWidth: 34,
                                },{
                                    xtype: 'antTextfield',
                                    fieldLabel: '電付',
                                    reference: 'txt-40941137-dailyreport-btobrefundpayonline',
                                    labelWidth: 34,
                                },
                                ]
                            },{   // 店務收支
                                xtype: 'antFieldset',
                                title: '店務收支',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch',
                                },
                                defaults: {
                                    margin: '0 0 8 0',
                                },
                                items: [{
                                    xtype: 'antTextfield',
                                    fieldLabel: '現金',
                                    reference: 'txt-40941137-dailyreport-revenueexpenditurecash',
                                    labelWidth: 34,
                                }, {
                                    xtype: 'antTextfield',
                                    fieldLabel: '刷卡',
                                    reference: 'txt-40941137-dailyreport-revenueexpenditurecredit',
                                    labelWidth: 34,
                                }, {
                                    xtype: 'antTextfield',
                                    fieldLabel: '電付',
                                    reference: 'txt-40941137-dailyreport-revenueexpenditurepayonline',
                                    labelWidth: 34,
                                },
                                ]
                            },
                        ]
                    },{ // 第三排
                        xtype: 'antPanel',
                        layout: {
                            type: 'hbox',
                            align: 'stretch',
                        },
                        defaults: {
                            margin: '0 5 5 5',
                        },
                        items:[
                            {   // 出貨
                                xtype: 'antFieldset',
                                title: '出貨',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch',
                                },
                                defaults: {
                                    margin: '0 0 8 0',
                                },
                                items: [{
                                    xtype: 'antTextfield',
                                    fieldLabel: '筆數',
                                    reference: 'txt-40941137-dailyreport-btobtxcnt',
                                    labelWidth: 34,
                                }, {
                                    xtype: 'antTextfield',
                                    fieldLabel: '總額',
                                    reference: 'txt-40941137-dailyreport-btobtxamount',
                                    labelWidth: 34,
                                }, {
                                    xtype: 'antTextfield',
                                    fieldLabel: '現金',
                                    reference: 'txt-40941137-dailyreport-btobtxcash',
                                    labelWidth: 34,
                                },{
                                    xtype: 'antTextfield',
                                    fieldLabel: '電匯',
                                    reference: 'txt-40941137-dailyreport-btobtxtt',
                                    labelWidth: 34,
                                },{
                                    xtype: 'antTextfield',
                                    fieldLabel: '刷卡',
                                    reference: 'txt-40941137-dailyreport-btobtxcredit',
                                    labelWidth: 34,
                                },{
                                    xtype: 'antTextfield',
                                    fieldLabel: '支票',
                                    reference: 'txt-40941137-dailyreport-btobtxcheque',
                                    labelWidth: 34,
                                },{
                                    xtype: 'antTextfield',
                                    fieldLabel: '電付',
                                    reference: 'txt-40941137-dailyreport-btobtxpayonline',
                                    labelWidth: 34,
                                },
                                ]
                            },{   // 出貨退回
                                xtype: 'antFieldset',
                                title: '出貨退回',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch',
                                },
                                defaults: {
                                    margin: '0 0 8 0',
                                },
                                items: [{
                                    xtype: 'antTextfield',
                                    fieldLabel: '筆數',
                                    reference: 'txt-40941137-dailyreport-btobrefundcnt',
                                    labelWidth: 34,
                                }, {
                                    xtype: 'antTextfield',
                                    fieldLabel: '總額',
                                    reference: 'txt-40941137-dailyreport-btobrefundamount',
                                    labelWidth: 34,
                                }, {
                                    xtype: 'antTextfield',
                                    fieldLabel: '現金',
                                    reference: 'txt-40941137-dailyreport-shipbtobrefundcash',
                                    labelWidth: 34,
                                },{
                                    xtype: 'antTextfield',
                                    fieldLabel: '電匯',
                                    reference: 'txt-40941137-dailyreport-btobrefundtt',
                                    labelWidth: 34,
                                },{
                                    xtype: 'antTextfield',
                                    fieldLabel: '刷卡',
                                    reference: 'txt-40941137-dailyreport-shipbtobrefundcredit',
                                    labelWidth: 34,
                                },{
                                    xtype: 'antTextfield',
                                    fieldLabel: '支票',
                                    reference: 'txt-40941137-dailyreport-btobrefundcheque',
                                    labelWidth: 34,
                                },{
                                    xtype: 'antTextfield',
                                    fieldLabel: '電付',
                                    reference: 'txt-40941137-dailyreport-shipbtobrefundpayonline',
                                    labelWidth: 34,
                                },
                                ]
                            },{   // 資費代收
                                xtype: 'antFieldset',
                                title: '資費代收',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch',
                                },
                                defaults: {
                                    margin: '0 0 8 0',
                                },
                                items: [{
                                    xtype: 'antTextfield',
                                    fieldLabel: '筆數',
                                    reference: 'txt-40941137-dailyreport-collectionrows',
                                    labelWidth: 34,
                                }, {
                                    xtype: 'antTextfield',
                                    fieldLabel: '現金',
                                    reference: 'txt-40941137-dailyreport-amountcollection',
                                    labelWidth: 34,
                                }, {
                                    xtype: 'antTextfield',
                                    fieldLabel: '刷卡',
                                    reference: 'txt-40941137-dailyreport-collectioncredit',
                                    labelWidth: 34,
                                },{
                                    xtype: 'antTextfield',
                                    fieldLabel: '電付',
                                    reference: 'txt-40941137-dailyreport-collectionpayonline',
                                    labelWidth: 34,
                                },
                                ]
                            },
                        ] 
                    },{ // 第四排
                        xtype: 'antPanel',
                        layout: {
                            type: 'hbox',
                            align: 'stretch',
                        },
                        defaults: {
                            margin: '0 5 5 5',
                        },
                        items:[
                            {   // 門市現金營業額
                                xtype: 'antFieldset',
                                title: '門市現金營業額',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch',
                                },
                                defaults: {
                                    margin: '0 0 8 0',
                                },
                                items: [{
                                    xtype: 'antPanel',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                    },
                                    defaults: {
                                        margin: '0 10 8 0',
                                    },
                                    items: [{// 第一排
                                        xtype: 'antTextfield',
                                        fieldLabel: '銷售單收現金額',
                                        reference: 'txt-40941137-dailyreport-transaction',
                                    },{
                                        xtype: 'antTextfield',
                                        fieldLabel: '　　出貨現金',
                                        reference: 'txt-40941137-dailyreport-delivery',
                                    },{
                                        xtype: 'antTextfield',
                                        fieldLabel: '支付總額',
                                        reference: 'txt-40941137-dailyreport-paycash',
                                    },{
                                        xtype: 'antTextfield',
                                        fieldLabel: '實收現金',
                                        reference: 'txt-40941137-dailyreport-branchcash',
                                    },]
                                },{
                                    xtype: 'antPanel',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                    },
                                    defaults: {
                                        margin: '0 10 8 0',
                                    },
                                    items: [{// 第二排
                                        xtype: 'antTextfield',
                                        fieldLabel: '銷售單退現金額',
                                        reference: 'txt-40941137-dailyreport-transactionrefund',
                                    },{
                                        xtype: 'antTextfield',
                                        fieldLabel: '出貨退回現金',
                                        reference: 'txt-40941137-dailyreport-btobrefund',
                                    },{
                                        xtype: 'antTextfield',
                                        fieldLabel: '資費代收',
                                        reference: 'txt-40941137-dailyreport-feeprojectcollection',
                                    },{
                                        xtype: 'antTextfield',
                                        fieldLabel: '誤差現金',
                                        reference: 'txt-40941137-dailyreport-cashdiffer',
                                    },]
                                },{
                                    xtype: 'antPanel',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                    },
                                    defaults: {
                                        margin: '0 10 8 0',
                                    },
                                    items: [{// 第三排
                                        xtype: 'antTextfield',
                                        fieldLabel: '　前日現金餘額',
                                        reference: 'txt-40941137-dailyreport-remaining',
                                    },{
                                        xtype: 'antTextfield',
                                        fieldLabel: '　現金營業額',
                                        reference: 'txt-40941137-dailyreport-dailycash',
                                    },]
                                }
                                ]
                            },
                        ] 
                    },{ // 第五排
                        xtype: 'antPanel',
                        layout: {
                            type: 'hbox',
                            align: 'stretch',
                        },
                        defaults: {
                            margin: '10 0 0 8',
                        },
                        items: [{
                            xtype: 'antTextfield',
                            fieldLabel: '備註',
                            reference: 'txt-40941137-dailyreport-memo',
                            labelWidth: 34,
                            width: 1072,
                        },]
                    }
                ],
            },
            { xtype: 'splitter', margin: -1.5 },
            {   // 資料維護
                xtype: 'panel',
                title: '資料維護',
                reference: 'panel-40941137-dailyreport-search',
                bufferedRenderer: false,
                runInViewport: false,
                viewConfig: {
                    enableTextSelection: true,
                },
                border: true,
                store: {},
                minWidth: 200,
                flex: 1, //比例
                listeners: {
                    selectionchange: 'onSelectdailyreport',
                },
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                },
                defaults: {
                    margin: '0 5 5 5',
                },
                border: true,
                items: [
                    {   // 所屬功能
                        xtype: 'antPanel',
                        reference: 'panel-40941137-user-searchbar',
                        layout: {
                            type: 'vbox',
                            align: 'stretch',
                        },
                        defaults: {
                            labelAlign: 'top',
                            labelStyle: '',
                            labelSeparator: '',
                            margin: '0 0 5 5',
                        },
                        scrollable: true,
                        items: [
                            {    // 所屬功能
                                xtype: 'antCombobox',
                                fieldLabel: '所屬功能',
                                margin: '5 0 8 0',
                            },{  // 參數編碼
                                xtype: 'antTextfield',
                                fieldLabel: '參數編碼',
                                margin: '0 0 8 0',
                            },{  // 參數名稱
                                xtype: 'antTextarea',
                                fieldLabel: '參數名稱',
                                margin: '0 0 8 0',
                            },{  // 資料類型
                                xtype: 'antCombobox',
                                fieldLabel: '資料類型',
                                margin: '0 0 8 0',
                            },{  // 資料數量
                                xtype: 'antTextfield',
                                fieldLabel: '資料數量',
                                margin: '0 0 8 0',
                            },{  // 值
                                xtype: 'antCombobox',
                                fieldLabel: '值',
                                margin: '0 0 8 0',
                            },{  // 拋磚預設值
                                xtype: 'antCombobox',
                                fieldLabel: '拋磚預設值',
                                margin: '0 0 8 0',
                            }
                        ],
                    },
                ],       
            },
        ]
    }]
});