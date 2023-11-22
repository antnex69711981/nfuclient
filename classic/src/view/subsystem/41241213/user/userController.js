Ext.define('antnex.subsystem.41241213.user.userController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.page-41241213-user',
    requires: [],
    config: {
        name: 'LT',
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
            me.funcbarSearch = me.lookupReference('btn-page-41241213-user-funcbar-search');
            me.funcbarAdd = me.lookupReference('btn-page-41241213-user-funcbar-add');
            me.funcbarEdit = me.lookupReference('btn-page-41241213-user-funcbar-edit');
            me.funcbarSave = me.lookupReference('btn-page-41241213-user-funcbar-save');
            me.funcbarCancel = me.lookupReference('btn-page-41241213-user-funcbar-cancel');

            // 查詢列
            me.searchBar = me.lookupReference('panel-page-41241213-user-searchbar');
            me.searchCode = me.lookupReference('txt-page-41241213-user-searchbar-code');
            me.searchName = me.lookupReference('txt-page-41241213-user-searchbar-name');
            me.searchStatus = me.lookupReference('cmbx-page-41241213-user-searchbar-status');

            // 主畫面
            me.viewUserlist = me.lookupReference('grid-page-41241213-user-userlist');

            me.viewCode = me.lookupReference('txt-page-41241213-user-code');
            me.viewName = me.lookupReference('txt-page-41241213-user-name');
            me.viewclass = me.lookupReference('txt-page-41241213-user-class');
            me.viewmail = me.lookupReference('txt-page-41241213-user-mail');
            me.viewpassword = me.lookupReference('txt-page-41241213-user-password');
            me.viewstatus = me.lookupReference('txt-page-41241213-user-status');
            me.viewex = me.lookupReference('txt-page-41241213-user-ex');
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
                class: '101',
                mail: 'ba@gmail.com',
                password: 'password',
                status: 1,
                ex: 'None',
            }, {
                code: 'stanley',
                name: '李厚生',
                mail: '456789',
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
            me.viewclass.setValue('');
            me.viewmail.setValue('');
            me.viewpassword.setValue('');
            me.viewstatus.setValue('');
            me.viewex.setValue('');

            if (record) {
                me.viewCode.setValue(record.get('code'));
                me.viewName.setValue(record.get('name'));
                me.viewclass.setValue(record.get('class'));
                me.viewmail.setValue(record.get('mail'));
                me.viewpassword.setValue(record.get('password'));
                me.viewstatus.setValue(record.get('status'));
                me.viewex.setValue(record.get('ex'));

                // renderer: function (value) {
                //     let store = Ext.create('antnex.store.static.Status');
                //     let record = store.getRange().find(e => e.get('value') == value);
                //     return record ? record.get('text') : `無法辨識: ${value}`;
                // }
            }
        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },
});
