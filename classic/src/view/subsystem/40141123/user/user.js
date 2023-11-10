Ext.define('antnex.subsystem.40141123.user.user', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.subsystem.40141123.user.userController',
    ],
    alias: 'widget.page-40141123-user',
    controller: 'page-40141123-user',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        html: '40141123 使用者',
        flex: 1,
    }]
});
