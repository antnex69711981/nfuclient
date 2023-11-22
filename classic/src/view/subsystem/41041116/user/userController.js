Ext.define('antnex.subsystem.41041116.user.userController', {
    extend: 'antnex.default.defaultController',
    alias: 'controller.page-41041116-user',
    requires: [],
    config: {
        name: '使用者管理2',

        action: null,
        requireKeylist: [],
    },
    // function: 初始化物件 - 首次進入觸發(Override)
    initObj: function () {
        let me = this;
        try {
            // 功能列
            me.funcbarSearch = me.lookupReference('btn-41041116-funcbar-search');
            me.funcbarAdd = me.lookupReference('btn-41041116-funcbar-add');
            me.funcbarEdit = me.lookupReference('btn-41041116-funcbar-edit');
            me.funcbarSave = me.lookupReference('btn-41041116-funcbar-save');
            me.funcbarCancel = me.lookupReference('btn-41041116-funcbar-cancel');
            me.funcbarDelete = me.lookupReference('btn-41041116-funcbar-delete');

            // 查詢列
            me.searchBar = me.lookupReference('panel-41041116-searchbar');
            me.searchCode = me.lookupReference('txt-41041116-searchbar-code');
            me.searchName = me.lookupReference('txt-41041116-searchbar-name');
            me.searchMail = me.lookupReference('txt-41041116-searchbar-mail');
            me.searchStatus = me.lookupReference('cmbx-41041116-searchbar-status');

            // 主畫面
            me.viewUserlist = me.lookupReference('grid-41041116-userlist');
            me.viewUserManage = me.lookupReference('panel-41041116-manage');

            // 資料維護
            me.viewIds = me.lookupReference('num-41041116-ids');
            me.viewCode = me.lookupReference('txt-41041116-code');
            me.viewName = me.lookupReference('txt-41041116-name');
            me.viewMail = me.lookupReference('txt-41041116-mail');
            me.viewPassword = me.lookupReference('txt-41041116-password');
            me.viewStatus = me.lookupReference('cmbx-41041116-status');
            me.viewMemo = me.lookupReference('txt-41041116-memo');
            
        } catch (e) {
            me.showError('user2Controller/ initObj error:', e);
        }
    },
    // function: 載入物件資料 - 每次進入觸發(Override)
    refreshObj: async function () {
        const me = this;
        try {
            let status = []
            status.push({ value: -1, text: '全部' ,color:'blue'});
            const statusStore = Ext.create('antnex.store.static.Status');
            statusStore.getRange().forEach(record => {
                let json = record.getData();
                delete json.id;
                status.push(json);
            });
            
            me.searchStatus.getStore().loadData(status);
        } catch (e) {
            me.showError('user2Controller/ refreshObj error:', e);
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
            me.showError('user2Controller/ initPageStatus error:', e);
        }
    },



    /************* 頁面事件 *************/
    // function: 停用所有需要停用的物件
    disabledAll: function () {
        const me = this;
        try {
            // 功能列
            me.funcbarSearch.setEnable(false);
            me.funcbarAdd.setEnable(false);
            me.funcbarEdit.setEnable(false);
            me.funcbarSave.setEnable(false);
            me.funcbarCancel.setEnable(false);
            me.funcbarDelete.setEnable(false)

            // 查詢列
            me.searchBar.setHidden(true);
            // 主畫面
            me.viewUserlist.setHidden(true);
            // 資料維護
            me.viewIds.enableField(false);
            me.viewIds.setHidden(true);
            me.viewCode.enableField(false);
            me.viewName.enableField(false);
            me.viewMail.enableField(false);
            me.viewPassword.enableField(false);
            me.viewStatus.enableField(false);
            me.viewMemo.enableField(false);
        } catch (e) {
            me.showError('user2Controller/ disabledAll error:', e);
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
                    me.funcbarSearch.setEnable(true);
                    me.funcbarAdd.setEnable(true);
                    // me.funcbarDelete.setEnable(true);
                    // me.funcbarEdit.setEnable(true);
                    // me.funcbarSave.setEnable(true);
                    // me.funcbarCancel.setEnable(true);

                    // 查詢列
                    me.searchBar.setHidden(false);

                    // 主畫面
                    me.viewUserlist.setHidden(false);

                    // 資料維護
                    // me.viewIds.enableField(true);
                    // me.viewCode.enableField(true);
                    // me.viewName.enableField(true);
                    // me.viewMail.enableField(true);
                    // me.viewPassword.enableField(true);
                    // me.viewStatus.enableField(true);
                    // me.viewMemo.enableField(true);
                    break;
                case 'add':
                    // 功能列
                    // me.funcbarSearch.setEnable(true);
                    // me.funcbarAdd.setEnable(true);
                    // me.funcbarEdit.setEnable(true);
                    me.funcbarSave.setEnable(true);
                    me.funcbarCancel.setEnable(true);
                    // me.funcbarDelete.setEnable(true);

                    // 查詢列
                    // me.searchBar.setHidden(false);

                    // 主畫面
                    // me.viewUserlist.setHidden(false);

                    // 資料維護
                    // me.viewIds.enableField(true);
                    me.viewCode.enableField(true);
                    me.viewName.enableField(true);
                    me.viewMail.enableField(true);
                    me.viewPassword.enableField(true);
                    me.viewStatus.enableField(true);
                    me.viewMemo.enableField(true);
                    break;
                case 'edit':
                    // 功能列
                    // me.funcbarSearch.setEnable(true);
                    // me.funcbarAdd.setEnable(true);
                    // me.funcbarEdit.setEnable(true);
                    me.funcbarSave.setEnable(true);
                    me.funcbarCancel.setEnable(true);
                    // me.funcbarDelete.setEnable(true);

                    // 查詢列
                    // me.searchBar.setHidden(false);

                    // 主畫面
                    // me.viewUserlist.setHidden(false);

                    // 資料維護
                    // me.viewIds.enableField(true);
                    // me.viewCode.enableField(true);
                    me.viewName.enableField(true);
                    me.viewMail.enableField(true);
                    me.viewPassword.enableField(true);
                    me.viewStatus.enableField(true);
                    me.viewMemo.enableField(true);
                    break;
                case 'delete':
                    // 功能列
                    // me.funcbarSearch.setEnable(true);
                    // me.funcbarAdd.setEnable(true);
                    // me.funcbarEdit.setEnable(true);
                    me.funcbarSave.setEnable(true);
                    me.funcbarCancel.setEnable(true);
                    me.funcbarDelete.setEnable(true);
                    // 查詢列
                    // me.searchBar.setHidden(false);

                    // 主畫面
                    // me.viewUserlist.setHidden(false);

                    // 資料維護
                    // me.viewIds.enableField(true);
                    // me.viewCode.enableField(true);
                    me.viewName.enableField(true);
                    me.viewMail.enableField(true);
                    me.viewPassword.enableField(true);
                    me.viewStatus.enableField(true);
                    me.viewMemo.enableField(true);
                    break;
                default:
                    console.log(`無效的狀態: ${me.getConfig('action')}`);
                    break;
            }
        } catch (e) {
            me.showError('user2Controller/ changeStatus error:', e);
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
            me.showError('user2Controller/ funcbar_add error:', e);
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
            me.showError('user2Controller/ funcbar_Add error:', e);
        }
    },
    // button: 刪除
    funcbar_delete: function () {
        const me = this;
        try {
            const record = me.viewUserlist.getSelection()[0];
            if (record) {
                me.changeStatus('delete');
            } else {
                throw `請先選擇要修改的資料`;
            }
        } catch (e) {
            me.showError('user2Controller/ funcbar_delete error:', e);
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
                            console.log('hi:',json.statusText)
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
            me.showError('user2Controller/ funcbar_Add error:', e);
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
            me.showError('user2Controller/ funcbar_Add error:', e);
        }
    },



    /*************** searchbar ***************/
    // event: ENTER查詢
    enterSearch: function (field, e) {
        const me = this;
        try {
            if (e.getKey() == e.ENTER) {
                me.doSearch();
            }
        } catch (e) {
            me.showError('user2Controller/ enterSearch error:', e);
        }
    },
    // button: 查詢
    doSearch: async function () {
        const me = this;
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
            me.showError('user2Controller/ doSearch error:', e);
        }
    },
    // button: 清除
    cleanSearch: function () {
        const me = this;
        try {
            me.searchCode.setValue('');
            me.searchName.setValue('');
            me.searchStatus.setValue(-1);
        } catch (e) {
            me.showError('user2Controller/ cleanSearch error:', e);
        }
    },



    /*************** view ***************/
    // event: 選擇使用者
    onSelectUser: function () {
        const me = this;
        try {
            const record = me.viewUserlist.getSelection()[0];
            const code = record ? record.get('code') : '';
            me.loadData(code);
        } catch (e) {
            me.showError('user2Controller/ onSelectUser error:', e);
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
                me.funcbarEdit.setDisabled(editable == false);
                me.funcbarDelete.setDisabled(editable == false);
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
            me.showError('user2Controller/ loadData error:', e);
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
