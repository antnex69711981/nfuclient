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
            me.searchCode = me.lookupReference('txt-antStanley-user2-searchbar-code');
            me.searchName = me.lookupReference('txt-antStanley-user2-searchbar-name');

            // 主畫面
            me.viewUserlist = me.lookupReference('grid-antStanley-user2-userlist');

            me.viewCode = me.lookupReference('txt-antStanley-user2-code');
            me.viewName = me.lookupReference('txt-antStanley-user2-name');
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



    /*************** searchbar ***************/
    // button: 查詢
    doSearch: async function () {
        let me = this
        try {
            let code = me.searchCode.getValue();
            let name = me.searchName.getValue();

            let uploadJSON = {
                code: code,
                name: name,
            }

            console.log('----------- 查詢條件 -----------');
            console.log(uploadJSON);

            me.viewUserlist.getStore().clearFilter();
            me.viewUserlist.getStore().filter(e => {
                let display = true;
                if (uploadJSON.code) {
                    display = e.get('code').includes(uploadJSON.code) ? display : false;
                }

                if (uploadJSON.name) {
                    display = e.get('name').includes(uploadJSON.name) ? display : false;
                }

                console.log(`正在處理: ${JSON.stringify(e.getData())} => ${display ? '顯示' : '不顯示'}`);
                return display;
            })

        } catch (e) {
            me.showError('user2Controller/ doSearch error:', e);
        }
    },
    // button: 清除
    cleanSearch: function () {
        let me = this
        try {
            me.searchCode.setValue('');
            me.searchName.setValue('');
        } catch (e) {
            me.showError('user2Controller/ cleanSearch error:', e);
        }
    },



    /*************** view ***************/
    // event: 選擇使用者
    onSelectUser: function () {
        let me = this
        try {
            let selection = me.viewUserlist.getSelection();
            let record = selection[0];

            me.viewCode.setValue('');
            me.viewName.setValue('');

            if (record) {
                me.viewCode.setValue(record.get('code'));
                me.viewName.setValue(record.get('name'));
            }
        } catch (e) {
            me.showError('user2Controller/ onSelectUser error:', e);
        }
    },
});
