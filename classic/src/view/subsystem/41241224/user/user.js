Ext.define('antnex.subsystem.41241224.user.user', {
    extend: 'Ext.panel.Panel',
    requires: [
        'antnex.subsystem.41241224.user.userController'
    ],
    alias: 'widget.page-41241224-user',
    controller: 'page-41241224-user',
    listeners:{
        afterrender: 'onInitialize'
    },
    items: [{
        xtype: 'panel',
        items: [{
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                text: '查詢列',
                cls: 'funcbarBtn-black'
            }, {
                xtype: 'button',
                text: '新增',
                cls: 'funcbarBtn-black'
            }, {
                xtype: 'button',
                text: '修改',
                cls: 'funcbarBtn-black'
            }, {
                xtype: 'button',
                text: '儲存',
                cls: 'funcbarBtn-black'
            }, {
                xtype: 'button',
                text: '取消',
                cls: 'funcbarBtn-black'
            }]
        }]
    }, {
        xtype: 'panel',
        reference:'panel-user-user-searchbar',
        layout: {
            type: 'hbox',
        },
        items: [{
            xtype: 'fieldset',
            title: '查詢條件',
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [{
                xtype: 'textfield',
                reference:'txt-user-user-searchbar-name',
                fieldLabel: '姓名',
                labelWidth: 37,
                margin:'0 0 0 0',
                emptyText: '輸入姓名'
            }, {
                xtype: 'textfield',
                reference:'txt-user-user-searchbar-code',
                fieldLabel: '學號',
                labelWidth: 37,
                margin:'0 0 0 0',
                emptyText: '輸入學號'
            }, {
                xtype: 'combo',
                reference:'cm-user-user-searchbar-status',
                fieldLabel: '狀態',
                labelWidth: 37,
                margin:'0 0 0 0',
                name: 'status',
                store: {
                    data: [
                        {value:'-1',text:'全部'},
                        { value: '1', text: '啟用' },
                        { value: '9', text: '停用' }
                    ]
                },
                queryMode: 'local',
                displayField: 'text',
                valueField: 'value'
            }]
        },{
            xtype: 'button',
            text: '查詢',
            handler:'doSearch',
            width: 80,
            height: 40,
            margin: '10 0 5 5',
            border:false,
        },
        {
            xtype: 'button',
            handler:'cleansearch',
            border:false,
            text: '清除',
            margin: '10 0 5 5',
            width: 80,
            height: 40
        }]
    }, {
        xtype: 'panel',
        layout: 'hbox',
        scrollable: true,
        style: {
            overflow: 'auto' 
        },
        flex: 1,
        items: [{
            xtype: 'gridpanel',
            title: '使用者清單',
            border:true,
            reference:'grid-user-user-userlist',
            listeners: {
                selectionchange: 'onSelectUser',
            },
            style: {
                overflow: 'auto' 
            },
            flex: 1,
            store: {
                fields: ['studentnum', 'name', 'email', 'status'],
                data: [{
                    studentnum: '123',
                    name: '張三',
                    email: '123@gmail.com',
                    status: '啟用'
                }, {
                    studentnum: '456',
                    name: '李四',
                    email: '456@gmail.com',
                    status: '停用'
                }]
            },
            columns: [{
                xtype: 'rownumberer',
                align: 'center'
            }, {
                dataIndex: 'name',
                text: '姓名'
            },{
                dataIndex: 'studentnum',
                text: '學號'
            },  {
                dataIndex: 'email',
                text: '信箱',
                minWidth: 100
            }, {
                dataIndex: 'status',
                text: '狀態',
                width: 50
            }]
        }, {
            xtype: 'splitter',
            width: 10,
        }, {
            xtype: 'panel',
            title: '資料維護',
            border:true,
            reference:'panel-user-user-manage',
            height:1000,
            flex: 1,
            items: [{
                xtype: 'fieldset',
                title: '基本資料',
                collapsible: true,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '姓名',
                    name: 'name',
                    flex: 1
                }, {
                    xtype: 'textfield',
                    fieldLabel: '學號',
                    name: 'studentnum',
                    flex: 1
                }]
            }]
        }]
    }]
});
