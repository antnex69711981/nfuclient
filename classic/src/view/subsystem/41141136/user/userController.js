Ext.define('antnex.subsystem.41141136.user.userController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.page-41141136-user',
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
            me.funcbarSearch = me.lookupReference('btn-41141136-user-funcbar-search');
            me.funcbarAdd = me.lookupReference('btn-41141136-user-funcbar-add');
            me.funcbarEdit = me.lookupReference('btn-41141136-user-funcbar-edit');
            me.funcbarSave = me.lookupReference('btn-41141136-user-funcbar-save');
            me.funcbarCancel = me.lookupReference('btn-41141136-user-funcbar-cancel');

            // 查詢列
            me.searchBar = me.lookupReference('panel-41141136-user-searchbar');
            me.searchCode = me.lookupReference('txt-41141136-user-searchbar-code');
            me.searchName = me.lookupReference('txt-41141136-user-searchbar-name');
            me.searchmail = me.lookupReference('txt-41141136-user-searchbar-mail');
            me.searchMemo = me.lookupReference('txt-41141136-user-searchbar-Memo');
            me.searchcreateusercode = me.lookupReference('txt-41141136-user-searchbar-createusercode');
            me.searchcreatetm = me.lookupReference('txt-41141136-user-searchbar-createtm');
            me.searchmodifyusercode = me.lookupReference('txt-41141136-user-searchbar-modifyusercode');
            me.searchmodifytm = me.lookupReference('txt-41141136-user-searchbar-modifytm');
            me.searchStatus = me.lookupReference('cmbx-41141136-user-searchbar-status');

            // 主畫面
            me.viewUserlist = me.lookupReference('grid-41141136-user-userlist');

            me.viewCode = me.lookupReference('txt-41141136-user-code');
            me.viewName = me.lookupReference('txt-41141136-user-name');
            me.viewmail = me.lookupReference('txt-41141136-user-mail');
            me.viewMemo = me.lookupReference('txt-41141136-user-Memo');
            me.viewstatus = me.lookupReference('txt-41141136-user-status');
            me.viewcreateusercode = me.lookupReference('txt-41141136-user-createusercode');
            me.viewcreatetm = me.lookupReference('txt-41141136-user-createtm');
            me.viewmodifyusercode = me.lookupReference('txt-41141136-user-modifyusercode');
            me.viewmodifytm = me.lookupReference('txt-41141136-user-modifytm');
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
                mail: '',
                status: 1,
                Memo:'',
                createusercode:'',
                createtm:'2023-11-19',
                modifyusercode:'',
                modifytm:'',
            }, {
                code: 'stanley',
                name: '李厚生',
                mail: 'lex',
                status: 9,
                Memo:'',
                createusercode:'',
                createtm:'2023-11-19',
                modifyusercode:'',
                modifytm:'',
            }, {
                code: '41141136',
                name: '陳俊伍',
                mail: '41141136@nfu.edu.tw',
                status: 1,
                Memo:'',
                createusercode:'111',
                createtm:'2023-11-20',
                modifyusercode:'',
                modifytm:'',
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
            let mail = me.searchmail.getValue();
            let Memo = me.searchMemo.getValue();
            let createusercode = me.searchcreateusercode.getValue();
            let createtm = me.searchcreatetm.getValue();
            let modifyusercode = me.searchmodifyusercode.getValue();
            let modifytm = me.searchmodifytm.getValue();
            let status = me.searchStatus.getValue();

            let uploadJSON = {
                code: code,
                name: name,
                mail: mail,
                Memo: Memo,
                createusercode: createusercode,
                createtm: createtm,
                modifyusercode: modifyusercode,
                modifytm: modifytm,
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
                if (uploadJSON.mail) {
                    display = e.get('mail').includes(uploadJSON.mail) ? display : false;
                }
                if (uploadJSON.Memo) {
                    display = e.get('Memo').includes(uploadJSON.Memo) ? display : false;
                }
                if (uploadJSON.createusercode) {
                    display = e.get('createusercode').includes(uploadJSON.createusercode) ? display : false;
                }
                if (uploadJSON.createtm) {
                    display = e.get('createtm').includes(uploadJSON.createtm) ? display : false;
                }
                if (uploadJSON.modifyusercode) {
                    display = e.get('modifyusercode').includes(uploadJSON.modifyusercode) ? display : false;
                }
                if (uploadJSON.modifytm) {
                    display = e.get('modifytm').includes(uploadJSON.modifytm) ? display : false;
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
            me.searchmail.setValue('');
            me.searchMemo.setValue('');
            me.searchcreateusercode.setValue('');
            me.searchcreatetm.setValue('');
            me.searchmodifyusercode.setValue('');
            me.searchmodifytm.setValue('');
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
            me.viewmail.setValue('');
            me.viewMemo.setValue('');
            me.viewstatus.setValue('');
            me.viewcreateusercode.setValue('');
            me.viewcreatetm.setValue('');
            me.viewmodifyusercode.setValue('');
            me.viewmodifytm.setValue('');

            if (record) {
                me.viewCode.setValue(record.get('code'));
                me.viewName.setValue(record.get('name'));
                me.viewmail.setValue(record.get('mail'));
                me.viewMemo.setValue(record.get('Memo'));
                me.viewstatus.setValue(record.get('status'));
                me.viewcreateusercode.setValue(record.get('createusercode'));
                me.viewcreatetm.setValue(record.get('createtm'));
                me.viewmodifyusercode.setValue(record.get('modifyusercode'));
                me.viewmodifytm.setValue(record.get('modifyusertm'));
            }
        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },    
});
