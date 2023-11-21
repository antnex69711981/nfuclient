Ext.define('antnex.subsystem.41241219.main.main', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.subsystem.41241219.main.mainController',
    ],
    alias: 'widget.page-41241219-main',
    controller: 'page-41241219-main',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        html: '41241219 首頁',
        flex: 1,
    }]
});
