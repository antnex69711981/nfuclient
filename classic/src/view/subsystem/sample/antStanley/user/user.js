Ext.define('antnex.subsystem.sample.antStanley.user.user', {
    extend: 'Ext.panel.Panel',
    requires: [
        'antnex.subsystem.sample.antStanley.user.userController',
    ],
    alias: 'widget.antStanley-user',
    controller: 'antStanley-user',

    title: '使用者管理1',

    layout: {
        type: 'vbox', // vbox(垂直排列) , hbox(水平排列)
        align: 'stretch' // stretch(延展), center(置中)
    },

    listeners: {
        afterrender: 'onInitialize',
        activate: 'onActivate',
    },

    // 靠上, 靠左, 靠右, 靠下
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

    scrollable: false,
    items: [
        {
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            margin: 5,
            minHeight: 2000,
            flex: 1,
            scrollable: true,
            items: [
                {   // 使用者清單
                    xtype: 'gridpanel',
                    title: '使用者清單',
                    reference: 'grid-antStanley-user-userlist',

                    viewConfig: {
                        enableTextSelection: true,
                    },
                    border: true,
                    store: {}, // 資料集
                    minWidth: 200,
                    flex: 1,
                    listeners: {
                        selectionchange: 'onSelectUser',
                    },
                    /**
                     * array = [
                     * 
                     * { 
                     * code:'root',
                     * name:'管理員',
                     *  }
                     * ]
                     * 
                     * 
                     */
                    columns: [{
                        xtype: 'rownumberer',
                        align: 'center',
                        width: 50,
                    }, {
                        dataIndex: 'code',
                        text: '學號',
                        width: 110,
                    }, {
                        dataIndex: 'name',
                        text: '姓名',
                        width: 110,
                    }, {
                        dataIndex: 'mail',
                        text: '信箱',
                        minWidth: 96,
                        flex: 1,
                    }, {
                        dataIndex: 'status',
                        text: '狀態',
                        width: 96,
                        renderer: function (value) {
                            let store = Ext.create('antnex.store.static.Status');
                            let record = store.getRange().find(e => e.get('value') == value);
                            return record ? record.get('text') : `無法辨識: ${value}`;
                        },
                    }]
                },
                { xtype: 'splitter', margin: -1.5 },
                {   // 資料維護
                    xtype: 'panel',
                    title: '資料維護',
                    reference: 'panel-antStanley-user-manage',
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                    },
                    flex: 2,
                    defaults: {
                        margin: '0 5 5 5', // '上 右 下 左'
                    },
                    border: true,
                    items: [
                        {   // 基本資料
                            xtype: 'fieldset',
                            title: '基本資料',
                            layout: {
                                type: 'vbox',
                                align: 'stretch',
                            },
                            defaults: {
                                margin: '0 0 8 0',
                            },
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: '學號',
                                reference: 'txt-antStanley-user-code',
                                labelWidth: 37,
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '姓名',
                                reference: 'txt-antStanley-user-name',
                                labelWidth: 37,
                            }]
                        },
                    ]
                }
            ]
        },
    ]
});
