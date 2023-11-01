Ext.define('antnex.subsystem.sample.antStanley.user2.user2Controller', {
    extend: 'antnex.default.defaultController',
    alias: 'controller.antStanley-user2',
    requires: [],
    config: {
        name: '使用者管理2',
    },
    // function: 初始化物件 - 首次進入觸發(Override)
    initObj: function () {
        let me = this
        try {
            // 功能列
            me.funcbarSearch = me.lookupReference('btn-antStanley-user2-funcbar-search');
            me.funcbarAdd = me.lookupReference('btn-antStanley-user2-funcbar-add');
            me.funcbarEdit = me.lookupReference('btn-antStanley-user2-funcbar-edit');
            me.funcbarSave = me.lookupReference('btn-antStanley-user2-funcbar-save');
            me.funcbarCancel = me.lookupReference('btn-antStanley-user2-funcbar-cancel');

            // 查詢列
            me.searchBar = me.lookupReference('panel-antStanley-user2-searchbar');

            // 主畫面
            me.viewUserlist = me.lookupReference('grid-antStanley-user2-userlist');

        } catch (e) {
            me.showError('user2Controller/ initObj error:', e);
        }
    },
    // function: 載入物件資料 - 每次進入觸發(Override)
    refreshObj: async function () {
        let me = this
        try {
            let data = [{
                code: 'root',
                name: '系統管理員',
                email: '',
                status: 1,
            }, {
                code: 'stanley',
                name: '李厚生',
                email: '',
                status: 1,
            }]
            me.viewUserlist.getStore().loadData(data);
        } catch (e) {
            me.showError('user2Controller/ refreshObj error:', e);
        }
    },
    // function: 初始化頁面狀態 - 首次進入觸發(Override)
    initPageStatus: function () {
        let me = this
        try {

        } catch (e) {
            me.showError('user2Controller/ initPageStatus error:', e);
        }
    },
});
