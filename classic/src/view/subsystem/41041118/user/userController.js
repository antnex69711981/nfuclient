Ext.define('antnex.subsystem.sample.41041118.user.userController',{
    extend:'Ext.app.ViewController',
    alias: 'controller.page-41041118-user',
    requires: [],
    config: {
        name: '41041118-管理',

        action: null,
        requireKeylist: [],
    },
    // event: 初始化
    onInitialize: async function () {
        let me = this;
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
            // 查詢列
            me.searchCode = me.lookupReference('txt-41041118-searchbar-code');
            me.searchName = me.lookupReference('txt-41041118-searchbar-name');
            me.searchMail = me.lookupReference('txt-41041118-searchbar-mail');
            me.searchStatus = me.lookupReference('cmbx-41041118-searchbar-status');
            me.searchMemo = me.lookupReference('txt-41041118-searchbar-memo');
            me.searchCreateusercode = me.lookupReference('txt-41041118-searchbar-createusercode');

            // 功能列
            me.funcbarAdd = me.lookupReference('btn-41041118-funcbar-add');
            me.funcbarEdit = me.lookupReference('btn-41041118-funcbar-edit');
            me.funcbarSave = me.lookupReference('btn-41041118-funcbar-save');
            me.funcbarCancel = me.lookupReference('btn-41041118-funcbar-cancel');

            // 主畫面
            me.viewUserlist = me.lookupReference('grid-41041118-userlist');
            me.viewUserManage = me.lookupReference('panel-41041118-manage');
            me.float = me.lookupReference('txt-41041118-float');

            // 資料維護
            me.viewIds = me.lookupReference('num-41041118-ids');
            me.viewCode = me.lookupReference('txt-41041118-view-code');
            me.viewName = me.lookupReference('txt-41041118-view-name');
            me.viewMail = me.lookupReference('txt-41041118-view-mail');
            me.viewPassword = me.lookupReference('txt-41041118-view-password');
            me.viewStatus = me.lookupReference('cmbx-41041118-view-status');
            me.viewMemo = me.lookupReference('txt-41041118-view-memo');

        } catch (e) {
            me.showError('userController/ initObj error:', e);
        }
    },
    // function: 載入物件資料 - 每次進入觸發(Override)
    refreshObj: async function () {
        const me = this;
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
            me.doSearch();
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
            me.funcbarAdd.setDisabled(true);
            me.funcbarEdit.setDisabled(true);
            me.funcbarSave.setDisabled(true);
            me.funcbarCancel.setDisabled(true);

            // 資料維護          
            me.viewIds.setReadOnly(true);
            me.viewIds.setHidden(true);
            me.viewCode.setReadOnly(true);
            me.viewName.setReadOnly(true);
            me.viewMail.setReadOnly(true);
            me.viewPassword.setReadOnly(true);
            me.viewStatus.setReadOnly(true);
            me.viewMemo.setReadOnly(true);
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
                    me.funcbarAdd.setDisabled(false);
                    // me.funcbarEdit.setDisabled(false);
                    // me.funcbarSave.setDisabled(false);
                    // me.funcbarCancel.setDisabled(false);

                    me.float.hide();
                    
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
                    // me.funcbarAdd.setDisabled(false);
                    // me.funcbarEdit.setDisabled(false);
                    me.funcbarSave.setDisabled(false);
                    me.funcbarCancel.setDisabled(false);

                    // 主畫面
                    me.float.show();

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
                    // me.funcbarAdd.setDisabled(false);
                    // me.funcbarEdit.setDisabled(false);
                    me.funcbarSave.setDisabled(false);
                    me.funcbarCancel.setDisabled(false);

                    // 主畫面
                    me.float.show();

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

    /************* funcbar *************/
    // button: 新增
    funcbar_add: function () {
        const me = this;
        try {
            // 取消選取
            me.viewUserlist.setSelection(false);

            // 切換模式
            me.changeStatus('add');

            // 清除資料
            me.loadData();

            // 載入預設值
            me.viewIds.setValue(0);
            me.viewStatus.setValue(1); // 參照: antnex.store.static.Status

        } catch (e) {
            me.showError('userController/ funcbar_add error:', e);
        }
    },
    // button: 修改
    funcbar_edit: function () {
        const me = this;
        try {
            const record = me.viewUserlist.getSelection()[0];
            if (record) {
                me.changeStatus('edit');
            } else {
                throw `請先選擇要修改的資料`;
            }
        } catch (e) {
            me.showError('userController/ funcbar_Add error:', e);
        }
    },
    // button: 儲存
    funcbar_save: async function () {
        const me = this;
        try {
            let checkSaveFormat = async function () {
                if (S(me.viewCode.getValue()).isEmpty()) {
                    throw `請輸入${me.viewCode.getFieldLabel()}`;
                }

                if (S(me.viewName.getValue()).isEmpty()) {
                    throw `請輸入${me.viewName.getFieldLabel()}`;
                }

                if (S(me.viewPassword.getValue()).isEmpty()) {
                    throw `請輸入${me.viewPassword.getFieldLabel()}`;
                }

                if (S(me.viewStatus.getValue()).isEmpty()) {
                    throw `請選擇${me.viewStatus.getFieldLabel()}`;
                }
            }
            await checkSaveFormat();

            Ext.Msg.confirm('提醒', '是否儲存？', async function (btn) {
                if (btn == 'yes') {
                    const uploadJSON = {
                        txcode: me.getConfig('action') == 'add' ? 'BASIC_USER_INSERT' : 'BASIC_USER_UPDATE',
                        ids: me.viewIds.getValue(),
                        code: me.viewCode.getValue(),
                        name: me.viewName.getValue(),
                        mail: me.viewMail.getValue(),
                        password: me.viewPassword.getValue(),
                        status: me.viewStatus.getValue(),
                        memo: me.viewMemo.getValue(),
                    }

                    me.viewUserManage.mask(CONST_LOADING_HINT);
                    const json = await antnex.ProxyService.send(uploadJSON);
                    me.viewUserManage.unmask();
                    switch (json.status) {
                        case CONST_STATUS_OK:
                            const code = json.message.code;

                            // 切換頁面狀態
                            me.changeStatus('view');

                            // 紀錄此次修改的資料
                            me.setConfig('requireKeylist', [code]);

                            // 重新查詢
                            me.doSearch();
                            break;
                        default:
                            me.showMessage(json.statusText);
                    }
                }
            });
        } catch (e) {
            me.showError('userController/ funcbar_Add error:', e);
        }
    },
    // button: 取消
    funcbar_cancel: function () {
        const me = this;
        try {
            Ext.Msg.confirm('提醒', '是否取消？', function (btn) {
                if (btn == 'yes') {
                    me.changeStatus('view');
                    me.onSelectUser();
                }
            });
        } catch (e) {
            me.showError('userController/ funcbar_Add error:', e);
        }
    },

    /*************** 查詢資料***************/
    // ENTER查詢
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

    // 查詢
    doSearch: async function () {
        const me = this;
        try {
            const code = me.searchCode.getValue();
            const name = me.searchName.getValue();
            const mail = me.searchMail.getValue();
            const memo = me.searchMemo.getValue();
            const status = me.searchStatus.getValue();
            const createusercode =me.searchCreateusercode.getValue();

            const uploadJSON = {
                txcode: 'BASIC_USER_LIST_FILTER',
                code: code,
                name: name,
                mail: mail,
                memo: memo,
                status: status,
                createusercode: createusercode,
            };

            // 暫存需要顯示的資料
            const requireKeylist = me.getConfig('requireKeylist');

            // 清除暫存資料
            me.setConfig('requireKeylist', []);

            me.viewUserlist.mask(CONST_LOADING_HINT);
            const json = await antnex.ProxyService.send(uploadJSON);
            me.viewUserlist.unmask();
            switch (json.status) {
                case CONST_STATUS_OK:
                    const data = json.message.data;
                    me.viewUserlist.getStore().loadData(data);

                    // 依照暫存的資料選擇對應資料
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

    // button: 清除查詢
    cleanSearch: function () {
        let me = this
        try {
            me.searchCode.setValue('');
            me.searchName.setValue('');
            me.searchMail.setValue('');
            me.searchMemo.setValue('');
            me.searchStatus.setValue(-1);
            me.doSearch();
        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },

    /*************** 選擇 ***************/
    // 選擇使用者
    onSelectUser: function () {
        const me = this;
        try {
            if(me.getConfig('action')!='add'){
                const record = me.viewUserlist.getSelection()[0];
                const code = record ? record.get('code') : '';
                me.loadData(code);
            }
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

                const editable = ids > 0;

                // 載入對應欄位
                if(me.getConfig('action')!='edit'){
                    me.funcbarEdit.setDisabled(editable == false);
                }
                

                me.viewIds.setValue(ids);
                me.viewCode.setValue(code);
                me.viewName.setValue(name);
                me.viewMail.setValue(mail);
                me.viewPassword.setValue(password);
                me.viewStatus.setValue(status);
                me.viewMemo.setValue(memo);
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

    /************* 提示訊息 *************/
    // function:提示訊息
    showMessage: function (message) {
        Ext.Msg.alert(`${this.getConfig('name')} `,message);
    },
    // function:錯誤訊息
    showError: function (path, e) {
        this.showMessage(e);
        return false;
    },
   
});