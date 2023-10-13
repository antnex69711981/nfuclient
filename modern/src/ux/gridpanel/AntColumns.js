// base
Ext.define('antnex.ux.gridpanel.AntColumns', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.antColumn',

    // constructor: function (config) {
    //     this.callParent(arguments);
    // },

    align: 'left',

    resizable: true,    // 是否可調整寬度
    draggable: true,    // 是否可拖動
    hideable: true,    // 是否可被顯示或隱藏
});

// rownumberer
Ext.define('antnex.ux.gridpanel.AntColumns.Rownumberer', {
    extend: 'Ext.grid.column.RowNumberer',
    alias: 'widget.antColumn-rownumberer',

    text: '項次',
    align: 'center',
    width: 50,
    summaryRenderer: () => '加總',

    resizable: false,
    draggable: false,
    hideable: false,
});

// // actioncolumn
// Ext.define('antnex.ux.gridpanel.AntColumns.Actioncolumn', {
//     extend: 'Ext.grid.column.Action',
//     alias: 'widget.antColumn-actioncolumn',

//     dataIndex: 'selcheck',
//     align: 'center',
//     width: 50,

//     resizable: false,
//     draggable: false,
//     hideable: false,
// });

// checkcolumn
Ext.define('antnex.ux.gridpanel.AntColumns.Checkcolumn', {
    extend: 'Ext.grid.column.Check',
    alias: 'widget.antColumn-checkcolumn',
    
    dataIndex: 'selcheck',
    align: 'center',
    minWidth: 70,
    headerCheckbox: true,

    resizable: false,
    draggable: false,
    hideable: false,
});



// 序號類型
Ext.define('antnex.ux.gridpanel.AntColumns.Isserial', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-isserial',

    dataIndex: 'isserial',
    text: '序號類型',
    align: 'left',
    width: 96,
    renderer: ConvertTK.format.storeRenderer('antnex.store.privateStore.Good.Isserial'),
    resizable: false,
});

// 序號
Ext.define('antnex.ux.gridpanel.AntColumns.Serial', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-serial',

    dataIndex: 'serial',
    text: '序號',
    align: 'left',
    width: 170,
    resizable: false,
});

// 商品料號
Ext.define('antnex.ux.gridpanel.AntColumns.Materialcode', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-materialcode',

    dataIndex: 'materialcode',
    text: '商品料號',
    align: 'left',
    width: 165,
});

// 商品全名
Ext.define('antnex.ux.gridpanel.AntColumns.Fullname', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-fullname',

    dataIndex: 'fullname',
    text: '商品名稱',
    align: 'left',
    cellWrap: true,
    minWidth: 310,
    flex: 2,
});

// 數值
Ext.define('antnex.ux.gridpanel.AntColumns.Number', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-number',

    dataIndex: 'number',
    text: '數值',
    align: 'right',
    width: 96,
    renderer: function (value) {
        return  Ext.util.Format.number(value, '0,000.##');
    }
});

// 數量
Ext.define('antnex.ux.gridpanel.AntColumns.Qty', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-qty',

    dataIndex: 'qty',
    text: '數量',
    align: 'right',
    width: 96,
    renderer: function (value) {
        return  Ext.util.Format.number(value, '0,000.##');
    }
});

// 金額
Ext.define('antnex.ux.gridpanel.AntColumns.price', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-price',

    dataIndex: 'price',
    text: '金額',
    align: 'right',
    width: 100,
    renderer: function (value) {
        return  Ext.util.Format.number(value, '$ 0,000.##');
    }
});

// 備註
Ext.define('antnex.ux.gridpanel.AntColumns.Memo', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-memo',

    dataIndex: 'memo',
    text: '備註',
    align: 'left',
    minWidth: 150,
    flex: 1,
});

// 是否
Ext.define('antnex.ux.gridpanel.AntColumns.Boolean', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-boolean',

    dataIndex: 'boolean',
    text: '是否',
    align: 'left',
    width: 96,
    renderer: ConvertTK.format.storeRenderer('antnex.store.privateStore.Boolean'),
});

// 狀態
Ext.define('antnex.ux.gridpanel.AntColumns.Status', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-status',

    dataIndex: 'status',
    text: '狀態',
    align: 'left',
    width: 96,
    renderer: ConvertTK.format.storeRenderer('antnex.store.privateStore.Status'),
});

