Ext.define('antnex.view.src.inspection.InspectionController', {
    extend: 'antnex.default.defaultController',
    alias: 'controller.inspection',
    requires: [],
    config: {
        name: '檢測項目主檔',

        action: null,
        requireKey: '',
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
            
        } catch (e) {
            me.showError('inspectionController/ refreshObj error:', e);
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
            me.viewInspectionlist.setHidden(true);
            me.viewInspectionlist.setDisabled(true);
            me.viewInspectionManage.setHidden(true);

            // 資料維護
            me.viewCode.setHidden(true);
            me.viewCode.enableField(false);
            me.viewName.enableField(false);
            me.viewStatus.enableField(false);
            me.viewMemo.enableField(false);
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

                    // 查詢列
                    me.searchBar.setHidden(false);

                    // 主畫面
                    me.viewInspectionlist.setHidden(false);
                    me.viewInspectionManage.setHidden(false);
                    me.viewInspectionlist.setDisabled(false);

                    // 資料維護
                    me.viewCode.setHidden(false);
                    break;
                case 'add':
                    // 功能列
                    me.funcbarSave.setDisabled(false);
                    me.funcbarCancel.setDisabled(false);

                    // 主畫面
                    me.viewInspectionlist.setHidden(false);
                    me.viewInspectionManage.setHidden(false);

                    // 資料維護
                    me.viewName.enableField(true);
                    me.viewStatus.enableField(true);
                    me.viewMemo.enableField(true);
                    break;
                case 'edit':
                    // 功能列
                    me.funcbarSave.setDisabled(false);
                    me.funcbarCancel.setDisabled(false);

                    // 主畫面
                    me.viewInspectionlist.setHidden(false);
                    me.viewInspectionManage.setHidden(false);

                    // 資料維護
                    me.viewName.enableField(true);
                    me.viewStatus.enableField(true);
                    me.viewMemo.enableField(true);
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
    // funcbar_search: function () {
    //     const me = this;
    //     try {
    //         me.searchBar.setHidden(!me.searchBar.hidden);
    //     } catch (e) {
    //         me.showError('userController/ funcbar_search error:', e);
    //     }
    // },
    // button: 新增
    funcbar_add: function () {
        const me = this;
        try {
            // 取消選取
            me.viewInspectionlist.setSelection(false);

            // 切換模式
            me.changeStatus('add');

            // 清除資料
            me.loadData();

            // 載入預設值
            // me.viewCode.setValue("");
            // me.viewMemo.setValue("");
            me.viewStatus.setValue(1); // 參照: antnex.store.static.Status

        } catch (e) {
            me.showError('userController/ funcbar_add error:', e);
        }
    },
    // button: 修改
    funcbar_edit: function () {
        const me = this;
        try {
            const record = me.viewInspectionlist.getSelection()[0];
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
            if (await me.checkSaveFormat()) {
                Ext.Msg.confirm('提醒', '是否儲存？', async function (btn) {
                    if (btn == 'yes') {
                        let txcode = me.getConfig('action') == 'add' ? 'BASIC_INSPECTION_INSERT' : 'BASIC_INSPECTION_UPDATE';

                        const uploadJSON = {
                            txcode: txcode,
                            code: me.viewCode.getValue(),
                            name: me.viewName.getValue(),
                            status: me.viewStatus.getValue(),
                            memo: me.viewMemo.getValue(),
                        }

                        me.viewInspectionManage.mask(CONST_LOADING_HINT);
                        const json = await antnex.ProxyService.sendAnt(uploadJSON);
                        me.viewInspectionManage.unmask();
                        switch (json.status) {
                            case CONST_STATUS_OK:
                                const code = json.message.code;

                                // 切換頁面狀態
                                me.changeStatus('view');

                                // 紀錄此次修改的資料
                                me.setConfig('requireKey', code);

                                // 重新查詢
                                me.cleanSearch();
                                break;
                            default:
                                me.showMessage(json.statusText);
                        }
                    }
                });
            }

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
                    me.onSelect();
                }
            });
        } catch (e) {
            me.showError('userController/ funcbar_Add error:', e);
        }
    },
    // 檢測必填欄位是否填寫
    checkSaveFormat: async function () {
        let me = this;
        let checked = true;
        let errmsg = '';
        try {
            if (S(me.viewName.getValue()).isEmpty()) {
                checked = false;
                errmsg += `請輸入${me.viewName.getFieldLabel()}\n`;
            }

            if (errmsg) {
                throw errmsg;
            }
        } catch (e) {
            me.showError('userController/ funcbar_Add error:', e);
        }
        return checked;
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
            const status = me.searchStatus.getValue();


            const uploadJSON = {
                txcode: 'BASIC_INSPECTION_LIST_FILTER',
                code: code,
                name: name,
                status: status,
            }

            // 暫存需要顯示的資料
            const requireKey = me.getConfig('requireKey');

            // 清除暫存資料
            me.setConfig('requireKey', '');

            me.viewInspectionlist.mask(CONST_LOADING_HINT);
            const json = await antnex.ProxyService.sendAnt(uploadJSON);
            me.viewInspectionlist.unmask();

            switch (json.status) {
                case CONST_STATUS_OK:
                    const data = json.message.data;
                    me.viewInspectionlist.getStore().loadData(data);

                    // 依照暫存的資料選擇對應資料
                    const records = me.viewInspectionlist.getStore().getRange().find(e => requireKey == e.get("code"));
                    if (records) {
                        me.viewInspectionlist.setSelection(records);
                    }
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
            me.searchStatus.setValue(1);

            me.doSearch();

        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },

    /*************** view ***************/
    // event: 選擇使用者
    onSelect: function () {
        const me = this

        try {
            const record = me.viewInspectionlist.getSelection()[0];
            const code = record ? record.get('code') : '';
            me.loadData(code);

        } catch (e) {
            me.showError('userController/ onSelect error:', e);
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
                const status = json.status ? json.status : '';
                const memo = json.memo ? json.memo : '';

                const editable = ids > 0;

                // 載入對應欄位
                me.funcbarEdit.setDisabled(editable == false);

                me.viewCode.setValue(code);
                me.viewName.setValue(name);
                me.viewStatus.setValue(status);
                me.viewMemo.setValue(memo);
            }

            // 先清除所有資料
            loadFn();

            // 依據code是否有資料決定是否查詢資料庫
            if (S(code).isEmpty() == false) {
                const uploadJSON = {
                    txcode: 'BASIC_INSPECTION_FIND_BY_CODE',
                    code: code,
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
            } else {
                loadFn({});
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