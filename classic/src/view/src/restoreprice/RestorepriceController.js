Ext.define('antnex.view.src.restoreprice.RestorepriceController', {
    extend: 'antnex.default.defaultController',
    alias: 'controller.restoreprice',
    requires: [],
    config: {
        name: '維修報價主檔',

        action: null,
        requireKeylist: [],
    },

    // event: 初始化
    onInitialize: async function () {
        const me = this;
        try {
            console.log(`restorepriceController/ onInitialize entry`);

            me.initObj();
            // await me.refreshObj();
            me.initPageStatus();
        } catch (e) {
            me.showError(`restorepriceController/ onInitialize error: `, e);
        }
    },
    // event: 頁面切換
    onActivate: async function () {
        let me = this;
        try {
            console.log(`restorepriceController/ onActivate entry`);

        } catch (e) {
            me.showError(`restorepriceController/ onActivate error: `, e);
        }
    },
    // function: 初始化物件 - 首次進入觸發(Override)
    initObj: function () {
        let me = this
        try {
             // 功能列
             me.funcbarSearch = me.lookupReference('btn-restoreprice-user-funcbar-search');
             me.funcbarAdd = me.lookupReference('btn-restoreprice-user-funcbar-add');
             me.funcbarEdit = me.lookupReference('btn-restoreprice-user-funcbar-edit');
             me.funcbarSave = me.lookupReference('btn-restoreprice-user-funcbar-save');
             me.funcbarCancel = me.lookupReference('btn-restoreprice-user-funcbar-cancel');
 
             // 查詢列
             me.searchBar = me.lookupReference('panel-restoreprice-user-searchbar');
             me.searchCode = me.lookupReference('txt-restoreprice-user-searchbar-code');
             me.searchRestoreitemcode = me.lookupReference('txt-restoreprice-user-searchbar-restoreitemcode');
             me.searchMaterialcode = me.lookupReference('txt-restoreprice-user-searchbar-materialcode');
 
             // 主畫面
             me.viewUserlist = me.lookupReference('grid-restoreprice-user-userlist');
             me.viewUserManage = me.lookupReference('panel-restoreprice-user-manage');
 
             //資料維護
             me.viewCode = me.lookupReference('txt-restoreprice-user-code');
             me.viewRestoreitemcode = me.lookupReference('txt-restoreprice-user-restoreitemcode');
             me.viewMaterialcode = me.lookupReference('txt-restoreprice-user-materialcode');
             me.viewPrice = me.lookupReference('txt-restoreprice-user-price');
             me.viewMemberprice = me.lookupReference('txt-restoreprice-user-memberprice');
             me.viewMemo = me.lookupReference('txt-restoreprice-user-memo');
            //  me.viewCreateusercode = me.lookupReference('txt-restoreprice-user-createusercode');
            //  me.viewCreatetm = me.lookupReference('txt-restoreprice-user-createtm');
            //  me.viewModifyusercode = me.lookupReference('txt-restoreprice-user-modifyusercode');
            //  me.viewModifytm = me.lookupReference('txt-restoreprice-user-modifytm');
             
        } catch (e) {
            me.showError('restorepriceController/ initObj error:', e);
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
            me.showError('restorepriceController/ refreshObj error:', e);
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
            me.showError('restorepriceController/ initPageStatus error:', e);
        }
    },

    // /************* 頁面事件 *************/
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
            me.viewUserManage.setHidden(true);

            // 資料維護
            me.viewCode.setReadOnly(true);
            me.viewRestoreitemcode.setReadOnly(true);
            me.viewMaterialcode.setReadOnly(true);
            me.viewPrice.setReadOnly(true);
            me.viewMemberprice.setReadOnly(true);
            me.viewMemo.setReadOnly(true);
        } catch (e) {
            me.showError('restorepriceController/ disabledAll error:', e);
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
                    me.funcbarEdit.setDisabled(true);
                    me.funcbarSave.setDisabled(true);
                    me.funcbarCancel.setDisabled(true);

                    // 查詢列
                    me.searchBar.setHidden(false);

                    // 主畫面
                    me.viewUserlist.setHidden(false);
                    me.viewUserManage.setHidden(false);

                    // 資料維護
                    // me.viewCode.setReadOnly(true);
                    // me.viewRestoreitemcode.setReadOnly(false);
                    // me.viewMaterialcode.setReadOnly(false);
                    // me.viewPrice.setReadOnly(false);
                    // me.viewMemberprice.setReadOnly(false);
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
                    me.viewUserManage.setHidden(false);

                    // 資料維護
                    me.viewCode.setReadOnly(true);
                    me.viewRestoreitemcode.setReadOnly(false);
                    me.viewMaterialcode.setReadOnly(false);
                    me.viewPrice.setReadOnly(false);
                    me.viewMemberprice.setReadOnly(false);
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
                    me.viewUserManage.setHidden(false);

                    // 資料維護
                    me.viewCode.setReadOnly(true);
                    me.viewRestoreitemcode.setReadOnly(false);
                    me.viewMaterialcode.setReadOnly(false);
                    me.viewPrice.setReadOnly(false);
                    me.viewMemberprice.setReadOnly(false);
                    me.viewMemo.setReadOnly(false);
                    break;
                default:
                    console.log(`無效的狀態: ${me.getConfig('action')}`);
                    break;
            }
        } catch (e) {
            me.showError('restorepriceController/ changeStatus error:', e);
        }
    },

    /************* funcbar *************/
    // button: 新增
    funcbar_add: function () {
        const me = this;
        try {
            
            // 取消選取
            me.viewUserlist.setSelection(false);
            me.funcbarSave.setHidden(false);//儲存按鈕顯示
            
            // 切換模式
            me.changeStatus('add');

            // 清除資料
            me.loadData();

            // 載入預設值
            //me.viewId.setValue(0);
            //me.viewStatus.setValue(1); // 參照: antnex.store.static.Status
            me.viewPrice.setValue(0);
            me.viewMemberprice.setValue(0);

        } catch (e) {
            me.showError('restorepriceController/ funcbar_add error:', e);
        }
    },
    // button: 修改
    funcbar_edit: function () {
        const me = this;
        try {
            me.funcbarSave.setHidden(false);//儲存按鈕顯示
            const record = me.viewUserlist.getSelection()[0];
            if (record) {
                me.changeStatus('edit');
            } else {
                throw `請先選擇要修改的資料`;
            }
        } catch (e) {
            me.showError('restorepriceController/ funcbar_Add error:', e);
        }
    },
    // button: 儲存
    funcbar_save: async function () {
        const me = this;
        try {
            let checkSaveFormat = async function () {
                if (S(me.viewRestoreitemcode.getValue()).isEmpty()) {
                    throw `請輸入${me.viewRestoreitemcode.getFieldLabel()}`;
                }

                if (S(me.viewMaterialcode.getValue()).isEmpty()) {
                    throw `請輸入${me.viewMaterialcode.getFieldLabel()}`;
                }
            }
            await checkSaveFormat();

            Ext.Msg.confirm('提醒', '是否儲存？', async function (btn) {
                if (btn == 'yes') {
                    const uploadJSON = {
                        txcode: me.getConfig('action') == 'add' ? 'WORKSTATION_RESTOREPRICE_INSERT' : 'WORKSTATION_RESTOREPRICE_UPDATE',
                        code: me.viewCode.getValue(),
                        restoreitemcode: me.viewRestoreitemcode.getValue(),
                        materialcode: me.viewMaterialcode.getValue(),
                        price: me.viewPrice.getValue(),
                        memberprice: me.viewMemberprice.getValue(),
                        memo: me.viewMemo.getValue(),
                    }

                    me.viewUserManage.mask(CONST_LOADING_HINT);
                    const json = await antnex.ProxyService.sendAnt(uploadJSON);
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
            me.showError('restorepriceController/ funcbar_Add error:', e);
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
                    //me.viewUserManage.setHidden(true);
                }
            });
        } catch (e) {
            me.showError('restorepriceController/ funcbar_Add error:', e);
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
            me.showError('restorepriceController/ enterSearch error:', e);
        }
    },
    // button: 查詢
    doSearch: async function () {
        const me = this;
        try {
            const code = me.searchCode.getValue();
            //const restoreitemcode = me.searchRestoreitemcode.getValue();
            const materialcode = me.searchMaterialcode.getValue();

            const uploadJSON = {
                txcode: 'WORKSTATION_RESTOREPRICE_LIST_FILTER',
                code: code,
                //restoreitemcode: restoreitemcode,
                materialcode: materialcode,
            };

            // 暫存需要顯示的資料
            const requireKeylist = me.getConfig('requireKeylist');

            // 清除暫存資料
            me.setConfig('requireKeylist', []);

            me.viewUserlist.mask(CONST_LOADING_HINT);
            const json = await antnex.ProxyService.sendAnt(uploadJSON);
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
            me.showError('restorepriceController/ doSearch error:', e);
        }
    },
    // button: 清除
    cleanSearch: function () {
        const me = this;
        try {
            me.searchCode.setValue('');
            me.searchRestoreitemcode.setValue('');
            me.searchMaterialcode.setValue('');
            me.doSearch();
        } catch (e) {
            me.showError('restorepriceController/ cleanSearch error:', e);
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
            //me.viewUserManage.setHidden(false);//資料維護顯示
            //me.funcbarSave.setHidden(true);//儲存按鈕隱藏
        } catch (e) {
            me.showError('restorepriceController/ onSelectUser error:', e);
        }
    },
    // function: 載入選擇的資料
    loadData: async function (code = '') {
        const me = this;
        try {
            // 依據傳入json載入資料
            let loadFn = function (json = {}) {
                // 取得對應資料
                const id = json.id ? json.id : '';
                const code = json.code ? json.code : '';
                const restoreitemcode = json.restoreitemcode ? json.restoreitemcode : '';
                const materialcode = json.materialcode ? json.materialcode : '';
                const price = json.price ? json.price : '';
                const memberprice = json.memberprice ? json.memberprice : '';
                const memo = json.memo ? json.memo : '';

                const editable = id > 0;

                // 載入對應欄位
                me.funcbarEdit.setDisabled(editable == false);

                me.viewCode.setValue(code);
                me.viewRestoreitemcode.setValue(restoreitemcode);
                me.viewMaterialcode.setValue(materialcode);
                me.viewPrice.setValue(price);
                me.viewMemberprice.setValue(memberprice);
                me.viewMemo.setValue(memo);
            }

            // 先清除所有資料
            loadFn();

            // 依據code是否有資料決定是否查詢資料庫
            if (code) {
                const uploadJSON = {
                    txcode: 'WORKSTATION_RESTOREPRICE_FIND_BY_CODE',
                    code: code,
                };

                me.viewUserManage.mask(CONST_LOADING_HINT);
                const json = await antnex.ProxyService.sendAnt(uploadJSON);
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
            me.showError('restorepriceController/ loadData error:', e);
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