// 單別
Ext.define('antnex.ux.gridpanel.AntColumns.Formcode', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-formcode',

    dataIndex: 'formcode',
    text: '單別',
    align: 'left',
    width: 96,
});

// 單號
Ext.define('antnex.ux.gridpanel.AntColumns.Ordercode', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-ordercode',

    dataIndex: 'ordercode',
    text: '單號',
    align: 'left',
    width: 150,
});

// 日期
Ext.define('antnex.ux.gridpanel.AntColumns.Date', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-date',

    dataIndex: 'date',
    text: '日期',
    align: 'left',
    width: 96,
});

// 時間
Ext.define('antnex.ux.gridpanel.AntColumns.Time', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-time',

    dataIndex: 'time',
    text: '時間',
    align: 'left',
    width: 140,
});

// 統一編號
Ext.define('antnex.ux.gridpanel.AntColumns.Uniformno', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-uniformno',

    dataIndex: 'uniformno',
    text: '統一編號',
    align: 'left',
    width: 96,
});

// 發票號碼
Ext.define('antnex.ux.gridpanel.AntColumns.Invoiceno', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-invoiceno',

    dataIndex: 'invoiceno',
    text: '發票號碼',
    align: 'left',
    width: 110,
});

// 發票類型
Ext.define('antnex.ux.gridpanel.AntColumns.Invoicetype', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-invoicetype',

    dataIndex: 'invoicetype',
    text: '發票類型',
    align: 'left',
    width: 110,
    renderer: ConvertTK.format.systagRenderer('invoicetype'),
});

// 開立類型
Ext.define('antnex.ux.gridpanel.AntColumns.Invoicetaketype', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-invoicetaketype',

    dataIndex: 'invoicetaketype',
    text: '開立類型',
    align: 'left',
    width: 110,
    renderer: ConvertTK.format.systagRenderer('invoicetaketype'),
});

// 廠商
Ext.define('antnex.ux.gridpanel.AntColumns.Vendorcode', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-vendorcode',

    dataIndex: 'vendorcode',
    text: '廠商',
    align: 'left',
    minWidth: 150,
    flex: 1,
    renderer: function (value) {
        let store = Ext.getStore('IposVendor');
        return ConvertTK.storeRenderer(store, value, 'code', 'nickname');
    },
});

// 客戶
Ext.define('antnex.ux.gridpanel.AntColumns.Clientcode', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-clientcode',

    dataIndex: 'clientcode',
    text: '客戶',
    align: 'left',
    minWidth: 150,
    flex: 1,
    renderer: function (value) {
        let store = Ext.getStore('Client');
        return ConvertTK.storeRenderer(store, value, 'code', 'nickname');
    },
});

// 門市
Ext.define('antnex.ux.gridpanel.AntColumns.Branchcode', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-branchcode',

    dataIndex: 'branchcode',
    text: '門市',
    align: 'left',
    minWidth: 150,
    flex: 1,
    renderer: function (value) {
        let store = Ext.getStore('Branch');
        return ConvertTK.storeRenderer(store, value, 'code', 'nickname');
    },
});

// 部門
Ext.define('antnex.ux.gridpanel.AntColumns.Deptcode', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-deptcode',

    dataIndex: 'deptcode',
    text: '部門',
    align: 'left',
    minWidth: 150,
    flex: 1,
    renderer: function (value) {
        let store = Ext.getStore('Department')
        return ConvertTK.storeRenderer(store, value, 'code', 'name');
    },
});

// 員工
Ext.define('antnex.ux.gridpanel.AntColumns.usercode', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-usercode',

    dataIndex: 'usercode',
    text: '員工',
    align: 'left',
    width: 96,
    renderer: function (value) {
        let store = Ext.getStore('Employee');
        return ConvertTK.storeRenderer(store, value, 'code', 'name');
    },
});

// 電話
Ext.define('antnex.ux.gridpanel.AntColumns.Phonenumber', {
    extend: 'antnex.ux.gridpanel.AntColumns',
    alias: 'widget.antColumn-phonenumber',

    dataIndex: 'phonenumber',
    text: '電話',
    align: 'left',
    width: 150,
    cellWrap: false,
});