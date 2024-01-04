Ext.define('antnex.view.src.inspection.InspectionController', {
    extend: 'antnex.default.defaultController',
    alias: 'controller.inspection',
    requires: [],
    config: {
        name: '檢測項目主檔',

        action: null,
        requireKeylist: [],
    },

    // event: 初始化
    onInitialize: async function () {
        const me = this;
        try {
            console.log(`inspectionController/ onInitialize entry`);

            me.initObj();
            await me.refreshObj();
            me.initPageStatus();
        } catch (e) {
            me.showError(`inspectionController/ onInitialize error: `, e);
        }
    },
    // event: 頁面切換
    onActivate: async function () {
        let me = this;
        try {
            console.log(`inspectionController/ onActivate entry`);

        } catch (e) {
            me.showError(`inspectionController/ onActivate error: `, e);
        }
    },
    // function: 初始化物件 - 首次進入觸發(Override)
    initObj: function () {
        let me = this
        try {
            // 功能列
            me.funcbarSearch = me.lookupReference('btn-inspection-funcbar-search');
            me.funcbarAdd = me.lookupReference('btn-inspection-funcbar-add');
            me.funcbarEdit = me.lookupReference('btn-inspection-funcbar-edit');
            me.funcbarSave = me.lookupReference('btn-inspection-funcbar-save');
            me.funcbarCancel = me.lookupReference('btn-inspection-funcbar-cancel');

            // 查詢列
            me.searchBar = me.lookupReference('panel-inspection-searchbar');
            me.searchCode = me.lookupReference('txt-inspection-searchbar-code');
            me.searchName = me.lookupReference('txt-inspection-searchbar-name');
            me.searchStatus = me.lookupReference('cmbx-inspection-searchbar-status');

            // 主畫面
            me.viewInspectionlist = me.lookupReference('grid-inspection-inspectionlist');
            me.viewInspectionManage = me.lookupReference('panel-inspection-manage');

            // 資料維護
            me.viewCode = me.lookupReference('txt-inspection-code');
            me.viewName = me.lookupReference('txt-inspection-name');
            me.viewMemo = me.lookupReference('txt-inspection-memo');
            me.viewStatus = me.lookupReference('cmbx-inspection-status');


        } catch (e) {
            me.showError('inspectionController/ initObj error:', e);
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
            me.showError('inspectionController/ refreshObj error:', e);
        }
    },
    // function: 初始化頁面狀態 - 首次進入觸發(Override)
    initPageStatus: function () {
        const me = this;
        try {
            me.cleanSearch();
            // me.changeStatus('view');
            // me.loadData();
        } catch (e) {
            me.showError('inspectionController/ initPageStatus error:', e);
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
            me.viewCreateusername.setHidden(true);
            me.viewCreatetm.setReadOnly(true);
            me.viewCreatetm.setHidden(true);
            me.viewModifyusername.setReadOnly(true);
            me.viewModifyusername.setHidden(true);
            me.viewModifytm.setReadOnly(true);
            me.viewModifytm.setHidden(true);
            me.viewAdd.setHidden(true);
            me.viewEdit.setHidden(true);
            me.viewSave.setHidden(true);
            me.viewCancel.setHidden(true);
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
                    // me.viewCreateusername.setReadOnly(false);
                    me.viewCreateusername.setHidden(false);
                    // me.viewCreatetm.setReadOnly(false);
                    me.viewCreatetm.setHidden(false);
                    // me.viewModifyusername.setReadOnly(false);
                    me.viewModifyusername.setHidden(false);
                    // me.viewModifytm.setReadOnly(false);
                    me.viewModifytm.setHidden(false);

                    me.viewAdd.setHidden(false);
                    // me.viewEdit.setHidden(false);
                    // me.viewSave.setHidden(false);
                    // me.viewCancel.setHidden(false);
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
                    // me.viewCreateusername.setReadOnly(false);
                    // me.viewCreateusername.setHidden(false);
                    // me.viewCreatetm.setReadOnly(false);
                    // me.viewCreatetm.setHidden(false);
                    // me.viewModifyusername.setReadOnly(false);
                    // me.viewModifyusername.setHidden(false);
                    // me.viewModifytm.setReadOnly(false);
                    // me.viewModifytm.setHidden(false);

                    // me.viewAdd.setHidden(false);
                    // me.viewEdit.setHidden(false);
                    me.viewSave.setHidden(false);
                    me.viewCancel.setHidden(false);
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
                    // me.viewCreateusername.setReadOnly(false);
                    // me.viewCreatetm.setReadOnly(false);
                    // me.viewModifyusername.setReadOnly(false);
                    // me.viewModifytm.setReadOnly(false);

                    // me.viewAdd.setHidden(false);
                    // me.viewEdit.setHidden(false);
                    me.viewSave.setHidden(false);
                    me.viewCancel.setHidden(false);
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
    // button: 查詢列
    funcbar_search: function () {
        const me = this;
        try {
            me.searchBar.setHidden(!me.searchBar.hidden);
        } catch (e) {
            me.showError('userController/ funcbar_search error:', e);
        }
    },
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
    cleanSearch: function () {
        const me = this
        try {
            me.searchCode.setValue('');
            me.searchName.setValue('');
            me.searchStatus.setValue(-1);

            // me.doSearch();
            
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
            
            if (me.viewEdit.hidden) {
                me.viewAdd.setHidden(true);
                me.viewEdit.setHidden(false);
                me.viewSave.setHidden(true);
                me.viewCancel.setHidden(false);
            }
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
                const code = json.code ? json.code : '';
                const name = json.name ? json.name : '';
                const status = json.status ? json.status : '';
                const memo = json.memo ? json.memo : '';
                // const createusername = json.createusername ? json.createusername : '';
                // const createtm = json.createtm ? json.createtm : '';
                // const modifyusername = json.modifyusername ? json.modifyusername : '';
                // const modifytm = json.modifytm ? json.modifytm : '';

                const editable = ids > 0;

                // 載入對應欄位
                me.funcbarEdit.setDisabled(editable == false);

                me.viewCode.setValue(code);
                me.viewName.setValue(name);
                me.viewStatus.setValue(status);
                me.viewMemo.setValue(memo);
                // me.viewCreateusername.setValue(createusername);
                // me.viewCreatetm.setValue(createtm);
                // me.viewModifyusername.setValue(modifyusername);
                // me.viewModifytm.setValue(modifytm);
            }

            // 先清除所有資料
            loadFn();

            // 依據code是否有資料決定是否查詢資料庫
            if (code) {
                const uploadJSON = {
                    txcode: 'WORKSTATION_RESTOREITEM_LIST_FILTER',
                    code: "",
                    name: "",
                    status: -1,
                }

                me.viewInspectionlist.mask(CONST_LOADING_HINT);
                const json = await antnex.ProxyService.sendAnt(uploadJSON);
                me.viewInspectionlist.unmask();
                switch (json.status) {
                    // 正常
                    case CONST_STATUS_OK:
                        // 顯示資料
                        const data = json.message.data;
                
                        // do something with data ...
                        loadFn(data);
                
                        break;
                    // 錯誤
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
        Ext.Msg.alert(`${this.getConfig('name')} `, message);
    },
    // function:錯誤訊息
    showError: function (path, e) {
        this.showMessage(e);
        return false;
    },
});