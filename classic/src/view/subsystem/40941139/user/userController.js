Ext.define('antnex.subsystem.40941139.user.userController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.page-40941139-user',

    requires: [],

    config: {
        name: '使用者管理',

        // 不懂
        action: null,
        requireKeylist: [],
    },

    // event: 初始化
    onInitialize: async function () {
        const me = this;
        try {
            console.log(`userController/ onInitialize entry`);

            me.initObj();
            await me.refreshObj();
            me.initPageStatus();
        } catch (e) {
            me.showError(`userController/ onInitialize error: `, e);
        }
    },
    // event: 頁面切換
    onActivate: async function () {
        const me = this;
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
            me.funcbarSearch = me.lookupReference('btn-40941139-user-funcbar-search');
            me.funcbarAdd = me.lookupReference('btn-40941139-user-funcbar-add');
            me.funcbarEdit = me.lookupReference('btn-40941139-user-funcbar-edit');
            me.funcbarSave = me.lookupReference('btn-40941139-user-funcbar-save');
            me.funcbarCancel = me.lookupReference('btn-40941139-user-funcbar-cancel');

            // 查詢列
            me.searchBar = me.lookupReference('panel-40941139-user-searchbar');
            me.searchCode = me.lookupReference('txt-40941139-user-searchbar-code');
            me.searchName = me.lookupReference('txt-40941139-user-searchbar-name');
            me.searchMail = me.lookupReference('txt-40941139-user-searchbar-mail');
            // me.searchPhone = me.lookupReference('txt-40941139-user-searchbar-phone');
            // me.searchBirth = me.lookupReference('date-40941139-user-searchbar-birth');
            // me.searchMemo = me.lookupReference('txt-40941139-user-searchbar-memo');
            me.searchStatus = me.lookupReference('cmbx-40941139-user-searchbar-status');
            // me.searchCreateusercode = me.lookupReference('txt-40941139-user-searchbar-createusercode');
            // me.searchCreatetm = me.lookupReference('date-40941139-user-searchbar-createtm');
            // me.searchModifyusercode = me.lookupReference('txt-40941139-user-searchbar-modifyusercode');
            // me.searchModifytm = me.lookupReference('date-40941139-user-searchbar-modifytm');

            // 主畫面
            me.viewUserlist = me.lookupReference('grid-40941139-user-userlist');
            me.viewUserManage = me.lookupReference('panel-40941139-user-manage');
            // me.viewAdd = me.lookupReference('panel-40941139-user-add');

            // 資料維護
            me.viewIds = me.lookupReference('num-40941139-user-ids');
            me.viewCode = me.lookupReference('txt-40941139-user-code');
            me.viewName = me.lookupReference('txt-40941139-user-name');
            me.viewMail = me.lookupReference('txt-40941139-user-mail');
            // me.viewPhone = me.lookupReference('txt-40941139-user-phone');
            // me.viewBirth = me.lookupReference('date-40941139-user-birth');
            me.viewPassword = me.lookupReference('txt-40941139-user-password');
            me.viewMemo = me.lookupReference('txt-40941139-user-memo');
            me.viewStatus = me.lookupReference('cmbx-40941139-user-status');
            me.viewCreateusername = me.lookupReference('txt-40941139-user-createusername');
            me.viewCreatetm = me.lookupReference('date-40941139-user-createtm');
            me.viewModifyusername = me.lookupReference('txt-40941139-user-modifyusername');
            me.viewModifytm = me.lookupReference('date-40941139-user-modifytm');

            /* 資料新增
            me.addCode = me.lookupReference('txt-40941139-user-add-code');
            me.addName = me.lookupReference('txt-40941139-user-add-name');
            me.addMail = me.lookupReference('txt-40941139-user-add-mail');
            me.addPhone = me.lookupReference('txt-40941139-user-add-phone');
            me.addBirth = me.lookupReference('date-40941139-user-add-birth');
            me.addMemo = me.lookupReference('txt-40941139-user-add-memo');
            me.addStatus = me.lookupReference('cmbx-40941139-user-add-status');
            me.addCreateusercode = me.lookupReference('txt-40941139-user-add-createusercode');
            me.addCreatetm = me.lookupReference('date-40941139-user-add-createtm');
            me.addModifyusercode = me.lookupReference('txt-40941139-user-add-modifyusercode');
            me.addModifytm = me.lookupReference('date-40941139-user-add-modifytm');
            */
        } catch (e) {
            me.showError('userController/ initObj error:', e);
        }
    },
    // function: 載入物件資料 - 每次進入觸發(Override) 不懂
    refreshObj: async function () {
        const me = this
        try {
            let status = []
            status.push({ value: -1, text: '全部' });
            const statusStore = Ext.create('antnex.store.static.Status');
            statusStore.getRange().forEach(record => {
                let json = record.getData();
                delete json.id;
                status.push(json);
            });

            me.searchStatus.getStore().loadData(status);
        } catch (e) {
            me.showError('userController/ refreshObj error:', e);
        }
    },
    // function: 初始化頁面狀態 - 首次進入觸發(Override)
    initPageStatus: function () {
        const me = this;
        try {
            me.cleanSearch();
            me.changeStatus('view');
            me.loadData();
        } catch (e) {
            me.showError('userController/ initPageStatus error:', e);
        }
    },



    /************* 頁面事件 *************/
    // function: 停用所有需要停用的物件
    disabledAll: function () {
        const me = this;
        try {
            // 功能列
            me.funcbarSearch.setDisabled(true);
            me.funcbarAdd.setDisabled(true);
            me.funcbarEdit.setDisabled(true);
            me.funcbarSave.setDisabled(true);
            me.funcbarCancel.setDisabled(true);

            // 查詢列
            me.searchBar.setHidden(true);

            // 主畫面
            me.viewUserlist.setHidden(true);

            // 資料維護
            me.viewIds.setReadOnly(true);
            me.viewIds.setHidden(true);
            me.viewCode.setReadOnly(true);
            me.viewName.setReadOnly(true);
            me.viewMail.setReadOnly(true);
            me.viewPassword.setReadOnly(true);
            me.viewStatus.setReadOnly(true);
            me.viewMemo.setReadOnly(true);
            me.viewCreateusername.setReadOnly(true);
            me.viewCreatetm.setReadOnly(true);
            me.viewModifyusername.setReadOnly(true);
            me.viewModifytm.setReadOnly(true);
        } catch (e) {
            me.showError('userController/ disabledAll error:', e);
        }
    },
    // function: 更改狀態
    changeStatus: function (action) {
        const me = this;
        try {
            me.setConfig('action', action);
            console.log(`頁面狀態: ${me.getConfig('action')}`);

            // 停用所有物件
            me.disabledAll();

            // 依狀態啟用物件
            switch (me.getConfig('action')) {
                case 'view':
                    // 功能列
                    me.funcbarSearch.setDisabled(false);
                    me.funcbarAdd.setDisabled(false);
                    // me.funcbarEdit.setDisabled(false);
                    // me.funcbarSave.setDisabled(false);
                    // me.funcbarCancel.setDisabled(false);

                    // 查詢列
                    me.searchBar.setHidden(false);

                    // 主畫面
                    me.viewUserlist.setHidden(false);

                    // 資料維護
                    // me.viewIds.setReadOnly(false);
                    // me.viewCode.setReadOnly(false);
                    // me.viewName.setReadOnly(false);
                    // me.viewMail.setReadOnly(false);
                    // me.viewPassword.setReadOnly(false);
                    // me.viewStatus.setReadOnly(false);
                    // me.viewMemo.setReadOnly(false);
                    break;
                case 'add':
                    // 功能列
                    // me.funcbarSearch.setDisabled(false);
                    // me.funcbarAdd.setDisabled(false);
                    // me.funcbarEdit.setDisabled(false);
                    me.funcbarSave.setDisabled(false);
                    me.funcbarCancel.setDisabled(false);

                    // 查詢列
                    // me.searchBar.setHidden(false);

                    // 主畫面
                    // me.viewUserlist.setHidden(false);

                    // 資料維護
                    // me.viewIds.setReadOnly(false);
                    me.viewCode.setReadOnly(false);
                    me.viewName.setReadOnly(false);
                    me.viewMail.setReadOnly(false);
                    me.viewPassword.setReadOnly(false);
                    me.viewStatus.setReadOnly(false);
                    me.viewMemo.setReadOnly(false);
                    break;
                case 'edit':
                    // 功能列
                    // me.funcbarSearch.setDisabled(false);
                    // me.funcbarAdd.setDisabled(false);
                    // me.funcbarEdit.setDisabled(false);
                    me.funcbarSave.setDisabled(false);
                    me.funcbarCancel.setDisabled(false);

                    // 查詢列
                    // me.searchBar.setHidden(false);

                    // 主畫面
                    // me.viewUserlist.setHidden(false);

                    // 資料維護
                    // me.viewIds.setReadOnly(false);
                    // me.viewCode.setReadOnly(false);
                    me.viewName.setReadOnly(false);
                    me.viewMail.setReadOnly(false);
                    me.viewPassword.setReadOnly(false);
                    me.viewStatus.setReadOnly(false);
                    me.viewMemo.setReadOnly(false);
                    break;
                default:
                    console.log(`無效的狀態: ${me.getConfig('action')}`);
                    break;
            }
        } catch (e) {
            me.showError('userController/ changeStatus error:', e);
        }
    },


    /*************** searchbar ***************/
    // event: ENTER查詢
    enterSearch: function (field, e) {
        const me = this
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
        const me = this
        try {
            const code = me.searchCode.getValue();
            const name = me.searchName.getValue();
            const mail = me.searchMail.getValue();
            const status = me.searchStatus.getValue();


            const uploadJSON = {
                txcode: 'BASIC_USER_LIST_FILTER',
                code: code,
                name: name,
                mail: mail,
                status: status,
            }

            // 暫存需要顯示的資料 不懂
            const requireKeylist = me.getConfig('requireKeylist');

            // 清除暫存資料 不懂
            me.setConfig('requireKeylist', []);

            
            me.viewUserlist.mask(CONST_LOADING_HINT);
            const json = await antnex.ProxyService.send(uploadJSON);
            me.viewUserlist.unmask();

            switch (json.status) {
                case CONST_STATUS_OK:
                    const data = json.message.data;
                    me.viewUserlist.getStore().loadData(data);

                    // 依照暫存的資料選擇對應資料 不懂
                    const records = me.viewUserlist.getStore().getRange().filter(e => requireKeylist.includes(e.get('code')));
                    me.viewUserlist.setSelection(records);
                    break;
                default:
                    throw json.statusText
            }

        } catch (e) {
            me.showError('userController/ doSearch error:', e);
        }
    },
    // button: 清除
    cleanSearch:function () {
        const me = this
        try {
            me.searchCode.setValue('');
            me.searchName.setValue('');
            me.searchMail.setValue('');
            me.searchStatus.setValue(-1);
            // me.searchCode.setValue('');
            // me.searchName.setValue('');
            // me.searchMail.setValue('');
            // me.searchPhone.setValue('');
            // me.searchBirth.setValue('');
            // me.searchMemo.setValue('');
            // me.searchStatus.setValue('');
            // me.searchCreateusername.setValue('');
            // me.searchCreatetm.setValue('');
            // me.searchModifyusername.setValue('');
            // me.searchModifytm.setValue('');

            me.doSearch();

        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },

    /*************** view ***************/
    // event: 選擇使用者
    onSelectUser:function () {
        const me = this
        
        try {
            // const selection = me.viewUserlist.getSelection();
            // const record = selection[0];
            const record = me.viewUserlist.getSelection()[0];
            const code = record ? record.get('code') : '';
            me.loadData(code);           

        } catch (e) {
            me.showError('userController/ onSelectUser error:', e);
        }
    },
    // function: 載入選擇的資料
    loadData: async function (code = '') {
        const me = this;
        try {
            // 依據傳入json載入資料
            let loadFn = function (json = {}) {
                // 取得對應資料
                const ids = json.ids ? json.ids : '';
                const code = json.code ? json.code : '';
                const name = json.name ? json.name : '';
                const mail = json.mail ? json.mail : '';
                const password = json.password ? json.password : '';
                const status = json.status ? json.status : '';
                const memo = json.memo ? json.memo : '';
                const createusername = json.createusername ? json.createusername : '';
                const createtm = json.createtm ? json.createtm : '';
                const modifyusername = json.modifyusername ? json.modifyusername : '';
                const modifytm = json.modifytm ? json.modifytm : '';

                const editable = ids > 0;

                // 載入對應欄位
                me.funcbarEdit.setDisabled(editable == false);

                me.viewIds.setValue(ids);
                me.viewCode.setValue(code);
                me.viewName.setValue(name);
                me.viewMail.setValue(mail);
                me.viewPassword.setValue(password);
                me.viewStatus.setValue(status);
                me.viewMemo.setValue(memo);
                me.viewCreateusername.setValue(createusername);
                me.viewCreatetm.setValue(createtm);
                me.viewModifyusername.setValue(modifyusername);
                me.viewModifytm.setValue(modifytm);
            }

            // 先清除所有資料
            loadFn();

            // 依據code是否有資料決定是否查詢資料庫
            if (code) {
                const uploadJSON = {
                    txcode: 'BASIC_USER_FIND_BY_CODE',
                    code: code,
                };

                me.viewUserManage.mask(CONST_LOADING_HINT);
                const json = await antnex.ProxyService.send(uploadJSON);
                me.viewUserManage.unmask();
                switch (json.status) {
                    case CONST_STATUS_OK:
                        const data = json.message.data;
                        loadFn(data);
                        break;
                    default:
                        throw json.statusText
                }
            }
        } catch (e) {
            me.showError('userController/ loadData error:', e);
        }
    },

    // button: 取消
    doCancel: function () {
        const me = this
        try {
            
        } catch (e) {
            me.showError('userController/ doCancel error:', e);
        }
    },

    /*************** add ***************/
    // button: 功能列新增
    funcbar_add: function () {
        const me = this

        try{
            me.viewAdd.show();
            me.viewManage.hide();

        } catch (e) {
            me.showError('userController/ funcbar_add error:', e);
        }
    },

    // button: 新增
    doAdd: function () {
        const me = this
        
        try {
            const time = Ext.Date.format(new Date(), 'Y-m-d');
            const data = [{
                code: me.addCode.getValue(),
                name: me.addName.getValue(),
                mail: me.addMail.getValue(),
                phone: me.addPhone.getValue(),
                birth: me.addBirth.getRawValue(),
                memo: me.addMemo.getValue(),
                status: me.addStatus.getValue(),
                createusercode: '陳嘉笙',
                createtm: time,
                modifyusercode: '陳嘉笙',
                modifytm: time,
            }]
            me.viewUserlist.getStore().add(data);

            // 初始化
            me.addCode.setValue('');
            me.addName.setValue('');
            me.addMail.setValue('');
            me.addPhone.setValue('');
            me.addBirth.setValue('');
            me.addMemo.setValue('');
            me.addStatus.setValue('');
            me.viewAdd.hide();

        } catch (e) {
            me.showError('userController/ doAdd error:', e);
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
