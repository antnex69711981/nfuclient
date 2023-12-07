Ext.define('antnex.subsystem.40941139.profitstats.profitstats', {
    extend: 'Ext.panel.Panel',
    requires: [
        'antnex.subsystem.40941139.profitstats.profitstatsController',
    ],
    alias: 'widget.profitstats',
    controller: 'profitstats',

    //title: '40941139的使用者',

    layout: {
        type: 'hbox', // vbox 垂直 , hbox 水平
        align: 'stretch'
    },

    listeners: {
        afterrender: 'onInitialize',
        activate: 'onActivate',
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
                reference: 'panel-40941139-profitstats-searchbar',
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
                            reference: 'txt-40941139-profitstats-searchbar-startdate',
                            // emptyText: '請輸入學號',
                            //width: 150,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            //margin: '0 0 8 0',
                        }, {
                            xtype: 'antDatefield',
                            fieldLabel: '結束日期',
                            reference: 'txt-40941139-profitstats-searchbar-enddate',
                            // emptyText: '請輸入學號',
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
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            // labelWidth: 37,
                            margin: '0 0 8 5',
                        },
                        items: [{
                            xtype: 'antCheckbox',
                            boxLabel: 'OO門市',
                            // name : 'tomato',
                            // value: 'tomato',
                            // checked: true
                        }, {
                            xtype: 'antCheckbox',
                            boxLabel: 'XX門市',
                            // name : 'tomato',
                            // value: 'tomato',
                            // checked: true
                        }, {
                            xtype: 'antCheckbox',
                            boxLabel: '$$門市',
                            // name : 'tomato',
                            // value: 'tomato',
                            // checked: true
                        }]
                    }, {   // 員工查詢
                        xtype: 'antFieldset',
                        title: '員工查詢',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            // labelWidth: 37,
                            margin: '0 0 8 5',
                        },
                        items: [{
                            xtype: 'antCheckbox',
                            boxLabel: 'OO員工',
                            // name : 'tomato',
                            // value: 'tomato',
                            // checked: true
                        }, {
                            xtype: 'antCheckbox',
                            boxLabel: 'XX員工',
                            // name : 'tomato',
                            // value: 'tomato',
                            // checked: true
                        }, {
                            xtype: 'antCheckbox',
                            boxLabel: '陳嘉笙',
                            // name : 'tomato',
                            // value: 'tomato',
                            // checked: true
                        }]
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
                    }, 
                    {
                        xtype: 'antButton',
                        text: '匯出',
                        scale: 'small',
                        cls: 'antBtn-yellow',
                        // iconCls: 'fa fa-times',
                        width: 60,
                        border: false,
                        handler: '',
                        margin: '10 0 5 5',
                    }
                ]
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
        minHeight: 500, //頁面最小高度
        flex: 1,
        scrollable: true,
        items: [
            {   // 使用者清單
                xtype: 'antGridpanel',
                title: '報表欄位',
                reference: 'grid-40941139-profitstats-list',
                // bufferedRenderer: false,
                // runInViewport: false,
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
                    // renderer: function (value) {
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
            // { xtype: 'splitter', margin: -1.5 },
            // {   // 資料維護
            //     xtype: 'antPanel',
            //     title: '資料維護',
            //     reference: 'panel-40941139-profitstats-manage',
            //     layout: {
            //         type: 'vbox',
            //         align: 'stretch',
            //     },
            //     minWidth:300,
            //     flex: 1,
            //     defaults: {
            //         margin: '0 5 5 5',
            //     },
            //     border: true,
            //     //hidden: true,
            //     items: [
            //         {   // 基本資料
            //             xtype: 'antFieldset',
            //             title: '基本資料',
            //             layout: {
            //                 type: 'vbox',
            //                 align: 'stretch',
            //             },
            //             defaults: {
            //                 margin: '0 0 8 0',
            //                 labelWidth: 37,
                            
            //             },
            //             items: [{
            //                 xtype: 'antNumberfield',
            //                 fieldLabel: 'ids',
            //                 reference: 'num-40941139-profitstats-ids',
            //                 labelWidth: 37,
            //                 // cls: 'fieldNotInput',
            //             }, {
            //                 xtype: 'antTextfield',
            //                 fieldLabel: '學號',
            //                 reference: 'txt-40941139-profitstats-code',
            //                 // labelWidth: 37,
            //                 cls: 'fieldRequired',
            //             }, {
            //                 xtype: 'antTextfield',
            //                 fieldLabel: '姓名',
            //                 reference: 'txt-40941139-profitstats-name',
            //                 // labelWidth: 37,
            //                 cls: 'fieldRequired',
            //             }, {
            //                 xtype: 'antTextfield',
            //                 fieldLabel: '信箱',
            //                 reference: 'txt-40941139-profitstats-mail',
            //                 // labelWidth: 37,
            //             }, {
            //                 xtype: 'antTextfield',
            //                 fieldLabel: '密碼',
            //                 reference: 'txt-40941139-profitstats-password',
            //                 labelWidth: 37,
            //                 inputType: 'password',
            //                 cls: 'fieldRequired',
            //             }, {
            //                 xtype: 'antCombobox',
            //                 fieldLabel: '狀態',
            //                 reference: 'cmbx-40941139-profitstats-status',
            //                 // labelWidth: 37,
            //                 cls: 'fieldRequired',

            //                 valueField: 'value',
            //                 displayField: 'text',
            //                 queryMode: 'local',
            //                 forceSelection: true,
            //                 anyMatch: true,
            //                 editable: false, //可不可編輯
            //                 store: { type: 'status' },
            //             }, {
            //                 xtype: 'antTextfield',
            //                 fieldLabel: '建立人員',
            //                 reference: 'txt-40941139-profitstats-createusername',
            //                 //disabled: true,
            //                 // labelAlign: 'top',
            //                 labelWidth: 65,
            //                 // cls: 'fieldRequired',
            //             }, {
            //                 xtype: 'antTextfield',
            //                 fieldLabel: '建立時間',
            //                 reference: 'text-40941139-profitstats-createtm',
            //                 // format: 'Y-m-d',
            //                 //disabled: true,
            //                 // labelAlign: 'top',
            //                 labelWidth: 65,
            //                 // cls: 'fieldRequired',
            //             }, {
            //                 xtype: 'antTextfield',
            //                 fieldLabel: '異動人員',
            //                 reference: 'txt-40941139-profitstats-modifyusername',
            //                 //disabled: true,
            //                 // labelAlign: 'top',
            //                 labelWidth: 65,
            //                 // cls: 'fieldRequired',
            //             }, {
            //                 xtype: 'antTextfield',
            //                 fieldLabel: '異動時間',
            //                 reference: 'text-40941139-profitstats-modifytm',
            //                 // format: 'Y-m-d',
            //                 //disabled: true,
            //                 // labelAlign: 'top',
            //                 labelWidth: 65,
            //                 // cls: 'fieldRequired',
            //             }, {
            //                 xtype: 'antTextarea',
            //                 fieldLabel: '備註',
            //                 reference: 'txt-40941139-profitstats-memo',
            //                 // labelWidth: 37,
            //             }, 
            //             ]
            //         }, {
            //             layout: {
            //                 type: 'hbox',
            //                 align: 'stretch',
            //             },
            //             defaults: {
            //                 height: 31,
            //             },
            //             items: [{
            //                     xtype: 'antButton',
            //                     text: '儲存',
            //                     reference: 'btn-40941139-profitstats-save',
            //                     scale: 'small',
            //                     cls: 'antBtn-blue',
            //                     iconCls: 'fa fa-save',
            //                     // hidden:true,
            //                     //width: 60,
            //                     flex: 1,
            //                     border: false,
            //                     handler: 'doSave',
            //                     margin: '10 0 5 5',
            //                 }, {
            //                     xtype: 'antButton',
            //                     text: '修改',
            //                     reference: 'btn-40941139-profitstats-edit',
            //                     scale: 'small',
            //                     cls: 'antBtn-yellow',
            //                     iconCls: 'fa fa-edit',
            //                     // hidden:true,
            //                     //width: 60,
            //                     flex: 1,
            //                     border: false,
            //                     handler: 'doEdit',
            //                     margin: '10 0 5 5',
            //                 }, {
            //                     xtype: 'antButton',
            //                     text: '取消',
            //                     reference: 'btn-40941139-profitstats-cancel',
            //                     scale: 'small',
            //                     cls: 'antBtn-red',
            //                     // iconCls: 'fa fa-times',
            //                     // hidden:true,
            //                     //width: 60,
            //                     flex: 1,
            //                     border: false,
            //                     handler: 'doCancel',
            //                     margin: '10 0 5 5',
            //                 }, {
            //                     xtype: 'antButton',
            //                     text: '新增',
            //                     reference: 'btn-40941139-profitstats-add',
            //                     scale: 'small',
            //                     cls: 'antBtn-green',
            //                     iconCls: 'fa fa-plus',
            //                     // hidden:true,
            //                     //width: 60,
            //                     flex: 1,
            //                     border: false,
            //                     handler: 'doAdd',
            //                     margin: '10 0 5 5',
            //                 }
            //             ]
            //         }
            //     ]
            // },            
        ]
    }]
});
