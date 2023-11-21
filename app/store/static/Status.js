Ext.define('antnex.store.static.Status', {
    extend: 'Ext.data.Store',
    alias: 'store.status',
    data: [
        { value: 1, text: '啟用', color: 'green'},
        { value: 9, text: '停用', color: 'red'  },
    ],
});