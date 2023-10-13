Ext.define('antnex.ux.gridpanel.AntGridpanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.antGridpanel',
    ui: 'antGridpanelUI',
    cls: '',

    border: false,

    collapsible: false,

    collapseDirection: 'left',

    columnLines: false,

    bufferedRenderer: false,

    runInViewport: false,

    stateful: true,

    collapseToolText: '收合',

    expandToolText: '展開',

    sortableColumns: true, // 允許排序

    enableLocking: false, // 啟用鎖定欄位

    viewConfig: {
        enableTextSelection: true,
    },

    dockedItems: [{
        xtype: 'antToolbar',
        dock: 'top',
    }],

    store: {
        // 群組排序: 'ASC', 'DESC'
        groupDir: 'ASC'
    },

    /*********** 複選 ***********/
    selModel: {
        selType: 'antCheckboxmodel',
        // grid.selModel.setSelectionMode('SINGLE'); // 單選(SINGLE), 複選(MULTI)
    },

    /*********** 編輯模組 ***********/
    plugins: [{
        ptype: 'antCellediting',
        editRule: null,
    }],

    /*********** grouping ***********/
    // features: [{
    //     ftype: 'antGrouping',
    //     groupHeaderTpl: '{name} ({[values.children.length]})',
    //     showSummaryRow: false, // 顯示加總
    // }],
    // store: {
    //     groupField: 'fieldname'
    // },

    /*********** summary ***********/
    // features: [{
    //     ftype: 'antSummary',
    // }],

    listeners: {
        afterrender: function () {
            let me = this;

            // 初始化stateCookie
            let intiStateCookie = function () {
                let stateid = me.getStateId();

                if (stateid) {
                    let header = me.getDockedItems().find(e => e.xtype == 'header');
                    if (header) {
                        header.add({
                            xtype: 'toolButton',
                            tooltip: '儲存欄位資訊',
                            iconCls: 'fas fa-save',
                            listeners: {
                                click: async function () {
                                    try {
                                        let uploadJSON = {
                                            txcode: 'BASIC_STATECOOKIE_INSERT_OR_UPDATE',
                                            usercode: antnex.AppDefaults.getUsercode(),
                                            stateid: stateid,
                                            cookie: JSON.stringify(Ext.state.Manager.get(stateid).columns),
                                        }

                                        me.mask(CONST_LOADING_HINT);
                                        let json = await antnex.ProxyService.send(uploadJSON)
                                        me.unmask();
                                        switch (json.status) {
                                            case CONST_STATUS_OK:
                                                Ext.Msg.alert('欄位存取訊息', '儲存欄位資訊成功！');
                                                break;
                                            default:
                                                throw json.statusText
                                        }
                                    } catch (e) {
                                        Ext.Msg.alert('欄位存取訊息異常', e);
                                    }
                                }
                            },
                        });

                        header.add({
                            xtype: 'toolButton',
                            tooltip: '重置欄位資訊',
                            iconCls: 'fas fa-undo',
                            listeners: {
                                click: async function () {
                                    try {
                                        let uploadJSON = {
                                            txcode: 'BASIC_STATECOOKIE_DELETE_USER_STATEID',
                                            usercode: antnex.AppDefaults.getUsercode(),
                                            stateid: stateid
                                        }

                                        me.mask(CONST_LOADING_HINT);
                                        let json = await antnex.ProxyService.send(uploadJSON)
                                        me.unmask();
                                        switch (json.status) {
                                            case CONST_STATUS_OK:
                                                Ext.state.Manager.set(stateid, {});
                                                Ext.Msg.alert('欄位存取訊息', '重置欄位資訊成功，重新開啟功能後生效！');
                                                break;
                                            default:
                                                throw json.statusText
                                        }
                                    } catch (e) {
                                        Ext.Msg.alert('欄位存取訊息異常', e);
                                    }
                                }
                            },
                        });
                    }
                }
            }

            intiStateCookie();
        },
        itemdblclick: function (grid, record, item, index, e, eOpts) {
            this.setSelection(record);
        },
    },

    // 取得匯出格式的array: 'antnex.services.ExportService'
    getExportFromat: function (passColumn = [undefined, '&#160;', '項次'], config = {}) {
        try {
            // config: 只匯出選擇的
            let exportSelected = false;
            if (config.exportSelected == true) exportSelected = true

            // config: 匯出隱藏欄位
            let exportHiddenColumn = false;
            if (config.exportHiddenColumn == true) exportHiddenColumn = true

            // config: 不套用renderer的欄位
            let skipRenderer = [];
            if (config.skipRenderer) skipRenderer = config.skipRenderer;

            // config: 加總欄位
            let summaryColumn = [];
            if (config.summaryColumn) summaryColumn = config.summaryColumn;

            // 移除html的<>, 以取得純文字內容
            let removeHtmlTag = function (value) {
                /**
                 * @author chatGPT
                 * 
                 * `<` 和 `>` 分別代表HTML標籤的開始和結束。
                 * `[^>]+` 匹配除了 `>` 以外的任何字符，其中 `+` 表示至少匹配一次。
                 * `()` 用來捕獲匹配的子字符串。
                 * `/g` 表示全局匹配，即找到所有匹配的子字符串。
                 * `/i` 表示忽略大小寫。
                 */
                value = S(value).isEmpty() ? '' : value;
                return value.replace(/(<([^>]+)>)/gi, '');
            }

            // 取得匯出欄位名稱(會包含父層名稱)
            let makeExportText = function (column) {
                let exportText = removeHtmlTag(column.text);
                if (column.up().xtype == 'gridcolumn') {
                    let prefixText = makeExportText(column.up());
                    exportText = `${prefixText}${S(prefixText).isEmpty() ? '' : '_'}${exportText}`
                }
                return exportText
            }

            // 取得columns
            let columns = this.getColumns();

            let datalist = exportSelected ? this.getSelection() : this.getStore().getRange();

            let data = [];
            let summary = {};
            datalist.forEach(record => {
                let row = {};
                columns.forEach(column => {
                    let dataIndex = column.dataIndex;
                    let text = removeHtmlTag(column.text);
                    let exportText = makeExportText(column);
                    let hasRenderer = column.renderer ? true : false;
                    if (skipRenderer.includes(column.dataIndex)) hasRenderer = false;

                    let doExport = true;
                    // 不匯出隱藏欄位 && 欄位已隱藏 => 不匯出
                    if (exportHiddenColumn == false && column.hidden) doExport = false;

                    // 欄位不可顯示/隱藏 && 欄位已隱藏 => 不匯出
                    if (column.hideable == false && column.hidden) doExport = false;

                    // 類型為actioncolumn => 不匯出
                    if (column.xtype == 'actioncolumn') doExport = false;;
                    // 類型為rownumber => 不匯出
                    if (column.xtype == 'antColumn-rownumberer') doExport = false;
                    if (column.xtype == 'rownumberer') doExport = false;

                    // 忽略欄位包含`column.text`, 移除htmltag的`text`, 最終匯出的`exportText`
                    if (S(column.text).isEmpty()) doExport = false;
                    if (passColumn.includes(column.text)) doExport = false;
                    if (passColumn.includes(text)) doExport = false;
                    if (passColumn.includes(exportText)) doExport = false;

                    if (doExport) {
                        if (hasRenderer) {
                            try {
                                row[exportText] = column.renderer(record.get(dataIndex), null, record);
                            } catch (e) {
                                console.log(`資料匯出轉換失敗: ${exportText}(${dataIndex})`)
                                row[exportText] = record.get(dataIndex);
                            }
                            if (!S(row[exportText]).isEmpty()) {
                                row[exportText] = removeHtmlTag(row[exportText]);
                            } else {
                                row[exportText] = '';
                            }
                        } else {
                            row[exportText] = record.get(dataIndex);
                        }

                        if (summaryColumn.find(e => e == dataIndex)) {
                            if (summary[exportText]) {
                                summary[exportText] += record.get(dataIndex);
                            } else {
                                summary[exportText] = record.get(dataIndex);
                            }
                        }
                    }
                });

                data.push(row);
            });

            if (JSON.stringify(summary) != '{}') {
                data.push(summary);
            }

            return data;
        } catch (e) {
            Ext.Msg.alert('匯出清單資料錯誤', e);
        }
    },

    // 展開所有群組
    expandGroup: function (featureType = 'antGrouping') {
        let feature = this.view.findFeature(featureType);
        if (feature) feature.expandAll();
    },

    // 收合所有群組
    collapseGroup: function (featureType = 'antGrouping') {
        let feature = this.view.findFeature(featureType);
        if (feature) feature.collapseAll();
    },

    // 變更欄位補功能
    setColumns: function () {
        this.callParent(arguments); // 執行原本`setColumns`要做的內容
        this.fireEvent('afterrender'); // 重新進行初始化
    },

    // function: 資料覆蓋(透過data.id覆蓋指定資料)
    encodeRecord: function (data = {}) {
        let me = this;
        let record = me.getStore().getRange().find(e => e.get('id') === data.id);
        if (record) {
            for (let key in data) {
                record.set(key, data[key]);
            }
        }
        // 清空grid異動紀錄
        me.getStore().commitChanges();
        return record
    },

    // function: 詢問移除選擇的資料
    askRemoveSelection: function () {
        return new Promise((resolve, reject) => {
            let me = this;
            let store = me.getStore();

            let selection = me.getSelection();
            if (selection.length == 0) {
                reject('請先選擇要刪除的資料');
            } else {
                Ext.Msg.confirm('提醒', '是否要移除選擇的資料?', async function (btn) {
                    if (btn == 'yes') {
                        store.remove(selection);
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            }
        })
    }
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
