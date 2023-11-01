Ext.define('antnex.subsystem.sample.antStanley.user.userController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.antStanley-user',
    requires: [],
    config: {
        name: '使用者管理1',
    },
    // event: 初始化
    onInitialize: async function () {
        let me = this;
        try {
            console.log(`userController/ onInitialize entry`);

            me.initObj();
            await me.refreshObj();
        } catch (e) {
            me.showError(`userController/ onInitialize error: `, e);
        }
    },
    // event: 頁面切換
    onActivate: async function () {
        let me = this;
        try {
            console.log(`userController/ onActivate entry`);

        } catch (e) {
            me.showError(`userController/ onActivate error: `, e);
        }
    },
    // function: 初始化物件 - 首次進入觸發(Override)
    initObj: function () {
        let me = this
        try {
            // 功能列
            me.funcbarSearch = me.lookupReference('btn-antStanley-user-funcbar-search');
            me.funcbarAdd = me.lookupReference('btn-antStanley-user-funcbar-add');
            me.funcbarEdit = me.lookupReference('btn-antStanley-user-funcbar-edit');
            me.funcbarSave = me.lookupReference('btn-antStanley-user-funcbar-save');
            me.funcbarCancel = me.lookupReference('btn-antStanley-user-funcbar-cancel');

            // 查詢列
            me.searchBar = me.lookupReference('panel-antStanley-user-searchbar');

            // 主畫面
            me.viewUserlist = me.lookupReference('grid-antStanley-user-userlist');

        } catch (e) {
            me.showError('userController/ initObj error:', e);
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
            me.showError('userController/ refreshObj error:', e);
        }
    },
});
