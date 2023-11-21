Ext.define('antnex.subsystem.41041411.user.user',{
    extend:'Ext.panel.Panel',
    requires:[
    'antnex.subsystem.41041411.user.userController',
    ],
    alias:'widget.page-41041411-user',
    controller:'page-41041411-user',
    
    title:'41041411的首頁',

    layout: {
        type: 'vbox',   //vbox(vertical), hbox(horizontal)
        align: 'stretch' //stetch(延展), center(置中)
    },
//事件觸發
    listeners: {
        afterrender: 'onInitialize',
        activate: 'onActivate',
    },
// top(靠上)，buttom(靠下)，left(靠左)，right(靠右)
    dockedItems: [{
        xtype: 'panel', 
        layout: {  
            type: 'vbox',    
            align: 'stretch'
        },
        dock: 'top',  // 靠上
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
    scrollable: true, // 捲動
// content(內容)
    items: [{  
        xtype: 'panel',  // 此頁面 loyout 放的是 panel
        layout: {
            type: 'hbox',
            align: 'stretch'  // layout 是「橫向延展」
        },
        margin: 5, //白色的邊邊
        minHeight: 2000, //頁面可以往下滑動 2000 pixels

// Ext js 的 flex 類似 RWD，使得網站透過不同大小的螢幕視窗來改變網頁排版的方式，使得各種裝置的使用者，如電腦、平板、手機、電視都能夠得到最佳的視覺效果
// ，由於是由同一個網頁內容轉變，管理者也就不必大費周章的重複更新網頁資訊。
        flex: 1, 

        scrollable: true,
        items: [
            {   // 使用者清單
                xtype: 'gridpanel',  // 根據物件 gridpanel 去做 layout
                title: '使用者清單',
                reference: 'grid-antStanley-user-userlist', // 物件的別名，用於 userController.js 註冊識別
                // bug fix
                bufferedRenderer: false,
                runInViewport: false,

                // highlight the text
                viewConfig: {
                    enableTextSelection: true,
                },
                //邊框
                border: true,  
                /**
                 * 資料集， store 與 dataIndex 相互對應
                 * 
                 * array = [
                 * 
                 * {
                 * code：'root',
                 * name：'Faker',
                 * }
                 * 
                 * ]
                 */
                store: {},

                minWidth: 200,  // 使用者清單的 最小寬度= 200
                flex: 2,
                //事件
                listeners: {
                    selectionchange: 'onSelectUser',
                },
                //欄位
                columns: [{
                    xtype: 'rownumberer', // 在學號之前的順序 1,2,3,...... 
                    align: 'center',
                    width: 50,
                }, {
                    dataIndex: 'code', // 對應到 store 資料集陣列 array 裡面的 key
                    text: '學號',  // text 欄位名稱
                    width: 110,
                }, {
                    dataIndex: 'name',
                    text: '姓名',  
                    width: 110,
                }, {
                    dataIndex: 'mail',
                    text: '信箱',
                    minWidth: 96,
                    flex: 1,  // 使畫面左右拖拉流暢，沒有斷裂
                }, {
                    dataIndex: 'status',
                    text: '狀態',
                    width: 96,

                    // 將數字替換成文字，可使用 function 處理
                    renderer: function (value) { 
                        let store = Ext.create('antnex.store.static.Status');
                        let record = store.getRange().find(e => e.get('value') == value);
                        return record ? record.get('text') : `無法辨識: ${value}`;
                    },
                }]
            },
            { xtype: 'splitter', margin: -1.5 },
            {   // 資料維護
                xtype: 'panel',  // 根據物件 panel 去做 layout
                title: '資料維護',
                reference: 'panel-antStanley-user-manage',
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                },
                flex: 1,
                //下方 items 資料如果沒有指定，使用此預設
                defaults: {
                    margin: '0 5 5 5', // '上 右 下 左'
                },
                border: true,
                items: [
                    {   // 基本資料
                        xtype: 'fieldset',  //物件 fieldset
                        title: '基本資料',
                        layout: {
                            type: 'vbox',
                            align: 'stretch',
                        },
                        defaults: {
                            margin: '0 0 8 0', // 下方(buttom)給 8px 高度
                        },
                        items: [{
                            xtype: 'textfield', //文字輸入
                            fieldLabel: '學號',
                            reference: 'txt-antStanley-user-code',
                            labelWidth: 37, // fieldlabel 寬度
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '姓名',
                            reference: 'txt-antStanley-user-name',
                            labelWidth: 37,
                        }]
                    }
                ]
            }
        ]
    }]
});