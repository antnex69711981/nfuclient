Ext.define('antnex.ux.gridpanel.AntGridpanel', {
    extend: 'Ext.grid.Grid',
    alias: 'widget.antGridpanel',

    cls: '',

    border: true,

    collapsible: false,

    collapseDirection: 'left',

    columnLines: false,

    bufferedRenderer: false,

    runInViewport: false,

    viewConfig: {
        enableTextSelection: true,
    },

    // 項次
    rowNumbers: false,

    // grouping
    // features: [{
    //     id: 'group',
    //     ftype: 'grouping',
    //     groupHeaderTpl: '{name} ({[values.children.length]})',
    //     hideGroupedHeader: false,
    //     enableGroupingMenu: false,
    //     startCollapsed: true,
    // }],
    // store: {
    //     groupField: 'fieldname'
    // },

    // 自訂選取框
    selModel: null, // multi, single

    // summary
    // features: [{
    //     ftype: 'summary',
    //     dock: 'bottom'
    // }],

    // 原生選取框
    // selectable: false,
    // selectable: {
    //     checkbox: true,
    //     mode: 'multi',
    // },

    store: {},

    listeners: {
        activate: function () {
            let me = this;
            // me.setCheckcolumn();
        },
        select: function (obj, selected, eOpts) {
            let me = this;

            // let store = me.getStore();

            // console.log(selected)

            // switch (me.selModel) {
            //     case 'single':  // 單選模式下取消其他selcheck
            //         store.getRange().forEach(e => {
            //             e.set(`${me.id}-checkcolumn`, 0);
            //         })
            //         // me.getSelectable().getSelection().add(selected, false)
            //         break;
            //     case 'multi':
            //     default:
            //         break;
            // }
            // // Modern預設的checkcolumn沒有點擊行就選擇，所以自己補一個
            // if (selected[0].get(`${me.id}-checkcolumn`) == 1) {
            //     selected[0].set(`${me.id}-checkcolumn`, 0)
            // } else {
            //     selected[0].set(`${me.id}-checkcolumn`, 1)
            // }
            
        },
    },
    setSelModel: function (selModel = '') {
        let me = this;
        me.selModel = selModel;
        me.removeCheckcolumn();
        me.setCheckcolumn()
    },
    clearSelection: function () {
        let me = this;

        let store = me.getStore();

        store.getRange().forEach(e => {
            e.set(`${me.id}-checkcolumn`, 0)
        });

    },
    removeCheckcolumn: function () {
        let me = this;
        let columns = me.getColumns();
        let data = [];
        columns.forEach(e => {
            if (e._dataIndex != `${me.id}-checkcolumn`) {
                data.push(e);
            }
        })
        me.setColumns(data);
    },
    setCheckcolumn: function () {
        let me = this;

        // 自己寫選取框=>原生的很難點
        if (me.selModel == 'multi' || me.selModel == 'single') {
            let columns = me.getColumns();

            let headerCheckbox = true
            if (me.selModel == 'single') headerCheckbox = false;

            let data = [{
                dataIndex: `${me.id}-checkcolumn`,
                xtype: 'checkcolumn',
                headerCheckbox: headerCheckbox,
                width: 65,
                resizable: false,
                draggable: false,
                hideable: false,
            },]

            columns.forEach(e => {
                data.push(e)
            })
            me.setColumns(data);
        }

    },

    getSelectionData: function () {
        let me = this;
        let data = []
        me.getStore().getRange().forEach(e => {
            if (e.get(`${me.id}-checkcolumn`) == 1) {
                data.push(e);
            }
        });
        return data
    },

    getExportFromat: function (passColumn = [undefined, '&#160;', '項次'], config = {}) {
        var me = this;
        try {
            var datalist = me.getStore().getRange();

            // 匯出隱藏欄位
            var exportHiddenColumn = false;
            if (config.exportHiddenColumn == true) exportHiddenColumn = true

            var data = [];
            datalist.forEach(record => {
                var row = {};
                me.getColumns().forEach(column => {
                    var dataIndex = column.dataIndex;
                    var text = column.text;
                    var doExport = true;
                    if (exportHiddenColumn == false) doExport = column.hidden == false;
                    if (passColumn.includes(text)) doExport = false;

                    if (doExport) {
                        switch (text) { // 特別處理指定欄位: text(欄位名稱)
                            case '狀態':
                                row[text] = `未定義: ${record.get(dataIndex)}`;
                                if (record.get(dataIndex) == 1) row[text] = '啟用';
                                if (record.get(dataIndex) == 9) row[text] = '停用';
                                break;
                            default:
                                row[text] = record.get(dataIndex);
                                break;
                        }
                    }
                });

                data.push(row);
            });

            return data;
        } catch (e) {
            Ext.Msg.alert('匯出清單資料錯誤', message);
        }
    },


});

// http://skirtlesden.com/articles/styling-extjs-grid-cells

// the grid markup
/*
<div class="x-panel x-grid"> 
    <!-- The column headers --> 
    <div class="x-grid-header-ct">...</div> 
 
    <!-- The panel body --> 
    <div class="x-panel-body x-grid-body"> 
        <!-- The grid view --> 
        <div class="x-grid-view"> 
            <table class="x-grid-table"> 
                <tbody> 
                    <!-- A dummy row used to resize columns --> 
                    <tr class="x-grid-header-row">...</tr> 
 
                    <!-- The first grid row --> 
                    <tr class="x-grid-row"> 
                        <td class="x-grid-cell x-grid-cell-first"> 
                            <div class="x-grid-cell-inner">Timothy</div> 
                        </td> 
                        <td class="x-grid-cell"> 
                            <div class="x-grid-cell-inner">34</div> 
                        </td> 
                        <td class="x-grid-cell x-grid-cell-last"> 
                            <div class="x-grid-cell-inner">M</div> 
                        </td> 
                    </tr> 
 
                    <!-- The second grid row --> 
                    <tr class="x-grid-row x-grid-row-alt"> 
                        ... 
                    </tr> 
 
                    ... 
                </tbody> 
            </table> 
        </div> 
    </div> 
</div>
*/