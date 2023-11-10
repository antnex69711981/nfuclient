Ext.define('antnex.subsystem.40141152.user.user', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.subsystem.40141152.user.userController',
    ],
    alias: 'widget.page-40141152-user',
    controller: 'page-40141152-user',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        html: 'Kevin的使用者管理',
        flex: 1,
    }]
});
