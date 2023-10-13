Ext.define('Ext.ux.model.AntSelectionModel', {
    extend: 'Ext.grid.selection.Model',
    alias: 'selmodel.antSelectionModel',

    mode: 'multi',
    checkbox: true, // 開啟checkbox
    cells: false, // 是否可單獨選cell
    columns: false, // 是否可選整欄
    rows: true, // 是否可選列

    constructor: function (config) {
        let me = this;
        me.callParent(arguments);

        try {

            let grid = config.view;
            if (grid) {

                let activate = function () {
                    try {
                    } catch (e) {
                        console.log('antSelectionModel/ activate error', e)
                    }
                }

                let selectCheckcolumn = function (obj, selected, eOpts) {
                    try {

                        
                    } catch (e) {
                        console.log('antSelectionModel/ activate error', e)
                    }
                }

                grid.addListener('activate', () => {
                    activate();
                })

                grid.addListener('select', (obj, selected, eOpts) => {
                    selectCheckcolumn(obj, selected, eOpts);
                })
            }

            // debugger
        } catch (e) {
            console.log('antSelectionModel/ constructor error', e)
        }
    },
});