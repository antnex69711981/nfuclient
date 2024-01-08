Ext.define('antnex.view.src.profitlist.ProfitlistController', {
    extend: 'antnex.default.defaultController',
    alias: 'controller.profitlist',
    requires: [],
    config: {
        name: '毛利統計表',

        action: null,
        requireKeylist: [],
    },

    // event: 初始化
    onInitialize: async function () {
        const me = this;
        try {
            console.log(`profitstatsController/ onInitialize entry`);

            me.initObj();
            await me.refreshObj();
            me.initPageStatus();
        } catch (e) {
            me.showError(`profitstatsController/ onInitialize error: `, e);
        }
    },
    // event: 頁面切換
    onActivate: async function () {
        const me = this;
        try {
            console.log(`profitstatsController/ onActivate entry`);

        } catch (e) {
            me.showError(`profitstatsController/ onActivate error: `, e);
        }
    },
    // function: 初始化物件 - 首次進入觸發(Override)
    initObj: function () {
        let me = this
        try {
            // 功能列
            me.funcbarSearch = me.lookupReference('btn-profitlist-funcbar-search');
            me.funcbarPrint = me.lookupReference('btn-profitlist-funcbar-print');

            // 查詢列
            me.searchBar = me.lookupReference('panel-profitlist-searchbar');
            me.searchStartdate = me.lookupReference('date-profitlist-searchbar-startdate');
            me.searchEnddate = me.lookupReference('date-profitlist-searchbar-enddate');
            me.searchBranch = me.lookupReference('tag-profitlist-searchbar-branch');
            me.searchUser = me.lookupReference('tag-profitlist-searchbar-user');

            // 主畫面
            me.viewProfitlist = me.lookupReference('grid-profitlist-list');
        } catch (e) {
            me.showError('profitstatsController/ initObj error:', e);
        }
    },
    // function: 載入物件資料 - 每次進入觸發(Override) 
    refreshObj: async function () {
        let me = this
        try {
            const record = me.viewProfitlist.getSelection()[0];
            let data = [{
                branchcode: '1',
                branchname: '店家',
                rausercode: '40941139',
                rausername: '陳嘉笙',
                tradetime: '2023-12-07',
                profit: 1000,
                commissionamount: 100,
                creditfee: 100,
                // netincome: record.get('profit')-record.get('commissionamount')-record.get('creditfee'),
                promotionprofit: 100,
                // businessprofit: record.get('netincome')+record.get('promotionprofit'),
                paycash: 0,
                usecashpoints: 100,
                cashincome: 100,
                creditamount: 100,
                digitalpayment: 100,
                // invoiceamount: record.get('usecashpoints')+record.get('cashincome')+record.get('creditamount')+record.get('digitalpayment'),
            }]
            me.viewProfitlist.getStore().loadData(data);
        } catch (e) {
            me.showError('profitstatsController/ refreshObj error:', e);
        }
    },
    // function: 初始化頁面狀態 - 首次進入觸發(Override)
    initPageStatus: function () {
        const me = this;
        try {
            me.cleanSearch();
            // me.loadData();
        } catch (e) {
            me.showError('profitstatsController/ initPageStatus error:', e);
        }
    },

    /************* funcbar *************/
    // button: 查詢列
    // funcbar_search: function () {
    //     const me = this;
    //     try {
    //         me.searchBar.setHidden(!me.searchBar.hidden);
    //     } catch (e) {
    //         me.showError('profitstatsController/ funcbar_search error:', e);
    //     }
    // },
    // button: 列印
    funcbar_print: function () {
        const me = this;
        try {
            const record = me.viewInspectionlist.getSelection()[0];
            
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
            me.showError('profitstatsController/ enterSearch error:', e);
        }
    },
    // button: 查詢
    doSearch: async function () {
        const me = this
        try {
            const startdate = me.searchStartdate.getValue();
            const enddate = me.searchEnddate.getValue();
            const branch = me.searchBranch.getValue();
            const user = me.searchUser.getValue();


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


            me.viewProfitlist.mask(CONST_LOADING_HINT);
            const json = await antnex.ProxyService.send(uploadJSON);
            me.viewProfitlist.unmask();

            switch (json.status) {
                case CONST_STATUS_OK:
                    const data = json.message.data;
                    me.viewProfitlist.getStore().loadData(data);

                    // 依照暫存的資料選擇對應資料 不懂
                    const records = me.viewProfitlist.getStore().getRange().filter(e => requireKeylist.includes(e.get('code')));
                    me.viewProfitlist.setSelection(records);
                    break;
                default:
                    throw json.statusText
            }

        } catch (e) {
            me.showError('profitstatsController/ doSearch error:', e);
        }
    },
    // button: 清除
    cleanSearch: function () {
        const me = this
        try {
            me.searchStartdate.setValue('');
            me.searchEnddate.setValue('');
            me.searchBranch.setValue('');
            me.searchUser.setValue('');

            // me.doSearch();

        } catch (e) {
            me.showError('profitstatsController/ cleanSearch error:', e);
        }
    },

    /*************** view ***************/
    // event: 選擇使用者
    onSelectUser: function () {
        const me = this

        try {
            // const selection = me.viewProfitlist.getSelection();
            // const record = selection[0];
            const record = me.viewProfitlist.getSelection()[0];
            const code = record ? record.get('code') : '';
            me.doOpenWindow('viewProfitlist', [11, 11, 11]);

            // if (me.viewEdit.hidden) {

            //     me.viewAdd.setHidden(true);
            //     me.viewEdit.setHidden(false);
            //     me.viewSave.setHidden(true);
            //     me.viewCancel.setHidden(false);
            // }
            // me.loadData(code);

        } catch (e) {
            me.showError('profitstatsController/ onSelectUser error:', e);
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
            me.showError('profitstatsController/ loadData error:', e);
        }
    },


    /************* window *************/
    // function: 開啟window
    doOpenWindow: function (view, config = {}) {
        let me = this
        let win = null;
        try {
            if (me.getConfig('defaultControllerPrintlog')) {
                console.log(`${me.getConfig('name')} - defaultController.doOpenWindow()`);
            }

            if (view) {
                let modal = config.modal == null ? true : false;
                let dockedItems = config.dockedItems;

                // 建立window
                if (dockedItems) {
                    win = Ext.create('antnex.subsystem.mainmenu.window.WindowContainer', {
                        controller: view.getController(),
                        title: view.getController().getConfig('name'),
                        height: view.getController().getConfig('height'),
                        width: view.getController().getConfig('width'),
                        modal: modal,
                        closeToolText: '關閉',
                        dockedItems: dockedItems
                    });
                } else {
                    win = Ext.create('antnex.subsystem.mainmenu.window.WindowContainer', {
                        controller: view.getController(),
                        title: view.getController().getConfig('name'),
                        height: view.getController().getConfig('height'),
                        width: view.getController().getConfig('width'),
                        modal: modal,
                        closeToolText: '關閉',
                    });
                }

                if (win) {
                    win.add(view);
                    win.doResize();
                    win.show();
                }
            }
        } catch (e) {
            me.showError('defaultController/ doOpenWindow error:', e);
        }
        return win;
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
