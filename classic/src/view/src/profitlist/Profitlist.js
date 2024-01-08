Ext.define('antnex.view.src.profitlist.Profitlist', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.view.src.profitlist.ProfitlistController',
    ],
    alias: 'widget.profitlist',
    controller: 'profitlist',
    border: false,
    scrollable: true,

    title: '毛利統計表',

    layout: {
        type: 'vbox', // vbox 垂直 , hbox 水平
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
                        reference: 'btn-profitlist-funcbar-search',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-search',
                        margin: 3,
                        handler: 'funcbar_search',
                    },
                    { xtype: 'tbseparator', margin: '8 1' },
                    {
                        xtype: 'funcbarButton',
                        text: '列印',
                        reference: 'btn-profitlist-funcbar-print',
                        cls: 'funcbarBtn-black',
                        iconCls: 'fa fa-print',
                        margin: 3,
                        handler: 'funcbar_print',
                    },                    
                ]
            }, {   // 查詢列
                xtype: 'antPanel',
                reference: 'panel-profitlist-searchbar',
                layout: {
                    type: 'hbox',
                    align: 'stretch',
                },
                defaults: {
                    margin: '0 0 5 5',
                },
                scrollable: true,
                items: [
                    {   // 銷售日期查詢
                        xtype: 'antFieldset',
                        title: '銷售日期',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            // labelWidth: 37,
                            margin: '0 0 8 5',
                        },
                        items: [{
                            xtype: 'antDatefield',
                            fieldLabel: '開始日期',
                            reference: 'date-profitlist-searchbar-startdate',
                            //width: 150,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            //margin: '0 0 8 0',
                        }, {
                            xtype: 'antDatefield',
                            fieldLabel: '結束日期',
                            reference: 'date-profitlist-searchbar-enddate',
                            //width: 150,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            //margin: '0 0 8 0',
                        },]
                    }, {   // 門市查詢
                        xtype: 'antFieldset',
                        title: '門市查詢',
                        layout: {
                            type: 'hbox',
                            // align: 'stretch'
                        },
                        defaults: {
                            labelWidth: 65,
                            margin: '0 0 8 5',
                        },
                        items: [{
                            xtype: 'antTagfield',
                            fieldLabel: '門市查詢',
                            reference: 'tag-profitlist-searchbar-branch',
                            width: 250,
                            store: {
                                fields: ['id', 'name'],
                                data: [
                                    { id: 1, name: '店家1' },
                                    { id: 2, name: '店家2' },
                                    { id: 3, name: '店家3' },
                                ]
                            },
                            displayField: 'name', // 顯示名稱
                            valueField: 'id', // 實際值
                        },{
                            xtype: 'antButton',
                            scale: 'small',
                            cls: 'antBtn-blue',
                            iconCls: 'fa fa-search',
                            border: false,
                            handler: '',
                        },]
                    }, {   // 員工查詢
                        xtype: 'antFieldset',
                        title: '員工查詢',
                        layout: {
                            type: 'hbox',
                            // align: 'stretch'
                        },
                        defaults: {
                            labelWidth: 65,
                            margin: '0 0 8 5',
                        },
                        items: [{
                            xtype: 'antTagfield',
                            fieldLabel: '員工查詢',
                            reference: 'tag-profitlist-searchbar-user',
                            width: 250,
                            store: {
                                fields: ['id', 'name'],
                                data: [
                                    { id: 1, name: '員工1' },
                                    { id: 2, name: '員工2' },
                                    { id: 3, name: '陳嘉笙' },
                                ]
                            },
                            displayField: 'name', // 顯示名稱
                            valueField: 'id', // 實際值
                        },{
                            xtype: 'antButton',
                            scale: 'small',
                            cls: 'antBtn-blue',
                            iconCls: 'fa fa-search',
                            border: false,
                            handler: '',
                        },]
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
                        margin: '10 0 5 15',
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
                    {
                        xtype: 'antButton',
                        text: '匯出',
                        scale: 'small',
                        cls: 'antBtn-yellow',
                        iconCls: 'fa fa-share-square',
                        width: 60,
                        border: false,
                        handler: '',
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
        minHeight: 500, //頁面最小高度
        flex: 1,
        scrollable: true,
        items: [
            {   // 報表欄位
                xtype: 'antGridpanel',
                title: '報表欄位',
                reference: 'grid-profitlist-list',
                // bufferedRenderer: false,
                // runInViewport: false,
                viewConfig: {
                    enableTextSelection: true,
                },
                store: {},
                minWidth: 200,
                flex: 1,
                // listeners: {
                //     selectionchange: 'onSelectBranch',
                // },
                columns: [
                    //     {
                    //     xtype: 'rownumberer',
                    //     align: 'center',
                    //     width: 30,
                    // }, 
                    {
                        xtype: 'antColumn',
                        dataIndex: 'branchcode',
                        text: '銷售門市編號',
                        width: 110,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'branchname',
                        text: '銷售門市',
                        width: 110,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'branchname',
                        text: '銷售門市',
                        width: 110,
                    }, {
                        xtype: 'antColumn',
                        text: '人員',
                        flex: 1,
                        minWidth: 300,
                        columns: [{
                            xtype: 'antColumn',
                            dataIndex: 'rausercode',
                            text: '接單人員編號',
                            width: 110,
                        }, {
                            xtype: 'antColumn',
                            dataIndex: 'rausername',
                            text: '接單人員',
                            width: 110,
                        }, {
                            xtype: 'antColumn',
                            dataIndex: 'usercode',
                            text: '銷售人員編號',
                            width: 110,
                        }, {
                            xtype: 'antColumn',
                            dataIndex: 'username',
                            text: '銷售人員',
                            width: 110,
                        }, {
                            xtype: 'antColumn',
                            dataIndex: 'refundusercode',
                            text: '銷退人員編號',
                            width: 110,
                        }, {
                            xtype: 'antColumn',
                            dataIndex: 'refundusername',
                            text: '銷退人員',
                            width: 110,
                        },
                        ],
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'tradetime',
                        text: '交易時間(結帳時間)',
                        width: 160,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'formcode',
                        text: '單別',
                        width: 50,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'ordercode',
                        text: '單據號碼',
                        width: 110,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'refundordercode',
                        text: '銷退單號',
                        width: 140,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'originordercode',
                        text: '原銷售單號',
                        width: 110,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'profit',
                        text: '銷售毛利(A)',
                        width: 140,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'commissionpercent',
                        text: '專櫃抽佣',
                        width: 110,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'commissionamount',
                        text: '專櫃成本(B)',
                        width: 110,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'creditfee',
                        text: '刷卡手續費(C)',
                        width: 120,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'netincome',
                        text: '銷售淨利(D=A-B-C)',
                        width: 160,
                        // renderer: function (value,meta,record) {
                        //     let store = Ext.getCmp('antGridpanel').getStore();
                        //     let record = store.getRange().find(e => e.get('value') == value);
                        //     return record ? record.get('text') : `無法辨識: ${value}`;
                        // },
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'promotionprofit',
                        text: '販促回補毛利(E)',
                        width: 140,
                    }, {
                        xtype: 'antColumn',
                        text: '業務毛利',
                        flex: 1,
                        minWidth: 300,
                        columns: [{
                            xtype: 'antColumn',
                            dataIndex: 'businessprofit',
                            text: '整單(F=D+E)',
                            width: 110,
                        }, {
                            xtype: 'antColumn',
                            dataIndex: 'raprofit',
                            text: '接單人員',
                            width: 110,
                        }, {
                            xtype: 'antColumn',
                            dataIndex: 'rfprofit',
                            text: '銷售人員',
                            width: 110,
                        },
                        ],
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'cost',
                        text: '銷售成本',
                        width: 110,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'commissiontotalamount',
                        text: '佣金總計',
                        width: 110,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'prepayamount',
                        text: '預繳金額',
                        width: 110,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'paycash',
                        text: '現金支付(動態欄位，由systag產生)',
                        width: 140,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'usecashpoints',
                        text: '點數折抵(G)',
                        width: 110,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'cashincome',
                        text: '收現金額(H)',
                        width: 140,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'creditamount',
                        text: '刷卡金額(I)',
                        width: 110,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'digitalpayment',
                        text: '電子支付(J)',
                        width: 110,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'invoiceamount',
                        text: '實收金額(K=G+H+I+J)',
                        width: 170,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'invoiceno',
                        text: '發票號碼(起～訖)',
                        width: 140,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'printamount',
                        text: '發票開立金額',
                        width: 110,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: '',
                        text: '前台備註',
                        width: 140,
                    }, {
                        xtype: 'antColumn',
                        dataIndex: 'webmemo',
                        text: '後台備註',
                        width: 110,
                    }]
            },      
        ]
    }]
});
