Ext.define('Ext.ux.layout.AntLayoutList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.antLayoutList',
    bodyStyle: 'background:transparent;',

    config: {
        layoutConfig: null, // 此物件的Config
        store: null, // 此物件的Store

        action: '', // 監聽Store模式
        updateRecord: null, // 儲存 record.set() 資料
        addStore: null, // 儲存 me.getStore().add() 資料
        removeStore: null, // 儲存 me.getStore().remove() 資料
    },

    layoutConfig: null, // 此物件的Config
    store: null, // 此物件的Store

    emptyText: '',

    listeners: {
        activate: function () {
            let me = this;
            // console.log('======= antLayoutList on activate =======');
            // 設置Store
            let newStore = Ext.create('Ext.data.Store', {
                listeners: {
                    datachanged: function (obj, eOpts) {  // store change
                        // console.log('======= antLayoutList on onStoreChange =======');
                        me.fireEvent('datachanged', obj, eOpts);
                        me.onStoreChange(obj, eOpts);
                    },
                    add: function (store, records, index, eOpts) { // store add
                        // console.log('======= antLayoutList on onStoreAdd =======');
                        me.fireEvent('add', store, records, index, eOpts);
                        me.onStoreAdd(store, records, index, eOpts)
                    },
                    remove: function (store, records, index, isMove, eOpts) { // store remove
                        // console.log('======= antLayoutList on onStoreRemove =======');
                        me.fireEvent('remove', store, records, index, isMove, eOpts);
                        me.onStoreRemove(store, records, index, isMove, eOpts)
                    },
                    filterchange: function (store, records, index, isMove, eOpts) { // storefilter
                        // console.log('======= antLayoutList on onStoreFilter =======');
                        me.fireEvent('filterchange', store, records, index, isMove, eOpts);
                        me.onStoreFilter(store, records, index, isMove, eOpts)
                    },
                    update: function (store, record, operation, modifiedFieldNames, details, eOpts) { // recordupdate
                        // console.log('======= antLayoutList on onStoreUpdate=======');
                        me.fireEvent('update', store, record, operation, modifiedFieldNames, details, eOpts);
                        me.onStoreUpdate(store, record, operation, modifiedFieldNames, details, eOpts)
                    },
                },
            })

            // 載入view設置的store
            if (me.store) {
                newStore.loadData(me.store);
            }
            // 將建立的store設置config ==> 觸發updateStore function
            me.setConfig('store', newStore);

            // 在view直接設定layoutConfig的話跑setConfig流程 ==> 觸發updateLayoutConfig function
            let layoutConfig = me.layoutConfig;
            if (layoutConfig) {
                me.setConfig('layoutConfig', layoutConfig);
            };

        },
    },

    // event: config('layoutConfig')變更時
    updateLayoutConfig: function (newValue, oldValue) {
        // console.log('======= antLayoutList on updateLayoutConfig =======');
        let me = this
        if (newValue) {
            me.layoutConfig = newValue;
        }
    },

    // event: config('layoutConfig')變更時
    updateStore: function (newValue, oldValue) {
        // console.log('======= antLayoutList on updateStore =======');
        let me = this
        if (newValue) {
            // 設置me.store
            me.store = newValue;
        }
    },

    // event: 當觸發me.getStore()變更時
    onStoreChange: function (obj, eOpts) {
        let me = this
        // console.log(`目前模式：${me.getConfig('action')}`)

        if (Object.keys(me.getStore()).length === 0) {
            me.removeAll();
        } else {
            // 為了節省效能，因此抓各個狀態特殊處理，則可只update需異動資料，不需全部重新build
            switch (me.getConfig('action')) {
                case 'update': // 觸發 record.set()
                    let updateRecord = me.getConfig('updateRecord')
                    me.items.getRange().forEach(view => {
                        let recordId = view.getController().getConfig('recordId');
                        if (recordId == updateRecord.get('id')) {
                            // console.log(`更新：${recordId}`)
                            view.getController().doUpdate(updateRecord);
                        }
                    });
                    break;
                case 'add': // 觸發 me.getStore().add()
                    let addStore = me.getConfig('addStore')
                    addStore.forEach(record => {
                        let view = me.items.getRange().find(view => view.getController().getConfig('recordId') == record.id);
                        if (view) {
                            // console.log(`更新：${record.id}`)
                            view.getController().doUpdate(record);
                        } else {
                            // console.log(`新增：${record.id}`)
                            me.addObj(record);
                        }
                    });

                    me.setConfig('addStore', null)
                    break;
                case 'remove': // 觸發 me.getStore().remove()
                    let removeStore = me.getConfig('removeStore');
                    removeStore.forEach(record => {
                        let view = me.items.getRange().find(view => view.getController().getConfig('recordId') == record.id);
                        if (view) {
                            // console.log(`移除${record.id}`)
                            view.destroy();
                        }
                    });
                    me.setConfig('removeStore', null);
                    break;
                case 'filter': // 觸發 me.getStore().filter()
                    me.items.getRange().forEach(view => {
                        view.setHidden(false);
                        let filterIdx = me.getStore().getRange().findIndex(record => record.get('id') == view.getController().getConfig('recordId'));
                        if (filterIdx == -1) {
                            view.setHidden(true);
                        }
                    })
                    break;
                default: // 其餘datachange狀態皆為重新設置(包含loadData)
                    me.removeAll();
                    me.getStore().getRange().forEach(record => {
                        me.addObj(record);
                    });
                    break;
            }
        }
        // 重置action
        me.setConfig('action', '');
    },
    // event: 當觸發me.getStore().add()
    onStoreAdd: function (store, records, index, eOpts) {
        let me = this
        me.setConfig('action', 'add');
        me.setConfig('addStore', records);
    },
    // event: 當觸發me.getStore().remove()
    onStoreRemove: function (store, records, index, isMove, eOpts) {
        let me = this
        me.setConfig('action', 'remove');
        me.setConfig('removeStore', records);

    },
    // event: 當觸發me.getStore().filter()
    onStoreFilter: function (store, records, index, isMove, eOpts) {
        let me = this
        me.setConfig('action', 'filter');
    },
    // event: 當觸發record.set()
    onStoreUpdate: function (store, record, operation, modifiedFieldNames, details, eOpts) {
        let me = this
        me.setConfig('action', 'update');
        me.setConfig('updateRecord', record);
    },

    // function: 新增物件
    addObj: function (record = {}) {
        let me = this;
        // console.log('======= antLayoutList on addItem =======');
        let layoutconfig = me.layoutConfig;
        let view = Ext.create(`${layoutconfig.view}`);
        view.getController().setConfig('recordId', record.get('id'));
        view.getController().setConfig('record', record);
        view.getController().setConfig('layoutListView', me);
        view.getController().onInitialize(); // 執行init
        view.getController().doUpdate(); // doUpdate
        me.add(view);
    },
});

Ext.define('Ext.ux.layout.AntLayoutListController', {
    extend: 'antnex.default.defaultController',
    alias: 'controller.antLayoutList',
    config: {
        name: 'antLayoutList',

        recordId: null, // 綁定store Id
        record: null, // record
        layoutListView: null // 主層view
    },

    // function: 更新物件
    doUpdate: function () {
        let me = this
        try {
            let classlist = this.$className.split('.');
            let classname = classlist[classlist.length - 1];
            me.showMessage(`請於「${classname}」</br>重新定義doUpdate方法</br>並以me.getConfig('record')接收並設置資料`);
        } catch (e) {
            me.showError('AntLayoutListController/ doUpdate error:', e);
        }
    },

    // function: 移除物件
    doRemove: function () {
        let me = this
        try {
            let store = me.getConfig('layoutListView').getStore(); // get主物件Store
            let removeItem = store.getRange().find(e => e.get('id') == me.getConfig('recordId')) // 過濾出要移除的項目
            if (removeItem) {
                // 移除
                store.remove(removeItem)
            }
        } catch (e) {
            me.showError('AntLayoutListController/ doRemove error:', e);
        }
    },
});