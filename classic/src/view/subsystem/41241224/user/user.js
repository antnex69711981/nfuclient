Ext.define('antnex.subsystem.41241224.user.user',
    {
        extend:'Ext.panel.Panel',
        requires:[
        'antnex.subsystem.41241224.user.userController',
        ],
        alias:'widget.page-41241224-user',
        controller:'page-41241224-user',
        title:'使用者管理介面',

        layout:{
            type:'table',
            alias:'stretch',
        },

        DockedItem:[{
            xtype:'panel',
            layout:{
                type:'hbox',
                alias:'stretch'
            },
            dock:'left',
            margin:0,
            items:[{
                type:'toolbar',
                scrollable:true,
                border:false,
                padding:'0 0 0 5',
                items: [
                    {
                        text: '查詢',
                        xtype: 'button',
                        height: 30,
                        width: 60
                    },
        
                ]
            }]

        }]
        
        


    }
);