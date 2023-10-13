Ext.define('antnex.format.Empty', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.format.EmptyController',
        'antnex.format.EmptyModel',
    ],

    alias: 'widget.emptyView',
    controller: 'emptyController',
    viewModel: {
        type: 'defaultModel'
    },

    // title: 'empty@app',
    layout: 'fit',
    items: []
});
