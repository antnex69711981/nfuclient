Ext.define('antnex.subsystem.41041120.user.user',{
        extend:'Ext.panel.Panel',
        requires:[
            'antnex.subsystem.41041120.user.userController'
        ],
        alias:'widget.page-41041120-user',
        controller:'page-41041120-user',

        title:'41041120管',
        
        layout:{
            type:'vbox',//vbox(垂直排列),hbox(水平)
            align:'stretch' // stretch 延展,center 置中
        },
        
        listeners:{
            afterrender:'onInitialize',
            activate:'onActivate',
        },

        //靠上,左,下,右
        dockedItems:[{
            xtype:'panel',
            layout:{
                type:'vbox',
                align:'stretch'
            },
            dock:'top',
            margin:0,
            items:[
                {   //功能列
                    xtype:'toolbar',
                    layout:{
                        type:'hbox',
                        align:'stretch',
                    },
                    scroolable:true,//可被拖拉
                    border:false,
                    padding:'0 0 0 5',//內邊距 上 左 下 右
                    items:[
                        {
                            xtype: 'button',
                            text: '查詢列',
                            reference: 'btn-41041120-search',
                            cls: 'funcbarBtn-black',//套用cls樣式
                            iconCls: 'fa fa-search',//套用一個icon在裡面
                            margin: 3,//邊距
                            handler: 'funcbar_search',//被點擊時調用
                        },
                        {xtype:'tbseparator',margin:'5 1'},//分隔線 margin為 a越大 線越短 b越大離越遠
                        {
                            xtype:"button",
                            text:'加入',
                            reference:'btn-41041120-add',
                            cls: 'funcbarBtn-black',
                            iconCls:'fa fa-plus',
                            margin:3,
                            handler: 'funcbar_add',
                        },
                        {xtype:'tbseparator',margin:'5 1'},
                        {
                            xtype: 'button',
                            text: '修改',
                            reference: 'btn-41041120-edit',
                            cls: 'funcbarBtn-black',
                            iconCls: 'fa fa-edit',
                            margin: 3,
                            handler: 'funbar_edit',
                        },
                        {xtype: 'tbseparator', margin: '5 1'},
                        {
                            xtype: 'button',
                            text: '儲存',
                            reference:'btn-41041120-save',
                            cls:'funcbarBtn-black',
                            iconCls:'fa fa-save',
                            margin:3,
                            handler:'funcbar_save',
                        },
                        {xtype: 'tbseparator',margin: '5 1'},
                        {
                            xtype:'button',
                            text:'取消',
                            reference:'btn-41041120-cancel',
                            cls:'funcbarBtn-black',
                            iconCls: 'fa fa-times',
                            margin: 3,
                            handler: 'funcbar_cancel',
                        }

                    ]
                },
                
                {   //查詢列
                    xtype:'panel',
                    reference:'panel-41041120-searchbar',
                    layout:{
                        type: 'hbox',
                        align: 'stretch',
                    },
                    defaults:{
                        margin: '0 0 5 5',
                    },
                    scrollable: true,
                    items:[
                        {   //查詢條件
                            xtype: 'fieldset',//外層一個小框
                            title: '查詢條件',   
                            layout:{
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults:{//套用到所有可用效果,必加s不然不會觸發
                                labelWidth: 37,
                                margin: '0 0 8 5',
                            },
                            items:[{//內部
                                xtype: 'textfield',//輸入方塊
                                fieldLabel: '學號',//輸入方塊前的標題
                                reference: 'txt-41041120-searchcode',
                                emptyText: '請輸入學號',//當輸入方塊內是空值裡寫的文字
                                enableKeyEvents: true,//啟用鍵盤快捷
                                listeners:{
                                    keypress: 'enterSearch'//叫出userController裡enterSearch按下enter時觸發
                                },
                                margin: '0 0 8 0',
                                
                            },{
                                xtype: 'textfield',
                                fieldLabel: '姓名',
                                reference: 'txt-41041120-searchname',
                                emptyText: '請輸入姓名',
                                enableKeyEvents: true,
                                listeners:{
                                    keypress: 'enterSearch'
                                },
                                


                            },{
                               xtype: 'combobox',
                               fieldLabel:'狀態',
                               reference: 'cmbx-41041120-searchsatus',
                               
                               valueField: 'value',
                               displayField: 'text',
                               queryMode: 'local',//如何查詢
                               forceSelection: true,//只能選擇列表裡的值
                               anyMatch: true,//可以過濾下拉列表的值
                               editable: true,//可以手動輸入值
                               store: { type: 'status' },//下拉框裡值的來源
                               

                               enableKeyEvents: true,
                               listeners:{
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
        items:[{
            xtype: 'panel',
            layout:{
                type:'hbox',
                align:'stretch'
            },
            margin: 5,
            minHeight: 2000,
            flex: 1 ,
            scrollable: true,
            items:[
                {   //使用者清單
                    xtype:'gridpanel',//表格面板
                    title:'使用者清單',
                    reference:'grid-41041120-viewUserlist',
                    bufferedRenderer:false,
                    runInViewport: false,//在窗口之外運作
                    viewConfig:{
                        enableTextSelection:true,//設定表格，文本選擇
                    },
                    border:true,
                    store:{},
                    minWidth: 200,
                    flex: 2,
                    listeners:{
                        Selectionchange: 'onSelectUser',
                    },
                    columns:[{
                        xtype: 'rownumberer',//表格內第一排
                        align: 'center',
                        width: 50,   
                    },{
                        dataIndex:'code',
                        text:'學號',
                        width:100,
                    },{
                        dataIndex:'name',
                        text:'姓名',
                        width: 110,
                    },{
                        dataIndex: 'mail',
                        text: '信箱',
                        minWidth: 96,
                        flex: 1,
                    },{
                        dataIndex:'memo',
                        text:'備註',
                        width:100
                    },{
                        dataIndex:"createusercode",
                        text:'建立人員',
                        width:100
                    },{
                        dataIndex:'createtm',
                        text:'建立時間',
                        width:100
                    },{
                        dataIndex:'modifyusercode',
                        text:'異動人員',
                        width:100
                    },{
                        dataIndex:'modifytm',
                        text:'異動時間',
                        width:100
                    },{
                        dataIndex: 'status',
                        text:'狀態',
                        width: 96,
                        renderer: function (value) {
                            let store = Ext.create('antnex.store.static.Status');
                            let record = store.getRange().find(e => e.get('value') == value);
                            return record ? record.get('text') : `無法辨識: ${value}`;
                        },
                    }
                ]
                },
                {xtype: 'splitter',margin: -1.5 },//分割兩格面板的組件所以單出現 無法執行
                {   //資料維護
                    xtype:'panel',
                    title: '資料維護',
                    reference:'panel-41041120-manage',
                    layout:{
                        type: 'vbox',
                        align: 'stretch',
                    },
                    flex: 1,
                    defaults:{
                        margin: '0 5 5 5',
                    },
                    border:true,
                    items:[
                        {
                            xtype:'fieldset',
                            title:'基本資料',
                            layout:{
                                type:'vbox',
                                align: 'stretch',
                            },
                            defaults:{
                                margin:'0 0 8 0',
                            },
                            items:[{
                                xtype: 'textfield',
                                fieldLabel: '學號',
                                reference: 'txt-41041120-code',
                                labelWidth: 37,
                            },{
                                xtype: 'textfield',
                                fieldLabel:'姓名',
                                reference:'txt-41041120-name',
                                labelWidth:37,
                            },{
                                xtype:'textfield',
                                fieldLabel:'信箱',
                                reference:'txt-41041120-mail',
                                labelWidth:37,
                            },{
                                xtype:'textfield',
                                fieldLabel:'備註',
                                reference:'txt-41041120-memo',
                                labelWidth:37,
                            },{
                                xtype:'textfield',
                                fieldLabel:'建立人員',
                                reference:'txt-41041120-createusercode',
                                labelWidth:37,
                            },{
                                xtype:'textfield',
                                fieldLabel:'建立時間',
                                reference:'txt-41041120-createtm',
                                labelWidth:37,
                            },{
                                xtype:'textfield',
                                fieldLabel:'異動人員',
                                reference:'txt-41041120-modifyusercode',
                                labelWidth:37,
                            },{
                                xtype:'textfield',
                                fieldLabel:'異動時間',
                                reference:'txt-41041120-modifytm',
                                labelWidth:37,
                            },{
                                xtype:'combobox',
                                fieldLabel:'狀態',
                                reference:'cmbx-41041120-addstatus',
                                labelWidth:37,

                                valueField:'value',
                                displayField:'text',
                                queryMode:'local',
                                forceSelection: true,
                                anyMatch: true,
                                editable: true,
                                store: {type:'status'},

                            }]
                        },
                        {
                            xtype: 'button',
                            text: '新增至使用者清單',
                            scale: 'small',
                            cls: 'antBtn-blue',
                            iconCls: 'fa fa-plus',
                            margin: '0 0 5 5',
                            handler: 'gridpanel_add',
                            width: 30,
                            style: {
                                textAlign: 'center'
                            },
                            reference:'btn-41041120-gridadd',
                        },{
                            xtype: 'button',
                            text: '從使用者清單刪除',
                            scale: 'small',
                            cls: 'antBtn-red',
                            iconCls: 'fa fa-times',
                            handler: 'gridpanel_delete',
                            margin: '0 0 5 5',
                            style: {
                                textAlign: 'center'
                            },
                            reference:'btn-41041120-griddel'
                        },{
                            xtype: 'button',
                            text: '儲存至使用者清單',
                            scale: 'small',
                            cls: 'antBtn-green',
                            iconCls: 'fa fa-save',
                            handler: 'gridpanel_save',
                            margin: '0 0 5 5',
                            style: {
                                textAlign: 'center'
                            },
                            reference:'btn-41041120-gridsave'
                        }
                    ]
                }
            ]
        }

        ]
            



});