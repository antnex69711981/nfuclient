Ext.define('antnex.view.src.restoreprice.RestorepriceController', {
    extend: 'antnex.default.defaultController',
    alias: 'controller.restoreprice',
    requires: [],
    config: {
        name: '維修報價主檔',

        action: null,
        requireKeylist: [],
    },

    // event: 初始化
    onInitialize: async function () {
        const me = this;
        try {
            console.log(`restorepriceController/ onInitialize entry`);

            me.initObj();
            await me.refreshObj();
            me.initPageStatus();
        } catch (e) {
            me.showError(`restorepriceController/ onInitialize error: `, e);
        }
    },
    // event: 頁面切換
    onActivate: async function () {
        let me = this;
        try {
            console.log(`restorepriceController/ onActivate entry`);

        } catch (e) {
            me.showError(`restorepriceController/ onActivate error: `, e);
        }
    },
    // function: 初始化物件 - 首次進入觸發(Override)
    initObj: function () {
        let me = this
        try {

        } catch (e) {
            me.showError('restorepriceController/ initObj error:', e);
        }
    },
    // function: 載入物件資料 - 每次進入觸發(Override)
    refreshObj: async function () {
        const me = this;
        try {

        } catch (e) {
            me.showError('restorepriceController/ refreshObj error:', e);
        }
    },
    // function: 初始化頁面狀態 - 首次進入觸發(Override)
    initPageStatus: function () {
        const me = this;
        try {
            // me.cleanSearch();
            // me.changeStatus('view');
            // me.loadData();
        } catch (e) {
            me.showError('restorepriceController/ initPageStatus error:', e);
        }
    },

    /************* 提示訊息 *************/
    // function:提示訊息
    showMessage: function (message) {
        Ext.Msg.alert(`${this.getConfig('name')} `, message);
    },
    // function:錯誤訊息
    showError: function (path, e) {
        this.showMessage(e);
        return false;
    },
});