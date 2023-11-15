Ext.define('antnex.subsystem.40541124.user.user',
    {
        extend: 'Ext.panel.Panel',
        requires: [
            'antnex.subsystem.40541124.user.userController',
        ],
        alias: 'widget.page-40541124-user',
        controller: 'page-40541124-user',

        title: '40541124使用者',

        items: [{
            html: '40541124使用者'
        }]
    }
);