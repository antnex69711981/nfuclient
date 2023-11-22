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
                reference:'btn-user-user-funcbar-search',
                cls: 'funcbarBtn-black',
                handler:'funcbar_search',
            }, {
                xtype: 'button',
                text: '新增',
                reference:'btn-user-user-funcbar-add',
                cls: 'funcbarBtn-black',
                handler:'funcbar_add',
            }, {
                xtype: 'button',
                text: '修改',
                reference:'btn-user-user-funcbar-edit',
                cls: 'funcbarBtn-black',
            }, {
                xtype: 'button',
                text: '儲存',
                reference:'btn-user-user-funcbar-save',
                cls: 'funcbarBtn-black',
            }, {
                xtype: 'button',
                text: '取消',
                reference:'btn-user-user-funcbar-cancel',
                cls: 'funcbarBtn-black',
                handler:'funcbar_cancel'
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
                reference:'cmbx-user-user-searchbar-status',
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
            handler:'cleanSearch',
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
                    status: 1
                }, {
                    studentnum: '456',
                    name: '李四',
                    email: '456@gmail.com',
                    status: 9
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
                width: 50,
                renderer: function (value) {
                    let store = Ext.create('antnex.store.static.Status');
                    let record = store.getRange().find(e => e.get('value') == value);
                    return record ? record.get('text') : `無法辨識: ${value}`;
                },
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
                    xtype: 'numberfield',
                    fieldLabel: 'ids',
                    reference: 'num-user-user-ids',
                    labelWidth: 37,
                    cls: 'fieldNotInput',
                }, {
                    xtype: 'textfield',
                    fieldLabel: '學號',
                    reference: 'txt-user-user-code',
                    labelWidth: 37,
                    cls: 'fieldRequired',
                }, {
                    xtype: 'textfield',
                    fieldLabel: '姓名',
                    reference: 'txt-user-user-name',
                    labelWidth: 37,
                    cls: 'fieldRequired',
                }, {
                    xtype: 'textfield',
                    fieldLabel: '信箱',
                    reference: 'txt-user-user-mail',
                    labelWidth: 37,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '密碼',
                    reference: 'txt-user-user-password',
                    labelWidth: 37,
                    inputType: 'password',
                    cls: 'fieldRequired',
                }, {
                    xtype: 'combobox',
                    fieldLabel: '狀態',
                    reference: 'cmbx-user-user-status',
                    labelWidth: 37,
                    cls: 'fieldRequired',

                    valueField: 'value',
                    displayField: 'text',
                    queryMode: 'local',
                    forceSelection: true,
                    anyMatch: true,
                    editable: false,
                    store: { type: 'status' },
                }, {
                    xtype: 'textarea',
                    fieldLabel: '備註',
                    reference: 'txt-user-user-memo',
                    labelWidth: 37,
                }]
            }]
        }]
    }]
});
