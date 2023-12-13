Ext.define('antnex.subsystem.11261103.projectdetail.Status', {
    extend: 'Ext.data.Store',
    alias: 'store.status',
    data: [
        { value: 1, text: '未核佣'}, 
        { value: 2, text: '已核佣'},
        { value: 3, text: '不核佣'}, 
    ],
});