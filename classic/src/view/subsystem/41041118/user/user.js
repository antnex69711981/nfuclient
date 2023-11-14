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
                reference: 'panel-41041118-searchbar',
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
                            reference: 'txt-41041118-searchbar-code',
                            emptyText: '請輸入學號',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                            margin: '0 0 8 0',
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '姓名',
                            reference: 'txt-41041118-searchbar-name',
                            emptyText: '請輸入姓名',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '信箱',
                            reference: 'txt-41041118-searchbar-mail',
                            emptyText: '請輸入信箱',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '備註',
                            reference: 'txt-41041118-searchbar-memo',
                            emptyText: '請輸入備註',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        }, {
                            xtype: 'combobox',
                            fieldLabel: '狀態',
                            reference: 'cmbx-41041118-searchbar-status',                                                                                                                             
                            valueField: 'value',
                            displayField: 'text',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            anyMatch: true,
                            editable: false,
                            store: { type: 'status' },
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'enterSearch'
                            },
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '建立人員',
                            reference: 'txt-41041118-searchbar-createusercode',
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
                            reference: 'txt-41041118-searchbar-createtm',
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
                reference: 'panel-41041118-manage',
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
                                reference: 'btn-41041118-funcbar-add',
                                cls: 'funcbarBtn-black',
                                iconCls: 'fa fa-plus',
                                margin: 3,
                                padding: '6',
                                handler: 'funcbar_add',
                                
                            }, { xtype: 'tbseparator', margin: '8 2' },
                            {
                                xtype: 'button',
                                text: '修改',
                                reference: 'btn-41041118-funcbar-edit',
                                cls: 'funcbarBtn-black',
                                iconCls: 'fa fa-edit',
                                margin: 3,
                                padding: '6',
                                handler: 'funcbar_edit',
                            }, { xtype: 'tbseparator', margin: '8 2' },
                            {
                                xtype: 'button',
                                text: '刪除',
                                reference: 'btn-41041118-funcbar-del',
                                cls: 'funcbarBtn-black',
                                iconCls: 'fa fa-times',
                                margin: 3,
                                padding: '6',
                                handler: 'funcbar_del',
                            }]
                    },
                    {   // 新增列
                        xtype: 'fieldset',
                        title: '新增資料',
                        reference:'txt-41041118-add',
                        layout: {
                            type: 'hbox',
                            align: 'stretch',
                        },
                        defaults: {
                            width: 224,
                            labelWidth: 35,
                            margin: '0 0 8 0',
                        },
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: '學號',
                            reference: 'txt-41041118-add-code',
                            emptyText: '請輸入學號',
                            allowBlank: false,
                            vtype:'alphanum',
                            enableKeyEvents: true,
                            margin: '0 0 8 0',
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '姓名',
                            reference: 'txt-41041118-add-name',
                            emptyText: '請輸入姓名',
                            allowBlank: false,
                            enableKeyEvents: true,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '信箱',
                            reference: 'txt-41041118-add-mail',
                            emptyText: '請輸入信箱',
                            allowBlank: false,
                            vtype:'email',
                            enableKeyEvents: true,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '備註',
                            reference: 'txt-41041118-add-memo',
                            emptyText: '請輸入備註',
                            enableKeyEvents: true,

                        }, {
                            xtype: 'combobox',
                            fieldLabel: '狀態',
                            reference: 'cmbx-41041118-add-status',                            
                            valueField: 'value',
                            displayField: 'text',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            anyMatch: true,
                            editable: false,
                            store: { type: 'status' },
                            enableKeyEvents: true,
                        }, {
                            xtype: 'button',
                            text: '儲存',
                            scale: 'small',
                            cls: 'antBtn-green',
                            iconCls: 'fa fa-save',
                            width: 60,
                            border: false,
                            handler: 'addsave',
                            margin: '0 0 5 5',
                        }, {
                            xtype: 'button',
                            text: '取消',
                            scale: 'small',
                            cls: 'antBtn-red',
                            iconCls: 'fa fa-times',
                            width: 60,
                            border: false,
                            handler: 'cleanaddsave',
                            margin: '0 0 5 5',
                        }]
                    },
                    {   // 修改列
                        xtype: 'fieldset',
                        title: '修改資料',
                        reference: 'txt-41041118-edit',
                        layout: {
                            type: 'hbox',
                            align: 'stretch',
                        },
                        defaults: {
                            width: 224,
                            labelWidth: 35,
                            margin: '0 0 8 0',
                        },
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: '學號',
                            allowBlank: false,
                            vtype:'alphanum',
                            reference: 'txt-41041118-edit-code',                            
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '姓名',
                            allowBlank: false,
                            reference: 'txt-41041118-edit-name',
                        },{
                            xtype: 'textfield',
                            fieldLabel: '信箱',
                            allowBlank: false,
                            vtype: 'email',
                            reference: 'txt-41041118-edit-mail',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '備註',
                            reference: 'txt-41041118-edit-memo',
                        },{
                            xtype: 'combobox',
                            fieldLabel: '狀態',
                            reference: 'txt-41041118-edit-status',                            
                            valueField: 'value',
                            displayField: 'text',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            anyMatch: true,
                            editable: false,
                            store: { type: 'status' },
                            enableKeyEvents: true,
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
                        }]
                    },                   
                    {   // 刪除列
                        xtype: 'fieldset',
                        title: '刪除整筆資料',
                        reference:'txt-41041118-del',
                        layout: {
                            type: 'hbox',
                            align: 'stretch',
                        },
                        defaults: {
                            width: 224,
                            labelWidth: 35,
                            margin: '0 0 8 0',
                        },
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: '學號',
                            reference: 'txt-41041118-del-code',                            
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '姓名',
                            reference: 'txt-41041118-del-name',
                        },
                        {
                            xtype: 'button',
                            text: '刪除',
                            scale: 'small',
                            cls: 'antBtn-red',
                            iconCls: 'fa fa-save',
                            width: 60,
                            border: false,
                            handler: 'delsave',
                            margin: '0 0 5 5',
                        },
                        {
                            xtype: 'button',
                            text: '取消',
                            scale: 'small',
                            cls: 'antBtn-green',
                            iconCls: 'fa fa-times',
                            width: 60,
                            border: false,
                            handler: 'cleandelsave',
                            margin: '0 0 5 5',
                        }]
                    }
                ]
            },
            { xtype: 'splitter', margin: -1.5 },
            {   // 使用者清單
                xtype: 'gridpanel',
                title: '使用者清單',
                reference: 'grid-41041118-userlist',
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
                    text:'項次',
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
