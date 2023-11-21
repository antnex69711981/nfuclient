Ext.define('antnex.subsystem.41241224.user.user', {
    extend: 'Ext.panel.Panel',
    requires: [
        'antnex.subsystem.41241224.user.userController'
    ],
    alias: 'widget.page-41241224-user',
    controller: 'page-41241224-user',

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
                fieldLabel: '姓名',
                emptyText: '輸入姓名'
            }, {
                xtype: 'textfield',
                fieldLabel: '學號',
                emptyText: '輸入學號'
            }, {
                xtype: 'combo',
                fieldLabel: '狀態',
                name: 'status',
                store: {
                    data: [
                        { value: '1', text: '啟用' },
                        { value: '2', text: '停用' }
                    ]
                },
                queryMode: 'local',
                displayField: 'text',
                valueField: 'value'
            },{
                dataIndex: 'status',
                text: '狀態',
                width: 80,
                renderer: function(value) {
                    var text = (value === '1') ? '啟用' : '停用';
                    return text;
                }
            }]
        },{
            xtype: 'button',
            text: '查詢',
            width: 80,
            height: 40,
        },
        {
            xtype: 'button',
            text: '清除',
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
            scrollable: true,
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
                dataIndex: 'studentnum',
                text: '學號'
            }, {
                dataIndex: 'name',
                text: '姓名'
            }, {
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
