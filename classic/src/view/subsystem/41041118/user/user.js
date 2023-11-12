Ext.define('antnex.subsystem.sample.41041118.user.user',{
    extend:'Ext.panel.Panel',
    requires:[
        'antnex.subsystem.sample.41041118.user.userController',
    ],

    alias: 'widget.page-41041118-user',
    controller: 'page-41041118-user',
    title: '41041118-管理',
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
            {   // 查詢列
                xtype: 'panel',
                reference: 'panel-page-41041118-user-searchbar',
                layout: {
                    type: 'hbox',
                    align: 'stretch',
                },
                defaults: {
                    margin: '0 0 5 5',
                },
                scrollable: true,
                items: [
                    {   // 查詢資料
                        xtype: 'fieldset',
                        title: '查詢資料',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults: {
                            width: 153,
                            labelWidth: 35,
                            margin: '0 0 8 5',
                        },
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: '學號',
                            reference: 'txt-page-41041118-user-searchbar-code',
                            emptyText: '請輸入學號',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            margin: '0 0 8 0',
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '姓名',
                            reference: 'txt-page-41041118-user-searchbar-name',
                            emptyText: '請輸入姓名',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '信箱',
                            reference: 'txt-page-41041118-user-searchbar-mail',
                            emptyText: '請輸入信箱',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '備註',
                            reference: 'txt-page-41041118-user-searchbar-memo',
                            emptyText: '請輸入備註',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        }, {
                            xtype: 'combobox',
                            fieldLabel: '狀態',
                            reference: 'cmbx-page-41041118-user-searchbar-status',
                            
                            
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
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '建立人員',
                            reference: 'txt-page-41041118-user-searchbar-createusercode',
                            labelWidth: 65,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        }, {
                            xtype: 'datefield',
                            anchor: '100%',
                            fieldLabel: '建立時間',
                            name: 'date',
                            format: 'Y-m-d',
                            altFormats: 'm,d,Y|m.d.Y',
                            value: '',
                            enableKeyEvents: true,
                            reference: 'txt-page-41041118-user-searchbar-createtm',
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            labelWidth: 65,
                            width: 180
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
                    }
                ]
            },
        ]
    }],
    scrollable: true,
    items: [{
        xtype: 'panel',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        margin: 5,
        minHeight: 600,
        flex: 2,
        scrollable: true,
        items: [
            {   // 資料維護
                xtype: 'panel',
                title: '資料維護',
                reference: 'panel-page-41041118-user-manage',
                layout: {
                    type: 'vbox',
                    
                },
                
                defaults: {
                    margin: '0 5 5 5',
                },
                border: true,
                items: [
                    {   // 功能列
                        xtype: 'toolbar',
                        layout: {
                            type: 'hbox',
                            align: 'stretch',
                        },
                        scrollable: true,
                        border: false,
                        padding: '5 0 0 5',
                        items: [
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
                        ]
                    },
                    {   // 新增資料
                        xtype: 'fieldset',
                        title: '新增資料',
                        reference:'txt-page-41041118-user-add',
                        layout: {
                            type: 'hbox',
                            align: 'stretch',
                        },
                        defaults: {
                            width: 157,
                            labelWidth: 35,
                            margin: '0 0 8 0',
                        },
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: '學號',
                            reference: 'txt-page-41041118-user-searchbar-codeadd',
                            emptyText: '請輸入學號',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            margin: '0 0 8 0',
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '姓名',
                            reference: 'txt-page-41041118-user-searchbar-nameadd',
                            emptyText: '請輸入姓名',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '信箱',
                            reference: 'txt-page-41041118-user-searchbar-mailadd',
                            emptyText: '請輸入信箱',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '備註',
                            reference: 'txt-page-41041118-user-searchbar-memoadd',
                            emptyText: '請輸入備註',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        }, {
                            xtype: 'combobox',
                            fieldLabel: '狀態',
                            reference: 'cmbx-page-41041118-user-searchbar-statusadd',                            
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
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '建立人員',
                            reference: 'txt-page-41041118-user-searchbar-createusercodeadd',
                            labelWidth: 65,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        }, {
                            xtype: 'datefield',
                            anchor: '100%',
                            fieldLabel: '建立時間',
                            name: 'date',
                            format: 'Y-m-d',
                            altFormats: 'm,d,Y|m.d.Y',
                            value: '',
                            enableKeyEvents: true,
                            reference: 'txt-page-41041118-user-searchbar-createtmadd',
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            labelWidth: 65,
                            width: 180
                        },{
                            xtype: 'button',
                            text: '儲存',
                            scale: 'small',
                            cls: 'antBtn-green',
                            iconCls: 'fa fa-save',
                            width: 60,
                            border: false,
                            handler: 'addsave',
                            margin: '0 0 5 5',
                        },
                        {
                            xtype: 'button',
                            text: '取消',
                            scale: 'small',
                            cls: 'antBtn-red',
                            iconCls: 'fa fa-times',
                            width: 60,
                            border: false,
                            handler: 'cleanaddsave',
                            margin: '0 0 5 5',
                        }                        
                        ]
                    },
                    {   // 修改資料
                        xtype: 'fieldset',
                        title: '修改資料',
                        reference:'txt-page-41041118-user-edit',
                        layout: {
                            type: 'hbox',
                            align: 'stretch',
                        },
                        defaults: {
                            width: 160,
                            labelWidth: 35,
                            margin: '0 0 8 0',
                        },
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: '學號',
                            reference: 'txt-page-41041118-user-code',                            
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '姓名',
                            reference: 'txt-page-41041118-user-name',
                        },{
                            xtype: 'textfield',
                            fieldLabel: '信箱',
                            reference: 'txt-page-41041118-user-mail',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '備註',
                            reference: 'txt-page-41041118-user-memo',
                        },{
                            xtype: 'textfield',
                            fieldLabel: '狀態',
                            reference: 'txt-page-41041118-user-status',
                            
                        },{
                            xtype: 'textfield',
                            fieldLabel: '異動人員',
                            reference: 'txt-page-41041118-user-modifyusercode',
                            labelWidth: 65,
                            
                        },{
                            xtype: 'textfield',
                            fieldLabel: '異動時間',
                            reference: 'txt-page-41041118-user-modifytm',
                            labelWidth: 65,
                        },
                        {
                            xtype: 'button',
                            text: '儲存',
                            scale: 'small',
                            cls: 'antBtn-green',
                            iconCls: 'fa fa-save',
                            width: 60,
                            border: false,
                            handler: 'editsave',
                            margin: '0 0 5 5',
                        },
                        {
                            xtype: 'button',
                            text: '取消',
                            scale: 'small',
                            cls: 'antBtn-red',
                            iconCls: 'fa fa-times',
                            width: 60,
                            border: false,
                            handler: 'cleaneditsave',
                            margin: '0 0 5 5',
                        }
                    ],
                    }
                ]
            },
            { xtype: 'splitter', margin: -1.5 },
            {   // 使用者清單
                xtype: 'gridpanel',
                title: '使用者清單',
                reference: 'grid-page-41041118-user-userlist',
                bufferedRenderer: false,
                runInViewport: false,
                viewConfig: {
                    enableTextSelection: true,
                },
                border: true,
                store: {},
                minWidth: 200,
                flex: 1,
                listeners: {
                    selectionchange: 'onSelectUser',
                },
                columns: [{
                    xtype: 'rownumberer',
                    align: 'center',
                    width: 50,
                },{
                    dataIndex: 'code',
                    text: '學號',
                    width: 110,
                },{
                    dataIndex: 'name',
                    text: '姓名',
                    width: 110,
                },{
                    dataIndex: 'mail',
                    text: '信箱',
                    minWidth: 100,
                    flex: 1,
                },{
                    dataIndex: 'memo',
                    text: '備註',
                    minWidth: 100,
                },{
                    dataIndex: 'status',
                    text: '狀態',
                    width: 100,
                    renderer: ConvertTK.format.storeRenderer('antnex.store.static.Status'),
                },{
                    dataIndex: 'createusercode',
                    text: '建立人員',
                    minWidth: 100,
                },{
                    dataIndex: 'createtm',
                    text: '建立時間',
                    minWidth: 100,
                },{
                    dataIndex: 'modifyusercode',
                    text: '異動人員',
                    minWidth: 100,
                },{
                    dataIndex: 'modifytm',
                    text: '異動時間',
                    minWidth: 100,
                }]
            }  
        ]
    }]
});
