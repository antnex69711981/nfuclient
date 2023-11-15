Ext.define('antnex.subsystem.sample.41041124.user.userController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.page-41041124-user',
    requires: [],
    config: {
        name: '41041124-管理',
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
            // 功能列(新增、修改、儲存、取消儲存 的按鈕)
            me.funcbarSearch = me.lookupReference('btn-41041124-user-funcbar-search');
            me.funcbarAdd = me.lookupReference('btn-41041124-user-funcbar-add');
            me.funcbarEdit = me.lookupReference('btn-41041124-user-funcbar-edit');
            me.funcbarSave = me.lookupReference('btn-41041124-user-funcbar-save');
            me.funcbarCancel = me.lookupReference('btn-41041124-user-funcbar-cancel');

            // 查詢列(針對特定條件進行查詢)
            me.searchBar = me.lookupReference('panel-41041124-user-searchbar');
            me.searchCode = me.lookupReference('txt-41041124-user-searchbar-code');
            me.searchName = me.lookupReference('txt-41041124-user-searchbar-name');
            me.searchMail = me.lookupReference('txt-41041124-user-searchbar-mail');
            me.searchMemo = me.lookupReference('txt-41041124-user-searchbar-memo');
            me.searchStatus = me.lookupReference('cmbx-41041124-user-searchbar-status');
            me.searchCreateusercode = me.lookupReference('txt-41041124-user-searchbar-createusercode');
            me.searchCreatetm = me.lookupReference('txt-41041124-user-searchbar-createtm');

            // 主畫面
            me.viewUserlist = me.lookupReference('grid-41041124-user-userlist');

            // 列值抓取 (資料維護的資料)
            me.viewCode = me.lookupReference('txt-41041124-user-code');
            me.viewName = me.lookupReference('txt-41041124-user-name');
            me.viewMail = me.lookupReference('txt-41041124-user-mail');
            me.viewMemo = me.lookupReference('txt-41041124-user-memo');
            me.viewStatus = me.lookupReference('cmbx-41041124-user-status');    

            me.viewCreateusercode = me.lookupReference('txt-41041124-user-createusercode');
            

        } catch (e) {
            me.showError('userController/ initObj error:', e);
        }
    },
    // function: 載入物件資料 - 每次進入觸發(Override)
    refreshObj: async function () {
        let me = this
        try {
            let data = [{
                code: 'admin_user',
                name: '系統管理員',
                mail: 'xxx@gmail.com',
                memo:'測試',
                createusercode:'admin',
                createtm:'2023,11,10',
                status: 1,
            }, {
                code: '41041124',
                name: '林裕翔',
                mail: 'a55472016@gmail.com',
                memo:'brian',
                createusercode:'root',
                createtm:'2023,11,11',
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
            let mail = me.searchMail.getValue();
            let memo = me.searchMemo.getValue();
            let status = me.searchStatus.getValue();
            let createusercode = me.searchCreateusercode.getValue();
            let createtm = me.searchCreatetm.getValue();

            let uploadJSON = {
                code: code,
                name: name,
                mail:mail,
                memo:memo,
                status: status,
                createusercode:createusercode,
                createtm:createtm
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

                if (uploadJSON.mail) {
                    display = e.get('mail').includes(uploadJSON.mail) ? display : false;
                }

                if (uploadJSON.memo) {
                    display = e.get('memo').includes(uploadJSON.memo) ? display : false;
                }

                if (uploadJSON.status) {
                    display = e.get('status') == status ? display : false;
                }
                
                if (uploadJSON.createusercode) {
                    display = e.get('createusercode').includes(uploadJSON.createusercode) ? display : false;
                }

                if (uploadJSON.createtm) {
                    display = e.get('createtm').includes(Ext.Date.format(uploadJSON.createtm,'Y,m,d'))  ? display : false;
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
            me.searchMail.setValue('');
            me.searchMemo.setValue('');
            me.searchStatus.setValue('');
            me.searchCreateusercode.setValue('');
            me.searchCreatetm.setValue('');


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

            // 選擇後顯示動作
            me.viewCode.setValue('');
            me.viewName.setValue('');
            me.viewMail.setValue('');
            me.viewMemo.setValue('');
            me.viewStatus.setValue('');
            
            
            if (record) {
                me.viewCode.setValue(record.get('code'));
                me.viewName.setValue(record.get('name'));
                me.viewMail.setValue(record.get('mail'));
                me.viewMemo.setValue(record.get('memo'));
                me.viewStatus.setValue(record.get('status'));
            }
        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },
});
