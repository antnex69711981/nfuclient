Ext.define('antnex.view.viewport.Viewport', {
    extend: 'antnex.default.defaultView',
    requires: [
        'Ext.*',
        'antnex.ux.*',

        'antnex.view.viewport.ViewportController',

        // 系統模組
        'antnex.view.system.mainmenu.Mainmenu', // 首頁
    ],
    alias: 'widget.viewport-viewport',
    controller: 'viewport-viewport',

    layout: {
        type: 'vbox',
        align: 'stretch',
    },

    reference: 'view_viewport_viewport',

    items: [{
        xtype: 'panel',
        reference: 'view_viewport_body',
        layout: 'card',
        flex: 1,
        items: [
            {
                xtype: 'panel',
                layout: {
                    type: 'hbox',
                    align: 'center'
                },
                bodyStyle: 'background-color: #FFFFFF;',
                flex: 1,
                items: [
                    {
                        xtype: 'panel',
                        layout: {
                            type: 'vbox',
                            align: 'center'
                        },
                        bodyStyle: 'background-color: #FFFFFF;',
                        flex: 1,
                        items: [
                            {
                                xtype: 'image',
                                src: 'resources/images/page/page_notsupport.jpg',
                                height: 200,
                                width: 300,
                            },
                            {
                                xtype: 'container',
                                html: '<h3 style="font-size:20px;color:#faaf3a;text-align:center; line-height: 1.5;">　無效的網址</h3>',
                                margin: 0,
                                padding: 0,
                            }
                        ]
                    }
                ]
            }
        ]
    }]
});
