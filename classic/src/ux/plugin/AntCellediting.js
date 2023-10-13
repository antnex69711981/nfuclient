Ext.define('antnex.ux.plugin.AntCellediting', {
    extend: 'Ext.grid.plugin.CellEditing',
    alias: 'plugin.antCellediting',

    config: {
        editColumns: [],
        requireColumns: [],
    },
    clicksToEdit: 1,

    requireColor: '#E0FCFF',
    hintColor: '#FFEFB2',
    fullKey: null, // 全開回傳值

    /**
     * 編輯規則: 
     * 1. 回傳可編輯的dataIndex
     * 2. 回傳fullkey表示允許所有欄位的編輯
     * 
     * @param {object} record 
     * @param {object} fullKey 
     * @returns fullkey || [dataIndex]
     */
    editRule: function (record, fullKey) {
        return fullKey;
    },

    // 欄位移動處理
    cellMove: false,
    /**
     * 移動方式
     * 水平移動: horizontal
     * 垂直移動: vertical
     */
    moveDirection: 'horizontal',
    moveEvent: 'keydown',
    moveKey: Ext.event.Event.ENTER,
    addFunction: null,

    constructor: function (config) {
        let me = this;
        me.callParent(arguments);

        try {
            let grid = me.cmp.ownerGrid;
            if (grid) {
                // 初始化
                let initColumns = function () {
                    try {
                        let editColumns = grid.getColumns()
                            .filter(col => col.editor ? true : false)
                            .map(col => col.dataIndex);

                        let requireColumns = grid.getColumns()
                            .filter(col => col.editor ? col.editor.allowBlank == false : false)
                            .map(col => col.dataIndex);

                        me.setConfig('editColumns', editColumns);
                        me.setConfig('requireColumns', requireColumns);
                    } catch (e) {
                        console.error('AntCellediting/ initColumns error: ', e)
                    }
                }

                // 欄位變色
                let selectionchange = function () {
                    try {
                        let enableColumns = me.getEnableColumns();
                        let requireColumns = me.getConfig('requireColumns')
                        grid.getColumns().forEach(col => {
                            let color = '';
                            if (enableColumns.includes(col.dataIndex)) {
                                color = requireColumns.includes(col.dataIndex) ? me.requireColor : me.hintColor;
                            }
                            col.setStyle({ background: color })
                        });
                    } catch (e) {
                        console.error('AntCellediting/ selectionchange error: ', e)
                    }
                }

                // 欄位移動
                let initCellmove = function () {
                    if (me.cellMove !== true) return;

                    let direction = me.moveDirection;
                    let event = me.moveEvent;
                    let key = me.moveKey;

                    // 欄位移動(水平移動)
                    let cellMove_horizontal = function (field, e) {
                        try {
                            if (e.getKey() == key) {
                                let record = grid.getSelection()[0];
                                if (record == undefined) return;

                                let position = grid.getView().getPosition(record, field.column);
                                let colIdx = position.colIdx;
                                let colSize = grid.getColumns().length;

                                // colSize * 2 以達到循環效果
                                for (let idx = colIdx; idx < colSize * 2; idx++) {
                                    position.setColumn((idx + 1) % colSize); // 移動column至下一個位置

                                    // 若已經到最後一個欄位: 判斷是否有新增資料的function
                                    if (idx >= colSize) {
                                        let addFunction = me.addFunction;
                                        if (['string', 'function'].includes(typeof addFunction)) {
                                            ConvertTK.fireEvent(grid, me.addFunction, null);
                                            break;
                                        }
                                    }

                                    if (position.column) {
                                        // me.fireEvent('beforeedit') 會用到
                                        position.grid = grid;
                                        position.field = position.column.dataIndex;

                                        // 判斷編輯
                                        let editTest = me.fireEvent('beforeedit', me, position);
                                        if (editTest) {
                                            // 略過textarea
                                            let editor = position.column.getEditor();
                                            if (editor.xtype == 'textarea') continue;
                                            if (editor.xtype == 'antTextarea') continue;

                                            me.startEditByPosition(position);
                                            break;
                                        }
                                    }
                                }
                            }
                        } catch (e) {
                            console.error(`AntCellediting/ cellMove_horizontal error: `, e);
                        }
                    }

                    // 欄位移動(垂直移動)
                    let cellMove_vertical = function (field, e) {
                        try {
                            if (e.getKey() == key) {
                                let rowIdx = grid.getStore().getRange().findIndex(e => e == grid.getSelection()[0]);
                                let rowSize = grid.getStore().getRange().length;
                                for (let idx = rowIdx; idx < rowSize * 2; idx++) {
                                    let record = grid.getStore().getRange()[(idx + 1) % rowSize];
                                    // 若已經到最後一個欄位: 判斷是否有新增資料的function
                                    if (idx >= rowSize) {
                                        let addFunction = me.addFunction;
                                        if (['string', 'function'].includes(typeof addFunction)) {
                                            ConvertTK.fireEvent(grid, me.addFunction, null);
                                            break;
                                        }
                                    }


                                    if (record) {
                                        let position = grid.getView().getPosition(record, field.column);
                                        // me.fireEvent('beforeedit') 會用到
                                        position.grid = grid;
                                        position.field = position.column.dataIndex;

                                        // 判斷編輯
                                        let editTest = me.fireEvent('beforeedit', me, position);
                                        if (editTest) {
                                            // 略過textarea
                                            let editor = position.column.getEditor();
                                            if (editor.xtype == 'textarea') continue;
                                            if (editor.xtype == 'antTextarea') continue;

                                            me.startEditByPosition(position);
                                            break;
                                        }
                                    }
                                }
                            }
                        } catch (e) {
                            console.error(`AntCellediting/ cellMove_vertical error: `, e);
                        }
                    }

                    // 取得要加入listener的欄位
                    grid.getColumns().forEach(column => {
                        let editor = column.getEditor();
                        if (editor) {
                            // 為避免事件衝突, 已經寫好的listener不重複寫入
                            if (editor.hasListener(event)) return;

                            editor.enableKeyEvents = true;
                            switch (direction) {
                                case 'horizontal':
                                    editor.addListener(event, cellMove_horizontal);
                                    break;
                                case 'vertical':
                                    editor.addListener(event, cellMove_vertical);
                                    break;
                            }
                        }
                    });

                    grid.addListener('cellMove', (field, e) => {
                        switch (direction) {
                            case 'horizontal':
                                cellMove_horizontal(field, e);
                                break;
                            case 'vertical':
                                cellMove_vertical(field, e);
                                break;
                        }
                    });
                }

                grid.addListener('afterrender', () => {
                    initColumns();
                    initCellmove();
                    selectionchange();
                })
                grid.addListener('selectionchange', () => {
                    selectionchange();
                });
            }
        } catch (e) {
            console.error('AntCellediting/ constructor error: ', e)
        }
    },

    listeners: {
        beforeedit: function (plugin, context, eOpts) {
            try {
                let me = this;
                let grid = context.grid;
                let record = context.record;
                let dataIndex = context.field;

                grid.setSelection(record);
                grid.fireEvent('selectionchange');

                let enableColumns = me.getEnableColumns();
                return enableColumns.includes(dataIndex);
            } catch (e) {
                console.error('AntCellediting/ beforeedit error', e)
            }
        },
    },

    // function: 取得可編輯欄位[dataIndex]
    getEnableColumns: function () {
        try {
            let me = this;
            let grid = me.cmp.ownerGrid;
            let selected = grid.getSelection();
            switch (selected.length) {
                case 0:
                    return me.getConfig('editColumns');
                case 1:
                    let enableColumns = me.getConfig('editColumns');
                    if (['string', 'function'].includes(typeof me.editRule)) {
                        enableColumns = ConvertTK.fireEvent(grid, me.editRule, me.fullKey, selected[0], me.fullKey);
                    }

                    enableColumns = enableColumns === me.fullKey ? me.getConfig('editColumns') : enableColumns;

                    return enableColumns;
                default:
                    return [];
            }
        } catch (e) {
            console.error('AntCellediting/ getEnableColumns error', e)
        }
        return [];
    }
});