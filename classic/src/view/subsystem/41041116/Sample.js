Ext.define('antnex.subsystem.sample.Sample', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.subsystem.sample.SampleController',
    ],
    alias: 'widget.sample-sample',
    controller: 'sample-sample',

    title: '範例頁面',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        html: '範例頁面',
        flex: 1,
    }]
});
