Ext.define('antnex.services.basic.FunctionService', {
    requires: [],

    constructor: function (config) {
        this.initConfig(config);
    },

    load: async function () {
        let me = this;
        try {
            let store = antnex.AppDefaults.getConfig('function');

            let functionList = [];

            let pageList = [{
                parentcode: 'root',
                code: 'profitlist',
                name: '毛利統計表',
                xtype: 'profitlist',
                iconcls: 'fas fa-bookmark'
            }, {
                parentcode: 'root',
                code: 'projectdetail',
                name: '專案銷售明細表',
                xtype: 'projectdetail',
                iconcls: 'fas fa-bookmark'
            }, {
                parentcode: 'root',
                code: 'dailyreport',
                name: '工作日報表',
                xtype: 'dailyreport',
                iconcls: 'fas fa-bookmark'
            }, {
                parentcode: 'root',
                code: 'inspection',
                name: '檢測項目主檔',
                xtype: 'inspection',
                iconcls: 'fas fa-bookmark'
            }, {
                parentcode: 'root',
                code: 'restoreprice',
                name: '維修報價主檔',
                xtype: 'restoreprice',
                iconcls: 'fas fa-bookmark'
            }, {
                parentcode: 'root',
                code: 'restoreitem',
                name: '維修項目主檔',
                xtype: 'restoreitem',
                iconcls: 'fas fa-bookmark'
            }]

            functionList = functionList.concat(pageList);

            store.loadData(functionList);

        } catch (e) {
            me.showError('FunctionService/ load error:', e);
        }
    },

    showMessage: function (message) {
        Ext.Msg.alert("異常通知", message);
    },
    showError: function (path, message) {
        this.showMessage(message);
        console.log(path + message)
    }
});
