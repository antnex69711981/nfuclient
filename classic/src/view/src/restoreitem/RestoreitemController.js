Ext.define('antnex.view.src.restoreitem.RestoreitemController', {
    extend: 'antnex.default.defaultController',
    alias: 'controller.restoreitem',
    requires: [],
    config: {
        name: '維修項目主檔',

        action: null,
        requireKeylist: [],
    },

    // event: 初始化
    onInitialize: async function () {
        let me = this;
        try {
            console.log(`restoreitemController/ onInitialize entry`);

            me.initObj();
            await me.refreshObj();
            me.initPageStatus();
        } catch (e) {
            me.showError(`restoreitemController/ onInitialize error: `, e);
        }
    },
    // event: 頁面切換
    onActivate: async function () {
        let me = this;
        try {
            console.log(`restoreitemController/ onActivate entry`);

        } catch (e) {
            me.showError(`restoreitemController/ onActivate error: `, e);
        }
    },
    // function: 初始化物件 - 首次進入觸發(Override)
    initObj: function () {
        let me = this
        try {

             // 功能列
             me.funcbarSearch = me.lookupReference('btn-restoreitem-funcbar-search');
             me.funcbarAdd = me.lookupReference('btn-restoreitem-funcbar-add');
             me.funcbarEdit = me.lookupReference('btn-restoreitem-funcbar-edit');
             me.funcbarSave = me.lookupReference('btn-restoreitem-funcbar-save');
             me.funcbarCancel = me.lookupReference('btn-restoreitem-funcbar-cancel');

            // 查詢列
            me.searchBar = me.lookupReference('panel-restoreitem-searchbar');
            me.searchCode = me.lookupReference('txt-restoreitem-searchbar-code');
            me.searchName = me.lookupReference('txt-restoreitem-searchbar-name');
            me.searchStatus = me.lookupReference('cmbx-restoreitem-searchbar-status');
            me.searchWarrantymonth =me.lookupReference('num-restoreitem-searchbar-warrantymonth');

            // 主畫面
            me.viewList = me.lookupReference('grid-restoreitem-list');
            me.viewManage = me.lookupReference('panel-restoreitem-manage');

            //資料維護
            me.viewCode = me.lookupReference('txt-restoreitem-code');
            me.viewName = me.lookupReference('txt-restoreitem-name');
            me.viewWarrantymonth = me.lookupReference('num-restoreitem-warrantymonth');
            me.viewMemo = me.lookupReference('txt-restoreitem-memo');
            me.viewStatus = me.lookupReference('cmbx-restoreitem-status');


        } catch (e) {
            me.showError('restoreitemController/ initObj error:', e);
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
            me.viewList.setHidden(true);

            // 資料維護

            me.viewCode.setReadOnly(true);
            me.viewName.setReadOnly(true);
            me.viewWarrantymonth.setReadOnly(true);
            me.viewStatus.setReadOnly(true);
            me.viewMemo.setReadOnly(true);
           
        } catch (e) {
            me.showError('restoreitemController/ disabledAll error:', e);
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
                    me.viewList.setHidden(false);
                    me.viewList.setDisabled(false);


                    // 資料維護
                    // me.viewIds.setReadOnly(false);
                    // me.viewCode.setReadOnly(false);
                    // me.viewName.setReadOnly(false);
                    // me.viewWarrantymonth.setReadOnly(false);
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
                    me.viewList.setHidden(false);
                    me.viewList.setDisabled(true);

                    // 資料維護
                    // me.viewIds.setReadOnly(false);
                    //me.viewCode.setReadOnly(false);
                    me.viewName.setReadOnly(false);
                    me.viewWarrantymonth.setReadOnly(false);
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
                    me.viewList.setHidden(false);
                    me.viewList.setDisabled(true);

                    // 資料維護
                    // me.viewIds.setReadOnly(false);
                    //me.viewCode.setReadOnly(false);
                    me.viewName.setReadOnly(false);
                    me.viewWarrantymonth.setReadOnly(false);
                    me.viewStatus.setReadOnly(false);
                    me.viewMemo.setReadOnly(false);
                    break;
                default:
                    console.log(`無效的狀態: ${me.getConfig('action')}`);
                    break;
            }
        } catch (e) {
            me.showError('restoreitemController/ changeStatus error:', e);
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
            me.showError('restoreitemController/ refreshObj error:', e);
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
            me.showError('restoreitemController/ initPageStatus error:', e);
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
            me.showError('restoreitemController/ funcbar_Add error:', e);
        }
    },

    /*************** searchbar ***************/
    
    // button: 新增
    funcbar_Add: function () {
        const me = this;
        try {
            // 取消選取
            me.viewList.setSelection(false);

            // 切換模式
            me.changeStatus('add');

            // 清除資料
            me.loadData();

            // 載入預設值
            // me.viewIds.setValue(0);
            me.viewStatus.setValue(1); // 參照: antnex.store.static.Status
            me.viewWarrantymonth.setValue(0);
        } catch (e) {
            me.showError('restoreitemController/ funcbar_add error:', e);
        }
    },        
    // button: 修改
    funcbar_edit: function () {
        let me = this;
        try {
            const record = me.viewList.getSelection()[0];
            //me.viewWarrantymonth.setValue(0);
            if (record) {
                me.changeStatus('edit');
            } else {
                throw `請先選擇要修改的資料`;
            }
        } catch (e) {
            me.showError('restoreitemController/ funcbar_edit error:', e);
        }
    },
    // button: 儲存
    funcbar_save: async function () {
        const me = this;
        try {
            let checkSaveFormat = async function () {
                // if (S(me.viewCode.getValue()).isEmpty()) {
                //     throw `請輸入${me.viewCode.getFieldLabel()}`;
                // }

                if (S(me.viewName.getValue()).isEmpty()) {
                    throw `請輸入${me.viewName.getFieldLabel()}`;
                }

                if (S(me.viewWarrantymonth.getValue()).isEmpty()) {
                    throw `請輸入${me.viewWarrantymonth.getFieldLabel()}`;
                }

                if (S(me.viewStatus.getValue()).isEmpty()) {
                    throw `請選擇${me.viewStatus.getFieldLabel()}`;
                }
            }
            await checkSaveFormat();

            Ext.Msg.confirm('提醒', '是否儲存？', async function (btn) {
                if (btn == 'yes') {
                    const uploadJSON = {
                        txcode: me.getConfig('action') == 'add' ? 'WORKSTATION_RESTOREITEM_INSERT' : 'WORKSTATION_RESTOREITEM_UPDATE',
                        //ids: me.viewIds.getValue(),
                        code: me.viewCode.getValue(),
                        name: me.viewName.getValue(),
                        warrantymonth: me.viewWarrantymonth.getValue(),
                        status: me.viewStatus.getValue(),
                        memo: me.viewMemo.getValue(),
                    }

                    me.viewManage.mask(CONST_LOADING_HINT);
                    const json = await antnex.ProxyService.sendAnt(uploadJSON);
                    me.viewManage.unmask();
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
            me.showError('restoreitemController/ funcbar_save error:', e);
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
            me.showError('restoreitemController/ funcbar_cancel error:', e);
        }
    },
    // button: 查詢
    doSearch: async function () {
        const me = this;
        try {
            const code = me.searchCode.getValue();
            const name = me.searchName.getValue();
            //const warrantymonth = me.searchWarrantymonth.getValue();
            const status = me.searchStatus.getValue();

            const uploadJSON = {
                txcode: 'WORKSTATION_RESTOREITEM_LIST_FILTER',
                code: code,
                name: name,
                //warrantymonth: warrantymonth,
                status: status,
            };

            // 暫存需要顯示的資料
            const requireKeylist = me.getConfig('requireKeylist');

            // 清除暫存資料
            me.setConfig('requireKeylist', []);

            me.viewList.mask(CONST_LOADING_HINT);
            const json = await antnex.ProxyService.sendAnt(uploadJSON);
            me.viewList.unmask();
            switch (json.status) {
                case CONST_STATUS_OK:
                    const data = json.message.data;
                    me.viewList.getStore().loadData(data);

                    // 依照暫存的資料選擇對應資料
                    const records = me.viewList.getStore().getRange().filter(e => requireKeylist.includes(e.get('code')));
                    me.viewList.setSelection(records);
                    break;
                default:
                    throw json.statusText
            }
        } catch (e) {
            me.showError('restoreitemController/ doSearch error:', e);
        }
    },

    // button: 清除
    cleanSearch: function () {
        let me = this
        try {
            me.searchCode.setValue('');
            me.searchName.setValue('');
            me.searchStatus.setValue(-1);
           // me.searchWarrantymonth.setValue('');
            me.doSearch();
        } catch (e) {
            me.showError('restoreitemController/ cleanSearch error:', e);
        }
    },

    // event: ENTER查詢
    enterSearch: function (field, e) {
        const me = this;
        try {
            if (e.getKey() == e.ENTER) {
                me.doSearch();
            }
        } catch (e) {
            me.showError('restoreitemController/ enterSearch error:', e);
        }
    },


    /*************** view ***************/


    // event: 選擇使用者
    onSelect: function () {
        const me = this;
        try {
            const record = me.viewList.getSelection()[0];
            const code = record ? record.get('code') : '';
            
            me.loadData(code);            
        } catch (e) {
            me.showError('restoreitemController/ onSelect error:', e);
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
                const name = json.name ? json.name : '';
                const warrantymonth = json.warrantymonth ? json.warrantymonth : '';
                const status = json.status ? json.status : '';
                const memo = json.memo ? json.memo : '';

                const editable = id > 0;

                // 載入對應欄位
                me.funcbarEdit.setDisabled(editable == false);

                //me.viewIds.setValue(ids);
                me.viewCode.setValue(code);
                me.viewName.setValue(name);
                me.viewWarrantymonth.setValue(warrantymonth);
                me.viewStatus.setValue(status);
                me.viewMemo.setValue(memo);
                
            }
            
            // 先清除所有資料
            loadFn();

            // 依據code是否有資料決定是否查詢資料庫
            if (code) {
                const uploadJSON = {
                    txcode: 'WORKSTATION_RESTOREITEM_FIND_BY_CODE',
                    code: code,
                };

                me.viewManage.mask(CONST_LOADING_HINT);
                const json = await antnex.ProxyService.sendAnt(uploadJSON);
                me.viewManage.unmask();
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
            me.showError('restoreitemController/ loadData error:', e);
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