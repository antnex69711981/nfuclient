Ext.define('antnex.subsystem.41241213.main.main',
    {
        extend:'Ext.panel.Panel',
        requires:[
        'antnex.subsystem.41241213.main.mainController',
        ],
        alias:'widget.page-41241213-main',
        controller:'page-41241213-main',
        title:'41241213的首頁',//這為啥無法跟改

        layout: {
            type: 'vbox',
            align: 'stretch'

        },//不知道
        
        // listeners: {
        //     afterrender: 'onInitialize',
        //     activate: 'onActivate',
        // },//多了框線，底色
        
        dockedItems: [{//停靠專案?停靠項目?
            xtype: 'panel',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            dock: 'top',
            margin: 0,
            items:[{
                html:'這是我首頁'
            }]
        }]
    }
);