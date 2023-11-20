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
                            width: 184,
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
                        }, {
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
            align: 'stretch',
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
                    margin: '0 5 10 5',
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
                                padding: '6',
                                margin: '3 3 0 3',                            
                                handler: 'funcbar_add',
                            },{ xtype: 'tbseparator', margin: '8 2' },
                            {
                                xtype: 'button',
                                text: '修改',
                                reference: 'btn-41041118-funcbar-edit',
                                cls: 'funcbarBtn-black',
                                iconCls: 'fa fa-edit',
                                padding: '6',
                                margin: '3 3 0 3',                            
                                handler: 'funcbar_edit',
                            }]
                    },
                    {   
                        xtype: 'fieldset',
                        title: '基本資料',
                        reference:'txt-41041118-float',
                        layout: {
                            type: 'hbox',
                            align: 'stretch',
                        },
                        defaults: {
                            margin: '0 0 10 3',
                            height: 20,
                            width: 183,
                            labelWidth: 35,                    
                        },
                        items: [{
                            xtype: 'numberfield',
                            fieldLabel: 'ids',
                            reference: 'num-41041118-ids',
                            cls: 'fieldNotInput',
                        },{
                            xtype: 'textfield',
                            fieldLabel: '學號',
                            reference: 'txt-41041118-view-code',
                            cls: 'fieldRequired',
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '姓名',
                            reference: 'txt-41041118-view-name',                           
                            cls: 'fieldRequired',
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '信箱',
                            reference: 'txt-41041118-view-mail',
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '密碼',
                            reference: 'txt-41041118-view-password',
                            inputType: 'password',
                            cls: 'fieldRequired',
                        }, {
                            xtype: 'combobox',
                            fieldLabel: '狀態',
                            reference: 'cmbx-41041118-view-status',
                            cls: 'fieldRequired',
                            valueField: 'value',
                            displayField: 'text',
                            queryMode: 'local',
                            forceSelection: true,
                            anyMatch: true,
                            editable: false,
                            store: { type: 'status' },
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '備註',
                            reference: 'txt-41041118-view-memo',
                        },{
                            xtype: 'button',
                            text: '儲存',
                            scale: 'small',
                            reference: 'btn-41041118-funcbar-save',
                            cls: 'antBtn-green',
                            iconCls: 'fa fa-save',
                            width: 60,
                            handler: 'funcbar_save',
                            margin: '0 0 5 5',
                        }, {
                            xtype: 'button',
                            text: '取消',
                            scale: 'small',
                            reference: 'btn-41041118-funcbar-cancel',
                            cls: 'antBtn-red',
                            iconCls: 'fa fa-times',
                            width: 60,
                            handler: 'funcbar_cancel',
                            margin: '0 0 5 5',
                        }]
                    }
                ]
            },{ xtype: 'splitter', margin: -1.5 },           
            {   // 使用者清單
                xtype: 'gridpanel',
                title: '使用者清單',
                reference: 'grid-41041118-userlist',
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
                    width: 100,
                },{
                    dataIndex: 'name',
                    text: '姓名',
                    width: 100,
                },{
                    dataIndex: 'mail',
                    text: '信箱',
                    minWidth: 96,
                    flex: 1,
                },{
                    dataIndex: 'memo',
                    text: '備註',
                    minWidth: 150,
                    flex: 1,
                },{
                    dataIndex: 'status',
                    text: '狀態',
                    width: 80,
                    renderer: ConvertTK.format.storeRenderer('antnex.store.static.Status'),
                },{
                    dataIndex: 'createusercode',
                    text: '建立人員',
                    minWidth: 90,
                },{
                    dataIndex: 'createtm',
                    text: '建立時間',
                    minWidth: 140,
                    
                },{
                    dataIndex: 'modifyusercode',
                    text: '異動人員',
                    minWidth: 90,
                },{
                    dataIndex: 'modifytm',
                    text: '異動時間',
                    minWidth: 140,
                   
                }]
            }          
        ]  
    }]
});
