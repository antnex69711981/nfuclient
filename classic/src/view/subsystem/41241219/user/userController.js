Ext.define('antnex.subsystem.41241219.user.userController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.page-41241219-user',
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
            me.searchCode = me.lookupReference('txt-antStanley-user-searchbar-code');
            me.searchName = me.lookupReference('txt-antStanley-user-searchbar-name');
            me.searchStatus = me.lookupReference('cmbx-antStanley-user-searchbar-status');

            // 主畫面
            me.viewUserlist = me.lookupReference('grid-antStanley-user-userlist');

            me.viewCode = me.lookupReference('txt-antStanley-user-code');
            me.viewName = me.lookupReference('txt-antStanley-user-name');
            me.viewMail = me.lookupReference('txt-antStanley-user-mail');
            me.viewMeom = me.lookupReference('txt-antStanley-user-meom');
            me.searchStatus = me.lookupReference('cmbx-antStanley-user-status');
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
                status: 9,
            }]
            me.viewUserlist.getStore().loadData(data);
        } catch (e) {
            me.showError('userController/ refreshObj error:', e);
        }
    },


    /*************** searchbar ***************/
    // event: ENTER查詢
    enterSearch: function (field, e) {
        let me = this
        try {
            if (e.getKey() == e.ENTER) {
                me.doSearch();
            }
        } catch (e) {
            me.showError('userController/ enterSearch error:', e);
        }
    },
    // button: 查詢
    doSearch: async function () {
        let me = this
        try {
            let code = me.searchCode.getValue();
            let name = me.searchName.getValue();
            let status = me.searchStatus.getValue();

            let uploadJSON = {
                code: code,
                name: name,
                status: status,
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

                if (uploadJSON.status) {
                    display = e.get('status') == status ? display : false;
                }

                console.log(`正在處理: ${JSON.stringify(e.getData())} => ${display ? '顯示' : '不顯示'}`);
                return display;
            })

        } catch (e) {
            me.showError('userController/ doSearch error:', e);
        }
    },
    // button: 清除
    cleanSearch: function () {
        let me = this
        try {
            me.searchCode.setValue('');
            me.searchName.setValue('');
            me.searchStatus.setValue('');
        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
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
            me.showError('userController/ cleanSearch error:', e);
        }
    },
});

