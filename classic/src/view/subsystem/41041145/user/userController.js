Ext.define('antnex.subsystem.41041145.user.userController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.page-41041145-user',
    requires: [],
    config: {
        name: '劉家齊的使用者管理',
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
            me.funcbarSearch = me.lookupReference('btn-41041145-user-funcbar-search');
            me.funcbarAdd = me.lookupReference('btn-41041145-user-funcbar-add');
            me.funcbarEdit = me.lookupReference('btn-41041145-user-funcbar-edit');
            me.funcbarSave = me.lookupReference('btn-41041145-user-funcbar-save');
            me.funcbarCancel = me.lookupReference('btn-41041145-user-funcbar-cancel');

            // 查詢列
            me.searchBar = me.lookupReference('panel-41041145-user-searchbar');
            me.searchCode = me.lookupReference('txt-41041145-user-searchbar-code');
            me.searchName = me.lookupReference('txt-41041145-user-searchbar-name');
            me.searchCreateusercode = me.lookupReference('txt-41041145-user-searchbar-createusercode');
            me.searchStatus = me.lookupReference('cmbx-41041145-user-searchbar-status');
            me.searchCreatetm = me.lookupReference('dat-41041145-user-searchbar-createtm');

            // 新增列
            me.addBar = me.lookupReference('panel-41041145-user-addbar');
            me.addCode = me.lookupReference('txt-41041145-user-addbar-code');
            me.addName = me.lookupReference('txt-41041145-user-addbar-name');
            me.addMemo = me.lookupReference('txt-41041145-user-addbar-memo');
            me.addCreateusercode = me.lookupReference('txt-41041145-user-addbar-createusercode');
            me.addCreatetm = me.lookupReference('dat-41041145-user-addbar-createtm');
            me.addStatus = me.lookupReference('cmbx-41041145-user-addbar-status');

            // 主畫面
            me.viewUserlist = me.lookupReference('grid-41041145-user-userlist');

            me.viewCode = me.lookupReference('txt-41041145-user-code');
            me.viewName = me.lookupReference('txt-41041145-user-name');
            me.viewEmail = me.lookupReference('txt-41041145-user-email');
            me.viewMemo = me.lookupReference('txt-41041145-user-memo');
            me.viewCreateusercode = me.lookupReference('txt-41041145-user-createusercode');
            me.viewCreatetm = me.lookupReference('txt-41041145-user-createtm');
            me.viewModifyusercode = me.lookupReference('txt-41041145-user-modifyusercode');
            me.viewModifytm = me.lookupReference('txt-41041145-user-modifytm');
            me.viewStatus = me.lookupReference('cmbx-41041145-user-status');
        } catch (e) {
            me.showError('userController/ initObj error:', e);
        }
    },
    funcbar_search: function () {
        var view = this.getView();
        var searchPanel = view.lookup('panel-41041145-user-searchbar');
        searchPanel.setHidden(!searchPanel.isHidden()); // 切換可見性
        // 如果顯示，您可能還需要執行一些初始化或其他邏輯
        if (!searchPanel.isHidden()) {
        }
    },
    funcbar_add: function () {
        var view = this.getView();
        var addPanel = view.lookup('panel-41041145-user-addbar');
        addPanel.setHidden(!addPanel.isHidden());
        if (!addPanel.isHidden()) {
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
                memo:'',
                createusercode:'',
                createtm:'',
                modifyusercode:'',
                modifytm:'',
                status: 1,
            }, {
                code: '41041145',
                name: '劉家齊',
                email: '41041145@gm.nfu.edu.tw',
                memo:'鳳武薪傳-西螺鳳山館團員',
                createusercode:'劉家齊',
                createtm:'2023/11/12',
                modifyusercode:'劉家齊',
                modifytm:'2023/11/12',
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
            let createusercode = me.searchCreateusercode.getValue();
            let status = me.searchStatus.getValue();
            let createtm = me.searchCreatetm.getValue();

            let uploadJSON = {
                code: code,
                name: name,
                createusercode: createusercode,
                status: status,
                createtm: createtm,
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

                if (uploadJSON.createusercode) {
                    display = e.get('createusercode').includes(uploadJSON.createusercode) ? display : false;
                }

                if (uploadJSON.status) {
                    display = e.get('status') == status ? display : false;
                }

                if (uploadJSON.createtm) {
                    display = e.get('createtm').includes(uploadJSON.createtm) ? display : false;
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
            me.searchCreateusercode.setValue('');
            me.searchStatus.setValue('');
            me.searchCreatetm.setValue('');
        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },
    /*************** addbar ***************/
    // event: ENTER新增
    enterAdd: function (field, e) {
        let me = this;
        try {
            if (e.getKey() == e.ENTER) {
                me.doAdd();
            }
        } catch (e) {
            me.showError('userController/ enterAdd error:', e);
        }
    },

    // button: 新增
    doAdd: async function () {
        let me = this;
        try {
            let code = me.addCode.getValue();
            let name = me.addName.getValue();
            let memo = me.addMemo.getValue();
            let createusercode = me.addCreateusercode.getValue();
            let createtm = me.addCreatetm.getValue();
            let status = me.addStatus.getValue();

            let newRecord = {
                code: code,
                name: name,
                memo: memo,
                createusercode: createusercode,
                createtm: createtm,
                status: status,
            };

            console.log('----------- 新增記錄 -----------');
            console.log(newRecord);

            // Add the new record to the store
            me.viewUserlist.getStore().add(newRecord);

        } catch (e) {
            me.showError('userController/ doAdd error:', e);
        }
    },
    // button: 清除
    cleanAdd: function () {
        let me = this
        try {
            me.addCode.setValue('');
            me.addName.setValue('');
            me.addMemo.setValue('');
            me.addCreateusercode.setValue('');
            me.addCreatetm.setValue('');
            me.addStatus.setValue('');
        } catch (e) {
            me.showError('userController/ cleanAdd error:', e);
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
            me.viewEmail.setValue('');
            me.viewMemo.setValue('');
            me.viewCreateusercode.setValue('');
            me.viewCreatetm.setValue('');
            me.viewModifyusercode.setValue('');
            me.viewModifytm.setValue('');
            me.viewStatus.setValue('');

            if (record) {
                me.viewCode.setValue(record.get('code'));
                me.viewName.setValue(record.get('name'));
                me.viewEmail.setValue(record.get('email'));
                me.viewMemo.setValue(record.get('memo'));
                me.viewCreateusercode.setValue(record.get('createusercode'));
                me.viewCreatetm.setValue(record.get('createtm'));
                me.viewModifyusercode.setValue(record.get('modifyusercode'));
                me.viewModifytm.setValue(record.get('modifytm'));
                me.viewStatus.setValue(record.get('status'));
            }
        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },




});
